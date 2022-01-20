define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.component = instance.extract_field(data.component);
        instance.gap_y =  instance.extract_field(data.gap_y,4);
        instance.bind = function() { instance.recursive_bind(instance.component);} 
        instance.render = function() 
        { 
            return `<li class="py-${instance.gap_y}" id='${instance.id()}' >${instance.extract_html(instance.component)}</li>`;
        }  
        return instance;
    }  
    return module;
});