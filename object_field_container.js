define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.field_title = instance.extract_field(data['title'],"'title' field");
        instance.field_name = instance.extract_field(data['name'],"'name' field");
        instance.field_control = instance.extract_field(data['control'],"assign controls to 'control' field");
        instance.render = function()
        {
            return `
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="${instance.field_name}" class="block text-sm font-medium text-gray-700">
                    ${instance.field_title}
                  </label>
                  <div class="mt-1">
                   ${instance.extract_html(instance.field_control)}
                  </div>
                </div>
              </div>`;
        } 
        instance.bind = function()
        {
            instance.field_control.bind();
        }
        return instance;
    } 
    return module;
});
