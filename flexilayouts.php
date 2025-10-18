<?php
/**
 * Plugin Name: FlexiLayouts
 * Plugin URI: https://flexilayouts.com
 * Description: Transform core gallery block into a responsive and beautiful masonry grid with just a few clicks.
 * Version: 1.0.0
 * Author: Coderz Studio
 * Author URI: https://coderzstudio.com
 * License: GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: flexilayouts
 * Domain Path: /languages
 *
 * @package FlexiLayouts
 * @author Coderz Studio
 * @copyright 2025 Coderz Studio
 * @license GPL-2.0+
 *
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define plugin constants.
define( 'FLEXILAYOUTS_VERSION', '1.0.0' );
define( 'FLEXILAYOUTS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'FLEXILAYOUTS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'FLEXILAYOUTS_LANGUAGE_PATH', plugin_basename( __DIR__ ) . '/languages/' );

// Load required files.
$include_files = glob( FLEXILAYOUTS_PLUGIN_DIR . 'includes/class-*.php' );

if ( ! empty( $include_files ) ) {
	foreach ( $include_files as $file ) {
		if ( file_exists( $file ) ) {
			require_once $file;
		}
	}
}
