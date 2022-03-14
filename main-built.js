function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
;
define("components/uuid4", function(){});

define('components/content',['require','components/uuid4'],function (require) 
{
    var module = {'dependencies':{
                                }
                 };
    module.create = function(args)
    {
        var instance ={};
        instance['_id'] ='content_'+uuid4();
        if (args == undefined)
        {
            instance['body'] = "";
        }
        else if (args.content == null)
        {
            instance['body'] = args;
        }
        else
        {
            instance['body'] = args.content;
        }
        if (instance['body'].length != undefined)
        {
            if (instance['body'].length > 200)
            {
                instance['body'] = instance['body'].substring(0,120);
            }
        }
        instance['head'] = "";
        instance.head = function()
        {
            return  instance['head'];
        } 

        instance.render = function()
        {
            return  `<div id='${instance._id}'>${instance.body}</div>`;
        } 
        instance.id = function()
        {
            return instance['_id']
            
        }
        instance.bind = function()
        {
            
        } 
        return instance;
        
    } 
    return module;
});
define('components/section',["jquery",'components/content','components/uuid4'], function($,content) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='section_'+uuid4();
        
        instance['inner_component'] =data['content_instance'];
        instance['upper_component'] =data['header_instance'];
        instance['title'] =data['title'];
        instance['section_classes'] =data['section_classes'];
        
        if (instance.section_classes == undefined)
        {
            instance.section_classes = "bg-white";
        }
        
        instance.head = function()
        {
            return "";
        } 
        
        instance.id = function()
        {
            return instance['_id'];
        }
        
        instance.render = function()
        {
            /*
                              <button type="button" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create new job
                              </button>*/
            if (instance.upper_component == undefined)
            {
                instance.upper_html = "";
            }
            else
            {
                if (instance.upper_component.render == undefined)
                {
                    instance.upper_html = instance.upper_component;
                    
                }
                else
                {
                    instance.upper_html = instance.upper_component.render();
                }
            }
            
            
            if (instance.inner_component == undefined)
            {
                instance.inner_component = content.create("");
            }
            else if (instance.inner_component.render == undefined)
            {
                instance.inner_component = content.create(instance.inner_component);
            }
            
            
            if (instance.title == undefined)
            {
                instance.title_html = "";
            }
            else if (instance.title.render == undefined)
            {
                instance.title_html = instance.title;
            }
            else
            {
                instance.title_html = instance.title.render();
            }
            
            //overflow-hidden 
            // <div class="-ml-4 mt-2 flex flex-wrap sm:flex-nowrap">
            return ` 
            <div id='${instance['_id']}' class=" ${instance.section_classes}  shadow rounded-lg space-x-1 section-container">
              <div class="px-4 py-5 sm:p-6 travis">
                        <div class="bg-white  py-5 border-gray-200 ">
                          <div class="-mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div class=" ">
                              <h3 class="text-lg leading-6 font-medium text-gray-900">
                                ${instance.title_html}
                              </h3>
                            </div>
                            <div class=" mt-2 flex-shrink-0">
                                ${instance.upper_html}
                            </div>
                          </div>
                        </div>
                        ${instance.inner_component.render()}
              </div>
            </div>`;
        } 
        instance.bind= function()
        {
            instance.inner_component.bind();
            if (instance.upper_component != undefined && instance.upper_component.bind != undefined )
            {
                instance.upper_component.bind();
            }
            
        } 
        
        return instance;
    } 
    return module;
});
define('components/base',["jquery",'components/uuid4'], function($) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='obj_'+uuid4();
        instance.head = function() { return ""; } 
        instance.id = function()   { return instance['_id'];}
        instance.hide = function() { $(`#${instance.id()}`).fadeOut(10); } 
        instance.show = function() { $(`#${instance.id()}`).fadeIn(10); } 
        instance.bind= function()  { } 
        instance.render = function() { return ''} 
        // Create html from a single element
        instance.is_mobile = function()
        {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
              return true;
            else
              return false;
        }
        
        
        instance.extract_single_html = function (variable,do_print=false)
        {
            html = variable;
            if (variable != undefined && variable.render != undefined )
            {
                html = variable.render();
            }
            return html
        }
        
        // extract html from single items, and lists
        instance.extract_html = function (variable,do_print=false)
        {
            html = "";
            if($.isArray(variable))
            {
                variable.forEach(function(variable)  { html = html  + instance.extract_single_html(variable,do_print); });
            }
            else
            {
                html = instance.extract_single_html(variable,do_print);
            }
            return html;
        }
        
        // Explores an object (no matter what it is) and calls bind if bind is found.
        instance.recursive_bind = function(obj)
        {
            if (obj != null) 
            {
                if($.isArray(obj))
                {
                     obj.forEach(function(item)
                     {
                        if (item.bind != null)
                            item.bind();
                     });
                }
                else if (obj.bind != null)
                    obj.bind();
            } 
        }        
        instance.extract_field = function (variable,default_value)
        {
            if (variable == undefined)
                return default_value;
            else
                return variable;
            
        }   
        instance.subs_tax = {} // Organized as menu, resource locations
        instance.subs_res = {} // resources
        instance.subs_rres = {} // reverse lookup resources
        
        instance.subs_add = function(component,path=undefined)
        {
            if ( path == undefined || path.length <= 1)
                path = "";
            if (path.endsWith('/')) path = path.slice(0, -1);            
            if (path.startsWith('/')) path=  path.substring(1);            
            path = 'root/'+path;
            var path_arr = path.split('/'); 
            var selected_location = instance.subs_tax;
            path_arr.forEach(function(item)
            {
                if (item.length > 0)
                {
                    if (Object.keys(selected_location)==undefined || !(Object.keys(selected_location).includes(item)))
                        selected_location[item] = {};
                    selected_location = selected_location[item];
                }
            });
            instance.subs_res[path] = component;
            instance.subs_rres[component] = path;
        }
        
        instance.subs_get = function(path=undefined)
        {
            if ( path == undefined || path.length <= 1)
                path = "";
            if (path.endsWith('/')) path = path.slice(0, -1);            
            if (path.startsWith('/')) path=  path.substring(1);            
            path = 'root/'+path;
            return instance.subs_res[path];
        }
        instance.subs_get_children = function(original_path=undefined)
        {
            var path = original_path;
            if ( path == undefined || path.length <= 1)
                path = "";
            if (path.endsWith('/')) path = path.slice(0, -1);            
            if (path.startsWith('/')) path=  path.substring(1);             
            original_path = path
            path = 'root/'+path;
            var path_arr = path.split('/'); 
            var selected_location = instance.subs_tax;
            path_arr.forEach(function(item)
            {
                if (item.length > 0)
                {
                    if (Object.keys(selected_location)==undefined || !(Object.keys(selected_location).includes(item)))
                        return undefined
                    selected_location = selected_location[item];
                }
            });
            if (Object.keys(selected_location)==undefined || (Object.keys(selected_location).length==0))
                return undefined
            var objects = [];
            Object.keys(selected_location).forEach(function(item){objects.push(instance.subs_get(original_path+'/'+item))});
            
            return objects;
        }
        instance.set = function(key,val)
        {
            instance[key] = val;
        }
        instance.reload = function()
        {
            instance.bind();
        }
        
        
        /*
        instance.subs_add('item_1');
        instance.subs_add('item_2','l1');
        instance.subs_add('item_3','l1');
        instance.subs_add('item_4','l2');
        instance.subs_add('item_5','l1a/l2a/l3a');
        instance.subs_add('item_6','l2/l3');
        console.log("testing subs");
        console.log(JSON.stringify(instance.subs_get())); // item
        console.log(JSON.stringify(instance.subs_get(''))); // item
        console.log(JSON.stringify(instance.subs_get('/'))); // item
        console.log(JSON.stringify(instance.subs_get('l2/l3'))); // item
        console.log(JSON.stringify(instance.subs_get('/l2/l3'))); // item
        console.log(JSON.stringify(instance.subs_get('l2/l3/'))); // item
        console.log(JSON.stringify(instance.subs_get('l1'))); // item
        console.log(JSON.stringify(instance.subs_get('l2/l7'))); // null
        
        */
        return instance;
    } 
    return module;
});
define('components/section_split',["jquery",'components/base','components/content','components/uuid4'], function($,base,content) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create();
        instance['_id'] ='section_'+uuid4();
        instance['background_image'] =data['background_image'];
        instance['left_component'] =data['left_instance'];
        instance['right_component'] =data['right_instance'];
        instance['section_classes'] =data['section_classes'];
        /*
            <div class="grid grid-rows-3 grid-flow-col gap-4">
              <div class="row-span-3 ...">01</div>
              <div class="col-span-2 ...">02</div>
              <div class="row-span-2 col-span-2 ...">03</div>
            </div>        
        */
        instance['mobile_expand_1'] = 'col-span-4';
        instance['mobile_expand_2'] = 'col-span-4';
        if (instance.is_mobile()==true)
        {
            if (data.m_cols_1)
                instance['mobile_expand_1'] = 'col-span-'+data['m_cols_1'];          
            if (data.m_cols_2)
                instance['mobile_expand_2'] = 'col-span-'+data['m_cols_2'];          
            if (data.m_cols_2 == 0)
                instance['mobile_expand_2'] = 'hidden'; 
            if (data.m_cols_1 == 0)
                instance['mobile_expand_1'] = 'hidden'; 
        }
        
        instance['y_gap'] =instance.extract_field(data['y_gap'],10);
        instance['x_gap'] =instance.extract_field(data['x_gap'],10);
        instance['text_classes'] =instance.extract_field(data['text_classes'],'text-base text-gray-500');
        
        if (instance.section_classes == undefined)
        {
            instance.section_classes = "bg-white";
        }
        
        instance.head = function()
        {
            return "";
        } 
                
        instance.render = function()
        {
            
            instance.left_html = instance.extract_html(instance.left_component);
            instance.right_html = instance.extract_html(instance.right_component);
            if (instance.is_mobile())
            {
                instance.left_html = instance.left_html.replaceAll("3xl", "6xl");
                instance.left_html = instance.left_html.replaceAll("text-lg", " text-lg text-3xl ");
                instance.right_html = instance.right_html.replaceAll("3xl", "6xl");
                instance.right_html = instance.right_html.replaceAll("text-lg", " text-lg text-3xl ");
            }
            
            if (instance.background_image == undefined)
                instance.background_image_html = "";
            else
            {
                if (instance.background_image.render == undefined)
                    instance.background_image_html = `${instance.background_image}`;
                else
                    instance.background_image_html = `${instance.background_image.render()}`;
            }
            
            
            
            //overflow-hidden
            return `<div id ='${instance.id()}' class="py-12 ${instance.section_classes} " style='${instance.background_image_html}'>
                      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="mt-${instance['y_gap']}">
                          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-8 md:gap-x-8 md:gap-y-10">

                            <div class="relative  ${instance['mobile_expand_1']} ">
                              <dd class=" ml-${instance['x_gap']} ${instance['text_classes']}">
                                ${instance.left_html}
                              </dd>
                            </div>
                            <div class="relative  ${instance['mobile_expand_2']} ">
                              <dd class=" ml-${instance['x_gap']} ${instance['text_classes']}">
                                ${instance.right_html}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>`;
            
            return ` 
            <div id="${instance['_id']}" class="grid grid-cols-2 gap-4">
              <div>${instance.left_html}</div>
              <div>${instance.right_html}</div>
            </div>`;
        } 
        instance.bind= function()
        {
            if (instance.right_component != undefined && instance.right_component.bind != undefined)
                instance.right_component.bind();
            if (instance.left_component != undefined && instance.left_component.bind != undefined)
                instance.left_component.bind();
            
        } 
        
        return instance;
    } 
    return module;
});
define('components/mem_list',["jquery"], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(items)
    {
        var instance ={};
        instance.items = items;
        instance.head = function()
        {
            return "";
        } 
        instance.render = function()
        {
            html = "";
            instance.items.forEach(function (item) { html = html + item.render(); });
            return html;
        } 
        instance.bind= function()
        {
            instance.items.forEach(function (item) { item.bind(); });
        } 
        return instance;
    } 
    return module;
});
define('components/application_state',["jquery"], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(items)
    {
        if (module.created == true)
        {
            return module;
        }
        module.items = {};
        
        
        module.is_mobile = function()
        {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
              return true;
            else
              return false;
        }
        
        module.head = function()
        {
            return "";
        } 
        module.render = function()
        {
            html = "No Redner for application_state";
            return html;
        } 
        module.bind= function()
        {
            module.items.forEach(function (item) { item.bind(); });
        } 
        
        module.get = function (item_id)
        {
            if (Object.keys(module.items).includes(item_id))
            {
                return module.items[item_id];
            }
            else
            {
                return undefined;
            }
        };
        
        module.set = function (item_dict)
        {
            Object.keys(item_dict).forEach(function (key){
                module.items[key] = item_dict[key] ;
            });
        };
        module.set_if_undefined = function (item_dict)
        {
            Object.keys(item_dict).forEach(function (key){
                if (Object.keys(module.items).includes(key)==false)
                {
                    module.items[key] = item_dict[key] ;
                }
            });
        };
        module.created = true;
        return module;
    } 
    return module;
});

