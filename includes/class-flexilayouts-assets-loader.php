<?php

/**
 * Assets Loader for FlexiLayouts
 *
 * @package FlexiLayouts
 * @since 1.0.0
 */

namespace FlexiLayouts\includes;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'FlexiLayouts_Assets_Loader' ) ) {
	/**
	 * Handles all asset loading for the FlexiLayouts plugin
	 */
	class FlexiLayouts_Assets_Loader {
		/**
		 * The single instance of the class.
		 *
		 * @var FlexiLayouts_Assets_Loader
		 */
		protected static $instance = null;

		/**
		 * Main instance
		 *
		 * @return FlexiLayouts_Assets_Loader
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor.
		 */
		public function __construct() {
			add_action( 'enqueue_block_editor_assets', array( $this, 'flexilayouts_enqueue_editor_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'flexilayouts_enqueue_frontend_assets' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'flexilayouts_enqueue_admin_assets' ) );
		}

		/**
		 * Enqueue editor assets
		 */
		public function flexilayouts_enqueue_editor_assets() {
			$asset_file = include FLEXILAYOUTS_PLUGIN_DIR . 'build/index.asset.php';

			// Enqueue the editor script.
			wp_enqueue_script(
				'flexilayouts-editor-script',
				FLEXILAYOUTS_PLUGIN_URL . 'build/index.js',
				$asset_file['dependencies'],
				$asset_file['version'],
				true
			);

			// Enqueue the editor styles.
			wp_enqueue_style(
				'flexilayouts-editor-style',
				FLEXILAYOUTS_PLUGIN_URL . 'build/style-index.css',
				array(),
				filemtime( FLEXILAYOUTS_PLUGIN_DIR . 'build/style-index.css' )
			);
		}

		/**
		 * Enqueue frontend assets
		 */
		public function flexilayouts_enqueue_frontend_assets() {
			// Enqueue styles.
			wp_enqueue_style(
				'flexilayouts-style',
				FLEXILAYOUTS_PLUGIN_URL . 'build/style-index.css',
				array(),
				filemtime( FLEXILAYOUTS_PLUGIN_DIR . 'build/style-index.css' )
			);

			// Enqueue Isotope.js.
			wp_enqueue_script(
				'isotope',
				FLEXILAYOUTS_PLUGIN_URL . 'assets/js/isotope/flexilayouts-isotope.js',
				array( 'jquery' ),
				FLEXILAYOUTS_VERSION,
				true
			);

			// Enqueue the built frontend bundle.
			$frontend_asset = include FLEXILAYOUTS_PLUGIN_DIR . 'build/frontend.asset.php';
			wp_enqueue_script(
				'flexilayouts-frontend',
				FLEXILAYOUTS_PLUGIN_URL . 'build/frontend.js',
				$frontend_asset['dependencies'],
				$frontend_asset['version'],
				true
			);
		}

		/**
		 * Enqueue admin assets.
		 *
		 * @param string $hook The current admin page hook.
		 */
		public function flexilayouts_enqueue_admin_assets( $hook ) {
			if ( strpos( $hook, 'flexilayouts' ) === false ) {
				return;
			}

			wp_enqueue_style(
				'flexilayouts-admin',
				FLEXILAYOUTS_PLUGIN_URL . 'assets/css/admin.css',
				array(),
				FLEXILAYOUTS_VERSION,
			);

			wp_enqueue_script(
				'flexilayouts-admin',
				FLEXILAYOUTS_PLUGIN_URL . 'assets/js/admin.js',
				array( 'jquery' ),
				FLEXILAYOUTS_VERSION,
				true
			);

			wp_localize_script(
				'flexilayouts-admin',
				'flexilayoutAdmin',
				array(
					'ajax_url' => admin_url( 'admin-ajax.php' ),
					'nonce'    => wp_create_nonce( 'flexilayouts-admin-nonce' ),
				)
			);
		}
	}

	// Initialize the assets loader.
	FlexiLayouts_Assets_Loader::instance();

}