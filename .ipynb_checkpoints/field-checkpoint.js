define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.field_title = instance.extract_field(data['title'],"'title' field");
        instance.field_name = instance.extract_field(data['name'],"'name' field");
        instance.field_type = instance.extract_field(data['name'],"text");
        instance.render = function()
        {
            return `<input  name="${instance.field_name}" type="${instance.field_type}" id="${instance.id()}" placeholder="${instance.field_name}" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">`;
        } 
        instance.bind = function()
        {
            
        }
        return instance;
    } 
    return module;
});
