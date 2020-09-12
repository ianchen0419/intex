var el = wp.element.createElement;
var InnerBlocks = wp.blockEditor.InnerBlocks;

var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
var TextControl=wp.components.TextControl;
var select=wp.data.select;
var dispatch=wp.data.dispatch;
var withSelect=wp.data.withSelect;

var useSelect=wp.data.useSelect;
var useEntityProp=wp.coreData.useEntityProp;

// 画像ブロック　リンク付きスタイル
wp.blocks.registerBlockStyle(
	'core/image', 
	{
		name: 'link',
		label: 'リンク付き'
	}
);

// テーブルブロック　シングルスタイル
wp.blocks.registerBlockStyle(
	'core/table', 
	{
		name: 'single',
		label: 'シングル'
	}
);

// 見出し 下線付き
wp.blocks.registerBlockStyle(
	'core/heading', 
	{
		name: 'line',
		label: '下線付き'
	}
);

// 見出し 装飾アイコイン付き
wp.blocks.registerBlockStyle(
	'core/heading', 
	{
		name: 'decoration',
		label: '装飾付き'
	}
);

// ボタン　全幅
wp.blocks.registerBlockStyle(
	'core/button', 
	{
		name: 'full',
		label: '全幅'
	}
);

// ボタン　幅広
wp.blocks.registerBlockStyle(
	'core/button', 
	{
		name: 'wide',
		label: '幅広'
	}
);

// カバー　カード式
wp.blocks.registerBlockStyle(
	'core/cover', 
	{
		name: 'card',
		label: 'カード式'
	}
);

// 見出し　タグ付き
wp.blocks.registerBlockType('intex/tag-heading', {
	title: 'タグ付き見出し',
	icon: 'heading',
	category: 'text',
	example: {
		attributes:　{
			className: 'wp-block-intex-tag-heading'
		},
		innerBlocks: [
			{
				name: 'core/heading',
				attributes: {
					content: '見出し',
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					content: 'タグ',
				},
			},
		],
	},

	edit: function(props) {
		return el(
			'div',
			{ className: props.className },
			el( 
				InnerBlocks,
				{
					template: [
					['core/heading', { placeholder: '見出しを入力' }],
					['core/paragraph', { placeholder: 'タグを入力' }],
					],
					templateLock: "all",
				}
				)
			);
	},

	save: function(props){
		return el(
			'div',
			{ className: props.className },
			el( 
				InnerBlocks.Content,
				),
			);
	},
});

// 見出し タグ付き　タグが先
wp.blocks.registerBlockStyle(
	'intex/tag-heading', 
	{
		name: 'reverse',
		label: 'タグが先'
	}
);

//トップページ＆カバーページのサブタイトル
wp.plugins.registerPlugin(
	'intex', 
	{
		render: 
		withSelect
		(function(select) {
			return { heyhey: select('core/editor').getEditedPostAttribute('meta')['subtitle'] };
		})
		(function(props){
			return el(
				PluginDocumentSettingPanel,
				{
					className: '',
					title: 'サブタイトル',
				},
				'',
				el(
					TextControl,
					{
						value: select('core/editor').getEditedPostAttribute('meta')['subtitle'],
						onChange: function(res){
							dispatch('core/editor').editPost({
								meta: { 'subtitle': res },
							});
						}
					},
					)
				)
		}),

		icon: '',
	}
);
