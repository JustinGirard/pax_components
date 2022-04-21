define(["jquery","require","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split','app/part/team_section','app/part/top_section','app/part/mid_section',
       'components/object_field_text','components/object_field_container','components/button','components/link',
        'components/view_plugin_layered','components/base_plugin',
        'assets/people',
       ], 
       function($,require,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,team_section,top_section,mid_section,
                 field_text,field_container,button,link,
                page_layered,base_plugin) {
    var module = { 'dependencies':{ } };
    module.create = function(data)
    {
        var instance =base_plugin.create(data);
        instance.appstate = data.appstate;

        // Bind events
        instance.create_components = function ()
        {
            // Home Section
            var home_section = base.create({});
            home_section.render = function()
            {
                home_section.home_sections_list = [];
                home_section.home_sections_list.push(section_split.create(top_section.create({'appstate':instance.appstate,'control':instance.contrib})));
                home_section.home_sections_list.push(section_split.create(mid_section.create({'appstate':instance.appstate,'control':instance.contrib})));
                var html = "";
                home_section.home_sections_list.forEach(function(item)
                {
                    html = html + instance.extract_html(item);   
                });
                return `<div id='${home_section.id()}'>${html}</div>`;
            }
            instance.s_home = home_section;
            instance.s_team = team_section.create({'people':require('assets/people')});
            
        }
        instance.create_components ();
        instance.current = instance.s_home;
        instance.home = link.create({'label':"Home", 'on_click':function(){instance.current = instance.s_home;instance.s_home.show();}})
        instance.team = link.create({'label':"Team", 'on_click':function(){instance.current = instance.s_team;instance.s_team.show();}})
        instance.team2 = link.create({'label':"Team2", 'on_click':function(){instance.current = instance.s_team;instance.s_team.show();}})
        instance.as_plugin = function ()
        {
            if (instance.default_view)
                return {'error':'This plugin has been rendered using the render() method, so can no longer be leveraged as a plugin'}
            return  {'main':[{'instance':instance.home,'location':'welcome'},
                    {'instance':instance.team,'location':'team'},
                    {'instance':instance.team2,'location':'team2'}
                    ],
                    'sub':[],
                    'components':[{'instance':instance.s_home,'location':'s_home'},
                                  {'instance':instance.s_team,'location':'s_team'},
                                  {'instance':instance.s_team,'location':'s_team2'}
                                 ],
                   };
        }
        instance.show = function() 
        {
            if (instance.default_view)  instance.default_view.show();
            instance.current.show();
        }
        
        instance.render = function()
        {
            instance.default_view = page_layered.create({ 'plugins':[module.create(data)], 'appstate':instance.appstate});            
            return instance.default_view.render();
        } 
        instance.bind = function()
        {
            //TODO: THIS IS A DEFAULT RENDER 
            if (instance.default_view) instance.default_view.bind();
        }
        return instance;
    } 
    return module;
});