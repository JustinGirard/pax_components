define(["jquery",'components/content','components/base','components/uuid4'], 
function($,content,base) 
{
    var module = { };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance['_id'] ='padding_'+uuid4();
        instance['inner_component'] =data['content'];
        instance['classes'] ="min-h-screen py-5 px-24 sm:px-24 lg:px-24";
        //items-center justify-center flex
        instance.render = function() {
            return `<div id='${instance.id()}' class="${instance.classes}"> ${instance.extract_html(instance.inner_component)}</div>`;
        } 
        instance.bind= function() {
            instance.recursive_bind(instance.inner_component);
        } 
        return instance;
    } 
    return module;
});