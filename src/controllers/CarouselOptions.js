import { __ } from '@wordpress/i18n';
import { RangeControl, ToggleControl } from '@wordpress/components';
import DeviceResponsiveControl from '../components/DeviceResponsiveControl';
import useDeviceSettings from '../hooks/useDeviceSettings';

const CarouselOptions = ({ attributes, setAttributes }) => {
    const { carouselOptions = {} } = attributes;
    
    const updateCarouselOption = (key, value) => {
        setAttributes({
            carouselOptions: {
                ...carouselOptions,
                [key]: value
            }
        });
    };

    // Use the device settings hook
    const {
        selectedDevice,
        setSelectedDevice,
        deviceOptions,
        getDeviceValue,
        updateDeviceOption
    } = useDeviceSettings(attributes, setAttributes, 'carouselOptions');

    return (
        <div className="flexilayouts-options-section">
            <DeviceResponsiveControl
                label={__('Slides Per View', 'flexilayouts')}
                selectedDevice={selectedDevice}
                onDeviceChange={setSelectedDevice}
                deviceOptions={deviceOptions}
            >
                <RangeControl
                    className="carousel-slides-control"
                    help={__('Number of slides to display at once', 'flexilayouts')}
                    value={getDeviceValue('slidesPerView', 3)}
                    onChange={(value) => updateDeviceOption('slidesPerView', value)}
                    min={1}
                    max={20}
                    step={1}
                />
            </DeviceResponsiveControl>
            <DeviceResponsiveControl
                label={__('Space Between Slides (px)', 'flexilayouts')}
                selectedDevice={selectedDevice}
                onDeviceChange={setSelectedDevice}
                deviceOptions={deviceOptions}
            >
                <RangeControl
                    className="carousel-gap-control"
                    help={__('Space between slides in pixels', 'flexilayouts')}
                    value={getDeviceValue('spaceBetween', 20)}
                    onChange={(value) => updateDeviceOption('spaceBetween', value)}
                    min={0}
                    max={100}
                    step={5}
                />
            </DeviceResponsiveControl>
            <ToggleControl
                label={__('Autoplay', 'flexilayouts')}
                help={__('Enable automatic sliding', 'flexilayouts')}
                checked={carouselOptions.autoplay || false}
                onChange={(value) => updateCarouselOption('autoplay', value)}
            />
            {carouselOptions.autoplay && (
                <RangeControl
                    label={__('Autoplay Delay (ms)', 'flexilayouts')}
                    help={__('Delay between transitions in milliseconds', 'flexilayouts')}
                    value={carouselOptions.autoplayDelay || 3000}
                    onChange={(value) => updateCarouselOption('autoplayDelay', value)}
                    min={1000}
                    max={10000}
                    step={500}
                />
            )}
            <ToggleControl
                label={__('Show Navigation Arrows', 'flexilayouts')}
                help={__('Display previous/next navigation arrows', 'flexilayouts')}
                checked={carouselOptions.navigation !== false}
                onChange={(value) => updateCarouselOption('navigation', value)}
            />
            <ToggleControl
                label={__('Show Pagination', 'flexilayouts')}
                help={__('Display pagination dots', 'flexilayouts')}
                checked={carouselOptions.pagination !== false}
                onChange={(value) => updateCarouselOption('pagination', value)}
            />
            <ToggleControl
                label={__('Loop', 'flexilayouts')}
                help={__('Enable continuous loop mode', 'flexilayouts')}
                checked={carouselOptions.loop !== false}
                onChange={(value) => updateCarouselOption('loop', value)}
            />
        </div>
    );
};

// export default CarouselOptions;
