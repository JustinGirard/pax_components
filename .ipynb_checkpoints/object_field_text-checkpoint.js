define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.field_title = instance.extract_field(data['title'],"'title' field");
        instance.field_name = instance.extract_field(data['name'],"'name' field");
        instance.field_type = instance.extract_field(data['name'],"text");
        instance.field_content = instance.extract_field(data['content'],"");
        instance.render = function()
        {
            return `
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="${instance.field_name}" class="block text-sm font-medium text-gray-700">
                    ${instance.field_title}
                  </label>
                  <div class="mt-1">
                    <input  name="${instance.field_name}" type="${instance.field_type}" id="${instance.id()}" placeholder="${instance.field_name}" class="shadow-sm block h-8 p-2 w-full border-black rounded-md" value="${instance.field_content}">
                  </div>
                </div>
              </div>`;
        } 
        instance.bind = function()
        {
            
        }
        return instance;
    } 
    return module;
});
