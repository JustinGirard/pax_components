define(["jquery",'components/uuid4'], function($) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance ={};
        instance.controls = data.controls;
        instance['_id'] ='obj_'+uuid4();
        instance.head = function() { return ""; } 
        instance.id = function()   { return instance['_id'];}
        instance.hide = () => { 
                                    $(`#${instance.id()}`).fadeOut(10); 
                                    if (instance.controls != undefined)
                                    {
                                        instance.recursive_do(instance.controls,'hide');
                                    }
                                   } 
        instance.show = function() { 
                                    $(`#${instance.id()}`).fadeIn(10); 
                                    if (instance.controls != undefined)
                                    {
                                        instance.recursive_do(instance.controls,'show');
                                    }
                                   } 
        
        
        instance.bind= function()  { if (instance.controls){instance.recursive_do(instance.controls,'bind');}} 
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
        instance.extract_html = function (variable,do_print=false,recur=1)
        {
            html = "";
            if($.isArray(variable))
            {
                variable.forEach(function(variable_inner)  { html = html  +instance.extract_single_html(variable_inner,do_print); });
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
        instance.recursive_do = function(obj,func_name)
        {
            if (obj != null) 
            {
                if($.isArray(obj))
                {
                     obj.forEach(function(item)
                     {
                        if (item[func_name] != null)
                            item[func_name]();
                     });
                }
                else if (obj[func_name] != null)
                    obj[func_name]();
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
            Object.keys(selected_location).forEach(function(item)
            {
                found_item = instance.subs_get(original_path+'/'+item);
                if (found_item) objects.push(found_item);
            });
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