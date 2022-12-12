<?php
/*
Plugin Name: My Kinjal Slider Block
*/
/**
 * Enqueue scripts and styles.
 */
define( 'GF_PLUGIN_DIR_PATH', plugin_dir_url( __DIR__ ) );

function kinjal_slider_scripts(){
	//Styles
	wp_enqueue_style('kinjal-slider-slick-css', '/wp-content/plugins/myguten-block/src/slick/slick.css', array(), time());
	wp_enqueue_style('kinjal-slider-slick-theme-css', '/wp-content/plugins/myguten-block/src/slick/slick-theme.css', array(), time());
	//Scripts
	wp_enqueue_script('kinjal-slider-slick-js', '/wp-content/plugins/myguten-block/src/slick/slick.js', array('jquery'), time(), true);
	wp_enqueue_script('kinjal-slider-slick-js', '/wp-content/plugins/myguten-block/src/slick/slick.min.js', array('jquery'), time(), true);
	wp_enqueue_script('kinjal-slider-custom-js', '/wp-content/plugins/myguten-block/src/custom.js', array('jquery'), time(),true);
}
add_action('wp_enqueue_scripts', 'kinjal_slider_scripts');

function my_slider_block_register_block() {

	// Register JavasScript File build/index.js
	wp_register_script(
		'kinjal-slider-block',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	// Register editor style src/editor.css
	wp_register_style(
		'kinjal-slider-block-editor-style',
		plugins_url( 'src/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
	);

	// Register front end block style src/style.css
	wp_register_style(
		'kinjal-slider-block-frontend-style',
		plugins_url( 'src/style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
	);

	// Register your block
	register_block_type( 'myguten-block/myguten-block', array(
		'editor_script' => 'kinjal-slider-block',
		'editor_style' => 'kinjal-slider-block-editor-style',
		'style' => 'kinjal-slider-block-frontend-style',
	) );

}

add_action( 'init', 'my_slider_block_register_block' );

register_post_meta( 'page', 'dc_references_block_field', array(
	'show_in_rest' => true,
	'single' => true,
	'type' => 'array',
) );

// register two new meta corresponding to attributes in JS
register_post_meta( 'page', 'dc_references_block_field_name', array(
	'show_in_rest' => true,
	'single' => true,
	'type' => 'array',
) );

register_post_meta( 'page', 'dc_references_block_field_desc', array(
	'show_in_rest' => true,
	'single' => true,
	'type' => 'array',
) );