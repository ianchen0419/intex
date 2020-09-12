var blocks = wp.blocks;

blocks.registerBlockStyle('core/image', {
	name: 'link',
	label: 'リンク付き',
});


var InspectorControls = wp.blockEditor.InspectorControls;
var PanelBody = wp.components.PanelBody;
var PanelRow = wp.components.PanelRow;

var el = wp.element.createElement;
var blocks = wp.blocks;
var editors = wp.editors;
var InnerBlocks = wp.blockEditor.InnerBlocks;

var BaseControl=wp.components.BaseControl;
var RadioControl=wp.components.RadioControl;
var ToggleControl=wp.components.ToggleControl;
var ButtonGroup=wp.components.ButtonGroup;
var Button=wp.components.Button;


var MY_TEMPLATE = [
[ 'core/heading', { placeholder: 'ぼくの見出しを入力' } ],
[ 'core/paragraph', { placeholder: 'ぼくのタグを入力' } ],
];

var Fragment=wp.element.Fragment;
var RichText = wp.editor.RichText;

var hihi;

var allowedMarginBlocks = [
'core/paragraph',
'core/image',
'core/gallery',
'core/column',
'core/media-text',
'core/cover',
'core/heading',
];

var withInspectorControls = wp.compose.createHigherOrderComponent(function(BlockEdit) {
	return function(props) {


// if(allowedMarginBlocks.indexOf(props.name) !== -1){
	var attributes = props.attributes;

	var marginTopSettings=el(
		PanelBody,
		{
			title: 'マージントップ設定',
		},
		el(
			BaseControl,
			{
				label: 'マージントップのみ設定せよ',
			},
			el(
				ButtonGroup,
				{},
				el(
					Button,
					{
						value: '0',
						isPrimary: (props.attributes.margin === '0'),
						isDefault: (props.attributes.margin !== '0'),
						onClick: onClickMarginButton,
					},
					'なし',
					),
				el(
					Button,
					{
						value: '20',
						isPrimary: (props.attributes.margin === '20'),
						isDefault: (props.attributes.margin !== '20'),
						onClick: onClickMarginButton,
					},
					'小'
					),
				el(
					Button,
					{
						value: '40',
						isPrimary: (props.attributes.margin === '40'),
						isDefault: (props.attributes.margin !== '40'),
						onClick: onClickMarginButton,
					},
					'中'
					),
				el(
					Button,
					{
						value: '60',
						isPrimary: (attributes.margin === '60'),
						isDefault: (attributes.margin !== '60'),
						onClick: onClickMarginButton,
					},
					'大'
					),
				el(
					Button,
					{
						value: '80',
						isPrimary: (attributes.margin === '80'),
						isDefault: (attributes.margin !== '80'),
						onClick: onClickMarginButton,
					},
					'お徳'
					),
				)
			)
		);

	function onClickMarginButton(ev){
		var marginValue=ev.currentTarget.value;

		props.setAttributes({
			margin: marginValue,
// className: 'margin60'
});

		hihi=props
	}


	if (props.name=='core/columns') {
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
				el(
					ToggleControl,
					{
						label: 'モバイルはカラム改行表示',
						checked: (props.attributes.isMobileStacked === true),
						onClick: function(ev){
							console.log(ev.currentTarget.value);
						}
					}
					),
				marginTopSettings,
				)
			)
	}

	return el(
		wp.element.Fragment,
		{},
		el(
			BlockEdit,
			props,
// {className: 'margin'+attributes.margin}
),
		el(
			wp.blockEditor.InspectorControls,
			{initialOpen: false},
			marginTopSettings,
			),
// el(
// props,
// {className: 'margin'+attributes.margin}
// )
)


};
}, 'withInspectorControls');



wp.hooks.addFilter('editor.BlockEdit', 'my-plugin/add-margintop', withInspectorControls);

// wp.blocks.getBlockTypes().forEach( function( blockType ) {
// if(blockType.name=='core/paragraph'){
// wp.blocks.unregisterBlockType( blockType.name );
// }
// } );

// ぼくの見出し
// blocks.registerBlockType('my-plugin/section-heading', {
// title: 'ぼくの見出し',
// icon: 'heading',
// category: 'layout',
// description: '自分が作った見出しです⭐︎',

// attributes: {
// content: '',
// margin: ''
// },

// edit: function (props) {
// var attributes = props.attributes;
// var content = props.attributes.content;

// function onClickMarginButton(ev){
// var marginValue = ev.currentTarget.value;
// props.setAttributes({
// margin: marginValue
// });
// }

// return [
// el(
// InspectorControls,
// { key: 'inspector' },
// el(
// PanelBody,
// {
// title: '上下マージン設定',
// },
// el(
// BaseControl,
// {
// label: '上下マージンのみ設定せよ',
// },
// el(
// ButtonGroup,
// {},
// el(
// Button,
// {
// value: '0',
// isPrimary: (attributes.margin === '0'),
// isDefault: (attributes.margin !== '0'),
// onClick: onClickMarginButton
// },
// 'なし',
// ),
// el(
// Button,
// {
// value: '20',
// isPrimary: (attributes.margin === '20'),
// isDefault: (attributes.margin !== '20'),
// onClick: onClickMarginButton
// },
// '小'
// ),
// el(
// Button,
// {
// value: '40',
// isPrimary: (attributes.margin === '40'),
// isDefault: (attributes.margin !== '40'),
// onClick: onClickMarginButton
// },
// '中'
// ),
// el(
// Button,
// {
// value: '60',
// isPrimary: (attributes.margin === '60'),
// isDefault: (attributes.margin !== '60'),
// onClick: onClickMarginButton
// },
// '大'
// ),
// el(
// Button,
// {
// value: '80',
// isPrimary: (attributes.margin === '80'),
// isDefault: (attributes.margin !== '80'),
// onClick: onClickMarginButton
// },
// 'お徳'
// ),
// )
// )
// )
// ),

// el(
// RichText,
// {
// tagName: 'h2',
// className: 'margin'+attributes.margin,
// value: content,
// onChange: function (newContent) {
// props.setAttributes({ content: newContent });
// }
// }
// )
// ]
// },


// save: function(props) {
// return el(
// RichText.Content,
// {
// tagName: 'h2',
// className: 'margin'+attributes.margin,
// value: props.attributes.content,
// }
// );
// },
// });