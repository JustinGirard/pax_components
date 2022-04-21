define(['require','jquery','components/base','components/uuid4'],function (require,$,base) 
{
    var module = {'dependencies':{
                                }
                 };
    
    module.create = function(data)
    {
        var instance = base.create(data);
        instance['_id'] = "link_"+uuid4();
        instance['label'] = data.label;
        instance['on_click'] = data.on_click;
        instance['classes'] = instance.extract_field(data.classes,"text-white hover:text-gray-300") ;
        
        //return  true;
        module.head = function()
        {
            return  "";
        } 
        
        instance.render = function()
        {
            return  `<a  id='${instance['_id']}' href="#" class="text-base font-medium ${instance['classes']}">${instance['label']}</a>`;
        } 
        instance.click_decorate = function(event)
        {
            instance.on_click(event);
        }
        instance.bind = function()
        {
            $("#"+instance._id).click(instance['on_click']);
        } 
        return instance
    } 
    
    return module;
});