import { addFilter } from '@wordpress/hooks';
import withGalleryAnimationControl from '../components/GalleryAnimationControl';

addFilter(
	'editor.BlockEdit',
	'flexilayouts/with-gallery-animation-control',
	withGalleryAnimationControl
);
