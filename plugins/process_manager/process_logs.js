define(["jquery",'components/content','components/uuid4'], function($,content) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =content.create(data);
        instance.appstate = data.appstate;
        instance.experiment_id = data.experiment_id;
        
        instance.on_click = function ()
        {
            if (instance.appstate.get_api_key()) {
                var transaction = {'experiment_id': instance.experiment_id,'api_key':instance.appstate.get_api_key(),};
                //alert(JSON.stringify(transaction));
                instance.appstate.get('pq').query('delete_process', transaction, function(resp) {
                    console.log(resp);
                });
            }
            else {
                alert ("need to be logged in");
            }
        }        
        return instance;
    } 
    return module;
});