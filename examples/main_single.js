define(['jquery', 'require', 'app/main_application_state', 'components/view_plugin_dashboard', 'components/view_plugin_layered',
        'plugins/process_manager/plugin', 'plugins/welcome_example/plugin','app/plugins/pax/plugin','app/part/header'],
function ($,require,appstate, page_dashboard,page_layered, 
          process_manager,welcome_example,pax_plugin) 
{
    var module = {'dependencies':{}}; 
    module.create = function()
    {
        var instance = function (){};
        // TODO - FIND OUT WHY VIEW PLUGIN IS LOADING EMPTY NAV ITEMS FOR THE 'sub' ELEMENTS
        instance.pg = pax_plugin.create({'appstate':appstate,});
        
        instance.head = function ()  
        {
            var html = require('app/part/header').html
            return html
        }
        
        instance.render = function () 
        {
            var html = "";
            html  = html + instance.pg.render(); 
            
            return html
        }
        instance.bind = function ()  
        {
            instance.pg.bind();
            instance.pg.show();
        }
        return instance;
    } 
    return module;
});






/*define(['jquery','require', 'components/content', 'components/section','components/section_split', 'components/mem_list', 'app/main_application_state', 
        'app/page_landing','app/page_team','components/page_signin_center','components/plugin_page_dashboard','components/plugin_page_layered',
        'components/header_navlist','components/button','components/link','components/contact_simple','components/z-block','components/signin_userpass','components/popup','components/form','components/z-section',"app/part/book_demo","app/part/top_section","app/part/mid_section",
        'plugins/process_manager/plugin','plugins/welcome_example/plugin','app/plugins/pax/plugin',
        'assets/phone_big','assets/phone_small','assets/mid_phone','assets/main_section_01','assets/main_section_02',
        'assets/people','assets/demo_form','app/part/header'],
function ($,require,content,section,section_split,mem_list,appstate,
           page_landing,page_team,page_signin,page_dashboard,page_layered,
           header,button,link,contact_simple,z_section,signin_simple,popup,form_book_demo,z_animation,book_demo,top_section,mid_section,
           process_manager,welcome_example,pax_plugin
          
          ) */
