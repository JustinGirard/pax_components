define(["jquery",'components/button','components/list_detailed_item','components/uuid4'], function($,button,list_item_detailed) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =button.create(data);
        instance.appstate = data.appstate;
        instance.experiment_id = data.experiment_id;
        instance.key = data.key;
        instance.value = data.value;
        
        instance.on_click = () => 
        {
            let appstate = instance.appstate;
            if (appstate.get_api_key())
            {
                var transaction = {'experiment_id': instance.experiment_id,
                              'api_key':appstate.get_api_key(),
                              'key':instance.key,
                              'val':instance.value}
                appstate.get('pq').query('set_setting',
                                         transaction,
                                         function(resp) 
                {
                    alert(resp);
                });
            }
            else
            {
                alert ("need to be logged in");
            }
        }
        return instance;
    } 
    return module;
});