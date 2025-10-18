function initMasonryLayoutsEditor() {
    const masonryElements = document.querySelectorAll('.wp-block-gallery.has-masonry-animation');
    
    // Function to parse JSON from data attribute with fallback
    const parseDataAttr = (element, attr, defaultValue) => {
        try {
            const value = element.getAttribute(`data-${attr}`);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.warn(`Failed to parse ${attr}:`, e);
            return defaultValue;
        }
    };

    // Function to initialize a single masonry element in the editor
    const initMasonryElement = (element) => {
        try {
            if (element.classList.contains('isotope-initialized')) return;
            
            const items = element.querySelectorAll('.wp-block-image');
            if (!items.length) return;
            
            // Get masonry options from data attributes or use defaults
            const masonryOptions = parseDataAttr(element, 'masonry-options', {
                columnWidth: 200,
                gutter: 10,
                fitWidth: false,
                horizontalOrder: false,
                isOriginLeft: true,
                isOriginTop: true
            });

            // Apply gutter as padding to items
            const gutter = parseInt(masonryOptions.gutter, 10) || 10;
            element.style.marginLeft = `-${gutter / 2}px`;
            element.style.marginRight = `-${gutter / 2}px`;
            
            items.forEach(item => {
                item.style.padding = `${gutter / 2}px`;
                item.style.boxSizing = 'border-box';
                item.style.transition = 'opacity 0.4s ease-in-out';
                item.style.opacity = '0';
            });

            // Calculate column width based on number of columns and gaps
            const columns = parseInt(masonryOptions.columns, 10) || 3;
            const columnGap = parseInt(masonryOptions.columnGap, 10) || 20;
            
            // Create a column sizer element for Isotope
            const columnSizer = document.createElement('div');
            columnSizer.classList.add('masonry-column-sizer');
            columnSizer.style.width = `calc((100% - (${columns - 1} * ${columnGap}px)) / ${columns})`;
            element.appendChild(columnSizer);
            
            // Initialize Isotope with options
            const iso = new Isotope(element, {
                itemSelector: '.wp-block-image',
                layoutMode: 'masonry',
                percentPosition: true,
                masonry: {
                    columnWidth: '.masonry-column-sizer',
                    gutter: columnGap,
                    horizontalOrder: Boolean(masonryOptions.horizontalOrder)
                },
                originLeft: masonryOptions.isOriginLeft !== false,
                originTop: masonryOptions.isOriginTop !== false,
                fitWidth: Boolean(masonryOptions.fitWidth),
                onLayout: () => {
                    // Fade in items after layout
                    items.forEach(item => {
                        item.style.opacity = '1';
                    });
                }
            });

            // Handle window resize with debounce
            let resizeTimer;
            const handleResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    iso.layout();
                }, 200);
            };

            // Add resize event listener
            window.addEventListener('resize', handleResize);
            
            // Handle editor-specific events
            const handleBlockUpdate = () => {
                // Small delay to ensure DOM is updated
                setTimeout(() => iso.layout(), 50);
            };
            
            // Listen for block updates in the editor
            if (element.closest('.block-editor-block-list__block')) {
                element.closest('.block-editor-block-list__block')
                    .addEventListener('DOMNodeInserted', handleBlockUpdate);
            }
            
            // Store cleanup function on the element
            element._masonryCleanup = () => {
                window.removeEventListener('resize', handleResize);
                if (element.closest('.block-editor-block-list__block')) {
                    element.closest('.block-editor-block-list__block')
                        .removeEventListener('DOMNodeInserted', handleBlockUpdate);
                }
                if (iso && typeof iso.destroy === 'function') {
                    iso.destroy();
                }
                // Remove the column sizer element
                const sizer = element.querySelector('.masonry-column-sizer');
                if (sizer) {
                    element.removeChild(sizer);
                }
                element.classList.remove('isotope-initialized');
                delete element._masonryCleanup;
            };

            element.classList.add('isotope-initialized');
            
        } catch (error) {
            console.error('Error initializing masonry layout in editor:', error);
        }
    };

    // Initialize all masonry elements
    masonryElements.forEach(initMasonryElement);
    
    // Handle dynamic content loading in the editor
    if (typeof window.MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const newMasonryElements = node.matches('.wp-block-gallery.has-masonry-animation') ? 
                            [node] : 
                            node.querySelectorAll('.wp-block-gallery.has-masonry-animation');
                        
                        newMasonryElements.forEach(initMasonryElement);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

wp.domReady(() => {
    setTimeout(() => {
        const blocks = wp.data.select('core/block-editor')?.getBlocks() || [];
        // Only proceed if at least one core/gallery block has galleryAnimationType === 'carousel'
        const hasCarouselGallery = blocks.some(block =>
            block.name === 'core/gallery' &&
            block.attributes?.galleryAnimationType === 'carousel'
        );
        if (!hasCarouselGallery) return;

        // Now initialize Swiper for each relevant block
        document.querySelectorAll('.wp-block-gallery').forEach(element => {
            try {
                if (element.classList.contains('swiper-initialized')) return;
                const slidesPerView = parseInt(element.dataset.carouselSlidesPerView, 10) || 3;
                const autoplay = element.dataset.carouselAutoplay === 'true';
                const items = element.querySelectorAll('.wp-block-image');
                if (!items.length) return;
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
                if (!element.querySelector('.swiper-pagination')) {
                    element.insertAdjacentHTML('beforeend', `
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    `);
                }
                element.classList.add('swiper-initialized');
                // eslint-disable-next-line no-undef
                new Swiper(element, {
                    slidesPerView: slidesPerView,
                    spaceBetween: 20,
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                    loop: items.length > slidesPerView,
                    pagination: {
                        el: element.querySelector('.swiper-pagination'),
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 5,
                    },
                    navigation: {
                        nextEl: element.querySelector('.swiper-button-next'),
                        prevEl: element.querySelector('.swiper-button-prev'),
                    },
                    autoplay: autoplay ? {
                        delay: 3000,
                        disableOnInteraction: false
                    } : false,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        640: {
                            slidesPerView: Math.min(2, slidesPerView),
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: slidesPerView,
                            spaceBetween: 20
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing carousel layout in editor:', error);
            }
        });
    }, 500);
});