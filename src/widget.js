define(["./widgets/Title", "./widgets/Tab", "./widgets/Navigation", "./widgets/ToolBar"], function(Title, Tab, Navigation, ToolBar){

    var widgets = {};
    
    widgets['title'] = Title;

    widgets['tab'] = Tab;

    widgets['navigation'] = Navigation;

    widgets['toolbar'] = ToolBar;

    return widgets;
});
