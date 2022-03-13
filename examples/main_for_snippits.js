define(['jquery','require', 'components/content', 'components/section','components/section_split', 'components/mem_list', 'app/main_application_state', 
        'app/page_landing','app/page_team','components/page_signin_center','components/plugin_page_dashboard','components/plugin_page_layered',
        'components/header_navlist','components/button','components/link','components/contact_simple','components/z-block','components/signin_userpass','components/popup','components/form','components/z-section',"app/part/book_demo","app/part/top_section","app/part/mid_section",
        'plugins/process_manager/plugin','plugins/welcome_example/plugin','app/plugins/pax/plugin',
        'assets/phone_big','assets/phone_small','assets/mid_phone','assets/main_section_01','assets/main_section_02',
        'assets/people','assets/demo_form','app/part/header'],
function ($,require,content,section,section_split,mem_list,appstate,
           page_landing,page_team,page_signin,page_dashboard,page_layered,
           header,button,link,contact_simple,z_section,signin_simple,popup,form_book_demo,z_animation,book_demo,top_section,mid_section,
           process_manager,welcome_example,pax_plugin
          
          ) 
{
    var module = {'dependencies':{}}; 
    module.create = function()
    {
        
        var instance = function (){};
        instance.all_sections = [];
        instance.init = function()
        {
            /*
            var right_links = ``;
            instance.contrib = link.create({'label':"Team", 'on_click':function(){alert(2)}})
            instance.dashlink = link.create({'label':"Dashboard", 'on_click':function(){alert(2)}})
            instance.home = link.create({'label':"Home", 'on_click':function(){alert(1)}})
            instance.sign_in = link.create({'label':"Sign In", 'on_click':function(){alert(1)}})
            instance.sign_out = link.create({'label':"Sign Out", 'on_click':function(){alert(1)},'classes':"text-gray hover:text-gray-700"})
            
            // BOOK DEMO
            instance.demo_form = popup.create({'controls':book_demo.create({'appstate':appstate})});        
            instance.all_sections.push(instance.demo_form);
            instance.learn_more_butt =  button.create({'label':`BOOK DEMO`, 'on_click':function(){ instance.demo_form.show();}});            
            
            var header_instance = header.create({'left_items':[ instance.home,instance.contrib,instance.dashlink],
                                                'logo':'<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                'right_items':[instance.learn_more_butt],}); //instance.sign_in
            
            // Bind events
            var sections_list = [];
            sections_list.push(section_split.create(top_section.create({'appstate':appstate,'control':instance.learn_more_butt})));
            sections_list.push(section_split.create(mid_section.create({'appstate':appstate,'control':instance.learn_more_butt})));
            
            
            var people = require('assets/people');
            instance.p_landing = page_landing.create({'header':header_instance, 'sections':sections_list});
            instance.all_sections.push(instance.p_landing);
            
            instance.p_team = page_team.create({'header':header_instance,'people':people});
            instance.all_sections.push(instance.p_team);
            */
            
            instance.p_dashboard = page_layered.create({ 'plugins':[process_manager.create({'appstate':appstate,}),
                                                                     welcome_example.create({'appstate':appstate,}),
                                                                     pax_plugin.create({'appstate':appstate,}),],
                                                          'appstate':appstate});
            
            /*
            instance.all_sections.push(instance.p_dashboard);
            
            // Bind events 
            instance.contrib.on_click = function (){instance.p_landing.hide();
                                                    //instance.p_signin.hide();
                                                    instance.p_dashboard.hide();
                                                    instance.p_team.show();
                                                   };
            instance.home.on_click = function (){instance.p_team.hide();
                                                 //instance.p_signin.hide();
                                                 instance.p_dashboard.hide();
                                                 instance.p_landing.show();
                                                };
            instance.sign_in.on_click = function (){instance.p_team.hide();
                                                   instance.p_landing.hide();
                                                   instance.p_dashboard.hide();
                                                   //instance.p_signin.show();
                                                    
                                                   };
            instance.sign_out.on_click = function (){instance.p_team.hide();
                                                   instance.p_dashboard.hide();
                                                   //instance.p_signin.hide();
                                                   instance.p_landing.show();                                                     
                                                     
                                                   };
            instance.dashlink.on_click = function (){
                                                    instance.p_team.hide();
                                                   //instance.p_signin.hide();
                                                   instance.p_landing.hide();                                                     
                                                   instance.p_dashboard.show();
                                                   };
            */
        }

        instance.head = function () 
        {
            var html = require('app/part/header').html
            //instance.all_sections.forEach(function(item){ html += item.head(); });
            return html
        }
        
        instance.render = function () 
        {
            var html = "";
            html  = html + instance.p_dashboard.render(); 
            
            //instance.all_sections.forEach(function(item){ html += item.render(); });
            return html
        }
        
        instance.bind = function () 
        {
            /*
            instance.all_sections.forEach(function(item){item.bind();});
            instance.home.bind();
            instance.contrib.bind();
            instance.sign_in.bind();
            instance.sign_out.bind();
            instance.dashlink.bind();
            */
            instance.p_dashboard.bind()
            instance.p_dashboard.show();
            //instance.ue.show();
            // Special buttons
            /*
            //instance.learn_more_butt.bind();
            //if (appstate.is_logged_in())
            //{
                instance.p_landing.hide();
                //instance.p_dashboard.show();
            }
            else
            {
                //instance.p_dashboard.hide();
                instance.p_landing.show();
            }
            */
        }
        instance.init();
        return instance;
    } 
    
    
    return module;
});