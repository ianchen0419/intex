<?php get_header();?>

<div id="visual">
	<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo the_title(); ?>" width="100%" />
	<h1 hidden>インテックス株式会社</h1>
	<div class="wrapper-size">
		<div class="gray-title">
			<?php echo get_post_meta($post->ID, 'subtitle', true); ?>
		</div>
	</div>
</div>
<main id="contact">
	<?php
		while(have_posts()): the_post();
			the_content();
		endwhile;
	?>
</main>


<?php get_footer();?>