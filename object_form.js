define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.object_title = instance.extract_field(data['title'],"'title' Edit User");
        instance.object_subtitle = instance.extract_field(data['subtitle']," 'subtitle' Change any user settings here.");
        instance.fields = instance.extract_field( data['fields'],[]);  

        instance.render = function()
        {
            var field_html = "";
            instance.fields.forEach(function(item){ field_html += instance.extract_html(item) });
            
            return `
                <form class="space-y-8 divide-y divide-gray-200" id="${instance.id()}">
                  <div class="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                          ${instance.object_title}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                          ${instance.object_subtitle}
                        </p>
                      </div>
                      ${field_html}
                    </div>
                  </div>
                </form>            
            `;
        } 
        instance.bind = function()
        {
            instance.fields.forEach(function(item){ item.bind(); });
        }
        return instance;
    } 
    return module;
});
