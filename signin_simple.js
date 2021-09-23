define(["jquery","doencode","paxdk",'components/alert','components/cookie'], function($,doencode,paxdk,alert_module,cookie) {
    var module = {
        'dependencies':{
            'alert':alert_module,
            'logout_html_link':`<a href="#"  id='simple_logout' class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" >
                  Sign Out
                </a>`,
            'form_html':`<div class="mt-6">

            <form action="#"  id='simple_login' method="POST" class="space-y-6 ">

            <div class="space-y-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                accesscode
              </label>
              <div class="mt-1">
                <input id="simple_password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>
            <div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>`,
        }
    };
    module.create = function(data)
    {
        var instance ={};
        instance['appstate'] = data['appstate'];
        instance['on_login'] = data['on_login'];
        instance['on_logout'] = data['on_logout'];
        instance['alert_component'] = module.dependencies['alert'].create({'html':"Password Failure"});
        instance['form_html'] = module.dependencies['form_html'];
        instance['logout_html_link'] = module.dependencies['logout_html_link'];
        instance.head = function()
        {
            return "";
        } 

        instance.render = function(control_type)
        { 
            if (control_type == 'login_form')
                return instance['form_html']+instance['alert_component'].render();
            if (control_type == 'logout_link')
                return instance['logout_html_link'];
            return "INCLUDE CONTROL_TYPE in render()";
        } 
        instance.is_logged_in = function()
        {
            if (cookie.get('pax_api_key'))
                return true;
            return false;
        }
        instance.bind = function()
        {
            $(document).ready(function()
            {   
                
                $('#simple_logout').click(function(event)
                {
                    cookie.delete('pax_api_key');
                    instance.on_logout();
                });
                $('#simple_login').submit(function(event)
                {
                    password = $('#simple_password').val();
                    event.preventDefault();
                    
                    
                    packet = {'credentials':{'accesscode':password}}
                    instance['pq'] = instance['appstate'].get('pq');
                    instance.pq.query('get_api_key',packet,function(data)
                    {
                        console.log("HITTING LOGIN QUERY")
                        if (data['api_key'] && data['api_key']!='__unauthorized')
                        {
                            console.log("GOT LOGIN QUERY")
                            instance['api_key'] = data['api_key'];
                            cookie.set('pax_api_key',data['api_key']);
                            instance.on_login();
                        }
                        else
                        {
                            console.log("FAIL LOGIN QUERY")
                            instance['alert_component'].show();
                        }
                    });
                    return false;
                });
            });        
        }
        return instance;
    } 
    return module;
});