define('components/cookie',[],function () 
{
    var module = {'dependencies':{}};
    module.create = function(args)
    {
    } 
    
    module.set = function (name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    module.get = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    module.delete = function (name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }    
    console.log("DEFINED COOKIE");
    console.log(module)
    return module;
});
define('app/main_application_state',["jquery",'components/application_state','components/cookie',"doencode","paxdk"], function($,application_state,cookie) {
    f_get_api_version = function(arg){
        var getUrl = window.location;
        var res = '';
        if (window.location.host.includes('localhost'))
            res =  window.location.host;
        else if (window.location.host.includes('dev.'))
            res =  'dev';
        else
            res =  'stage';
        return res
    }    
    var module = application_state;
    module.create();
    if (module.on_login == undefined) 
    {
        module.on_login = {};
        module.on_logout = {};
    }
    module.register_on_event = function(event,key, func)
    {
        if (event == 'on_login') 
        { 
            module.on_login[key] = func;
        }
        if (event == 'on_logout') { module.on_logout[key] = func;}
    }
    
    module.trigger_event = function(event)
    {
        var arr = {};
        if (event == 'on_login') { arr = module.on_login;}
        if (event == 'on_logout') {  arr = module.on_logout;}
        Object.keys(arr).forEach(function (key){ arr[key]();});        
    }
    
    module.set_if_undefined({'cookie':cookie});
    module.set_if_undefined({'pq': new Paxdk(url_version_in=f_get_api_version())});
    module.exportToCsv =  function (filename, rows) {
            var processRow = function (row) {
                var finalVal = '';
                for (var j = 0; j < row.length; j++) {
                    var innerValue = row[j] === null ? '' : row[j].toString();
                    if (row[j] instanceof Date) {
                        innerValue = row[j].toLocaleString();
                    };
                    var result = innerValue.replace(/"/g, '""');
                    if (result.search(/("|,|\n)/g) >= 0)
                        result = '"' + result + '"';
                    if (j > 0)
                        finalVal += ',';
                    finalVal += result;
                }
                return finalVal + '\n';
            };

            var csvFile = '';
            for (var i = 0; i < rows.length; i++) {
                csvFile += processRow(rows[i]);
            }

            var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
        // Login with username and password
        module.user_login_userpass = function(username,password,on_success,on_fail)
        {
            var get_api_key = {'username': username, 'password': password }
            module.get('pq').query('user_get_session',get_api_key,function(data) 
            {
                //alert("trying");
                if (data['api_key'] != undefined)
                {
                    cookie.set('pax_username',username);
                    cookie.set('pax_api_key',data['api_key']);
                    module.trigger_event('on_login');
                    if (on_success) on_success();
                }
                else
                {
                    cookie.delete('pax_api_key');
                    cookie.delete('pax_username');
                    if (on_fail) on_fail();
                }
            });
            
        }
        module.is_logged_in = function()
        {
            if (cookie.get('pax_api_key'))
                return true;
            return false;
        }
    
        module.user_logout = function(on_success)
        {
            cookie.delete('pax_api_key');
            cookie.delete('pax_username');
            module.trigger_event('on_logout');
            if (on_success) on_success();
        }
        
        module.user_reserve = function(username,on_success,on_fail)
        {
            var reserve_packet = {'username': username, 'password': 'reserved', 'password2':'reserved' }
            var get_api_key = {'username': username, 'password': 'reserved' }
            cookie.delete('pax_username');

            //instance['pq'] = instance['appstate'].get('pq');
            module.get('pq').query('user_register',reserve_packet,function(data) 
            {
                var success = true;
                if (data.error != undefined && data.error.includes('already exists'))
                {
                    success = true;
                }
                else if (data.error != undefined )
                {
                    cookie.delete('pax_username');
                    alert(data.error);
                    success = false;
                }
                // Grab Key or report failure
                if (success == true)
                {
                    module.get('pq').query('user_get_session',get_api_key,function(data) 
                    {
                        if (data['api_key'] != undefined)
                        {
                            cookie.set('pax_username',username);
                            cookie.set('pax_api_key',data['api_key']);
                            module.trigger_event('on_login');
                            if (on_success) on_success();
                        }
                        else
                        {
                            if (on_fail) on_fail();
                            alert("Could not retrieve a reserved session. However, if this is your account, please log in using sign in to play the demo on the dashboard!");
                        }
                    });
                }
                else
                {
                    if (on_fail) on_fail();
                    alert("Could not reserve this user name. However, if this is your account, please log in using sign in to play the demo on the dashboard!");
                }
            });
        }    
        module.user_register = function(username,password,password2,on_success,on_fail)
        {
            var reserve_packet = {'username': username, 'password': password, 'password2':password2 }
            var get_api_key = {'username': username, 'password': password }
            cookie.delete('pax_username');

            //instance['pq'] = instance['appstate'].get('pq');
            module.get('pq').query('user_register',reserve_packet,function(data) 
            {
                var success = true;
                /*if (data.error != undefined && data.error.includes('already exists'))
                {
                    1. try to log in using reserved password
                    2. If you succeed, change the password
                    3. if that works, you have succeeded, log out
                    success = true;
                }
                else*/ 
                    
                if (data.error != undefined || JSON.stringify(data).includes('error'))
                {
                    cookie.delete('pax_username');
                    success = false;
                }
                // Grab Key or report failure
                if (success == true)
                {
                    module.get('pq').query('user_get_session',get_api_key,function(data_inner) 
                    {
                        if (data['api_key'] != undefined)
                        {
                            cookie.set('pax_username',username);
                            cookie.set('pax_api_key',data['api_key']);
                            if (on_success) on_success(data_inner);
                        }
                        else
                        {
                            if (on_fail) on_fail(data_inner);
                        }
                    });
                }
                else
                {
                    if (on_fail) on_fail(data);
                }
            });
        }      
    return module;
});

              
              
define('app/page_landing',["jquery","components/content",], function($,content_module) {
    var module = {
        'dependencies':{
        }
    };
    module.create = function(data)
    {
        var instance ={};
        instance['header'] = data['header'];
        instance['sections'] = data['sections'];
        
        instance.head = function()
        {
            return `
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300&family=Roboto&display=swap');
</style>
`;
        } 
        instance.id = function()
        {
            return "page_landing_gfudaa";
        } 
        instance.bind = function()
        {
            instance.sections.forEach(function (section)
            {
                if (section.bind != undefined)
                {
                    section.bind();
                }
            });
        } 
        instance.hide = function()
        {
            $(`#${instance.id()}`).fadeOut(10);
        } 
        
        instance.show = function()
        {
            $(`#${instance.id()}`).fadeIn(10);
        } 
        
        instance.render = function()
        {
            instance.header_html = "";
            if (instance.header != undefined && instance.header.render != undefined )
            {
                instance.header_html = instance.header.render()
            }
            var sections_html = "";
            if (instance.sections != undefined)
            {
                instance.sections.forEach(function (section)
                {
                    sections_html = sections_html + section.render();
                });
            }
              var html =`<div class="min-h-screen" id="${instance.id()}" style='display:none;' >
              <div class="relative overflow-hidden">
                ${instance.header_html}
                <main>
                ${sections_html}
                </main>
              </div>
            </div>`;
            return html;
        } 
        return instance;
    } 
    return module;
});

              
              
define('app/page_team',["jquery","components/content"], function($,content_module) {
    var module = {
        'dependencies':{
        }
    };
    module.create = function(data)
    {
        var instance ={};
        
        instance['header'] = data['header']
        instance['people'] = data['people']
        
        instance.head = function()
        {
            return "";
        } 
        instance.id = function()
        {
            return "page_people_gfudaa";
        } 
        instance.bind = function()
        {
            //
        } 
        instance.hide = function()
        {
            $(`#${instance.id()}`).fadeOut(10);
        } 
        
        instance.show = function()
        {
            $(`#${instance.id()}`).fadeIn(10);
        } 
        
        instance.render = function()
        {
            instance.header_html = "";
            if (instance.header != undefined && instance.header.render != undefined )
            {
                instance.header_html = instance.header.render();
            }
            instance.list_items = "";
            var people_html = '';
            instance.people.forEach(function(person)
            {
                var image_html = "";
                if (person.image != undefined && person.image.length != 0)
                    image_html =`<div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"><img class="object-cover shadow-lg rounded-lg" src="${person.image}" alt=""></div>`;
                person.full_name = person.first_name + " " + person.last_name;
                var person_html = `<li class="sm:py-8">
                <div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                    ${image_html}
                  <div class="sm:col-span-2">
                    <div class="space-y-4">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3 class='text-white' >${person.full_name}</h3>
                        <p class="text-indigo-600">${person.title}</p>
                      </div>
                      <div class="text-lg">
                        <p class="text-gray-500">${person.about}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>`;                
              people_html = people_html +person_html;
            }); 

              var html = `<div id="${instance.id()}" style='display:none;' class="bg-gray-900">
                ${instance.header_html}
                  <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                    <div class="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                      <div class="space-y-5 sm:space-y-4">
                        <h2 class="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">About Pax Financial</h2>
                        <p class="text-xl text-gray-500">We take ownership of the zero to one problem. Many times projects fail without the right template systems, and without the ability to scale baked into their projects. Pax Financial began in as a traditional web development firm in 2014. After launching dozens of sites up to 2017, we honed in on expertise in logistics and finance, examples of multi-agent technology. We realized one of the largest pain points teams face is the development of projects that can serve millions of users. We get teams unstuck when they are trying to scale, and we set off new projects on the right path.</p>
                      </div>
                      <div class="lg:col-span-2">
                        <ul role="list" class="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0">
                        ${people_html}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>`;
            return html;
        } 
        return instance;
    } 
    return module;
});
define('components/page_signin_center',["jquery","components/content"], function($,content_module) {
    var module = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />`,  
            'module_content':content_module,
        }
    };
    module.create = function(data)
    {
        console.log('CREATE SIGN IN PAGE');
        var instance ={};
        //instance['page_begin'] = module.dependencies['page_begin'];
        instance['page_end'] = module.dependencies['page_end'];
        instance['form_html'] = data['form']
        instance['page_head'] = module.dependencies['page_head'];
        console.log('form debug');
        console.log(instance['form_html']);
        console.log('form end');
        
        if (data.logo == undefined)
            instance.logo = "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg";
        else
            instance.logo = data.logo;
        
        if (data.title == undefined)
            instance.title = "Sign in to your account";
        else
            instance.title = data.title;
        
        instance.head = function()
        {
            return instance['page_head'];
        } 
        instance.id = function()
        {
            return "page_signin_gfffuda";
        } 
        instance.render = function()
        {
            console.log(instance['form_html']);
            return instance['page_begin']+ instance['form_html'].render('login_form')+ instance['page_end'];
        } 
        instance.bind = function()
        {
            instance['form_html'].bind();
        } 
        instance.hide = function()
        {
            $(`#${instance.id()}`).fadeOut(10);
        } 
        instance.show = function()
        {
            $(`#${instance.id()}`).fadeIn(10);
        } 
        
        instance['page_begin'] = `<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"    id='page_signin_gfffuda' style='display:none;'>
      <div class="max-w-md w-full space-y-8">
          <img class="mx-auto h-12 w-auto" src="${instance.logo}" alt="Workflow">
          <h2 class="mt-6 text-center text-6xl font-extrabold text-gray-900">
            ${instance.title}
          </h2>`;
        
        instance['page_end'] = `</div></div>`;
        
        return instance;
    } 
    return module;
});
define('components/sidenav_item',["jquery"], function($) {
    var module = {
        'dependencies':{
        }
    };
    module.create = function(data)
    {
        /*
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>        
        */
        var instance ={};
        instance['content'] = `
        <a id='nav_link${data.id}' href="#" class="bg-gray-900 text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
          <span class="sr-only">${data.label}</span>
          <!-- Heroicon name: outline/inbox -->
          ${data.icon}
        </a>`;
        instance['id'] = data.id;
        instance['label'] = data.label;
        instance['event'] = data.event;
        instance['icon'] = data.icon;
        instance.head = function()
        {
            return "";
        } 
        instance.render = function()
        {
            return instance['content'];
        }
        instance.bind = function ()
        {
            $(`#nav_link${data.id}`).click(instance.event);
            
        }
        //console.log("what the hell");
        //console.log(instance.render());
        return instance;
    } 
    return module;
});
define('components/page_double_dash',["jquery",'components/base','components/sidenav_item'], function($,base,nav_item) {
    var module = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        `}
        
    };
    /*
        header_bar  
        nav_items 
        bar_items  
        main_items    
    */
    module.create = function(data)
    {
        var instance = base.create(data);
        try { instance.nav_items = data.nav_items;} catch(err) { instance.nav_items = null; console.log('no nav items 1');}
        try { instance.bar_items  = data.bar_items;  } catch(err) { instance.bar_items = null}
        try { instance.header_bar  = data.header_bar;  } catch(err) { console.log("NO HEADER BAR");  instance.header_bar = null}
        instance.main_items = data.main_items
        
        instance['page_head'] = module.dependencies['page_head'];
        instance['page_inner_list'] =[];

        instance.head = function()
        {
            return instance['page_head'];
        } 

        instance.render = function()
        {
            header_html = instance.extract_html(instance.header_bar);
            
            if (instance.nav_items == null)
            {
                console.log("NO NAV BAR 2");
                sidebar_html = "";
            }
            else
            {
                instance.nav_items_html = instance.extract_html(instance.nav_items);
                sidebar_html =`<nav aria-label="Sidebar" class="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
                  <div class="relative w-20 flex flex-col p-3 space-y-3">
                  ${instance.nav_items_html}
                  </div>
                </nav>`;
            }
            if (instance.bar_items == null)
            {
                bar_html = "";
            }
            else
            {
                bar_html =`<aside class="hidden lg:block lg:flex-shrink-0 lg:order-first">
                <div class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100 space-y-3 p-3">
                  ${instance.extract_html(instance.bar_items)}
                </div>
              </aside>`;
            }
            
            page_html = `<div id='${instance.id()}' style='display:none' class="h-screen overflowDEAD-hiddenDEAD bg-gray-100 flex flex-col">
  <!-- Top nav-->
    ${header_html}

  <!-- Bottom section -->
  <div class="min-h-0 flex-1 flex overflow-auto">
    <!-- Narrow sidebar-->
    ${sidebar_html}

    <!-- Main area -->
    <main class="min-w-0 flex-1 border-t border-gray-200 lg:flex">
      <!-- Primary column -->
      <section aria-labelledby="primary-heading" class="min-w-0 flex-1 h-full flex flex-col overflowDEAD-hiddenDEAD lg:order-last p-3 space-y-3 ">
        <h1 id="primary-heading" class="sr-only">Home</h1>
        <!-- Your content -->
      ${instance.extract_html(instance.main_items)}
      </section>

      <!-- Secondary column (hidden on smaller screens) -->
    ${bar_html}
    </main>
  </div>
</div>`;            
            
            
            return page_html;
        }

        instance.bind = function()
        {
            instance.recursive_bind(instance.bar_items);
            instance.recursive_bind(instance.main_items);
            instance.recursive_bind(instance.nav_items);
        }
        instance.hide = function() { $(`#${instance.id()}`).fadeOut(10);   } 
        instance.show = function() { $(`#${instance.id()}`).fadeIn(10); } 
        
        return instance;
    } 
    return module;

});
define('components/list_detailed_item',["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.img = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80";
        instance.title = "'img','title','note','detail','on_click'";
        instance.note = "a";
        instance.detail = "This is an event";
        instance.on_click = function (){alert(instance.id());};
        
        instance.bind = function()
        {
            $("div #"+instance.id()+'_link').click(instance['on_click']);
        } 
        
        
        instance.render = function()
        {
            var open = "";
            var close = "";
            
            if (instance.on_click != undefined)
            {
                open =  `<a  id='${instance.id()}_link' href="#" class="text-base font-medium text-white hover:text-gray-300">`;
                close = `</a>`;
            }
            return `<li class="py-4" id='${instance.id()}' >
                        ${open}
                          <div class="flex space-x-3">
                            <img class="h-6 w-6 rounded-full" src="${instance.img}" alt="">
                            <div class="flex-1 space-y-1">
                              <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium">${instance.title} </h3>
                                <p class="text-sm text-gray-500">${instance.note}</p>
                              </div>
                              <p class="text-sm text-gray-500">${instance.detail}</p>
                            </div>
                          </div>
                        ${close}
                    </li>`;
        }  
        return instance;
    } 
    return module;
});
define('components/list_detailed',["jquery",'components/base','components/list_detailed_item','components/uuid4'], function($,base,list_item_detailed) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        var demo_items = ['<li> "items" a collection of items</li>'];
        demo_items.push(list_item_detailed.create({}));
        demo_items.push(list_item_detailed.create({}));

        instance.items = instance.extract_field(data['items'],demo_items);
        
        instance.reload = function()
        {
            $(`#${instance.id()} ul`).empty();
            $(`#${instance.id()} ul`).html(instance.extract_html(instance.items));
            instance.bind();
        }
        instance.render = function()
        {
            return `<div id='${instance['_id']}' >
                      <ul role="list" class="divide-y divide-gray-200">
                          ${instance.extract_html(instance.items)}
                      </ul>
                    </div>`;
        } 
        instance.bind = function()
        {
            instance.items.forEach(function(item){ 
                if (item.bind != undefined)
                    item.bind();
            });
        }
        return instance;
    } 
    return module;
});
define('components/list_detailed_component',["jquery",'components/base','components/uuid4'], function($,base) {
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
define('components/object_form',["jquery",'components/base','components/uuid4'], function($,base) {
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

define('components/object_field_text',["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.field_title = instance.extract_field(data['title'],"'title' field");
        instance.field_name = instance.extract_field(data['name'],"'name' field");
        instance.field_type = instance.extract_field(data['name'],"text");
        instance.render = function()
        {
            return `
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="${instance.field_name}" class="block text-sm font-medium text-gray-700">
                    ${instance.field_title}
                  </label>
                  <div class="mt-1">
                    <input  name="${instance.field_name}" type="${instance.field_type}" id="${instance.id()}" placeholder="${instance.field_name}" class="shadow-sm block h-8 p-2 w-full border-black rounded-md">
                  </div>
                </div>
              </div>`;
        } 
        instance.bind = function()
        {
            
        }
        return instance;
    } 
    return module;
});

define('components/object_field_container',["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.items = [];
        instance.field_title = instance.extract_field(data['title'],"'title' field");
        instance.field_name = instance.extract_field(data['name'],"'name' field");
        instance.field_control = instance.extract_field(data['control'],"assign controls to 'control' field");
        instance.render = function()
        {
            return `
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="${instance.field_name}" class="block text-sm font-medium text-gray-700">
                    ${instance.field_title}
                  </label>
                  <div class="mt-1">
                   ${instance.extract_html(instance.field_control)}
                  </div>
                </div>
              </div>`;
        } 
        instance.bind = function()
        {
            instance.field_control.bind();
        }
        return instance;
    } 
    return module;
});

define('components/button',['require','jquery','components/base','components/button','components/uuid4'],function (require,$,base,button) 
{
    var module = {'dependencies':{}};
    
    module.create = function(data)
    {
        var instance = base.create(data);
        instance['label'] = instance.extract_field(data.label,"'label' field");
        instance['on_click'] =  instance.extract_field(data.on_click,function(){alert("'on_click' field needs to be assigned")});
        
        module.head = function()
        {
            return  "";
        } 
        instance.show_loader = function()
        {
            //alert("spinning");
            $("#"+instance.id()+" .animate-spin").fadeIn(10);
            $("#"+instance.id()+" .label").css('opacity',0.0);
            
        }
        instance.hide_loader = function()
        {
            $("#"+instance.id()+" .animate-spin").fadeOut(10);
            $("#"+instance.id()+" .label").css('opacity',1.0);
        }
        instance.mobile_classes = "";
        if (instance.is_mobile()==true)
        {
            instance.mobile_classes = " text-4xl ";
        }
        
        instance.render = function()
        {
            return  `<button id='${instance.id()}' type="button" class=" ${instance.mobile_classes} relative inline-flex items-center mx-1.5 px-4 py-2 border border-transparent shadow-sm text-sm font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg class="animate-spin h-5 w-5 mr-3" style="display:none; position:absolute;" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>          

            <p class='label' >${instance['label']}</p>
          </button>`;
        } 
        instance.click_decorate = function(event)
        {
            
            instance.show_loader();
            instance.on_click(event);
            setTimeout(function(){ instance.hide_loader(); }, 800);            
            
        }
        instance.bind = function()
        {
            $("div #"+instance.id()).click(instance['click_decorate']);
        } 
        return instance
    } 
    
    return module;
});
define('components/link',['require','jquery','components/base','components/uuid4'],function (require,$,base) 
{
    var module = {'dependencies':{
                                }
                 };
    
    module.create = function(data)
    {
        var instance = base.create(data);
        instance['__id'] = "link_"+uuid4();
        instance['label'] = data.label;
        instance['on_click'] = data.on_click;
        instance['classes'] = instance.extract_field(data.classes,"text-white hover:text-gray-300") ;
        
        //return  true;
        module.head = function()
        {
            return  "";
        } 
        
        instance.render = function()
        {
            return  `<a  id='${instance['__id']}' href="#" class="text-base font-medium ${instance['classes']}">${instance['label']}</a>`;
        } 
        instance.click_decorate = function(event)
        {
            instance.on_click(event);
        }
        instance.bind = function()
        {
            $("div #"+instance.__id).click(instance['on_click']);
        } 
        return instance
    } 
    
    return module;
});
define('app/page_dashboard',["jquery","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link'], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link) {
    var module = { 'dependencies':{ } };
    module.create = function(data)
    {
        /*
            instance.subs_add('item_1');
            instance.subs_add('item_l1','l1');
            instance.subs_add('item_3','l6');
            instance.subs_add('item_4','l2');
            instance.subs_add('item_5','l1a/l2a/l3a');
            instance.subs_add('item_6','l2/l3');
            var f = instance.subs_get_children
            console.log("testing subs");
            console.log(JSON.stringify(f())); // item
            console.log(JSON.stringify(f(''))); // item
            console.log(JSON.stringify(f('/'))); // item
            console.log(JSON.stringify(f('l2/l3'))); // item
            console.log(JSON.stringify(f('/l2/l3'))); // item
            console.log(JSON.stringify(f('l2/l3/'))); // item
            console.log(JSON.stringify(f('l1'))); // item
            console.log(JSON.stringify(f('l2/l7'))); // null
            console.log(JSON.stringify(f('/l1'))); // item
            console.log(JSON.stringify(f('l1/'))); // item
            console.log(JSON.stringify(f('/l1/'))); // item
            console.log(JSON.stringify(f('l1'))); // item
        
        */
        
        
        var instance =base.create(data);
        var fields = []

  
        instance.create_user_edit_form = function(main,sub,comp)
        {
            // Create sections
            var temp = "";
            var save =  button.create({'label':'Save','on_click':function(){alert('saving');}}); 
            fields.push(field_text.create({'name':'username','title':'Username','type':'text'}))  
            fields.push(field_text.create({'name':'usernote','title':'User note','type':'text'}))  
            fields.push(field_text.create({'name':'password','title':'New password','type':'password'}))  
            fields.push(field_text.create({'name':'password','title':'Confirm new password','type':'password'}))          
            fields.push(field_container.create({'name':'actions', 'title':'Actions', 'control':save })  );
            temp = object_form.create({'title':"Edit User", 'subtitle':"Change any user settings here.", 'fields':fields, });
            instance.subs_add(temp,comp+'/edit_user');
            
            
            
            //Side bar big
            var welcome = li.create({'component':link.create({'label':`Welcome 2`,
                                                                'classes':"text-gray hover:text-gray-700",
                                                                'on_click':function(){
                                                                                    alert(5);
                                                                                     }})});
            var demo = li.create({'component':link.create({'label':`Demo 2 `,
                                                                'classes':"text-gray hover:text-gray-700",
                                                                'on_click':function(){alert(6)}})});


            instance.subs_add(welcome,sub+'/welcome2');
            instance.subs_add(demo,sub+'/demo2');
            
            
            // Main Items
            var account = li.create({'component':link.create({'label':`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
    </svg>`,'on_click':function(){
                                instance.hide_components();
                                instance.hide_subs();
                                welcome.show();
                                demo.show();
                                temp.show();
                                 }})});
            
            
            instance.subs_add(account,main+'/account');
            
            
        }
        
        instance.create_welcome = function(main,sub,comp)
        {
            // Create sections
            var temp = "";
            $.ajaxSetup({async:false});            
            $.get('content/welcome_section.json', function(s) {temp = section_split.create(s);});            
            instance.subs_add(temp,comp+'/welcome');
            
            
            
            //Side bar big
            var welcome = li.create({'component':link.create({'label':`Welcome`,
                                                                'classes':"text-gray hover:text-gray-700",
                                                                'on_click':function(){
                                                                                    alert(5);
                                                                                     }})});
            var demo = li.create({'component':link.create({'label':`Demo`,
                                                                'classes':"text-gray hover:text-gray-700",
                                                                'on_click':function(){alert(6)}})});


            instance.subs_add(welcome,sub+'/welcome');
            instance.subs_add(demo,sub+'/demo');
            
            // Main Link
            var home = 
li.create({'component':link.create({'label':`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>`,'on_click':function(){
                                            instance.hide_components();
                                            instance.hide_subs();
                                            welcome.show();
                                            demo.show();
                                            temp.show();
                                         }})});
            instance.subs_add(home,main+'/home');
        }
        
        
        instance.create_welcome('main','sub','components');
        instance.create_user_edit_form('main','sub','components');
        
        
        console.log("------------- MAIN CHILDREN ----------------------"); // item
        console.log(JSON.stringify(instance.subs_get_children('main'))); // item

        
        instance['dashboard'] = dashboard.create({
                    'header_bar' : data['header'], 
                    'nav_items'  : list_detaied.create({'items':instance.subs_get_children('main')}) ,
                    'bar_items'  : list_detaied.create({'items':instance.subs_get_children('sub')}),
                    'main_items' : instance.subs_get_children('components')
                    });
        //,instance.welcome_form]
        instance.head = function() { return ""; } 
        instance.id = function()   { return "page_dashboard_gfudaabcc"; } 
        instance.bind = function() { } 
        instance.hide = function() { instance['dashboard'].hide(); $(`#${instance.id()}`).fadeOut(10);   } 
        instance.show = function() 
        {
            $(`#${instance.id()}`).fadeIn(10); 
            instance['dashboard'].show(); 
        } 
        
        instance.render = function()
        {
            instance['dashboard_html'] = instance['dashboard'].render() ;
            return `<div class="min-h-screen" id="${instance.id()}" style='display:none;' >${instance['dashboard_html']}</div>`;
        } 
        instance.hide_components = function()
        {
            instance.subs_get_children('components').forEach(function(form){form.hide()});
        }
        instance.hide_subs = function()
        {
            instance.subs_get_children('sub').forEach(function(form){form.hide()});
        }
        
        instance.bind = function()
        {
            instance.hide_components();
            instance.hide_subs();
            instance.dashboard.bind();
        }
        return instance;
    } 
    return module;
});
define('components/header_navlist',["jquery",'components/base','components/link','components/uuid4'], function($,base,link) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance['left_items'] =data['left_items']; // pass as mem_list
        /* instance['left_items'] = EXAMPLE:
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Product</a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Features</a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Marketplace</a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Company</a>
        */
        
        instance['right_items'] =data['right_items']; // pass as mem_list
        /*
            <div class="mt-6 px-5">
              <a href="#" class="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700">Start free trial</a>
            </div>
            <div class="mt-6 px-5">
              <p class="text-center text-base font-medium text-gray-500">Existing customer? <a href="#" class="text-gray-900 hover:underline">Login</a></p>
            </div>
        */
        
        instance['logo_item'] =data['logo_item']; // pass as mem_list
        //instance['logo'] = instance.extract_field(data['logo'],`<img class="h-8 w-auto" src="assets/decelium_logo_small.png" alt="">`);
        instance['logo'] = undefined;
        if (data['logo'])
        {
            instance['logo'] = instance.extract_field(data['logo'],``);
        }
        instance['_id'] ='header_'+uuid4();
        instance['_id_mobile'] ='header_'+uuid4();
        
        instance.hide_link = link.create({'label':`<span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>`, 'on_click':function(){$(`#${instance['_id_mobile']}`).fadeOut(100);}});
        instance.show_link = link.create({'label':`
                              <span class="sr-only">Open main menu</span>
                              <!-- Heroicon name: outline/menu -->
                              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>`, 'on_click':function(){$(`#${instance['_id_mobile']}`).fadeIn(100);}});

        instance.mobile_hide_menu = `<button type="button" class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                            <span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>CLOSE2
                          </button>`;
        
           instance.mobile_show_menu = `<button type="button" class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white" aria-expanded="false">
                              <span class="sr-only">Open main menu</span>
                              <!-- Heroicon name: outline/menu -->
                              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                            </button>`;
        
        instance.mobile_hide_menu = instance.hide_link.render();
        instance.mobile_show_menu = instance.show_link.render();
        
        instance.head = function()
        {
            return "";
        } 
        
        instance.id = function()
        {
            return instance['_id'];
        }
        
        instance.extract_html_menu = function(items,pre,post)
        {
            var html = "";
            if (pre == undefined)
                pre = "";
            if (post == undefined)
                post = "";
            if (items == undefined)
                html = "";
            else if (typeof items === 'string' || items instanceof String)
            {
                 return pre+items+post;
            }
            else
            {
                html = "";
                items.forEach(function(item){
                    if (item.render == undefined)
                        html += pre+item+post;
                    else
                        html += pre+item.render()+post;
                });
            }
            return html;
        }
        
        instance.render = function()
        { 
            var logo_html_top = "";
            if (instance.logo)
               logo_html_top = `<a href="#" class ='md:mr-10'  >${instance.logo}</a>`;  
            else
                logo_html_top = '';
            
            var logo_html_bottom = "";
            if (instance.logo)
               logo_html_bottom = `<div >${instance.logo}</div>`;  
            else
                logo_html_bottom = '';
            //class="flex-shrink-0 relative h-16 bg-white flex items-center"
            return ` 
                <header class="relative"  id='${instance['_id']}'>
                  <div class=" pt-6">
                    <nav class="relative mx-auto flex items-center justify-between px-4 pb-5 sm:px-6" aria-label="Global">
                      <div class="flex items-center flex-1">
                        <div class="flex items-center justify-between w-full md:w-auto">
                            ${logo_html_top}
                          <div class="-mr-2 flex items-center md:hidden">
                            ${instance.mobile_show_menu}
                          </div>
                        </div>
                        <div class="hidden space-x-8 md:flex ">
                         ${instance.extract_html(instance.left_items)}
                        </div>
                      </div>
                      <div class="hidden md:flex md:items-center md:space-x-6">
                         ${instance.extract_html(instance.right_items)}
                      </div>
                    </nav>
                  </div>

                  <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden" style='display:none;z-index: 11;' id='${instance['_id_mobile']}'>
                    <div class="rounded-lg shadow-md bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div class="px-5 pt-4 flex items-center justify-between">
                        <div class="-mr-2">
                            ${instance.mobile_hide_menu}
                        </div>
                      </div>
                      <div class="pt-5 pb-6">
                        <div class="px-2 space-y-1">
                         ${instance.extract_html(instance.left_items,`<div class="mt-6 px-5 text-center">`,`</div>`)}
                        </div>
                        <div class="px-2 space-y-1">
                         ${instance.extract_html(instance.right_items,`<div class="mt-6 px-5 text-center">`,`</div>`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </header>`;
        } 
        instance.bind= function()
        {
            var lst = [instance.show_link,instance.hide_link,instance.signin];
            lst = lst.concat( instance.right_items);
            lst.forEach(function(i){
                if (i != undefined && i.bind != undefined  )
                    i.bind();
            });
        } 
        
        return instance;
    } 
    return module;
});

