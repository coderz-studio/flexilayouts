import { __ } from '@wordpress/i18n';
import { RangeControl, ToggleControl, ButtonGroup } from '@wordpress/components';
import DeviceResponsiveControl from '../components/DeviceResponsiveControl';
import useDeviceSettings from '../hooks/useDeviceSettings';

const MasonryOptions = ({ attributes, setAttributes }) => {
    const { masonryOptions = {} } = attributes;
    
    const updateMasonryOption = (key, value) => {
        setAttributes({
            masonryOptions: {
                ...masonryOptions,
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
    } = useDeviceSettings(attributes, setAttributes, 'masonryOptions');

    return (
        <div className="flexilayouts-masonry-options">
            <div className="flexilayouts-options-section">
                <DeviceResponsiveControl
                    label={__('Number of Columns', 'flexilayouts')}
                    selectedDevice={selectedDevice}
                    onDeviceChange={setSelectedDevice}
                    deviceOptions={deviceOptions}
                >
                    <RangeControl
                        className="masonry-columns-control"
                        help={__('Set the number of columns in the masonry grid', 'flexilayouts')}
                        value={getDeviceValue('columns', 3)}
                        onChange={(value) => updateDeviceOption('columns', value)}
                        min={1}
                        max={20}
                        step={1}
                    />
                </DeviceResponsiveControl>
                <DeviceResponsiveControl
                    label={__('Column Gap (px)', 'flexilayouts')}
                    selectedDevice={selectedDevice}
                    onDeviceChange={setSelectedDevice}
                    deviceOptions={deviceOptions}
                >
                    <RangeControl
                        className="masonry-columns-control"
                        help={__('Set the gap between columns in the masonry grid', 'flexilayouts')}
                        value={getDeviceValue('columnGap', 20)}
                        onChange={(value) => updateDeviceOption('columnGap', value)}
                        min={0}
                        max={100}
                        step={1}
                    />
                </DeviceResponsiveControl>
                <ToggleControl
                    label={__('Fit to Container Width', 'flexilayouts')}
                    help={__('Fit the masonry container to available width', 'flexilayouts')}
                    checked={masonryOptions.fitWidth || false}
                    onChange={(value) => updateMasonryOption('fitWidth', value)}
                />
            </div>
            
            <div className="flexilayouts-options-section">
                <h3>{__('Item Order', 'flexilayouts')}</h3>
                <ToggleControl
                    label={__('Horizontal Order', 'flexilayouts')}
                    help={__('Maintain horizontal left-to-right order when possible', 'flexilayouts')}
                    checked={masonryOptions.horizontalOrder || false}
                    onChange={(value) => updateMasonryOption('horizontalOrder', value)}
                />
                <ToggleControl
                    label={__('Left to Right', 'flexilayouts')}
                    help={__('Items placed from left to right', 'flexilayouts')}
                    checked={masonryOptions.isOriginLeft !== false}
                    onChange={(value) => updateMasonryOption('isOriginLeft', value)}
                />
                <ToggleControl
                    label={__('Top to Bottom', 'flexilayouts')}
                    help={__('Items placed from top to bottom', 'flexilayouts')}
                    checked={masonryOptions.isOriginTop !== false}
                    onChange={(value) => updateMasonryOption('isOriginTop', value)}
                />
            </div>
        </div>
    );
};

export default MasonryOptions;
