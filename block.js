var el = wp.element.createElement;
var InnerBlocks = wp.blockEditor.InnerBlocks;

var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
var TextControl=wp.components.TextControl;
var select=wp.data.select;
var dispatch=wp.data.dispatch;
var withSelect=wp.data.withSelect;

var useSelect=wp.data.useSelect;
var useEntityProp=wp.coreData.useEntityProp;

var InspectorControls = wp.blockEditor.InspectorControls;
var PanelBody = wp.components.PanelBody;
var PanelRow = wp.components.PanelRow;
var BaseControl=wp.components.BaseControl;
var RadioControl=wp.components.RadioControl;
var ToggleControl=wp.components.ToggleControl;
var ButtonGroup=wp.components.ButtonGroup;
var Button=wp.components.Button;

var assign=lodash.assign

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

// 上下マージン設定
var withInspectorControls = wp.compose.createHigherOrderComponent(function(BlockEdit) {
	return function(props) {
		// console.log(props)
		// marginTopSettings;

		// if(allowedMarginBlocks.indexOf(props.name) !== -1){
		var attributes = props.attributes;
		// console.log(props.attributes.margin);

		var marginTopSettings=el(
					PanelBody,
					{
						title: '上下マージン設定',
					},
					el(
						BaseControl,
						{
							label: '上下マージンを設定せよ',
						},
						el(
							ButtonGroup,
							{},
							el(
								Button,
								{
									value: '0',
									isPressed: (props.attributes.margin === '0'),
									isSmall: true,
									onClick: onClickMarginButton,
								},
								'なし',
							),
							el(
								Button,
								{
									value: '20',
									isPressed: (props.attributes.margin === '20'),
									isSmall: true,
									onClick: onClickMarginButton,
								},
								'小'
							),
							el(
								Button,
								{
									value: '40',
									isPressed: (props.attributes.margin === '40'),
									isSmall: true,
									onClick: onClickMarginButton,
								},
								'中'
							),
							el(
								Button,
								{
									value: '60',
									isPressed: (attributes.margin === '60'),
									isSmall: true,
									onClick: onClickMarginButton,
								},
								'大'
							),

						),
						el(
							Button,
							{
								value: '',
								// isPressed: (attributes.margin === ''),
								// isDefault: (attributes.margin !== ''),
								isSmall: true,
								onClick: onClickMarginButton,
							},
							'リセット'
						),
					)
				);

		function onClickMarginButton(ev){
			var marginValue=ev.currentTarget.value;
			if(marginValue==''){
				props.setAttributes({
					margin: marginValue,
					className: '',
				});
			}else{
				props.setAttributes({
					margin: marginValue,
					className: 'margin'+marginValue,
				});
			}

		}

		return el(
			wp.element.Fragment,
			{},
			el(
				BlockEdit,
				props,
			),
			el(
				wp.blockEditor.InspectorControls,
				{initialOpen: false},
				marginTopSettings,
			),
		)


	};
}, 'withInspectorControls');
wp.hooks.addFilter('editor.BlockEdit', 'my-plugin/add-margin', withInspectorControls);

function addAttribute(settings) {
	settings.attributes=assign(settings.attributes, {
		margin: {
			type: 'string',
		},
	} );
	return settings;
}
wp.hooks.addFilter('blocks.registerBlockType', 'my-plugin/add-attr', addAttribute);