<?php 
session_start(); 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html <?php language_attributes(); ?>>
<head>
	<?php wp_head(); ?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta name="description" content="<?php bloginfo('description') ?>" />
	<meta name="keywords" content="高演色ランプ,Ra98,半導体照明,イエローランプ,紫外線ランプ,UV,UVC,紫外線硬化ランプ,誘虫器,D50" />
	<link rel="stylesheet prefetch" href="<?php bloginfo('template_directory') ?>/style.css" />
	<link rel="stylesheet prefetch" href="<?php bloginfo('template_directory') ?>/mobile.css" media="screen and (max-width: 768px)" />
</head>
<body onclick="hideMenu(this, event)">
	<?php wp_body_open(); ?>
	<header id="header">
		<div class="wrapper-size">
			<table width="100%">
				<tr>
					<td width="10">
						<?php the_custom_logo(); ?>
					</td>
					<td class="hidden-mobile">
						<strong><?php bloginfo('name'); ?></strong>
					</td>
					<td align="right">
						<nav>
						<?php wp_nav_menu(array('theme_location' => 'new-menu')); ?>
						</nav>
						<div class="dashicons dashicons-menu-alt3 menu-trigger" tabindex="0" onclick="document.body.classList.add('show-nav');"></div>
					</td>
				</tr>
			</table>
		</div>
	</header>
	<body class="showing">