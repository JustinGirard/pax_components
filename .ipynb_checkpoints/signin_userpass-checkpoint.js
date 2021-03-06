define(["jquery","assets/doencode","assets/paxdk",'components/alert','components/base','components/cookie','components/popup','components/form_create_user','components/link'], 
       function($,doencode,paxdk,alert_module,base,cookie,popup,form_create_user,link) {
    var module = { 
        'dependencies':{
            'alert':alert_module,
            'logout_html_link':`<a href="#"  id='simple_logout' class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" >
                  Sign Out
                </a>`
        }
    };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance['appstate'] = data['appstate'];
        instance['on_login'] = data['on_login'];
        instance['on_logout'] = data['on_logout'];
        instance['alert_component'] = module.dependencies['alert'].create({'html':"Password Failure"});
        instance['logout_html_link'] = module.dependencies['logout_html_link'];
        
        instance.f_create_user = popup.create({'controls':form_create_user.create({'appstate':instance['appstate']})});
        instance['register_link'] = link.create({'label':'register new user',
                                                 'on_click':function()
                                                 {
                                                  instance.f_create_user.show();
                                                 }});
        
        instance.head = function()
        {
            return "";
        } 

        instance.render = function(control_type)
        { 
            if (control_type == undefined)
                control_type = 'login_form';
            if (control_type == 'login_form')
                //return instance['form_html']+instance['alert_component'].render()+ instance['register_link'].render()+instance.f_create_user.render();
                return `
    <div class="mt-6">
        <form action="#"  id='${instance.id()}_signin_userpass_form' method="POST" class="space-y-6 ">
            <div class="space-y-1">
                <label for="username" class="block text-sm font-medium text-gray-700">
                Username
                </label>
                <div class="mt-1">
                <input id="${instance.id()}_userpass_username" name="password"  autocomplete="current-username" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
            </div>

            <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700">
                Password
                </label>
            </div>
            <div class="mt-1">
                <input id="${instance.id()}_userpass_password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
                </button>
            </div>
        </form>
    </div>`;
                
                
            if (control_type == 'logout_link')
                return instance['logout_html_link'];
            return "INCLUDE CONTROL_TYPE in render()";
        } 
        instance.is_logged_in = () => {
            if (cookie.get('pax_api_key')) return true;
            return false;
        }
        
        instance.f_do_logout = (event) => {
            instance['appstate'].user_logout(instance.on_logout);
            }
        
        instance.f_do_login = (event) => {
            username = $(`#${instance.id()}_userpass_username`).val();
            password = $(`#${instance.id()}_userpass_password`).val();
            event.preventDefault();
            instance['appstate'].user_login_userpass(username,password,instance.on_login,instance['alert_component'].show);
            //instance['appstate'].user_login_userpass(username,password,instance.on_login,function(){alert('Password Failed')});
            }
        
        instance.bind = () => {
            instance['register_link'].bind();
            instance.f_create_user.bind();
            $(document).ready(() => {   
                $('#simple_logout').click((event) => {
                    instance.f_do_logout(event);
                });
                
                $(`#${instance.id()}_signin_userpass_form`).submit((event) => {
                    instance.f_do_login(event);
                    $(`#${instance.id()}_userpass_username`).val("");
                    $(`#${instance.id()}_userpass_password`).val("");
                });
            });        
        }
        return instance;
    } 
    return module;
});