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
            this.attributesList = ['center','left','right','title','image'];
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
