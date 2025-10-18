/**
 * Admin JavaScript for FlexiLayouts
 */
( function( $ ) {
    'use strict';

    // Document ready
    $( document ).ready( function() {
        // Initialize any admin functionality here
        console.log( 'FlexiLayouts admin initialized' );

        // Example: Toggle settings
        $( '.flexilayouts-toggle' ).on( 'change', function() {
            const setting = $( this ).data( 'setting' );
            const value = $( this ).is( ':checked' ) ? '1' : '0';
            
            // Send AJAX request to save setting
            $.post( 
                flexilayoutAdmin.ajax_url,
                {
                    action: 'flexilayouts_save_setting',
                    nonce: flexilayoutAdmin.nonce,
                    setting: setting,
                    value: value
                },
                function( response ) {
                    if ( response.success ) {
                        // Show success message
                        $( '.notice' ).remove();
                        $( '.wrap h1' ).after( 
                            '<div class="notice notice-success is-dismissible"><p>' + 
                            flexilayoutAdmin.settings_saved + 
                            '</p></div>' 
                        );
                    }
                }
            );
        } );
    } );

} )( jQuery );
