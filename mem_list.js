define(["jquery"], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(items)
    {
        var instance ={};
        instance.items = items;
        instance.head = function()
        {
            return "";
        } 
        instance.render = function()
        {
            html = "";
            instance.items.forEach(function (item) { html = html + item.render(); });
            return html;
        } 
        instance.bind= function()
        {
            instance.items.forEach(function (item) { item.bind(); });
        } 
        return instance;
    } 
    return module;
});