/**
 * Device detection and responsive value utilities
 * Provides consistent device detection and responsive value resolution across the application
 */

// Device breakpoints (in pixels)
const BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1024
};

/**
 * Detects the current device type based on viewport width
 * @returns {string} Device type ('mobile', 'tablet', or 'desktop')
 */
export const detectDevice = () => {
    if (typeof window === 'undefined') return 'desktop'; // Default for SSR
    
    const width = window.innerWidth;
    if (width <= BREAKPOINTS.mobile) return 'mobile';
    if (width <= BREAKPOINTS.tablet) return 'tablet';
    return 'desktop';
};

/**
 * Gets a responsive value based on current device
 * @param {Object} options - The options object containing device-specific values
 * @param {string} key - The base key name (e.g., 'columns', 'gap')
 * @param {*} defaultValue - Default value if no matching value is found
 * @param {string} [deviceType] - Optional device type, will be detected if not provided
 * @returns {*} The resolved value for the current device
 */
export const getResponsiveValue = (options, key, defaultValue, deviceType) => {
    if (!options) return defaultValue;
    
    const currentDevice = deviceType || detectDevice();
    
    // Try device-specific value first
    const deviceKey = `${key}_${currentDevice}`;
    if (options[deviceKey] !== undefined) {
        return options[deviceKey];
    }
    
    // Fallback to desktop value
    if (currentDevice !== 'desktop' && options[`${key}_desktop`] !== undefined) {
        return options[`${key}_desktop`];
    }
    
    // Fallback to non-prefixed key
    if (options[key] !== undefined) {
        return options[key];
    }
    
    return defaultValue;
};

/**
 * Sets up a responsive listener that calls the callback when the device type changes
 * @param {Function} callback - Function to call when device type changes
 * @returns {Function} Cleanup function to remove the event listener
 */
export const onDeviceChange = (callback) => {
    if (typeof window === 'undefined') return () => {}; // No-op for SSR
    
    let lastDevice = detectDevice();
    
    const handleResize = () => {
        const currentDevice = detectDevice();
        if (currentDevice !== lastDevice) {
            lastDevice = currentDevice;
            callback(currentDevice, lastDevice);
        }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
};

export default {
    detectDevice,
    getResponsiveValue,
    onDeviceChange,
    BREAKPOINTS
};
