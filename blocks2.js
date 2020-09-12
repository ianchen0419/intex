var blocks = wp.blocks;

blocks.registerBlockStyle('core/image', {
	name: 'link',
	label: 'リンク付き',
});


var InspectorControls = wp.blockEditor.InspectorControls;
var PanelBody = wp.components.PanelBody;

var el = wp.element.createElement;
var blocks = wp.blocks;
var editors = wp.editors;
var InnerBlocks = wp.blockEditor.InnerBlocks;

var RadioControl=wp.components.RadioControl;


var MY_TEMPLATE = [
	[ 'core/heading', { placeholder: 'ぼくの見出しを入力' } ],
	[ 'core/paragraph', { placeholder: 'ぼくのタグを入力' } ],
];

var Fragment=wp.element.Fragment;
var RichText = wp.editor.RichText;

// ぼくの見出し
blocks.registerBlockType('my-plugin/section-heading', {
	title: 'ぼくの見出し',
	icon: 'arrow-right-alt2',
	category: 'customize',

	attributes: { 
        option: {
            value: 'a'
        }
    },
    
    edit: function (props) {
        var attributes = props.attributes;

        var onChangeRadio = function (option) {
            console.log(option);
            return props.setAttributes({
                option: option
            });
        };
        
        return [el(InspectorControls, { key: 'inspector' },
            el(RadioControl, {
                label: "User type",
                help: "The type of the current user",
                selected: attributes.option,
                options: [{
                    label: 'Author',
                    value: 'a'
                }, {
                    label: 'Editor',
                    value: 'e'
                }],
                onChange: onChangeRadio
            })
        ),

        el(
            RichText,
            {
                tagName: 'h2',
                className: 'section-title',
                value: "content",
                // onChange: function (newContent) {
                //     props.setAttributes({ content: newContent });
                // }
            }
        )]
    },


	save: function(props) {
		return el(
			'div',
			{ className: props.className },
			el( 
				InnerBlocks.Content,
			),
		);
	},
});
