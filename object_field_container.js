define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.field_control = instance.extract_field(data['control'],"assign controls to 'control' field");
        instance.render = function()
        {
            return `
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <div class="mt-1">
                   ${instance.extract_html(instance.field_control)}
                  </div>
                </div>
              </div>`;
        } 
        instance.bind = function()
        {
            instance.recursive_bind(instance.field_control);
        }
        return instance;
    } 
    return module;
});
