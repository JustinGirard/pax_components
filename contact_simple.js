define(["jquery","doencode","paxdk",'components/alert','components/cookie'], function($,doencode,paxdk,alert_module,cookie) {
    var module = {
        'dependencies':{
            'alert':alert_module,
            'form_html':`<div class="mt-6">
            <form action="#"  id='simple_contact' method="POST" class="space-y-6 ">
                <div class="space-y-1">
                  <div class="mt-1">
                    <input id="simple_email" name="email" type="text" placeholder="example@email.com" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  </div>
                </div>
                <div>
                  <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Contact
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
        instance['alert_component'] = module.dependencies['alert'].create({'html':"Could not sent request"});
        instance['success_component'] = module.dependencies['alert'].create({'html':"Sent!",'color':'green'});
        instance['form_html'] = module.dependencies['form_html'];
        
        instance.head = function()
        {
            return "";
        } 

        instance.render = function(control_type)
        {
            if (control_type == undefined)
                control_type = 'login_form';
            
            if (control_type == 'login_form')
                return instance['form_html']+instance['alert_component'].render()+instance['success_component'].render();
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
        instance.send_email = function()
        {
            email = $('#simple_email').val();
            instance['pq'] = instance['appstate'].get('pq');
            packet = {
                      'api_key':cookie.get('pax_api_key'),
                      'address':'justingirard@paxfinancial.ai',
                      'subject':'Contact form '+email ,
                      'text':'Contact from '+ email,}
            instance.pq.query('send_email',packet,function(resp)
            {
                if (resp['result'] == 'success')
                    instance['success_component'].show();
                else
                    instance['alert_component'].show();

            });
            
            
        }
        
        instance.bind = function()
        {
            $(document).ready(function()
            {   
                $('#simple_contact').submit(function(event)
                {
                    var login_cook = cookie.get('pax_api_key');
                    if (login_cook == undefined || login_cook.length <10 )
                    {
                        email = $('#simple_email').val();
                        event.preventDefault();
                        packet = {'credentials':{'accesscode':'public_earth_key'}}
                        instance['pq'] = instance['appstate'].get('pq');
                        instance.pq.query('get_api_key',packet,function(data)
                        {
                            if (data['api_key'] && data['api_key'] != '__unauthorized')
                            {
                                instance['api_key'] = data['api_key'];
                                instance.send_email();
                                instance.on_login();
                                cookie.set('pax_api_key',data['api_key']);
                            }
                            else
                            {
                                instance['alert_component'].show();
                            }
                        });
                    }
                    else
                    {
                        //alert("WHAT");
                        instance.send_email();
                        instance.on_login();
                    }
                    
                    return false;
                });
            });        
        }
        return instance;
    } 
    return module;
});