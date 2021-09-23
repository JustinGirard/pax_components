define(['require','jquery','components/uuid4'],function (require,$) 
{
    var module = {'dependencies':{
                                }
                 };
    
    module.create = function(data)
    {
        var instance = {}
        instance['__id'] = "link_"+uuid4();
        instance['label'] = data.label;
        instance['on_click'] = data.on_click;
        //return  true;
        module.head = function()
        {
            return  "";
        } 
        
        instance.render = function()
        {
            return  `<a  id='${instance['__id']}' href="#" class="text-base font-medium text-white hover:text-gray-300">${instance['label']}</a>`;
        } 
        instance.click_decorate = function(event)
        {
            instance.on_click(event);
        }
        instance.bind = function()
        {
            $("div #"+instance.__id).click(instance['on_click']);
        } 
        return instance
    } 
    
    return module;
});