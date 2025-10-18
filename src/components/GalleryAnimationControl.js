import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    ToolbarGroup, 
    DropdownMenu, 
    SelectControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import MasonryOptions from '../controllers/MasonryOptions';
// import CarouselOptions from '../controllers/CarouselOptions';

// Animation options
const animationOptions = [
	{ icon: 'admin-customizer', title: __('Default', 'flexilayouts'), value: 'default' },
	{ icon: 'screenoptions', title: __('Masonry', 'flexilayouts'), value: 'masonry' },
    // { icon: 'slides', title: __('Carousel', 'flexilayouts'), value: 'carousel' },
];

const withGalleryAnimationControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes, isSelected } = props;
        
        if (name !== 'core/gallery') {
            return <BlockEdit {...props} />;
        }

        const { galleryAnimationType = 'default' } = attributes;

		const handleSelect = (value) => {
			setAttributes({ galleryAnimationType: value });
		};

		const selectedGalleryOption = animationOptions.find(opt => opt.value === galleryAnimationType) || animationOptions[0];

		// Get the original block edit element
		const blockEditElement = <BlockEdit {...props} />;

		// Common controls
		const animationControls = (
			<>
				<BlockControls>
					<ToolbarGroup>
						<DropdownMenu
							icon={selectedGalleryOption?.icon || 'menu'}
							label={selectedGalleryOption?.title || __('Animation', 'flexilayouts')}
							controls={animationOptions.map(opt => ({
								icon: opt.icon,
								title: opt.title,
								isActive: galleryAnimationType === opt.value,
								onClick: () => handleSelect(opt.value),
							}))}
						/>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__('Flexilayouts : Layout Settings', 'flexilayouts')}>
						<SelectControl
							label={__('Layout Type', 'flexilayouts')}
							value={galleryAnimationType}
							options={animationOptions.map(opt => ({
								label: opt.title,
								value: opt.value,
							}))}
							onChange={(value) => handleSelect(value)}
						/>
						{galleryAnimationType === 'masonry' && (
                            <MasonryOptions 
                                attributes={attributes} 
                                setAttributes={setAttributes} 
                            />
                        )}
                        {/* {galleryAnimationType === 'carousel' && (
                            <CarouselOptions
                                attributes={attributes}
                                setAttributes={setAttributes}
                            />
                        )} */}
					</PanelBody>
				</InspectorControls>
			</>
		);

		return (
			<>
				{blockEditElement}
				{isSelected && animationControls}
			</>
		);
	};
}, 'withGalleryAnimationControl');

export default withGalleryAnimationControl;
