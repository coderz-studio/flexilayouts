import { addFilter } from '@wordpress/hooks';
// Frontend class filters for image and gallery animation

export function addAnimationFrontendClass(extraProps, blockType, attributes) {
	if (blockType.name === 'core/image' && attributes.imageAnimationType && attributes.imageAnimationType !== 'none') {
		extraProps.className = `${extraProps.className || ''} has-image-animation-${attributes.imageAnimationType}`;
	}
	return extraProps;
}

export function addGalleryAnimationFrontendClass(extraProps, blockType, attributes) {
    if( blockType.name != 'core/gallery' || !attributes.galleryAnimationType || attributes.galleryAnimationType === 'default' ) {
        return extraProps;
    }
    
    if ( attributes.galleryAnimationType ) {
        const { galleryAnimationType, columns = 3 } = attributes;
        
        // Add base animation class
        if (galleryAnimationType !== 'default') {
            extraProps.className = `${extraProps.className || ''} has-gallery-animation-${galleryAnimationType}`;
        }
        
        // Handle masonry layout
        if ( galleryAnimationType === 'masonry' ) {
            const defaultMasonryOptions = {
                columnWidth: 200,
                fitWidth: false,
                horizontalOrder: false,
                isOriginLeft: true,
                isOriginTop: true,
                columns: 3,
                columnGap: 20
            };
            
            const masonryOptions = {
                ...defaultMasonryOptions,
                ...(attributes.masonryOptions || {})
            };
            
            extraProps['data-masonry-options'] = JSON.stringify(masonryOptions);
        }
        // Handle carousel layout
        else if ( galleryAnimationType === 'carousel' ) {
            const defaultCarouselOptions = {
                slidesPerView: Math.min(3, columns),
                spaceBetween: 20,
                autoplay: false,
                autoplayDelay: 3000,
                navigation: true,
                pagination: true,
                loop: true
            };
            
            const carouselOptions = {
                ...defaultCarouselOptions,
                ...(attributes.carouselOptions || {})
            };
            
            extraProps['data-carousel-options'] = JSON.stringify(carouselOptions);
            extraProps.className = `${extraProps.className || ''} swiper`;
        }
    }
    return extraProps;
}

// Register frontend class filters
addFilter(
	'blocks.getSaveContent.extraProps',
	'flexilayouts/add-animation-frontend-class',
	addAnimationFrontendClass
);
addFilter(
	'blocks.getSaveContent.extraProps',
	'flexilayouts/add-gallery-animation-frontend-class',
	addGalleryAnimationFrontendClass
);