define('components/alert',['jquery','jquery_ui','components/uuid4'],function ($,jui) 
{
    var module = {'dependencies':{}
                 };
    module.create = function(args)
    {
        var instance ={};
        instance['html'] = args.html;
        instance['_id'] ='section_'+uuid4();
        
        
        instance['color'] = args.color;
        if (instance.color == undefined)
        {
            instance['color'] = 'red';
        }
        
        instance.head = function()
        {
            return  "";
        }
        
        instance.render = function()
        {
            var html =`<div id='simple_alert${instance['_id']}' style='display:none;' class="rounded-md bg-${instance['color']}-50 p-4 absolute top-10 left-5 ">
  <div class="flex">
    <div class="flex-shrink-0">
      <!-- Heroicon name: solid/check-circle -->
      <svg class="h-5 w-5 text-${instance['color']}-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-${instance['color']}-800 simple_alert_inner">
        ${instance['html']}
        </p>
    </div>
    <div class="ml-auto pl-3">
      <div class="-mx-1.5 -my-1.5">
        <button type="button" class="inline-flex bg-${instance['color']}-50 rounded-md p-1.5 text-${instance['color']}-500 hover:bg-${instance['color']}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${instance['color']}-50 focus:ring-${instance['color']}-600">
          <span class="sr-only">Dismiss</span>
          <!-- Heroicon name: solid/x -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>`;
            return  html;
        } 
        instance.show = function()
        {
            $(`#simple_alert${instance['_id']} .simple_alert_inner`).html(instance['html']);
            $(`#simple_alert${instance['_id']} `).fadeIn();
            $(`#simple_alert${instance['_id']} `).fadeOut(3500);
        } 
        return instance;
        
    } 
    return module;
});
define('components/contact_simple',["jquery","doencode","paxdk",'components/alert','components/cookie'], function($,doencode,paxdk,alert_module,cookie) {
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
define('components/z-block',["jquery",'zdog','components/uuid4'], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='section_'+uuid4();
        instance.html = data.html;
        instance.r = {}
        instance.r.cur = [0,0,0];
        instance.r.min = [-360,-360,-360];
        instance.r.max = [360,360,360];
        instance.r.offset = [0,0,0];
        instance.r.factor = [0,0,0];

        instance.t = {}
        instance.t.cur = [0,0,0];
        instance.t.min = [-1000,-1000,-1000];
        instance.t.max = [1000,1000,1000];
        instance.t.offset = [0,0,0];
        instance.t.factor = [0,0,0];
        
        ['r','t'].forEach(function(var_type){
            ['cur','min','max','offset','factor'].forEach(function(var_name){
                if (data[var_type] != undefined && data[var_type][var_name] != undefined )
                    instance[var_type][var_name] = data[var_type][var_name];
            });
        });
        
        instance.head = function()
        {
            return "";
        } 
        
        instance.render = function()
        {
            return `<div id='img_rot_${instance['_id']}'>${instance.html}</div>`;
        } 
        instance.bind= function()
        {
            function animate() 
            {
              var elem = document.getElementById(`img_rot_${instance['_id']}`);
              //get the distance scrolled on body (by default can be changed)
              var distanceScrolled = document.body.scrollTop;
              //create viewport offset object
              var elemRect = elem.getBoundingClientRect();
              //get the offset from the element to the viewport
              var elemViewportOffset = elemRect.top;
              //add them together
              var totalOffset = distanceScrolled + elemViewportOffset;
              var ang  = (totalOffset /100)%360;
                
              var dimensions = [0,1,2];
              var collections = [instance.r,instance.t];
              dimensions.forEach(function(d){
                  collections.forEach(function(c){
                    c.cur[d] = c.offset[d] + ang*c.factor[d]
                    if (c.min[d] != undefined && c.cur[d] < c.min[d])
                         c.cur[d] = c.min[d]; 
                    if (c.max[d] != undefined && c.cur[d] > c.max[d])
                         c.cur[d] = c.max[d]; 
                  });
              });
              
              var rx = instance.r.cur[0];
              var ry = instance.r.cur[1];
              var rz = instance.r.cur[2];
              var tx = instance.t.cur[0];
              var ty = instance.t.cur[1];
              var tz = instance.t.cur[2];
              elem.style.transform = "rotateX("+rx+"deg) rotateY("+ry+"deg) rotateZ("+rz+"deg) translate("+tx+"px,"+ty+"px)";                
              setTimeout(animate, 3);            
            }
            setTimeout(animate, 3);            
        } 
        return instance;
    } 
    return module;
});
define('components/popup',["jquery","components/base","components/link",'components/uuid4'], 
function($,base,link) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.close_link = link.create({'on_click':function (event){instance.hide(); event.preventDefault();},
                                           'label':`<div class=" sm:block absolute top-0 right-0 pt-4 pr-4">
              <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="open = false">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" x-description="Heroicon name: outline/x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
</svg>
              </button>
            </div>`});
        
        instance.controls =  data.controls;
        
        
        instance.bind = function (){
            instance.close_link.bind();
            instance.controls.bind();
        }
        
        instance.render = function ()
        {
            return `<div id='${instance.id()}' style='display:none;' class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6">
    ${instance.extract_html(instance.close_link)}
    ${instance.extract_html(instance.controls)}
    
    </div>
  </div>
</div>`;
        
        }
        return instance;
    } 
    return module;
});


