define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.fields = instance.extract_field( data['fields'],[]);  

        instance.render = function()
        {
            var field_html = "";
            instance.fields.forEach(function(item){ field_html += instance.extract_html(item) });
            
            return `
                <form class="space-y-8 divide-y divide-gray-200" id="${instance.id()}">
                  <div class="space-y-8 divide-y divide-gray-200">
                    <div>
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
