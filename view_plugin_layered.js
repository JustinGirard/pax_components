define(["jquery","components/base","components/content","components/page_layered","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link',
       ], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link,
                ) {
    var module = { 'dependencies':{ } };
    module.create = function(data)
    {
        var instance =base.create(data);
        var appstate = data.appstate;
        var fields = []
        //console.log(JSON.stringify(instance.subs_get_children('sub')));
        instance.plugins = data.plugins;
        instance.current_index = 0;
        if (data.current_index) instance.current_index = data.default_index; 
        var counted_index = 0;
        instance.plugins.forEach(function(plugin)
        {
            // TODO - FIND OUT WHY VIEW PLUGIN IS LOADING EMPTY NAV ITEMS FOR THE 'sub' ELEMENTS
            pg = plugin.as_plugin();
            ['main','sub','components'].forEach(function(menu_level)
            {
                pg[menu_level].forEach(function(menu_item)
                {
                    if (menu_level == 'main')
                    {
                        var f = menu_item['instance'].on_click;
                        var this_index = (counted_index + 0);
                        var show_my_plugin = function()
                        {
                            instance.show_plugin(this_index);
                        } 
                        menu_item['instance'].on_click = function(arg)
                        {
                            show_my_plugin();
                            instance.hide_components();
                            instance.hide_subs();
                            return f(arg);
                        }
                    }
                    instance.subs_add(menu_item['instance'],menu_level+'/'+menu_item['location']);
                });
            });
            counted_index = counted_index + 1;
        });
        instance['dashboard'] = dashboard.create({
                    'header_bar' : "",
                    'nav_items'  : instance.subs_get_children('main'),
                    'bar_items'  : instance.subs_get_children('sub'),
                    'main_items' : instance.subs_get_children('components')
                    });
        //,instance.welcome_form]
        instance.head = function() { return ""; } 
        instance.bind = function() { } 
        instance.hide = function() { instance['dashboard'].hide(); $(`#${instance.id()}`).fadeOut(10);   } 
        instance.show_plugin = function (index)
        {
            var target_index = 0;
            instance.plugins.forEach(function(plugin)
            {
                if (index !=  target_index) instance.plugins[index].hide();
                target_index = target_index + 1;
            });
            instance.plugins[index].show(); 
        }
        
        instance.show = function() 
        {
            $(`#${instance.id()}`).fadeIn(10); 
            instance['dashboard'].show(); 
            instance.show_plugin(instance.current_index );       
        } 
        
        instance.render = function()
        {
            instance['dashboard_html'] = instance['dashboard'].render() ;
            return `<div class="min-h-screen" id="${instance.id()}" style='display:none;' >${instance['dashboard_html']}</div>`;
        } 
        instance.hide_components = function()
        {
            arr =instance.subs_get_children('components'); 
            if ($.isArray(arr) && arr.length > 0)
                arr.forEach(function(form){form.hide()});
        }
        instance.hide_subs = function()
        {
            arr =instance.subs_get_children('sub'); 
            if ($.isArray(arr) && arr.length > 0)
            {
                arr.forEach(function(form){form.hide()});
            }
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