define('components/form_create_user',["jquery","components/base","components/link","components/button",
        "components/object_field_container","components/object_field_text","components/object_form",
        'components/uuid4'], 
function($,base,link,button, field_container,field_text,object_form) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create({});
        var fields = [];
        instance.appstate = data.appstate;
        var uname = field_text.create({'name':'username','title':'Username','type':'text'});
        var unote = field_text.create({'name':'usernote','title':'User note','type':'text'});  
        var pass1 = field_text.create({'name':'password','title':'New password','type':'password'});  
        var pass2 = field_text.create({'name':'password','title':'Confirm new password','type':'password'});
        var save =  button.create({'label':'Save',
                                   'on_click':function()
                                       {
                                           var username = $(`#${uname.id()}`).val();
                                           var password1 = $(`#${unote.id()}`).val();
                                           var password2 = $(`#${unote.id()}`).val();
                                           var success = function(data){alert(JSON.stringify(data))};
                                           var fail = function(data){alert(JSON.stringify(data))};
                                           instance.appstate.user_register(username,password1,password2,success,fail);
                                       }
                                  }); 
        
        fields = [uname,unote,pass1,pass2];
        fields.push(field_container.create({'name':'actions', 'title':'Actions', 'control':save })  );
        instance.create_form = object_form.create({'title':"Create User", 
                                            'subtitle':"Register a new user.", 
                                            'fields':fields, });
        instance.subs_add(instance.create_form,'create_user');
        
        instance.bind = function ()   { instance.subs_get_children().forEach(function(item){item.bind()}); }
        instance.show = function ()   { instance.create_form.show(); }
        instance.hide = function ()   { instance.create_form.hide(); }
        instance.render = function () { return  instance.extract_html(instance.create_form); }
        return instance;
    } 
    return module;
});
define('components/signin_userpass',["jquery","doencode","paxdk",'components/alert','components/cookie','components/popup','components/form_create_user','components/link'], 
       function($,doencode,paxdk,alert_module,cookie,popup,form_create_user,link) {
    var module = {
        'dependencies':{
            'alert':alert_module,
            'logout_html_link':`<a href="#"  id='simple_logout' class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" >
                  Sign Out
                </a>`,
            'form_html':`<div class="mt-6">

            <form action="#"  id='signin_userpass_form' method="POST" class="space-y-6 ">
            <div class="space-y-1">
              <label for="username" class="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div class="mt-1">
                <input id="userpass_username" name="password"  autocomplete="current-username" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="space-y-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                PasswordSSS
              </label>
              <div class="mt-1">
                <input id="userpass_password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
            if (control_type == 'login_form')
                return instance['form_html']+instance['alert_component'].render()+ instance['register_link'].render()+instance.f_create_user.render();
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
            instance['register_link'].bind();
            instance.f_create_user.bind();
            $(document).ready(function()
            {   
                $('#simple_logout').click(function(event)
                {
                    instance['appstate'].user_logout(instance.on_logout);
                });
                $('#signin_userpass_form').submit(function(event)
                {
                    username = $('#userpass_username').val();
                    password = $('#userpass_password').val();
                    event.preventDefault();
                    instance['appstate'].user_login_userpass(username,password,instance.on_login,instance['alert_component'].show);
                });
            });        
        }
        return instance;
    } 
    return module;
});
define('components/form_book_demo',["jquery","components/base","components/link","components/button",
        "components/object_field_container","components/object_field_text","components/object_form",
        'components/uuid4'], 
function($,base,link,button, field_container,field_text,object_form) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create({});
        var fields = [];
        instance.on_finish = data.on_finish;
        instance.appstate = data.appstate;
        instance.form_controls = {}
        instance.form_controls['first_name'] = field_text.create({'name':'first_name','title':'First Name','type':'text'});
        instance.form_controls['last_name'] = field_text.create({'name':'last_name','title':'Last Name','type':'text'});  
        instance.form_controls['company'] = field_text.create({'name':'company','title':'Company Name','type':'text'});  
        instance.form_controls['email'] = field_text.create({'name':'email','title':'Business Email','type':'text'});  
        instance.form_controls['phone'] = field_text.create({'name':'phone','title':'Phone Number','type':'text'});  
        var save =  button.create({'label':'Finish Booking',
                                   'on_click':function()
                                       {
                                           var form_data = {}
                                           Object.keys(instance.form_controls).forEach(function(c_name)
                                           {
                                               var cntrl = instance.form_controls[c_name]; 
                                               form_data[c_name]= $(`#${cntrl.id()}`).val();
                                           });
                                           var success = function(data){alert(JSON.stringify(data))};
                                           var fail = function(data){alert(JSON.stringify(data))};
                                            var destroy = {'api_key':"pkey-a0f8540cacc41427ae251101ce1dc1f612068ffcbe9801f27294251a",
                                                             'address':form_data['email'],
                                                             'subject':"Demo Booking",
                                                             'text':JSON.stringify(form_data),
                                                          }
                                            instance.appstate.get('pq').query('send_email',destroy,function(data) 
                                            {
                                                alert("success");
                                                if (instance.on_finish) instance.on_finish();
                                            });            
                                       }
                                  }); 
        Object.values = Object.values || function(o){return Object.keys(o).map(function(k){return o[k]})};
        
        fields = Object.values(instance.form_controls);
        fields.push(field_container.create({'name':'actions', 'title':'', 'control':save })  );
        instance.create_form = object_form.create({'title':"Book A Demo", 
                                            'subtitle':"Someone from the team will get back to you right away!", 
                                            'fields':fields, });
        instance.subs_add(instance.create_form,'book_demo');
        
        instance.bind = function ()   { instance.subs_get_children().forEach(function(item){item.bind()}); }
        instance.show = function ()   { instance.create_form.show(); }
        instance.hide = function ()   { instance.create_form.hide(); }
        instance.render = function () { return  instance.extract_html(instance.create_form); }
        return instance;
    } 
    return module;
});




