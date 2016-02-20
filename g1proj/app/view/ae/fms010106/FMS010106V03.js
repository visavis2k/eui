Ext.define('g1.view.ae.fms010106.FMS010106V03', {
    extend: 'eui.form.Panel',
    xtype: 'FMS010106V03',

    hiddenHeader: true,
    hiddenSearchBtn: true,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
//            ui: 'footer',
            items: ['->',
                {
                    text: 'Clear',
                    iconCls: 'x-fa fa-search-plus',
                    handler: 'onSearch'
                },
                {
                    text: 'Del',
                    iconCls: 'x-fa fa-search-plus',
                    handler: 'onSearch'
                },
                {
                    text: 'Save',
                    iconCls: 'x-fa fa-search-plus',
                    handler: 'onSearch'
                }
            ]
        }

    ],
    items: [
        {
            xtype: 'euilabel',
            text: '법인코드'
        },
        {
            xtype: 'sptext'
        },
        {
            xtype: 'euilabel',
//            allowBlank: false,
            text: '권역코드'
        },
        {
            xtype: 'spnumber',
            allowBlank: false,
            bind: '{MYTEXT}',
            name: 'ULD_CODE'
        },
        {
            xtype: 'euilabel',
            text: '법인명'
        },

        {
            xtype: 'sptext',
            colspan:3
        },
        {
            xtype: 'euilabel',
            text: '법인영문명'
        },

        {
            xtype: 'sptext',
            colspan:3
        },
        {
            xtype: 'euilabel',
            text: '법인주소'
        },

        {
            xtype: 'sptext',
            colspan:3
        },
        {
            xtype: 'euilabel',
            text: '법인대표자명'
        },

        {
            xtype: 'sptext',
            colspan:3
        },
        {
            xtype: 'euilabel',
            text: '위도'
        },

        {
            xtype: 'sptext'
        },
        {
            xtype: 'euilabel',
            text: '경도'
        },
        {
            xtype: 'sptext'
        }

    ]
});