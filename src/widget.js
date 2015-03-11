define(["./widgets/Title", "./widgets/Tab", "./widgets/Navigation", "./widgets/Toolbar"], function(Title, Tab, Navigation, ToolBar){

    var widgets = {};
    
    widgets['title'] = Title;

    widgets['tab'] = Tab;

    widgets['navigation'] = Navigation;

    widgets['toolbar'] = Toolbar;

    return widgets;
});