define('components/z-section',["jquery",'components/base','zdog'], function($,base) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.head = function()
        {
            return "";
        } 
        
        
        instance.render = function()
        {
            
            return ` 
                <canvas class="zdog-canvas" width="240" height="240" id='${instance.id()}'></canvas>
            `;
        } 
        instance.bind= function()
        {
            let illo = new Zdog.Illustration({
              // set canvas with selector
              element: '.zdog-canvas',
            });

            // add circle
            /*
            new Zdog.Ellipse({
              addTo: illo,
              diameter: 80,
              stroke: 20,
              color: '#636',
            });
            */
            let box = new Zdog.Box({
              addTo: illo,
              width: 120,
              height: 100,
              depth: 80,
              rotate: { x: -Zdog.TAU/8, y: Zdog.TAU/8 },
              stroke: false,
              color: '#C25', // default face color
              leftFace: '#EA0',
              rightFace: '#E62',
              topFace: '#ED0',
              bottomFace: '#636',
            });
            // update & render
            illo.updateRenderGraph();     
            
            // ANIMATE
            function animate() {
              // rotate illo each frame
              illo.rotate.y += 0.03;
              illo.updateRenderGraph();
              // animate next frame
              requestAnimationFrame( animate );
            }
            // start animation
            animate();            
        } 
        
        return instance;
    } 
    return module;
});
define('assets/phone_big',[],function(){
                    data = "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";
                    return {
                    "base64":data,
                    "src":"data:image/png;base64,"+data
                            }
                    });
