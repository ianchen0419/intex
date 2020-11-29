<?php /* Template Name: お問い合わせ【完了】ページ */ ?>
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
		// error_reporting(0);
		include_once(ABSPATH . WPINC . '/PHPMailer/PHPMailer.php');
		include_once(ABSPATH . WPINC . '/PHPMailer/Exception.php');
		include_once(ABSPATH . WPINC . '/PHPMailer/SMTP.php');

		if(isset($_SESSION['fin'])==true){

			//PHP INJECTION対策
			function _post($str){
				$val=htmlspecialchars($_POST[$str]);
				return $val;
			}

			//共通メール本体
			$mail_body=
				"【貴社名】"._post('your_company')."\n".
				"【部署名】"._post('your_division')."\n".
				"【お名前】"._post('your_name')."\n".
				"【メールアドレス】"._post('your_email')."\n".
				"【メールアドレス（確認用）】"._post('your_email2')."\n".
				"【電話番号】"._post('your_phone')."\n".
				"【お問い合わせ内容】"."\n".
					_post('your_message');


			//ユーザー向けメールヘッダー
			$mail_header_for_user=
				_post('your_company')."\n".
				_post('your_name')."様"."\n".

				"\n\n".

				"この度はインテックス株式会社へお問い合わせをいただきまして、誠にありがとうございます。"."\n".
				"弊社担当者よりご連絡をさせていただきます。"."\n".
				"お問い合わせの内容によっては、"."\n".
				"回答にお時間を要する場合がございますが、今しばらくお待ちください。"."\n".
				"宜しくお願いいたします。"."\n".

				"\n\n";

			//ユーザー向けメールタイトル
			$mail_subject_for_user="お問い合わせありがとうございます | インテックス株式会社";

			//管理員向けメールヘッダー
			$mail_header_for_admin=
				"担当者各位"."\n".

				"\n\n".

				"下記の内容でホームページよりお問い合わせがありました。"."\n".
				"ご確認の上、ご対応の程お願いいたします。"."\n".

				"\n\n";

			//管理員向けのメールタイトル
			$mail_subject_for_admin="お問い合わせがありました";

			//ユーザーの受信メールアドレス
			$mail_address_for_user=_post('your_email');

			//管理員の受信メールアドレス
			$mail_address_for_admin='info@intexs.com';

			//ユーザーの送信者名称
			$mail_sent_name_for_user=_post('your_name');

			//管理員の送信者名称
			$mail_sent_name_for_admin='インテックス株式会社';

			/**************************************************/
			//ユーザーへメール
			$mailer = new PHPMailer\PHPMailer\PHPMailer();
			$mailer->SMTPSecure = "ssl";
			$mailer->Host = "smtp.gmail.com";
			// $mailer->Host = "smtp.intexs.com";
			$mailer->Port = 465;
			$mailer->CharSet = "utf-8";    
			$mailer->Username = "inquiry.workcapital@gmail.com";     
			// $mailer->Username = "info@intexs.com";     
			$mailer->Password = "contactwc180623@";
			// $mailer->Password = "whwhVVeh";
			$mailer->IsSMTP();
			$mailer->SMTPAuth = true;
			// $mailer->SMTPDebug  = 2;
			$mailer->Encoding = "base64";
			$mailer->IsHTML(false); 
			$mailer->AddReplyTo($mail_address_for_admin);
			$mailer->setFrom('inquiry.workcapital@gmail.com', 'インテックス株式会社'); 
			// $mailer->setFrom($mail_address_for_admin, $mail_sent_name_for_admin); 
			$mailer->Subject = $mail_subject_for_user; 
			$mailer->Body = $mail_header_for_user.$mail_body;
			$mailer->AddAddress($mail_address_for_user);
			$mailer->Send();

			/* -------------------------------------------- */

			//管理員へメール
			$mailer->ClearReplyTos();
			$mailer->AddReplyTo($mail_address_for_user);
			$mailer->setFrom($mail_address_for_user, $mail_sent_name_for_user); 
			$mailer->Subject = $mail_subject_for_admin; 
			$mailer->Body = $mail_header_for_admin.$mail_body;

			$mailer->ClearAllRecipients( );
			$mailer->AddAddress('ianchen0419@gmail.com');
			// $mailer->AddAddress($mail_address_for_admin);
			if($mailer->Send()){
				//この度はお問い合わせをいただき、誠にありがとうございます。
				while(have_posts()): the_post();
					the_content();
				endwhile;
		 	}else {
				echo '<p>失敗しました</p>';
			}

			unset($_SESSION['fin']);
		}

	?>
</main>


<?php get_footer();?>