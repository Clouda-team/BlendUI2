define({

    id: '',

    config: {},

    style: {},

    /**
     * 创建组件Item对象
     * @returns {{text: string, image: string, action: string}}
     */
    generateItem: function(){
        return {
            text: '',
            image: '',
            action: ''
        };
    },

    /**
     * 创建样式对象
     * @param {string} backgroundColor 背景色:#ffccddee
     * @param {string} color 前景色:#ffffffff
     * @returns {{backgroundColor: *, color: *}}
     */
    generateStyle: function(backgroundColor, color){
        return {
            backgroundColor: backgroundColor,
            color: color
        };
    },

    /**
     * 添加组件
     * @param type
     * @param config
     */
    addWidget: function(type, config){
        var types = this.types;

        if(type in types){
            this.config[type] = config;
        }
    },

    registerType: function(type){
        var types = this.types;

        if(type && !(type in this.types)){
            this.types.push(type);
        }
    },

    render: function(){

    },

    destroy: function(){
        delete this.config;
    }
});
