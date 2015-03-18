define(["./widgets/Title", "./widgets/Tab", "./widgets/Navigation", "./widgets/Toolbar"], function(Title, Tab, Navigation, Toolbar){

    var widgets = {};
    
    widgets['title'] = Title;

    widgets['tab'] = Tab;

    widgets['navigation'] = Navigation;

    widgets['toolbar'] = Toolbar;

    /* @method widgets.extend
     * @args object
     * @res You can extend Objects to widgets! 
    */
    widgets.extend = function(){
    	var targets = arguments,
    		len = targets.length,
    		i = 0,
    		target;
    	for (; i<len; i++){
    		target = targets[i];
    		/*If the argument is a object, link the key to widgets*/
    		if(typeof target == "object"){
    			for(var o in target){
    				widgets[o] = target[o];
    			}
    		}
    	}
		// Return widgets 
		return widgets;
    };
    
    return widgets;
});
