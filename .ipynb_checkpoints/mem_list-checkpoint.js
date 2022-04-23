define(["jquery","components/base"], function($,base)
{
    var module = {
        'dependencies':{}
    };
    module.create = function(items)
    {
        var instance =base.create(items);
        instance.items = items;
        instance.head = function()
        {
            return "";
        } 
        
        instance.render = function()
        {
            html = "";
            instance.items.forEach(function (item) 
                                   { 
                                        html = html + item.render() 
                                   });
            return html;
        }
        
        instance.bind= function()
        {
            instance.items.forEach(function (item) 
                                   { 
                                        item.bind() 
                                    });
        } 
        return instance;
    } 
    return module;
});