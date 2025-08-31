// Lazy loading utilities for dynamic route imports
export type LazyRouteModule = {
  default: any;
};

export type LazyRouteLoader = () => Promise<LazyRouteModule>;

/**
 * Creates a lazy-loaded route handler that dynamically imports modules only when needed
 * This helps reduce initial bundle size and improves loading performance
 */
export function createLazyRoute(loader: LazyRouteLoader): any {
  let module: LazyRouteModule | null = null;
  
  return async (...args: any[]) => {
    // Load module on first access
    if (!module) {
      try {
        module = await loader();
      } catch (error) {
        console.error('Failed to load lazy route module:', error);
        throw new Error('Route module failed to load');
      }
    }
    
    // Call the default export with provided arguments
    if (typeof module.default === 'function') {
      return module.default(...args);
    } else if (module.default && typeof module.default.fetch === 'function') {
      // Handle Hono app instances
      return module.default.fetch(...args);
    }
    
    throw new Error('Lazy route module does not export a valid handler');
  };
}

/**
 * Creates a suspense-like wrapper for async operations
 * Provides loading state handling for server-side rendering
 */
export function withSuspense<T>(
  asyncOperation: () => Promise<T>,
  fallback: T,
  errorFallback?: (error: Error) => T
): () => Promise<T> {
  return async () => {
    try {
      return await asyncOperation();
    } catch (error) {
      console.error('Async operation failed:', error);
      
      if (errorFallback && error instanceof Error) {
        return errorFallback(error);
      }
      
      return fallback;
    }
  };
}

/**
 * Dynamic import wrapper with retry logic
 */
export async function dynamicImport<T = any>(
  modulePath: string,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await import(modulePath);
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries - 1) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  throw lastError!;
}

/**
 * Code splitting utility for large modules
 * Splits modules based on route patterns or feature flags
 */
export class CodeSplitter {
  private loadedModules = new Map<string, any>();
  private loadingPromises = new Map<string, Promise<any>>();
  
  async loadModule(key: string, loader: () => Promise<any>): Promise<any> {
    // Return cached module if already loaded
    if (this.loadedModules.has(key)) {
      return this.loadedModules.get(key);
    }
    
    // Return existing promise if currently loading
    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key);
    }
    
    // Start loading the module
    const loadPromise = loader().then(module => {
      this.loadedModules.set(key, module);
      this.loadingPromises.delete(key);
      return module;
    }).catch(error => {
      this.loadingPromises.delete(key);
      throw error;
    });
    
    this.loadingPromises.set(key, loadPromise);
    return loadPromise;
  }
  
  isLoaded(key: string): boolean {
    return this.loadedModules.has(key);
  }
  
  isLoading(key: string): boolean {
    return this.loadingPromises.has(key);
  }
  
  clearCache(): void {
    this.loadedModules.clear();
    this.loadingPromises.clear();
  }
}

// Global code splitter instance
export const codeSplitter = new CodeSplitter();