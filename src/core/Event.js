define(["./Native"],function(Native){

    var Event = {};

    /**
     * 注册事件
     * @param {string} event
     * @param {function} callback
     */
    Event.on = function(event, callback){
        Native.postMessage("event_register", event);
        document.addEventListener(event, function(event){
            callback(event);
        });
    };

    /**
     * 删除事件
     * @param {string} event
     * @param {function} callback
     */
    Event.off = function(event, callback){
        Native.postMessage("event_unregister", event);
        document.addEventListener("event_callback", function(event){
            callback(event);
        });
    };

    /**
     * 触发事件
     * @param {string} event
     * @param {function} data
     */
    Event.fire = function(event, data){
        var message = {
            type: event,
            data: data
        };
        Native.postMessage("delegate", message);
    };

    return Event;
});
