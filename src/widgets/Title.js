/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Title = Class({

        extend: Widget,

        type: 'title',

         /**
         * _init 是个别组件需要单独初始化的事项
         * @param {object} options
         */
        _init: function (options) {
            this.itemTypes = ['center','left','right'];
            this.filterConfig = ['id'];
            this['_setImage'] = this._setTitleItem;
            this['_setTitle'] = this._setTitleItem;
        },

        /**
         * title组件的title
         * @param {object} options
         */
        _setTitleItem: function(key,value){
            var opts = {};
            key = 'title'==key?'text':key;
            opts[key]=value;
            if(!this.titleItem){
                this.titleItem = this.create(opts);
                this.append(this.titleItem,"center");     
            }else{
                this.titleItem.set(key,title);
            } 
        }
    });

    return Title;
});
