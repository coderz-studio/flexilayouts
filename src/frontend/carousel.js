import { getResponsiveValue, onDeviceChange } from '../utils/deviceUtils';

function initCarouselLayouts() {
    const carouselElements = document.querySelectorAll('.has-gallery-animation-carousel');
    
    // Store cleanup functions for each carousel instance
    const cleanupFunctions = [];

    const initCarouselForElement = (element) => {
        try {
            if (element.classList.contains('swiper-initialized')) return;
            
            // Get options from data attributes
            const carouselOptions = JSON.parse(element.dataset.carouselOptions || '{}');
            let swiperInstance = null;
            
            // Determine the correct selector based on block type
            let itemSelector = '.wp-block-image';
            if (element.classList.contains('wp-block-columns')) {
                itemSelector = '.wp-block-column';
            } else if (element.classList.contains('wp-block-query')) {
                itemSelector = '.wp-block-post';
            } else if (element.classList.contains('wp-block-group')) {
                itemSelector = '> *';
            }
            
            // Function to initialize or update carousel
            const updateCarousel = () => {
                // Get responsive values
                const slidesPerView = getResponsiveValue(carouselOptions, 'slidesPerView', 3);
                const spaceBetween = getResponsiveValue(carouselOptions, 'spaceBetween', 20);
                const {
                    autoplay = false,
                    autoplayDelay = 3000,
                    navigation = true,
                    pagination = true,
                    loop = true
                } = carouselOptions;

                const items = element.querySelectorAll(itemSelector);
                const shouldLoop = loop && items.length > slidesPerView;
                
                // Create or get wrapper
                let wrapper = element.querySelector('.swiper-wrapper');
                if (!wrapper) {
                    wrapper = document.createElement('div');
                    wrapper.className = 'swiper-wrapper';
                    items.forEach(item => {
                        item.classList.add('swiper-slide');
                        wrapper.appendChild(item);
                    });
                    while (element.firstChild) element.removeChild(element.firstChild);
                    element.appendChild(wrapper);
                }
            
                // Add pagination and navigation if enabled
                if (pagination && !element.querySelector('.swiper-pagination')) {
                    element.insertAdjacentHTML('beforeend', '<div class="swiper-pagination"></div>');
                }
                
                if (navigation) {
                    if (!element.querySelector('.swiper-button-prev')) {
                        element.insertAdjacentHTML('beforeend', '<div class="swiper-button-prev"></div>');
                    }
                    if (!element.querySelector('.swiper-button-next')) {
                        element.insertAdjacentHTML('beforeend', '<div class="swiper-button-next"></div>');
                    }
                }
                
                // Initialize or update Swiper instance
                const swiperOptions = {
                    slidesPerView: slidesPerView,
                    spaceBetween: spaceBetween,
                    watchOverflow: true,
                    observeParents: true,
                    loop: shouldLoop,
                    autoplay: autoplay ? {
                        delay: autoplayDelay,
                        disableOnInteraction: false,
                    } : false,
                    pagination: pagination ? {
                        el: element.querySelector('.swiper-pagination'),
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 5,
                    } : false,
                    navigation: navigation ? {
                        nextEl: element.querySelector('.swiper-button-next'),
                        prevEl: element.querySelector('.swiper-button-prev'),
                    } : false,
                    on: {
                        init: function() {
                            element.classList.add('swiper-initialized');
                        },
                    }
                };

                // Destroy existing instance if it exists
                if (swiperInstance) {
                    swiperInstance.destroy(true, true);
                }
                
                // Initialize new Swiper instance
                swiperInstance = new Swiper(element, swiperOptions);
                
                // Store reference to the instance on the element
                element.swiper = swiperInstance;
                
                return swiperInstance;
            };
            
            // Initial setup
            swiperInstance = updateCarousel();
            
            // Set up responsive updates
            const cleanup = onDeviceChange(updateCarousel);
            
            // Store cleanup function
            cleanupFunctions.push(cleanup);
            
            // Return cleanup for this instance
            return () => {
                cleanup();
                if (swiperInstance && swiperInstance.destroy) {
                    swiperInstance.destroy();
                }
            };
            
        } catch (error) {
            console.error('Error initializing carousel:', error);
            return () => {}; // Return no-op cleanup function
        }
    };
    
    // Initialize all carousel elements
    carouselElements.forEach(element => {
        const cleanup = initCarouselForElement(element);
        if (cleanup) {
            cleanupFunctions.push(cleanup);
        }
    });
    
    // Return cleanup function for all instances
    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
}

export default initCarouselLayouts;
