define(["jquery","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link',
       ], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link,
                ) {
    var module = { 'dependencies':{ } };
    module.create = function(data)
    {
        // TODO -- UPGRADE TO LATEST VERSION SO THIS CAN BE USED AS A DEFAULT VIEW
        var instance =base.create(data);
        var appstate = data.appstate;
        var fields = []
        data.plugins.forEach(function(plugin)
        {
            pg = plugin.as_plugin();
            ['main','sub','components'].forEach(function(menu_level)
            {
                pg[menu_level].forEach(function(menu_item)
                {
                    if (menu_level == 'main')
                    {
                        var f = menu_item['instance'].on_click;
                        menu_item['instance'].on_click = function(arg)
                        {
                            instance.hide_components();
                            instance.hide_subs();
                            return f(arg);
                        }
                    }
                    if (menu_level == 'sub')
                    {
                        var f = menu_item['instance'].show;
                        menu_item['instance'].show= function(arg)
                        {
                            $(`#${menu_item['instance'].id()}`).parent().show(); 
                            return f(arg);
                        }
                    }
                    instance.subs_add(menu_item['instance'],menu_level+'/'+menu_item['location']);
                });
            });
        });
        var main_items = [];
        instance.subs_get_children('main').forEach(function(item){main_items.push(li.create({'component':item}));});
        var sub_items = [];
        instance.subs_get_children('sub').forEach(function(item){sub_items.push(li.create({'component':item}));});
        //li.create({'component':
        //var main_items = instance.subs_get_children('main');
        //var sub_items = instance.subs_get_children('sub');
        
        instance['dashboard'] = dashboard.create({
                    'header_bar' :"",// data['header'], 
                    'nav_items'  : list_detaied.create({'items':main_items}),
                    'bar_items'  : list_detaied.create({'items':sub_items}),
                    'main_items' : instance.subs_get_children('components')
                    });
        //,instance.welcome_form]
        instance.head = function() { return ""; } 
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
            if (instance.subs_get_children('components').length > 0)
                instance.subs_get_children('components').forEach(function(form){form.hide()});
        }
        instance.hide_subs = function()
        {
            if (instance.subs_get_children('sub').length > 0)
                instance.subs_get_children('sub').forEach(function(form){
                    $(`#${form.id()}`).parent().hide(); 
                });
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