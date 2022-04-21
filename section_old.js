define(["jquery"], function($) {
    var module = {
        'dependencies':{
            'open':`<div class="bg-white shadow overflow-hidden sm:rounded-lg">`,
            'close':`</div>`
        }
    };
    module.create = function(component_instance)
    {
        var instance ={};
        instance['open'] = module.dependencies['open'];
        instance['inner'] =component_instance;
        instance['close'] =  module.dependencies['close'];
        instance.head = function()
        {
            return "";
        } 
        instance.render = function()
        {
            return instance['open']+instance['inner'].render()+instance['close'];
        } 
        return instance;
    } 
    return module;
});