import { useState } from '@wordpress/element';
import { desktop, tablet, mobile } from '@wordpress/icons';

/**
 * Custom hook for managing device-specific settings
 * @param {Object} attributes - The block attributes
 * @param {Function} setAttributes - Function to update block attributes
 * @param {string} optionsNamespace - Namespace for the options (e.g., 'masonryOptions')
 * @returns {Object} Device settings and helper functions
 */
const useDeviceSettings = (attributes, setAttributes, optionsNamespace = 'masonryOptions') => {
    const options = attributes[optionsNamespace] || {};
    
    const [selectedDevice, setSelectedDevice] = useState('desktop');
    
    const deviceOptions = [
        { id: 'desktop', label: window.flexilayouts?.i18n?.desktop || 'Desktop', icon: desktop },
        { id: 'tablet', label: window.flexilayouts?.i18n?.tablet || 'Tablet', icon: tablet },
        { id: 'mobile', label: window.flexilayouts?.i18n?.mobile || 'Mobile', icon: mobile }
    ];

    /**
     * Get a value for the current device with fallback to desktop
     * @param {string} key - The setting key
     * @param {*} defaultValue - Default value if not set
     * @returns {*} The setting value
     */
    const getDeviceValue = (key, defaultValue) => {
        const deviceKey = `${key}_${selectedDevice}`;
        const desktopKey = `${key}_desktop`;
        
        if (options[deviceKey] !== undefined) {
            return options[deviceKey];
        }
        if (options[desktopKey] !== undefined) {
            return options[desktopKey];
        }
        return defaultValue;
    };

    /**
     * Update a device-specific option
     * @param {string} key - The setting key
     * @param {*} value - The new value
     * @param {Object} constraints - Optional constraints for the value
     */
    const updateDeviceOption = (key, value, constraints = {}) => {
        const newOptions = {
            ...options,
            [`${key}_${selectedDevice}`]: value
        };

        // Apply constraints if provided
        if (constraints.maxMobile && selectedDevice === 'mobile' && key === 'columns') {
            const maxMobile = constraints.maxMobile;
            if (value > maxMobile) {
                return; // Don't allow mobile columns to exceed the max
            }
        }
        
        if (constraints.maxTablet && selectedDevice === 'tablet' && key === 'columns') {
            const maxTablet = constraints.maxTablet;
            if (value > maxTablet) {
                return; // Don't allow tablet columns to exceed the max
            }
        }

        setAttributes({
            [optionsNamespace]: newOptions
        });
    };

    return {
        selectedDevice,
        setSelectedDevice,
        deviceOptions,
        getDeviceValue,
        updateDeviceOption,
        deviceSettings: options
    };
};

export default useDeviceSettings;