define('assets/phone_small',[],function(){
                    data = "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";
                    return {
                    "base64":data,
                    "src":"data:image/png;base64,"+data
                            }
                    });
define('assets/mid_phone',[],function(){
                    data = "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";
                    return {
                    "base64":data,
                    "src":"data:image/png;base64,"+data
                            }
                    });
define('assets/main_section_01',[],function(){return {
    "left_instance": "<p style='margin-top:4.2em;' ><svg width='470' height='52' viewBox='0 0 470 52' fill='none' xmlns='http://www.w3.org/2000/svg'>\n<path d='M32.7861 38.9346C32.7861 37.4535 32.5355 36.1318 32.0342 34.9697C31.5329 33.7848 30.7012 32.7367 29.5391 31.8252C28.3997 30.891 26.8958 30.0251 25.0273 29.2275C23.1589 28.43 20.8574 27.6553 18.123 26.9033C15.6165 26.2197 13.3493 25.4792 11.3213 24.6816C9.31608 23.8613 7.5957 22.9271 6.16016 21.8789C4.7474 20.8307 3.66504 19.5889 2.91309 18.1533C2.16113 16.695 1.78516 14.9746 1.78516 12.9922C1.78516 11.0781 2.19531 9.35775 3.01562 7.83105C3.83594 6.30436 4.98665 5.00553 6.46777 3.93457C7.97168 2.84082 9.72624 2.00911 11.7314 1.43945C13.7594 0.847005 15.9697 0.550781 18.3623 0.550781C21.7119 0.550781 24.64 1.1888 27.1465 2.46484C29.653 3.7181 31.6126 5.46126 33.0254 7.69434C34.4382 9.90462 35.1445 12.4453 35.1445 15.3164H32.376C32.376 12.9694 31.7949 10.873 30.6328 9.02734C29.4935 7.18164 27.8757 5.7347 25.7793 4.68652C23.7057 3.61556 21.2334 3.08008 18.3623 3.08008C15.4001 3.08008 12.8822 3.53581 10.8086 4.44727C8.75781 5.35872 7.19694 6.56641 6.12598 8.07031C5.0778 9.55143 4.55371 11.1693 4.55371 12.9238C4.55371 14.1771 4.78158 15.3506 5.2373 16.4443C5.71582 17.5381 6.49056 18.5407 7.56152 19.4521C8.65527 20.3636 10.125 21.2295 11.9707 22.0498C13.8392 22.8473 16.1634 23.6221 18.9434 24.374C21.4954 25.0348 23.7855 25.7868 25.8135 26.6299C27.8643 27.4502 29.6188 28.4186 31.0771 29.5352C32.5355 30.6517 33.652 31.9733 34.4268 33.5C35.2015 35.0267 35.5889 36.8154 35.5889 38.8662C35.5889 40.8942 35.1559 42.7057 34.29 44.3008C33.4242 45.873 32.2165 47.2174 30.667 48.334C29.1403 49.4277 27.3402 50.2594 25.2666 50.8291C23.2158 51.3988 21.0055 51.6836 18.6357 51.6836C16.471 51.6836 14.2949 51.4215 12.1074 50.8975C9.94271 50.3734 7.96029 49.5303 6.16016 48.3682C4.36003 47.2061 2.91309 45.6794 1.81934 43.7881C0.725586 41.8968 0.178711 39.5954 0.178711 36.8838H2.94727C2.94727 39.208 3.42578 41.1676 4.38281 42.7627C5.33984 44.335 6.5931 45.5882 8.14258 46.5225C9.69206 47.4567 11.3783 48.1289 13.2012 48.5391C15.0469 48.9492 16.8584 49.1543 18.6357 49.1543C21.4157 49.1543 23.8652 48.7327 25.9844 47.8896C28.1263 47.0238 29.7897 45.8275 30.9746 44.3008C32.1823 42.7513 32.7861 40.9626 32.7861 38.9346ZM82.6133 48.4707V51H53.5947V48.4707H82.6133ZM54.8252 1.23438V51H52.0566V1.23438H54.8252ZM79.127 24.1006V26.6641H53.5947V24.1006H79.127ZM82.5449 1.23438V3.76367H53.5947V1.23438H82.5449ZM98.7734 1.23438H114.735C118.017 1.23438 120.899 1.79264 123.383 2.90918C125.867 4.02572 127.803 5.65495 129.193 7.79688C130.606 9.9388 131.312 12.5706 131.312 15.6924C131.312 18.085 130.8 20.2497 129.774 22.1865C128.749 24.1234 127.359 25.7298 125.604 27.0059C123.85 28.2591 121.868 29.0794 119.657 29.4668L118.461 29.9111H100.106L100.038 27.3818H116.137C118.894 27.3818 121.184 26.8236 123.007 25.707C124.853 24.5905 126.231 23.1436 127.143 21.3662C128.077 19.5661 128.544 17.6748 128.544 15.6924C128.544 13.2087 127.986 11.0895 126.869 9.33496C125.775 7.55762 124.192 6.19043 122.118 5.2334C120.067 4.25358 117.606 3.76367 114.735 3.76367H101.542V51H98.7734V1.23438ZM130.458 51L117.128 28.9199L120.204 28.8857L133.397 50.5215V51H130.458ZM165.827 45.6338L182.131 1.23438H185.139L166.579 51H164.187L165.827 45.6338ZM148.088 1.23438L164.392 45.6338L166.032 51H163.64L145.08 1.23438H148.088ZM230.488 48.4707V51H201.47V48.4707H230.488ZM202.7 1.23438V51H199.932V1.23438H202.7ZM227.002 24.1006V26.6641H201.47V24.1006H227.002ZM230.42 1.23438V3.76367H201.47V1.23438H230.42ZM246.648 1.23438H262.61C265.892 1.23438 268.774 1.79264 271.258 2.90918C273.742 4.02572 275.678 5.65495 277.068 7.79688C278.481 9.9388 279.188 12.5706 279.188 15.6924C279.188 18.085 278.675 20.2497 277.649 22.1865C276.624 24.1234 275.234 25.7298 273.479 27.0059C271.725 28.2591 269.743 29.0794 267.532 29.4668L266.336 29.9111H247.981L247.913 27.3818H264.012C266.769 27.3818 269.059 26.8236 270.882 25.707C272.728 24.5905 274.106 23.1436 275.018 21.3662C275.952 19.5661 276.419 17.6748 276.419 15.6924C276.419 13.2087 275.861 11.0895 274.744 9.33496C273.65 7.55762 272.067 6.19043 269.993 5.2334C267.942 4.25358 265.481 3.76367 262.61 3.76367H249.417V51H246.648V1.23438ZM278.333 51L265.003 28.9199L268.079 28.8857L281.272 50.5215V51H278.333ZM327.066 48.4707V51H300.68V48.4707H327.066ZM301.91 1.23438V51H299.107V1.23438H301.91ZM373.1 48.4707V51H344.081V48.4707H373.1ZM345.312 1.23438V51H342.543V1.23438H345.312ZM369.613 24.1006V26.6641H344.081V24.1006H369.613ZM373.031 1.23438V3.76367H344.081V1.23438H373.031ZM418.552 38.9346C418.552 37.4535 418.301 36.1318 417.8 34.9697C417.299 33.7848 416.467 32.7367 415.305 31.8252C414.165 30.891 412.661 30.0251 410.793 29.2275C408.924 28.43 406.623 27.6553 403.889 26.9033C401.382 26.2197 399.115 25.4792 397.087 24.6816C395.082 23.8613 393.361 22.9271 391.926 21.8789C390.513 20.8307 389.431 19.5889 388.679 18.1533C387.927 16.695 387.551 14.9746 387.551 12.9922C387.551 11.0781 387.961 9.35775 388.781 7.83105C389.602 6.30436 390.752 5.00553 392.233 3.93457C393.737 2.84082 395.492 2.00911 397.497 1.43945C399.525 0.847005 401.735 0.550781 404.128 0.550781C407.478 0.550781 410.406 1.1888 412.912 2.46484C415.419 3.7181 417.378 5.46126 418.791 7.69434C420.204 9.90462 420.91 12.4453 420.91 15.3164H418.142C418.142 12.9694 417.561 10.873 416.398 9.02734C415.259 7.18164 413.641 5.7347 411.545 4.68652C409.471 3.61556 406.999 3.08008 404.128 3.08008C401.166 3.08008 398.648 3.53581 396.574 4.44727C394.523 5.35872 392.963 6.56641 391.892 8.07031C390.843 9.55143 390.319 11.1693 390.319 12.9238C390.319 14.1771 390.547 15.3506 391.003 16.4443C391.481 17.5381 392.256 18.5407 393.327 19.4521C394.421 20.3636 395.891 21.2295 397.736 22.0498C399.605 22.8473 401.929 23.6221 404.709 24.374C407.261 25.0348 409.551 25.7868 411.579 26.6299C413.63 27.4502 415.384 28.4186 416.843 29.5352C418.301 30.6517 419.418 31.9733 420.192 33.5C420.967 35.0267 421.354 36.8154 421.354 38.8662C421.354 40.8942 420.922 42.7057 420.056 44.3008C419.19 45.873 417.982 47.2174 416.433 48.334C414.906 49.4277 413.106 50.2594 411.032 50.8291C408.981 51.3988 406.771 51.6836 404.401 51.6836C402.237 51.6836 400.061 51.4215 397.873 50.8975C395.708 50.3734 393.726 49.5303 391.926 48.3682C390.126 47.2061 388.679 45.6794 387.585 43.7881C386.491 41.8968 385.944 39.5954 385.944 36.8838H388.713C388.713 39.208 389.191 41.1676 390.148 42.7627C391.105 44.335 392.359 45.5882 393.908 46.5225C395.458 47.4567 397.144 48.1289 398.967 48.5391C400.812 48.9492 402.624 49.1543 404.401 49.1543C407.181 49.1543 409.631 48.7327 411.75 47.8896C413.892 47.0238 415.555 45.8275 416.74 44.3008C417.948 42.7513 418.552 40.9626 418.552 38.9346ZM466.978 38.9346C466.978 37.4535 466.727 36.1318 466.226 34.9697C465.724 33.7848 464.893 32.7367 463.73 31.8252C462.591 30.891 461.087 30.0251 459.219 29.2275C457.35 28.43 455.049 27.6553 452.314 26.9033C449.808 26.2197 447.541 25.4792 445.513 24.6816C443.507 23.8613 441.787 22.9271 440.352 21.8789C438.939 20.8307 437.856 19.5889 437.104 18.1533C436.353 16.695 435.977 14.9746 435.977 12.9922C435.977 11.0781 436.387 9.35775 437.207 7.83105C438.027 6.30436 439.178 5.00553 440.659 3.93457C442.163 2.84082 443.918 2.00911 445.923 1.43945C447.951 0.847005 450.161 0.550781 452.554 0.550781C455.903 0.550781 458.831 1.1888 461.338 2.46484C463.844 3.7181 465.804 5.46126 467.217 7.69434C468.63 9.90462 469.336 12.4453 469.336 15.3164H466.567C466.567 12.9694 465.986 10.873 464.824 9.02734C463.685 7.18164 462.067 5.7347 459.971 4.68652C457.897 3.61556 455.425 3.08008 452.554 3.08008C449.591 3.08008 447.074 3.53581 445 4.44727C442.949 5.35872 441.388 6.56641 440.317 8.07031C439.269 9.55143 438.745 11.1693 438.745 12.9238C438.745 14.1771 438.973 15.3506 439.429 16.4443C439.907 17.5381 440.682 18.5407 441.753 19.4521C442.847 20.3636 444.316 21.2295 446.162 22.0498C448.031 22.8473 450.355 23.6221 453.135 24.374C455.687 25.0348 457.977 25.7868 460.005 26.6299C462.056 27.4502 463.81 28.4186 465.269 29.5352C466.727 30.6517 467.843 31.9733 468.618 33.5C469.393 35.0267 469.78 36.8154 469.78 38.8662C469.78 40.8942 469.347 42.7057 468.481 44.3008C467.616 45.873 466.408 47.2174 464.858 48.334C463.332 49.4277 461.532 50.2594 459.458 50.8291C457.407 51.3988 455.197 51.6836 452.827 51.6836C450.662 51.6836 448.486 51.4215 446.299 50.8975C444.134 50.3734 442.152 49.5303 440.352 48.3682C438.551 47.2061 437.104 45.6794 436.011 43.7881C434.917 41.8968 434.37 39.5954 434.37 36.8838H437.139C437.139 39.208 437.617 41.1676 438.574 42.7627C439.531 44.335 440.785 45.5882 442.334 46.5225C443.883 47.4567 445.57 48.1289 447.393 48.5391C449.238 48.9492 451.05 49.1543 452.827 49.1543C455.607 49.1543 458.057 48.7327 460.176 47.8896C462.318 47.0238 463.981 45.8275 465.166 44.3008C466.374 42.7513 466.978 40.9626 466.978 38.9346Z' fill='white'/>\n</svg></svg></p><p class='mt-2 mb-6'>by PAX FINANCIAL</p><h3 class='text-2xl font-extrabold text-white tracking-tight sm:text-3xl'>You launch the front-end, we automate the rest</h3><p class='mt-3 text-lg text-gray-500'>With zero setup, you can store players, transactions and support real-time multiplayer. Our technology supports USD, BTC, ETH, and wallets. </p>",
    "right_instance": "",
    "section_classes":"bg-gray-900"

}

;});
define('assets/main_section_02',[],function(){return {
    "right_instance": "<h3 class='text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl'>Manage Data and NFTs</h3><p class='mt-3 text-lg text-gray-500'>Without a back-end, support item management and in game economies. Design fee structures that work on and off chain to deliver royalties to your artists, game designers and users.</p><h3 class='text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl mt-7'>Issue Wallets & Cards</h3><p class='mt-3 text-lg text-gray-500'>Without a back-end, issue debit cards, and provide users financial dashboards and tools. Create your own crypto rewards program, and extract in app payments.</p><h3 class='text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl mt-7'>Run Whole Worlds</h3><p class='mt-3 text-lg text-gray-500'>Without a back-end, mange users, real-time multiplayer, NPCs, robots, and whole towns with our user and NPC  management tools. Run bots, and manage massive multiplayer campaigns that mix with financial accounts in the real world. Track and audit transactions seamlessly.</p>",
    "left_instance": "<img class='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none' src='https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg' alt='Inbox user interface'>",
    "section_classes":"bg-gray-200"
    
};});
define('assets/people',[],function(){return [{
    "first_name": "Christopher",
    "last_name": "Hemming",
    "about": "Hailing from a PhD in chemical physics, Chris looks at problems with a first principles perspective. With over hundreds of deployed streaming systems under his belt, Chris adds both his analytical talents and experiences with production systems to every project.",
    "image": "",
    "title": "Development Operations",
    "links": [{"icon":"ICON", "url":"http://google.com"}, {"icon":"ICON", "url":"http://google.com"}]
},
{
    "first_name": "Justin",
    "last_name": "Girard",
    "about": "Justin has been running software teams and projects for over a decade. He has managed the developemt of systems that support millions of users and many millions of messages per minute. He brings experience dealing with extremely scalable applications that need to store, search, and act at scale.",
    "title": "Project Manager",
    "image": "",
    "links": [{"icon":"ICON", "url":"http://google.com"}, {"icon":"ICON", "url":"http://google.com"}]
},
{
    "first_name": "Tyn",
    "last_name": "Soltys",
    "about": "Tyn has spent over a decade crafting user experience for brands and agencies. When building a user focused system, Tyn understands what questions to ask, so development teams avoid spending large sums of time building the wrong user experience.",
    "title": "UX Designer",
    "image": "",
    "links": [{"icon":"ICON", "url":"http://google.com"}, {"icon":"ICON", "url":"http://google.com"}]
}
];});
define('assets/demo_form',[],function(){return {"html": "<h3 class='text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl'>Unlock New Revenue Channels</h3><p class='mt-3 text-lg text-gray-500'>To set up a demo fill out some basic details and we will get in touch right away.</p><p class='mt-10 mb-3 text-lg text-gray-500' ><b>During this call we will cover:</b></p><ul class='list-decimal ml-10'><li>How to automate user-data management</li><li>How teams like yours are creating new revenues streams</li><li>Free  whitelabel team and user dashboard tools</li><li>Offering NFTs, debit cards, and new currencies</li></ul><p class='mt-10 mb-3 text-lg text-gray-500' ><b>Our technology is used by:</b></p><div class='flex flex-wrap'><div class='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 '><img src ='content/cibc_logo.png' ></div><div class='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 '><img src ='content/dnd_logo.png' ></div><div class='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 '><img src ='content/eth_logo.png' ></div></div>"};});
define('app/main',['jquery','require', 'components/content', 'components/section','components/section_split', 'components/mem_list', 'app/main_application_state', 
        'app/page_landing','app/page_team','components/page_signin_center','app/page_dashboard',
        'components/header_navlist','components/button','components/link','components/contact_simple','components/z-block','components/signin_userpass','components/popup','components/form_book_demo','components/z-section',
        'assets/phone_big','assets/phone_small','assets/mid_phone','assets/main_section_01','assets/main_section_02',
        'assets/people','assets/demo_form'

        
       ],
function ($,require,content,section,section_split,mem_list,appstate,
           page_landing,page_team,page_signin,page_dashboard,
           header,button,link,contact_simple,z_section,signin_simple,popup,form_book_demo,z_animation) 
{
    var module = {'dependencies':{}}; 
    
    module.create = function()
    {
        var instance = function (){};
        instance.all_sections = [];
        instance.init = function()
        {
            
                var img_1 = z_section.create({
                                'html':`<img style=" width:60%;height:auto; image-rendering: -webkit-optimize-contrast;" src="${require('assets/phone_big')['src']}"  >`,
                                'r':{'factor':[0,0,0],'offset':[0,0,20],'min':[0,0,0],'max':[0,0,0]},
                                't':{'factor':[0,0,0],'offset':[120,-20,0],'min':[-1000,-1000,-1000],'max':[1000,1000,1000]},});
                var img_2 = z_section.create({
                                'html':`<img  style="width:60%;height:auto;position:absolute; width:40%;height:auto;image-rendering: -webkit-optimize-contrast;" src="${require('assets/phone_small')['src']}"  >`,
                                'r':{'factor':[0,0,0],'offset':[0,0,0],'min':[0,0,0],'max':[0,0,0]},
                                't':{'factor':[0,0,0],'offset':[0,80,0],'min':[-1000,-1000,-1000],'max':[1000,1000,1000]},});
                var img_3 = z_section.create({
                                'html':`<img  src="${require('assets/mid_phone')['src']}" >`,
                                'r':{'factor':[0,0,0],'offset':[0,0,0],'min':[0,-40,-40],'max':[0,40,40]},
                                't':{'factor':[0,0,0],'offset':[0,0,0],'min':[-1000,-1000,-1000],'max':[1000,1000,1000]},});
                var img_4 = z_section.create({
                                'html':'<img  style="position:absolute;border-radius: 40px 40px 40px 40px; width:40%;height:auto;image-rendering: -webkit-optimize-contrast;" src="assets/game_01.png" class=" shadow-2xl">',
                                'r':{'factor':[0,0,0],'offset':[0,0,5],'min':[0,0,-40],'max':[0,0,40]},
                                't':{'factor':[0,0,0],'offset':[270,00,0],'min':[-1000,-1000,-1000],'max':[1000,1000,1000]},});
            // Bind events
            var right_links = ``;
            instance.contrib = link.create({'label':"Team", 'on_click':function(){alert(2)}})
            instance.home = link.create({'label':"Home", 'on_click':function(){alert(1)}})
            instance.sign_in = link.create({'label':"Sign In", 'on_click':function(){alert(1)}})
            instance.sign_out = link.create({'label':"Sign Out", 'on_click':function(){alert(1)},'classes':"text-gray hover:text-gray-700"})
            
            //
            var s = require('assets/demo_form');
            s = {'left_instance':s['html'],'right_instance':form_book_demo.create({'appstate':appstate,'on_finish':function(){instance.demo_form.hide();}})}
            var create_section = section_split.create(s)
            instance.demo_form = popup.create({'controls':create_section});
            instance.all_sections.push(instance.demo_form);
            instance.learn_more_butt =  button.create({'label':`BOOK DEMO`, 'on_click':function(){ instance.demo_form.show();}});            
            
            var header_instance = header.create({'left_items':[ instance.home,instance.contrib],
                                                'logo':'<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                'right_items':[instance.learn_more_butt],}); //instance.sign_in
            var logged_in_header_instance = header.create({'left_items':[],
                                                           'logo':'<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                           'right_items':[instance.sign_out],});
            
            // Bind events
            var sections_list = [];
            
            ///////// SECTION
            s = require('assets/main_section_01');
            instance.ue = z_animation.create({});
            if (!(instance.learn_more_butt.is_mobile()))
                s['left_instance'] = s['left_instance'] + `<div class='text-right mt-10' > ${instance.learn_more_butt.render()} </div>`; 
            else
                s['left_instance'] = s['left_instance']; 
            s['right_instance'] = mem_list.create([img_2,img_1]);
            s['m_cols_1'] = 8;
            s['m_cols_2'] = 0;
            s['background_image'] = `background-repeat: no-repeat; background-position: right; background-image: radial-gradient(circle at 350px 290px, rgba(255,255,255,0.04) 9%, transparent 24%),url("assets/big_pax_back.png");

            `;
            s['appstate'] = appstate;
            sections_list.push(section_split.create(s));
            
            
            ///////// SECTION 2
            s = require('assets/main_section_02');
            s['m_cols_1'] = 8;
            s['m_cols_2'] = 8;
            s['left_instance'] = img_3;
            if ((instance.learn_more_butt.is_mobile()))
            {
                var swap = s['right_instance'];
                s['right_instance'] = s['left_instance'];
                s['left_instance'] = swap;
            }
            //alert(s['right_instance']);
            s['right_instance'] = [s['right_instance'] , `<div class='text-right mt-10' > ${instance.learn_more_butt.render()} </div>`]; 
            sections_list.push(section_split.create(s));
            //$.get('content/main_section_03.json', function(s) {
            //    s['right_instance'] = mem_list.create([img_4,img_3]);
            //    sections_list.push(section_split.create(s));
            //}); 
            //////////////////////////
            //////////////////////////
            //////////////////////////
            var people = require('assets/people');
            
            instance.p_landing = page_landing.create({'header':header_instance, 'sections':sections_list});
            instance.all_sections.push(instance.p_landing);
            
            instance.p_team = page_team.create({'header':header_instance,'people':people});
            instance.all_sections.push(instance.p_team);
            
            instance.p_dashboard = page_dashboard.create({'header':logged_in_header_instance});
            instance.all_sections.push(instance.p_dashboard);
            
            //
            // SIGN IN 
            var signin_form =  signin_simple.create({'appstate':appstate,
                                                     'on_login':function(){
                                                                             instance.p_signin.hide();
                                                                             instance.p_dashboard.show();
                                                                          },
                                                     'on_logout':function(){alert('success logout')},
                                                     'control_type':'login_form'});
            instance.p_signin = page_signin.create({'header':header_instance,'form':signin_form,'logo':'app/logo.png','title':'CAPTURE'});
            instance.all_sections.push(instance.p_signin);
            
            // Bind events 
            instance.contrib.on_click = function (){instance.p_landing.hide();
                                                    instance.p_signin.hide();
                                                    instance.p_dashboard.hide();
                                                    instance.p_team.show();
                                                   };
            instance.home.on_click = function (){instance.p_team.hide();
                                                 instance.p_signin.hide();
                                                 instance.p_dashboard.hide();
                                                 instance.p_landing.show();
                                                };
            instance.sign_in.on_click = function (){instance.p_team.hide();
                                                   instance.p_landing.hide();
                                                   instance.p_dashboard.hide();
                                                   instance.p_signin.show();
                                                    instance.ue.hide();
                                                    
                                                   };
            instance.sign_out.on_click = function (){instance.p_team.hide();
                                                   instance.p_dashboard.hide();
                                                   instance.p_signin.hide();
                                                   instance.p_landing.show();                                                     
                                                   instance.ue.show();
                                                   appstate.user_logout();
                                                     
                                                   };
        }

        instance.head = function () {
            var img = `assets/pax_logo_small.png`;
            var title = `SERVERLESS&nbsp;|&nbsp;Pax Financial`;
            var desc = `Pax Financial allows you to focus on your app, instead of data.`;
            
            /*
            if ('speechSynthesis' in window) {
             // Speech Synthesis supported 🎉
            }else{
              // Speech Synthesis Not Supported 😣
              alert("Sorry, your browser doesn't support text to speech!");
            }            
            var msg = new SpeechSynthesisUtterance();
            msg.text = "Good Morning";
            msg.volume = 1.0;            
            window.speechSynthesis.speak(msg); 
            */
            //        
            var html = "";
            html = `
            <link rel="icon"  type="image/png"  href="${img}">            
            <title>${title}</title>
            <meta name="description" content="${desc}" />
            <!-- Schema.org markup for Google+ -->
            <meta itemprop="name" content="${title}">
            <meta itemprop="description" content="${desc}">
            <meta itemprop="image" content="${img}">

            <!-- Twitter Card data -->
            <meta name="twitter:card" content="${img}">
            <meta name="twitter:title" content="${title}">
            <meta name="twitter:description" content="${desc}">
            <meta name="twitter:image:src" content="${img}">

            <!-- Open Graph data -->
            <meta property="og:title" content="${title}" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="http://decelium.com/" />
            <meta property="og:image" content="${img}" />
            <meta property="og:description" content="${desc}" />
            <meta property="og:site_name" content="${title}" />
            <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
            <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" />
            <meta property="article:section" content="${desc}" />
            
            <style> 
            .modal-title
            {
            
            
            }
            .loot_page
            {
                background-color:#2B1B1B !important;
                padding: 15px !important;
                border: 1px solid #865454;
            }
            .loot_page button.bg-indigo-600,
            .loot_page button.bg-indigo-700
            {
                background-color:#865454 !important;
            }
            
            .loot_page .text-game-green
            {
                color:#C2FFB8 !important;
                font-size : 0.95em;
                line-height : 1.3em;
            }
            .loot_page .bg-white 
            {
                height:300px;
                border-radius:25px;
                background-color:#2A7631;
            }
            
            .loot_page header div
            {
                background-color:#2B1B1B !important;
            }
            </style>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">`;
            instance.all_sections.forEach(function(item){ html += item.head(); });
            
            return html
        }
        
        instance.render = function () 
        {
            var html = "";
            instance.all_sections.forEach(function(item){ html += item.render(); });
            return html
        }
        
        instance.bind = function () 
        {
            instance.all_sections.forEach(function(item){item.bind();});
            instance.home.bind();
            instance.contrib.bind();
            instance.sign_in.bind();
            instance.sign_out.bind();
            instance.ue.show();
            // Special buttons
            instance.learn_more_butt.bind();
            if (appstate.is_logged_in())
            {
                instance.p_landing.hide();
                instance.p_dashboard.show();
            }
            else
            {
                instance.p_dashboard.hide();
                instance.p_landing.show();
            }

        }
        
        instance.init();
        return instance;
    } 
    
    
    return module;
});
resolve = function(arg){
    var getUrl = window.location;
    var res = '';
    if (window.location.host.includes('localhost')|| window.location.host.includes('5000'))
        res =  arg.replace('-LOCATION-', window.location.host+'/rest');
    else
        res =  arg.replace('-LOCATION-', 'dev.paxfinancial.ai');//window.location.host);
    console.log( res);
    return res
}
requirejs.config({
    waitSeconds: 30,
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
        paxdk: resolve("//-LOCATION-/paxfinancial/view/paxdk"),
        doencode: resolve("//-LOCATION-/paxfinancial/view/doencode"),
        jquery_ui:"//code.jquery.com/ui/1.12.1/jquery-ui",
        d3:"//cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min",
        c3:"//cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min",
        zdog:'//unpkg.com/zdog@1/dist/zdog.dist.min'        
        
    }
});

require(['jquery','app/main','paxdk','doencode'], function($,app_main,pdk,doencode)
{
    app = app_main.create();
    $('head').append(app.head());
    $(document).ready(function()
    {
        var html =$('body').html();
        $('body').html(html+app.render());
        app.bind();
        $('body').fadeIn(200);
    });
});

define("app/launch", function(){});

