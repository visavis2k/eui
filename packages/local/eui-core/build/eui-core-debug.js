Ext.define('Override.Component', {
    override: 'Ext.Component',
    /**
     * @cfg {String/Array} [localeProperties=html] A string or array of strings of properties on the component to be localized.
     */
    localeProperties: 'html',
    /**
     * @private
     * @cfg {RegExp} _localeRe A RegExp that will match an id and default string, both are required in this format:
     *
     *     {{id}{default text}}
     */
    //    _localeRe: /^{{(.+)}{(.+)}}$/,
    _localeRe: /^{(.+)}$/,
    initComponent: function() {
        this.doLocale();
        this.callParent();
    },
    /**
     * @private
     * Method that will create a setter function that will localize the string and pass it to the original setter.
     */
    _createLocaleSetter: function(property) {
        var configurator = this.getConfigurator(),
            config = configurator.configs[property],
            store = Ext.getStore('i18n'),
            re = this._localeRe,
            setName, oldSetter, newSetter;
        if (Ext.isEmpty(store)) {
            /*Ext.Error.raise({
             msg: '다국어 지원을 위한 데이터를 제공받지 못했습니다.'
             });*/
            console.log('다국어 지원을 위한 데이터를 제공받지 못했습니다.', arguments);
            return null;
        }
        if (!config) {
            config = configurator.configs[property] = new Ext.Config(property);
        }
        setName = config.names.set;
        oldSetter = this[setName];
        if (oldSetter.isLocaleSetter) {
            newSetter = oldSetter;
        } else {
            newSetter = this[setName] = function(value) {
                var info, id, defaultString, record;
                if (value && Ext.typeOf(value) == 'string' && (value.indexOf("#") != -1)) {
                    var allVar = value.split("#"),
                        len = allVar.length;
                    for (var i = 1; i < len; i++) {
                        var chkStr;
                        if (allVar[i].split('}').length == 2) {
                            chkStr = allVar[i].split('}')[0] + '}';
                        }
                        info = re.exec(chkStr);
                        if (info) {
                            if (i === 1) {
                                value = allVar[0];
                            }
                            id = info[1];
                            record = id && store.findRecord('MSG_ID', id, 0, false, false, true);
                            //                            console.log('i18n: ', record.get('MSG_CONTENTS'))
                            value += (record ? record.get('MSG_CONTENTS') : id) + allVar[i].split('}')[1];
                        } else {
                            value = allVar[i];
                        }
                    }
                }
                return oldSetter.call(this, value);
            };
            newSetter.isLocaleSetter = true;
        }
        return newSetter;
    },
    /**
     * @private
     * Method that will iterate through the {@link #localeProperties} to create a setter hook into a current setter.
     */
    doLocale: function() {
        var me = this,
            properties = Ext.Array.from(me.localeProperties),
            i = 0,
            length = properties.length,
            property, value, setter;
        for (; i < length; i++) {
            property = properties[i];
            value = me[property];
            console.log('value:', value);
            if (value && Ext.typeOf(value) == 'string' && (value.indexOf("#") != -1)) {
                setter = me._createLocaleSetter(property);
                if (value && !Ext.isEmpty(setter)) {
                    setter.call(me, value);
                }
            }
        }
    }
});

Ext.define('Override.grid.column.Column', {
    override: 'Ext.grid.column.Column',
    localeProperties: [
        'text'
    ],
    initComponent: function() {
        if (this.editor) {
            this.cls = 'dirtymark';
        }
        this.callParent(arguments);
    }
});

/***
 * App전역 변수 설정.
 */
Ext.define('eui.Config', {
    singleton: true,
    alternateClassName: [
        'Config'
    ],
    localeStoreValueField: 'MSG_ID',
    localeStoreDisplayField: 'MSG_CONTENTS'
});

Ext.define('eui.controller.InitController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.spinit',
    constructor: function (cfg) {
        cfg = cfg || {};

        if(this.globalUrlPrefix){
            Util.HurlPrefix = this.globalUrlPrefix;
        }

        debugger;
        Util.localeStoreDisplayField = this.localeStoreDisplayField;
        Util.localeStoreValueField = this.localeStoreValueField;


//        var fileref=document.createElement("link");
//        fileref.setAttribute("rel", "stylesheet");
//        fileref.setAttribute("type", "text/css");
//        fileref.setAttribute("href", 'resources/css/sprr-theme.css');
//        document.getElementsByTagName("head")[0].appendChild(fileref);


        var store = Ext.create('Ext.data.Store', {
            fields: [],
            storeId: 'i18n'
        });
        Ext.apply(cfg, {
            url: Util.HurlPrefix + this.localeStoreUrl,
            pSync: false,
            outDs: {
                data: Ext.getStore('i18n')
            }
        });
        if(this.localeStoreUrl){
            Util.CommonAjax(cfg);
        }

        Util.globalCheckLogin();

        this.callParent(this.processInitialController(cfg));
    },

    processInitialController: function (config) {
        return config;
    },

    init: function (application) {
        console.log('init', this.localeUrl)

    }
});
