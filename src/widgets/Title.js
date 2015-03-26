/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Title = Class({

        extend: Widget,

        type: 'title',

        itemTypes: ['center','left','right'],

        attributesList:['image'],


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
         * 重写setTitle
         * @aram {object} options
         */
         _setTitle: function(options){
            var title = options.title,
                image = options.image,
                item,
                opts = {};
            if(title)  
                opts["text"]= title;
            if(image)
                opts["image"]= image;
            item = this.create(opts);
            this.append(item,"center"); 
        }
    });

    return Title;
});
