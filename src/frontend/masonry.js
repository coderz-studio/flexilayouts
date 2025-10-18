import { getResponsiveValue, onDeviceChange } from '../utils/deviceUtils';

export default function initMasonryLayouts() {
    const masonryElements = document.querySelectorAll('.has-gallery-animation-masonry');
    
    // Store cleanup functions for each masonry instance
    const cleanupFunctions = [];
    
    const initMasonryForElement = (element) => {
        try {
            const masonryOptions = JSON.parse(element.dataset.masonryOptions);
            let masonryInstance = null;
            
            // Function to initialize or update masonry
            const updateMasonry = () => {
                // Get responsive values
                const masonryGap = getResponsiveValue(masonryOptions, 'columnGap', 20);
                const masonryColumns = getResponsiveValue(masonryOptions, 'columns', 4);
                const masonryFitWidth = masonryOptions.fitWidth || false;
                const masonryHorizontalOrder = masonryOptions.horizontalOrder || false;
                const masonryIsOriginLeft = masonryOptions.isOriginLeft || false;
                const masonryIsOriginTop = masonryOptions.isOriginTop || false;
                
                // Determine item selector based on container type
                let itemSelector = '.wp-block-image';
                if (element.classList.contains('wp-block-columns')) {
                    itemSelector = '.wp-block-column';
                } else if (element.classList.contains('wp-block-query')) {
                    itemSelector = '.wp-block-post';
                } else if (element.classList.contains('wp-block-group')) {
                    itemSelector = '> *';
                }
                
                // Calculate item width based on number of columns
                const columnWidth = `${100 / masonryColumns}%`;
                
                // Apply width and padding to items
                const items = element.querySelectorAll(itemSelector);
                items.forEach(item => {
                    item.style.width = columnWidth;
                    item.style.padding = `${masonryGap}px`;
                });
                
                // Add negative margin to container to compensate for padding
                element.style.margin = `-${masonryGap}px`;
                
                if (masonryInstance) {
                    // Update existing Isotope instance
                    masonryInstance.arrange({
                        itemSelector: itemSelector,
                        masonry: {
                            columnWidth: itemSelector,
                        },
                        fitWidth: masonryFitWidth,
                        horizontalOrder: masonryHorizontalOrder,
                        isOriginLeft: masonryIsOriginLeft,
                        isOriginTop: masonryIsOriginTop
                    });
                    masonryInstance.layout();
                } else {
                    // Initialize new Isotope instance
                    masonryInstance = new Isotope(element, {
                        itemSelector: itemSelector,
                        percentPosition: true,
                        masonry: {
                            columnWidth: itemSelector,
                        },
                        fitWidth: masonryFitWidth,
                        horizontalOrder: masonryHorizontalOrder,
                        isOriginLeft: masonryIsOriginLeft,
                        isOriginTop: masonryIsOriginTop,
                    });
                }
                
                return masonryInstance;
            };
            
            // Initial setup
            masonryInstance = updateMasonry();
            
            // Set up responsive updates
            const cleanup = onDeviceChange(updateMasonry);
            
            // Store cleanup function
            cleanupFunctions.push(cleanup);
            
            // Return cleanup for this instance
            return () => {
                cleanup();
                if (masonryInstance && masonryInstance.destroy) {
                    masonryInstance.destroy();
                }
            };
        } catch (error) {
            console.error('Error initializing masonry layout:', error);
            return () => {}; // Return no-op cleanup function
        }
    };
    
    // Initialize all masonry elements
    masonryElements.forEach(element => {
        const cleanup = initMasonryForElement(element);
        if (cleanup) {
            cleanupFunctions.push(cleanup);
        }
    });
    
    // Return cleanup function for all instances
    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
}