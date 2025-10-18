import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DeviceResponsiveControl = ({
    label,
    selectedDevice,
    onDeviceChange,
    deviceOptions,
    children,
    className = ''
}) => {
    return (
        <div className={`components-base-control ${className}`} style={{ marginTop: '16px' }}>
            <div className="components-base-control__field is_responsive">
                {label && (
                    <label className="components-base-control__label">
                        {label}
                    </label>
                )}
                <div className="components-button-group device-selector">
                    {deviceOptions.map((device) => (
                        <Button
                            key={device.id}
                            isPrimary={selectedDevice === device.id}
                            isSecondary={selectedDevice !== device.id}
                            onClick={() => onDeviceChange(device.id)}
                            label={device.label}
                            showTooltip={true}
                            icon={device.icon}
                            className="device-selector-button"
                        />
                    ))}
                </div>
                {children}
            </div>
        </div>
    );
};

export default DeviceResponsiveControl;
