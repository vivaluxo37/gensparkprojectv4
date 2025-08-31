// Server-side Suspense-like utilities for async operations
// Provides fallback rendering and error boundaries for SSR

export interface SuspenseOptions {
  fallback?: string;
  errorFallback?: (error: Error) => string;
  timeout?: number;
}

/**
 * Server-side Suspense implementation for async operations
 * Provides fallback content while async operations complete
 */
export async function withSuspense<T>(
  asyncOperation: () => Promise<T>,
  options: SuspenseOptions = {}
): Promise<T> {
  const { 
    fallback = '<div class="animate-pulse bg-gray-200 h-8 rounded"></div>',
    errorFallback = (error: Error) => `<div class="text-red-600">Error: ${error.message}</div>`,
    timeout = 10000 
  } = options;

  try {
    // Create a promise that rejects after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), timeout);
    });

    // Race the async operation against the timeout
    return await Promise.race([
      asyncOperation(),
      timeoutPromise
    ]);
  } catch (error) {
    console.error('Suspense error:', error);
    
    if (errorFallback && error instanceof Error) {
      // Return the error fallback as a rejected promise to maintain type safety
      throw new SuspenseError(errorFallback(error));
    }
    
    throw error;
  }
}

export class SuspenseError extends Error {
  constructor(public fallbackHtml: string) {
    super('Suspense fallback rendered');
    this.name = 'SuspenseError';
  }
}

/**
 * Creates a component wrapper that handles async data loading with fallbacks
 */
export function createAsyncComponent<T>(
  loader: () => Promise<T>,
  renderer: (data: T) => string,
  options: SuspenseOptions = {}
): () => Promise<string> {
  return async () => {
    try {
      const data = await withSuspense(loader, options);
      return renderer(data);
    } catch (error) {
      if (error instanceof SuspenseError) {
        return error.fallbackHtml;
      }
      
      const { errorFallback = (err: Error) => `<div class="text-red-600">Failed to load component: ${err.message}</div>` } = options;
      return errorFallback(error as Error);
    }
  };
}

/**
 * Lazy loading wrapper for heavy components
 */
export function createLazyComponent<T>(
  componentLoader: () => Promise<T>,
  options: SuspenseOptions = {}
): () => Promise<string> {
  let cachedComponent: T | null = null;
  
  return async () => {
    if (cachedComponent) {
      return typeof cachedComponent === 'string' 
        ? cachedComponent 
        : JSON.stringify(cachedComponent);
    }

    try {
      cachedComponent = await withSuspense(componentLoader, {
        fallback: options.fallback || `
          <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">Loading component...</span>
          </div>
        `,
        ...options
      });
      
      return typeof cachedComponent === 'string' 
        ? cachedComponent 
        : JSON.stringify(cachedComponent);
    } catch (error) {
      if (error instanceof SuspenseError) {
        return error.fallbackHtml;
      }
      throw error;
    }
  };
}

/**
 * Creates a streaming response with progressive enhancement
 */
export async function createStreamingResponse(
  chunks: Array<() => Promise<string>>,
  options: {
    wrapper?: (content: string) => string;
    separator?: string;
  } = {}
): Promise<string> {
  const { 
    wrapper = (content: string) => content,
    separator = '\n'
  } = options;

  const results = await Promise.allSettled(
    chunks.map(chunk => chunk())
  );

  const content = results
    .map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error('Stream chunk error:', result.reason);
        return '<div class="text-red-500">Failed to load content</div>';
      }
    })
    .join(separator);

  return wrapper(content);
}

/**
 * Error boundary for component trees
 */
export function withErrorBoundary<T>(
  operation: () => Promise<T>,
  errorHandler?: (error: Error) => T
): Promise<T> {
  return operation().catch(error => {
    console.error('Error boundary caught:', error);
    
    if (errorHandler) {
      return errorHandler(error);
    }
    
    throw error;
  });
}

/**
 * Parallel component loading with fallbacks
 */
export async function loadComponentsInParallel(
  components: Record<string, () => Promise<string>>,
  options: {
    timeout?: number;
    fallbackComponent?: (name: string, error: Error) => string;
  } = {}
): Promise<Record<string, string>> {
  const { 
    timeout = 5000,
    fallbackComponent = (name: string, error: Error) => 
      `<div class="text-orange-600">Component "${name}" failed to load: ${error.message}</div>`
  } = options;

  const componentPromises = Object.entries(components).map(async ([name, loader]) => {
    try {
      const result = await withSuspense(loader, { timeout });
      return [name, result] as const;
    } catch (error) {
      console.error(`Component ${name} failed to load:`, error);
      return [name, fallbackComponent(name, error as Error)] as const;
    }
  });

  const results = await Promise.all(componentPromises);
  return Object.fromEntries(results);
}

/**
 * Progressive enhancement utility
 * Loads enhanced version of component after initial render
 */
export function createProgressiveComponent(
  baseRenderer: () => string,
  enhancedLoader: () => Promise<string>,
  containerId: string
): string {
  const baseContent = baseRenderer();
  
  // Add script to enhance component after page load
  const enhancementScript = `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('${containerId}');
        if (container) {
          // Load enhanced version
          fetch('/api/component-enhanced/${containerId}')
            .then(response => response.text())
            .then(html => {
              container.innerHTML = html;
            })
            .catch(error => {
              console.warn('Failed to load enhanced component:', error);
            });
        }
      });
    </script>
  `;
  
  return `
    <div id="${containerId}">
      ${baseContent}
    </div>
    ${enhancementScript}
  `;
}