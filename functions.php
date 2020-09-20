<?php

/********************
カスタマイズメニュー有効化
********************/
function register_my_menu() {
	$locations = array(
		'primary'  => 'ヘッダーメニュー',
		);
	register_nav_menus($locations);
}
add_action('init', 'register_my_menu');

/********************
ウィジェット（フッター）有効化
********************/
function register_my_widget() {

	register_sidebar(
		array_merge(
			array(
				'name' => 'フッター',
				'id' => 'footer-bar',
				'description' => 'デフォルトフッター',
				'before_widget' => '<div class="wp-block-column">',
				'after_widget' => '</div>',
				'before_title' => '<h3 hidden>',
				'after_title' => '</h3>'
				)
			)
		);
}
add_action('widgets_init', 'register_my_widget');


/********************
全幅ブロック有効化
********************/
add_theme_support('align-wide');

/********************
埋め込みコンテンツ（YouTubeなど）のRWD有効化
********************/
add_theme_support('responsive-embeds');


/********************
カスタマイズロゴ有効化
********************/
add_theme_support('custom-logo');

/********************
カラーパレット定義
********************/
add_theme_support('editor-color-palette', array(
	array(
		'name'  => '白色',
		'slug'  => 'white',
		'color'	=> '#FFFFFF',
		),
	array(
		'name'  => '黒色',
		'slug'  => 'black',
		'color' => '#000000',
		),
	array(
		'name'  => '青色',
		'slug'  => 'blue',
		'color' => '#0844A4',
		),
	array(
		'name'  => '水色',
		'slug'  => 'sky',
		'color' => '#C6DDF0',
		),
	array(
		'name'	=> '灰色',
		'slug'	=> 'gray',
		'color'	=> '#EEEEEE',
		),
	));

/********************
自作UIブロック　＆　現存してるUIブロックのスタイル追加
********************/
function add_my_assets_to_block_editor() {
	wp_enqueue_style('block-type', get_stylesheet_directory_uri().'/block.css');
	wp_enqueue_script('block-type', get_stylesheet_directory_uri().'/block.js', array(), "", true);
}
add_action('enqueue_block_editor_assets', 'add_my_assets_to_block_editor');


/********************
Dashicons追加
********************/
function load_dashicons() {
	wp_enqueue_style('dashicons');
}
add_action('wp_print_styles', 'load_dashicons');

/********************
アイキャッチ画像
********************/
add_theme_support('post-thumbnails');


/********************
独自メタデータ登録
********************/
function myguten_register_post_meta() {
	register_post_meta('page', 'subtitle', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
		)
	);
}
add_action('init', 'myguten_register_post_meta');


add_filter( 'block_prepared_attributes', 'block_attributes_filter', 1, 10 );
function block_attributes_filter( $attributes, $block_type ) {
    if ( $block_type->name === 'my-plugin/my-block' &&  isset( $attributes['data'] ) ) {
            $original_post_id = apply_filters( 'wpml_object_id', get_the_ID(), get_post_type(), true, apply_filters( 'wpml_default_language', null) );
            foreach ( $attributes['data'] as $name => $value ) {
                $string_name = WPML_Gutenberg_Strings_In_Block::get_string_id($attributes['name'], $value);
                $translated = apply_filters( 'wpml_translate_string',
                    $value,
                    $string_name,
                    array('kind' => 'Gutenberg', 'name' => $original_post_id) );
                $attributes['data'][$name] = $translated;
            }
        }

        return $attributes;
}

function make_bread_nav_list($post){
	// 親ページ	
	$parent_id=$post->post_parent; // 親ページのIDを取得
	$parent_slug=get_post($parent_id)->post_name; // 親ページのスラッグを取得
	$parent_url=get_permalink($parent_id); // 親ページの URL を取得
	$parent_title=get_post($parent_id)->post_title; // 親ページのタイトルを取得

	// 現在ページ
	$now_slug=get_post($post)->post_name;
	$now_url=get_the_permalink($post);
	$now_title=get_the_title($post);

	//ホームページ
	$home_url=get_home_url();

	$parent_nav_list='';
	if($parent_id){
		$parent_nav_list=
		'<li>'.
			'<a href="'.$parent_url.'">'.$parent_title.'</a>'.
		'</li>';
	}

	echo 
	'<ul class="contact-path">'.
		//ホーム
		'<li>'.
			'<a href="'.$home_url.'">Home</a>'.
		'</li>'.
		//第二層（もしあれば）
		$parent_nav_list.
		//第三層
		'<li>'.
			'<a href="'.$now_url.'">'.$now_title.'</a>'.
		'</li>'.
	'</ul>';
}

// ホームページ＆ニュース一覧　カテゴリーつきの投稿一覧ショートコード
add_shortcode('myposts', 'myposts_function');
function myposts_init(){
	function myposts_function($atts){

		$args=shortcode_atts(array(
			'posts_per_page' => '-1',
		), $atts);


		$posts=get_posts($args);
		$output='';

		for($i=0;$i<count($posts);$i++){
			$mypost_date=explode(' ', $posts[$i]->post_date)[0];
			$mypost_title=$posts[$i]->post_title;
			$mypost_ID=$posts[$i]->ID;
			$mypost_url=get_the_permalink($mypost_ID);
			$mypost_category=get_the_category($mypost_ID)[0]->name;

			$output.='<div class="news-item">'.
					'<div class="news-component">'.
						'<div class="date">'.$mypost_date.'</div>'.
						'<div class="category">'.$mypost_category.'</div>'.
					'</div>'.
					'<a href="'.$mypost_url.'">'.
						$mypost_title.
					'</a>'.
				'</div>';
		}

		return $output;

	}
}
add_action('init', 'myposts_init');


?>