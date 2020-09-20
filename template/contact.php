<?php /* Template Name: お問い合わせページ */ ?>
<?php get_header();?>

<div id="visual">
	<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo the_title(); ?>" width="100%" />
	<div class="wrapper-size">
		<div class="white-title">
			<h1><?php the_title(); ?></h1>
			<strong><?php echo get_post_meta($post->ID, 'subtitle', true); ?></strong>
		</div>
	</div>
</div>
<main id="contact">
	<?php
		make_bread_nav_list($post);
		
		while(have_posts()): the_post();
			the_content();
		endwhile;
	?>
	<form method="POST" action="<?php bloginfo('url') ?>/contact/confirm">
		<div class="form-item">
			<input type="text" name="your_company" id="your_company" required />
			<label for="your_company">貴社名</label>
		</div>
		<div class="form-item">
			<input type="text" name="your_division" id="your_division" />
			<label for="your_division">部署名</label>
		</div>
		<div class="form-item">
			<input type="text" name="your_name" id="your_name" required />
			<label for="your_name">お名前</label>
		</div>
		<div class="form-item">
			<input type="email" name="your_email" id="your_email" required />
			<label for="your_email">メールアドレス</label>
		</div>
		<div class="form-item">
			<input type="email" name="your_email2" id="your_email2" required />
			<label for="your_email2">メールアドレス（確認用）</label>
		</div>
		<div class="form-item">
			<input type="tel" name="your_phone" id="your_phone" required />
			<label for="your_phone">電話番号</label>
		</div>
		<div class="form-item">
			<textarea rows="5" name="your_message" id="your_message"></textarea>
			<label for="your_message">お問い合わせ内容</label>
		</div>

		<div class="wp-block-buttons aligncenter">
			<div class="wp-block-button is-style-wide">
				<button class="wp-block-button__link has-background">確認</button>
			</div>
		</div>
	</form>
</main>

<?php $_SESSION['conf']=true; ?>
<?php get_footer();?>