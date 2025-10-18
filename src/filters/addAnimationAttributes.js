import { addFilter } from '@wordpress/hooks';
// Attribute filters for image and gallery animation

export function addImageAnimationAttribute(settings, name) {
	if (name !== 'core/image') {
		return settings;
	}
	settings.attributes = {
		...settings.attributes,
		imageAnimationType: {
			type: 'string',
			default: 'default',
		},
	};
	return settings;
}

export function addGalleryAnimationAttribute(settings, name) {
	if (name !== 'core/gallery') {
		return settings;
	}
	settings.attributes = {
		...settings.attributes,
		galleryAnimationType: {
			type: 'string',
			default: 'default',
		},
		masonryOptions: {
			type: 'object',
			default: {
				columns: 3,
				columnWidth: 200,
				columnGap: 20,
				fitWidth: false,
				horizontalOrder: false,
				isOriginLeft: true,
				isOriginTop: true
			}
		},
		carouselOptions: {
			type: 'object',
			default: {
				slidesPerView: 3,
				spaceBetween: 20,
				autoplay: false,
				autoplayDelay: 3000,
				navigation: true,
				pagination: true,
				loop: true
			}
		}
	};
	return settings;
}

// Register attribute filters
addFilter(
	'blocks.registerBlockType',
	'flexilayouts/add-image-animation-attribute',
	addImageAnimationAttribute
);
addFilter(
	'blocks.registerBlockType',
	'flexilayouts/add-gallery-animation-attribute',
	addGalleryAnimationAttribute
);
