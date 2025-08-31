// Client-side lazy loading and code splitting utilities
// This demonstrates modern code splitting techniques for the frontend

class LazyComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Lazily load and initialize components only when they're needed
     * This reduces initial bundle size and improves page load performance
     */
    async loadComponent(componentName, loader) {
        if (this.loadedComponents.has(componentName)) {
            return this.loadedComponents.get(componentName);
        }

        if (this.loadingPromises.has(componentName)) {
            return this.loadingPromises.get(componentName);
        }

        const loadingPromise = this.loadComponentAsync(componentName, loader);
        this.loadingPromises.set(componentName, loadingPromise);

        try {
            const component = await loadingPromise;
            this.loadedComponents.set(componentName, component);
            this.loadingPromises.delete(componentName);
            return component;
        } catch (error) {
            this.loadingPromises.delete(componentName);
            throw error;
        }
    }

    async loadComponentAsync(componentName, loader) {
        try {
            // Show loading state
            this.showLoadingState(componentName);
            
            // Load the component with retry logic
            const component = await this.retryLoad(loader, 3);
            
            // Hide loading state
            this.hideLoadingState(componentName);
            
            return component;
        } catch (error) {
            this.showErrorState(componentName, error);
            throw error;
        }
    }

    async retryLoad(loader, maxRetries) {
        let lastError;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await loader();
            } catch (error) {
                lastError = error;
                if (i < maxRetries - 1) {
                    // Wait before retrying (exponential backoff)
                    await this.delay(Math.pow(2, i) * 1000);
                }
            }
        }
        
        throw lastError;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showLoadingState(componentName) {
        const container = document.querySelector(`[data-component="${componentName}"]`);
        if (container) {
            container.innerHTML = `
                <div class="flex items-center justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-2 text-gray-600">Loading ${componentName}...</span>
                </div>
            `;
        }
    }

    hideLoadingState(componentName) {
        // Loading state will be replaced by actual component content
    }

    showErrorState(componentName, error) {
        const container = document.querySelector(`[data-component="${componentName}"]`);
        if (container) {
            container.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div class="text-red-600 mb-2">⚠️ Failed to load ${componentName}</div>
                    <button onclick="window.lazyLoader.retryComponent('${componentName}')" 
                            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    retryComponent(componentName) {
        // Clear cached component and retry loading
        this.loadedComponents.delete(componentName);
        this.loadingPromises.delete(componentName);
        
        // Trigger reload based on component type
        switch (componentName) {
            case 'brokerComparison':
                initializeBrokerComparison();
                break;
            case 'costCalculator':
                initializeCostCalculator();
                break;
            case 'questionnaire':
                initializeQuestionnaire();
                break;
            default:
                console.warn(`Unknown component for retry: ${componentName}`);
        }
    }
}

// Global lazy loader instance
window.lazyLoader = new LazyComponentLoader();

// Intersection Observer for lazy loading components when they come into view
class LazyViewObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                rootMargin: '50px',
                threshold: 0.1
            }
        );
    }

    observe(element, loader) {
        element.dataset.lazyLoader = loader.name || 'anonymous';
        element.dataset.lazyFunction = loader.toString();
        this.observer.observe(element);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const loaderName = element.dataset.lazyLoader;
                const loaderFunction = element.dataset.lazyFunction;
                
                try {
                    // Execute the loader function
                    const loader = new Function('return ' + loaderFunction)();
                    loader();
                } catch (error) {
                    console.error('Failed to execute lazy loader:', error);
                }
                
                // Stop observing this element
                this.observer.unobserve(element);
            }
        });
    }
}

window.lazyViewObserver = new LazyViewObserver();

// Lazy loading implementations for specific components
async function initializeBrokerComparison() {
    return window.lazyLoader.loadComponent('brokerComparison', async () => {
        // Simulate loading comparison functionality
        const container = document.querySelector('[data-component="brokerComparison"]');
        if (container) {
            container.innerHTML = `
                <div class="bg-white rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Broker Comparison Tool</h3>
                    <p class="text-gray-600">Compare brokers side-by-side with detailed metrics.</p>
                    <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onclick="loadComparison()">
                        Start Comparison
                    </button>
                </div>
            `;
        }
        return 'brokerComparison';
    });
}

async function initializeCostCalculator() {
    return window.lazyLoader.loadComponent('costCalculator', async () => {
        const container = document.querySelector('[data-component="costCalculator"]');
        if (container) {
            container.innerHTML = `
                <div class="bg-white rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Trading Cost Calculator</h3>
                    <p class="text-gray-600">Calculate your trading costs across different brokers.</p>
                    <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onclick="openCalculator()">
                        Open Calculator
                    </button>
                </div>
            `;
        }
        return 'costCalculator';
    });
}

async function initializeQuestionnaire() {
    return window.lazyLoader.loadComponent('questionnaire', async () => {
        const container = document.querySelector('[data-component="questionnaire"]');
        if (container) {
            container.innerHTML = `
                <div class="bg-white rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Smart Broker Questionnaire</h3>
                    <p class="text-gray-600">Answer a few questions to get personalized broker recommendations.</p>
                    <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                            onclick="startQuestionnaire()">
                        Start Questionnaire
                    </button>
                </div>
            `;
        }
        return 'questionnaire';
    });
}

// Performance monitoring for lazy loaded components
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }

    startTiming(componentName) {
        this.metrics.set(componentName, {
            startTime: performance.now(),
            endTime: null,
            duration: null
        });
    }

    endTiming(componentName) {
        const metric = this.metrics.get(componentName);
        if (metric) {
            metric.endTime = performance.now();
            metric.duration = metric.endTime - metric.startTime;
            
            // Log slow loading components
            if (metric.duration > 2000) {
                console.warn(`Slow component load: ${componentName} took ${metric.duration.toFixed(2)}ms`);
            }
        }
    }

    getMetrics() {
        return Object.fromEntries(this.metrics);
    }
}

window.performanceMonitor = new PerformanceMonitor();

// Auto-initialize lazy loading on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Set up lazy loading for components that are visible
    const lazyComponents = document.querySelectorAll('[data-lazy-component]');
    
    lazyComponents.forEach(element => {
        const componentType = element.dataset.lazyComponent;
        
        // Set up intersection observer for this component
        window.lazyViewObserver.observe(element, function() {
            switch (componentType) {
                case 'comparison':
                    initializeBrokerComparison();
                    break;
                case 'calculator':
                    initializeCostCalculator();
                    break;
                case 'questionnaire':
                    initializeQuestionnaire();
                    break;
            }
        });
    });
    
    // Preload critical components if they're above the fold
    const criticalComponents = document.querySelectorAll('[data-critical-component]');
    criticalComponents.forEach(element => {
        const componentType = element.dataset.criticalComponent;
        
        // Load immediately for above-the-fold content
        setTimeout(() => {
            switch (componentType) {
                case 'comparison':
                    initializeBrokerComparison();
                    break;
                case 'calculator':
                    initializeCostCalculator();
                    break;
            }
        }, 100);
    });
});

// Export for use in other scripts
window.LazyComponentLoader = LazyComponentLoader;
window.LazyViewObserver = LazyViewObserver;