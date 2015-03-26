/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Title = Class({

        extend: Widget,

        type: 'title',

        itemTypes: ['center','left','right'],

        attributesList:['title','image']

    });

    return Title;
});
