define([],function (require) 
{
    var module = {'dependencies':{
                                }
                 };
    module.create = function(args)
    {
        var instance ={};
        instance.badge_html = '';
        if (args.list == null )
        {
            if (args.length > 0)
            {
                instance.badge_list = args.split(",");            
            }
            else
            {
                instance.badge_list = [];            
            }
        }
        else
            instance.badge_list = args.list;
        
        instance.badge_list.forEach(function(element){
                instance.badge_html = instance.badge_html+`<span class="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-xs font-medium bg-black text-white">${element}</span>`; 
            });
        instance['body'] = instance.badge_html
        instance['head'] = "";
        instance.head = function()
        {
            return  instance['head'];
        } 

        instance.render = function()
        {
            return  instance['body'];
        } 
        instance.bind = function()
        {
            
        } 
        return instance;
        
    } 
    return module;
});