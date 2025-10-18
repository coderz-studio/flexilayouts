<?php
/**
 * Admin Dashboard for FlexiLayouts
 * 
 * @package FlexiLayouts
 * @since 1.0.0
 */

namespace FlexiLayouts\includes;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'FlexiLayouts_Admin_Dashboard' ) ) {

	/**
	 * Admin Dashboard for FlexiLayouts
	 */
	class FlexiLayouts_Admin_Dashboard {

		/**
		 * The single instance of the class.
		 *
		 * @var FlexiLayouts_Admin_Dashboard
		 */
		protected static $instance = null;

		/**
		 * Main instance
		 *
		 * @return FlexiLayouts_Admin_Dashboard
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
			add_action( 'admin_menu', array( $this, 'flexilayouts_add_admin_menu' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'flexilayouts_enqueue_admin_styles' ) );
		}

		/**
		 * Enqueue admin styles and scripts
		 */
		public function flexilayouts_enqueue_admin_styles() {
			wp_enqueue_style(
				'flexilayouts-admin',
				FLEXILAYOUTS_PLUGIN_URL . 'assets/css/admin.css',
				array(),
				FLEXILAYOUTS_VERSION
			);
		}

		/**
		 * Get user avatar
		 */
		public function flexilayouts_get_user_avatar() {
			$current_user = wp_get_current_user();
			$avatar = get_avatar( $current_user->ID, 40, '', '', array( 'class' => 'user-avatar' ) );

			if ( ! $avatar ) {
				$avatar = '<div class="user-avatar-placeholder">' . strtoupper( substr( $current_user->display_name, 0, 1 ) ) . '</div>';
			}

			return $avatar;
		}

		/**
		 * Add admin menu.
		 */
		/**
		 * Get the encoded SVG icon for the admin menu.
		 *
		 * @return string
		 */
		public function flexilayouts_get_menu_icon() {
			$svg_icon = 'data:image/svg+xml;base64,' . base64_encode(
				'<?xml version="1.0" encoding="UTF-8"?>
            <svg width="20" height="20" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 21.0507V18.8235C0.175829 15.9516 1.2015 15.0189 3.16492 14.1055C4.24429 13.6033 4.86159 13.3939 6.00748 13.2849L6.24192 13.1091C6.29434 13.057 6.31213 13.0171 6.32983 12.9333L6.38844 8.59617C6.48619 8.23237 6.61017 8.10604 6.97454 8.03938H11.6926C12.1115 8.03728 12.2545 8.17599 12.3959 8.59617V13.2849C12.269 13.6966 12.0921 13.8538 11.6047 14.0176L6.7401 13.9882C6.49168 14.0188 6.3872 14.0824 6.24192 14.252C6.24192 14.252 6.24192 17.1531 6.06609 18.8235C5.89026 20.4939 5.42139 21.1972 3.6631 21.4024H0.263743C0.090026 21.3559 0.0354072 21.2748 0 21.0507Z" fill="#a7aaad"/>
                <path d="M8 6.87187C9.39097 6.08361 9.78876 5.41696 10.1099 4H12.4836C12.6302 4.0293 12.6229 4.11648 12.6302 4.23444C12.6374 4.3524 12.6302 6.69604 12.6302 6.69604C12.6302 6.81326 12.6268 7.21573 12.4216 7.21574H8V6.87187Z" fill="#a7aaad"/>
                <path d="M13.861 4C13.6558 3.99999 13.6224 4.02842 13.6275 4.23444V6.81377C13.6319 6.96685 13.7144 7.18643 13.861 7.21574H14.8334C15.5661 7.12782 15.8244 6.63742 15.8537 5.96341C15.883 5.2894 15.8537 5.04915 15.8537 5.04915L15.8244 4.02347L13.861 4Z" fill="#a7aaad"/>
                <rect x="1.84628" y="17.6122" width="2.87187" height="0.937753" rx="0.468877" fill="#a7aaad"/>
                <rect x="1.67047" y="19.136" width="2.28577" height="0.937753" rx="0.468877" fill="#a7aaad"/>
                <rect x="2.02216" y="16.0297" width="3.34075" height="0.937753" rx="0.468877" fill="#a7aaad"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-6.10352e-05 3.21572C0.233159 1.48848 1.22199 0.367191 2.9711 0.132988C4.82355 -1.52588e-05 9.24519 -1.52588e-05 9.24519 -1.52588e-05C9.24519 -1.52588e-05 9.30614 2.57364 8.91806 3.82168C8.52997 5.06971 8.16012 5.75385 6.90659 5.90023C6.67337 5.91974 6.5179 5.93926 6.36242 5.95878C6.28468 5.96854 6.20695 5.97829 6.11949 5.98805C5.50731 6.07588 5.26551 6.37319 5.22552 6.83343V7.2354V12.059C2.81371 12.461 1.60781 12.8629 -4.00829e-05 14.8728C-4.00829e-05 14.8728 -6.10352e-05 4.82359 -6.10352e-05 3.21572Z" fill="#a7aaad"/>
                <path d="M10.5193 0.396362L10.2569 2.70911L15.9999 2.72525V1.67028V0.61531C15.9999 0.234731 15.7957 0.0450585 15.4459 0.0157832H10.9857C10.6713 0.0375905 10.5715 0.123188 10.5193 0.396362Z" fill="#a7aaad"/>
            </svg>'
			);

			return $svg_icon;
		}

