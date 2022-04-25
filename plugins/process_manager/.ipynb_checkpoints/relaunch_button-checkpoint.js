define(["jquery",'components/button','components/list_detailed_item','components/uuid4'], function($,button,list_item_detailed) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =button.create(data);
        instance.appstate = data.appstate;
        instance.on_click = () => {
            var appstate = instance.appstate;
            if (appstate.get_api_key())
            {
                appstate.get('pq').query('func', 
                {'function_id':'pax-action-gwella-test',
                'api_key':appstate.get_api_key(),
                'arguments':{'query_name':'purge_job',}},
                function(resp) 
                {
                    alert(JSON.stringify(resp));
                    appstate.get('pq').query('func', 
                    {'function_id':'pax-action-gwella-test',
                    'api_key':appstate.get_api_key(),
                    'arguments':{'query_name':'start_job',}},
                    function(resp) 
                    {
                        alert(JSON.stringify(resp));
                    });
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