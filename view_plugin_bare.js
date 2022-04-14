define(["jquery","components/base","components/content","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link','components/header_navlist'
       ], 
       function($,base,content_module,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link,header
                )
{
    var page_bare = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        `}
        
    };
    page_bare.create = function(data)
    {
        var instance = base.create(data);
        try { instance.nav_items = data.nav_items;} catch(err) { instance.nav_items = null; console.log('no nav items 1');}
        try { instance.bar_items  = data.bar_items;  } catch(err) { instance.bar_items = null}
        try { instance.header_bar  = data.header_bar;  } catch(err) { console.log("NO HEADER BAR");  instance.header_bar = null}
        instance.main_items = data.main_items
        instance['page_head'] = page_bare.dependencies['page_head'];
        instance['page_inner_list'] =[];

        instance.head = function()
        {
            return instance['page_head'];
        } 

        instance.render = function()
        {
            instance.header_instance = {} 
            header_html ="";
            //alert(JSON.stringify(instance.nav_items));
            /*if (instance.nav_items)
            {
                instance.header_instance = header.create({'left_items':instance.nav_items,
                                                    'logo':'ABC<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                    'right_items':[],}); //instance.sign_in
                header_html = instance.header_instance.render();
            }*/
            
            sun_header_html = "";
            /*if (instance.bar_items)
            {
                instance.bar_instance = header.create({'left_items':instance.bar_items,
                                                    'logo':'<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                    'right_items':[],}); //instance.sign_in
                sun_header_html = instance.extract_html(instance.bar_instance);
            }*/
            
            page_html = `<div class="min-h-screen" id="${instance.id()}" style='display:none;' >
    ${header_html}
    ${sun_header_html}
    <main>
        ${instance.extract_html(instance.main_items)}
    </main>
</div>`;            
            return page_html;
        }
        instance.refresh = () =>
        {
            [instance.bar_instance].forEach(i => i.refresh());
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
    var dashboard =  page_bare;
    
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
        
    
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
            //instance.dashboard.refresh();            
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
                arr.forEach(function(form){instance.recursive_do(form,'hide')});
            //instance.dashboard.refresh();        
        }
        instance.hide_subs = function()
        {
            arr =instance.subs_get_children('sub'); 
            if ($.isArray(arr) && arr.length > 0)
            {
                arr.forEach(function(form)
                            {
                                //instance.recursive_do(form.hide()
                                instance.recursive_do(form,'hide');
                            
                            });
            }
            
            setTimeout(()=> {instance.dashboard.refresh()}, 20);            
            
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