		/**
		 * Add admin menu.
		 */
		public function flexilayouts_add_admin_menu() {
			add_menu_page(
				__( 'FlexiLayouts', 'flexilayouts' ),
				'FlexiLayouts',
				'manage_options',
				'flexilayouts-dashboard',
				array( $this, 'flexilayouts_render_dashboard' ),
				$this->flexilayouts_get_menu_icon(),
				30
			);
		}

		/**
		 * Render dashboard page.
		 */
		public function flexilayouts_render_dashboard() {
			$current_user = wp_get_current_user();
			?>
		<div class="wrap flexilayouts-dashboard">
			<!-- Plugin Header -->
			<header class="plugin-header">
				<div class="plugin-logo">
				<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 21.0507V18.8235C0.175829 15.9516 1.2015 15.0189 3.16492 14.1055C4.24429 13.6033 4.86159 13.3939 6.00748 13.2849L6.24192 13.1091C6.29434 13.057 6.31213 13.0171 6.32983 12.9333L6.38844 8.59617C6.48619 8.23237 6.61017 8.10604 6.97454 8.03938H11.6926C12.1115 8.03728 12.2545 8.17599 12.3959 8.59617V13.2849C12.269 13.6966 12.0921 13.8538 11.6047 14.0176L6.7401 13.9882C6.49168 14.0188 6.3872 14.0824 6.24192 14.252C6.24192 14.252 6.24192 17.1531 6.06609 18.8235C5.89026 20.4939 5.42139 21.1972 3.6631 21.4024H0.263743C0.090026 21.3559 0.0354072 21.2748 0 21.0507Z" fill="white"/>
					<path d="M8 6.87187C9.39097 6.08361 9.78876 5.41696 10.1099 4H12.4836C12.6302 4.0293 12.6229 4.11648 12.6302 4.23444C12.6374 4.3524 12.6302 6.69604 12.6302 6.69604C12.6302 6.81326 12.6268 7.21573 12.4216 7.21574H8V6.87187Z" fill="white"/>
					<path d="M13.861 4C13.6558 3.99999 13.6224 4.02842 13.6275 4.23444V6.81377C13.6319 6.96685 13.7144 7.18643 13.861 7.21574H14.8334C15.5661 7.12782 15.8244 6.63742 15.8537 5.96341C15.883 5.2894 15.8537 5.04915 15.8537 5.04915L15.8244 4.02347L13.861 4Z" fill="white"/>
					<rect x="1.84628" y="17.6122" width="2.87187" height="0.937753" rx="0.468877" fill="#5971FF"/>
					<rect x="1.67047" y="19.136" width="2.28577" height="0.937753" rx="0.468877" fill="#5971FF"/>
					<rect x="2.02216" y="16.0297" width="3.34075" height="0.937753" rx="0.468877" fill="#5971FF"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M-6.10352e-05 3.21572C0.233159 1.48848 1.22199 0.367191 2.9711 0.132988C4.82355 -1.52588e-05 9.24519 -1.52588e-05 9.24519 -1.52588e-05C9.24519 -1.52588e-05 9.30614 2.57364 8.91806 3.82168C8.52997 5.06971 8.16012 5.75385 6.90659 5.90023C6.67337 5.91974 6.5179 5.93926 6.36242 5.95878C6.28468 5.96854 6.20695 5.97829 6.11949 5.98805C5.50731 6.07588 5.26551 6.37319 5.22552 6.83343V7.2354V12.059C2.81371 12.461 1.60781 12.8629 -4.00829e-05 14.8728C-4.00829e-05 14.8728 -6.10352e-05 4.82359 -6.10352e-05 3.21572Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M-6.10352e-05 3.21572C0.233159 1.48848 1.22199 0.367191 2.9711 0.132988C4.82355 -1.52588e-05 9.24519 -1.52588e-05 9.24519 -1.52588e-05C9.24519 -1.52588e-05 9.30614 2.57364 8.91806 3.82168C8.52997 5.06971 8.16012 5.75385 6.90659 5.90023C6.67337 5.91974 6.5179 5.93926 6.36242 5.95878C6.28468 5.96854 6.20695 5.97829 6.11949 5.98805C5.50731 6.07588 5.26551 6.37319 5.22552 6.83343V7.2354V12.059C2.81371 12.461 1.60781 12.8629 -4.00829e-05 14.8728C-4.00829e-05 14.8728 -6.10352e-05 4.82359 -6.10352e-05 3.21572Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5193 0.396362L10.2569 2.70911L15.9999 2.72525V1.67028V0.61531C15.9999 0.234731 15.7957 0.0450585 15.4459 0.0157832H10.9857C10.6713 0.0375905 10.5715 0.123188 10.5193 0.396362Z" fill="white"/>
				</svg>
					<?php esc_html_e( 'FlexiLayouts', 'flexilayouts' ); ?>
				</div>
				<div class="header-actions">
					<button class="version-btn">
						<?php echo esc_html( 'Version ' . FLEXILAYOUTS_VERSION ); ?>
					</button>
				</div>
			</header>

			<!-- Welcome Section -->
			<div class="welcome-section">
				<div class="welcome-content">
					<div class="user-info">
						<?php echo $this->flexilayouts_get_user_avatar(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span class="user-name"><?php echo esc_html( 'Welcome, ' . $current_user->display_name ); ?></span>
					</div>
					<div class="welcome-header">
						<div class="welcome-text">
							<p><?php esc_html_e( 'Enhance Your WordPress Layouts', 'flexilayouts' ); ?></p>
							<p><?php esc_html_e( 'Transform your Gutenberg blocks with advanced layout options and beautiful animations. Create stunning galleries, carousels, and more with just a few clicks.', 'flexilayouts' ); ?></p>
						</div>
					</div>
				</div>
			</div>

			<!-- Main Content -->
			<div class="main-content">
				<!-- How it works -->
				<section class="how-it-works">
					<div class="section-header">
						<div class="section-title"><?php esc_html_e( 'How does it work?', 'flexilayouts' ); ?></div>
					</div>

					<div class="steps-container">
						<div class="step-line"></div>

						<div class="step">
							<div class="step-number">1</div>
							<div class="step-title"><?php esc_html_e( 'Add a Block', 'flexilayouts' ); ?></div>
							<div class="step-desc"><?php esc_html_e( 'Add a Gallery block to your page.', 'flexilayouts' ); ?></div>
						</div>

						<div class="step">
							<div class="step-number">2</div>
							<div class="step-title"><?php esc_html_e( 'Choose Layout', 'flexilayouts' ); ?></div>
							<div class="step-desc"><?php esc_html_e( 'Select between Masonry, or Default ( grid ) layouts.', 'flexilayouts' ); ?></div>
						</div>

						<div class="step">
							<div class="step-number">3</div>
							<div class="step-title"><?php esc_html_e( 'Customize', 'flexilayouts' ); ?></div>
							<div class="step-desc"><?php esc_html_e( 'Adjust settings like columns, spacing, and animations.', 'flexilayouts' ); ?></div>
						</div>
					</div>
				</section>
			</div>
		</div>
			<?php
		}

		/**
		 * Render settings page.
		 */
		public function flexilayouts_render_settings_page() {
			?>
		<div class="wrap">
			<h1><?php esc_html_e( 'FlexiLayouts Settings', 'flexilayouts' ); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( 'flexilayouts_settings' );
				do_settings_sections( 'flexilayouts_settings' );
				submit_button();
				?>
			</form>
		</div>
			<?php
		}
	}

	// Initialize the dashboard.
	FlexiLayouts_Admin_Dashboard::instance();

}