define(["jquery"], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(items)
    {
        if (module.created == true)
        {
            return module;
        }
        module.items = {};
        
        
        module.is_mobile = function()
        {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
              return true;
            else
              return false;
        }
        
        module.head = function()
        {
            return "";
        } 
        module.render = function()
        {
            html = "No Redner for application_state";
            return html;
        } 
        module.bind= function()
        {
            module.items.forEach(function (item) { item.bind(); });
        } 
        
        module.get = function (item_id)
        {
            if (Object.keys(module.items).includes(item_id))
            {
                return module.items[item_id];
            }
            else
            {
                return undefined;
            }
        };
        
        module.set = function (item_dict)
        {
            Object.keys(item_dict).forEach(function (key){
                module.items[key] = item_dict[key] ;
            });
        };
        module.set_if_undefined = function (item_dict)
        {
            Object.keys(item_dict).forEach(function (key){
                if (Object.keys(module.items).includes(key)==false)
                {
                    module.items[key] = item_dict[key] ;
                }
            });
        };
        module.created = true;
        return module;
    } 
    return module;
});