/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Title = Class({

        extend: Widget,

        type: 'title',

        itemTypes: ['center','left','right'],

        attributesList:[],


        /**
         * 重写setConfig
         * @param {object} options
         */
        _setConfig: function (options) {
            var config = this.config,
                name;
            for (name in options) {
                this.set(name,options[name]);
            }
        },

         /**
         * title需要特殊处理
         * @param {object} options
         */
         _setTitle: function(options){
             var title = options.title,
                opts = {
                    'text':title
                };
            if(!this.titleItem){
                this.titleItem = this.create(opts);
                this.append(this.titleItem,"center");     
            }else{
                this.titleItem.set("text",title);
            } 
        },

        /**
         * image需要特殊处理
         * @param {object} options
         */
        _setImage: function(options){
            var image = options.image,
                opts = {
                    image:image
                };
            if(!this.titleItem){
                this.titleItem = this.create(opts);
                this.append(this.titleItem,"center");     
            }else{
                this.titleItem.set("image",image);
            } 
        }
    });

    return Title;
});
