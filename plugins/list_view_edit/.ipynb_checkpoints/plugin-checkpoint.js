define(["jquery","components/base", 'components/button','components/link','components/table','components/content',
  "components/object_field_label","components/object_field_text","components/object_form", 'components/section','components/page_padding',   'components/tabs',
], 
function($,base,button,link,table,content,
        field_label,field_text,object_form,section,page_padding,tabs) {
    var module = {};
    
    module.create = function(data)
    {
        var instance =base.create(data);
        var fields = [];
        //
        // VIEW/EDIT A PROCESS
        // 
        instance.create_detail_component = function(instance,data,field)
        {
            var component = base.create(data);
            instance.appstate = data.appstate;

            component.render = function () 
            {
                //alert(instance.view_form.render);
                var html = `
                <div id='${component.id()}' > 
                    <h3 style="color:white;"> OBJECT VIEW LOADING</h3>
                </div>`;
                return html;
            }
            
            component.create_control_map = function (control_map,tab_map){
                var inner_controls = {};
                var all_controls = [];
                var test_index = 0;
                Object.keys(control_map).forEach(key => all_controls.push(control_map[key]));
                Object.keys(tab_map).forEach( (tab_id) => {
                    inner_controls[tab_id]=[];
                    Object.keys(control_map).forEach(function(key) {
                        if (tab_map[tab_id].includes(key) || tab_id =='__SYSTEM_ALL')
                            inner_controls[tab_id].push(control_map[key]);
                    });
                                                          
                });
                return [inner_controls,all_controls];
            }
            
            component.load_data = function(control_map,tab_map)
            {
                //
                // CONTROL GROUPS BY TAB
                //
                if (tab_map == undefined)
                    tab_map = {
                        "Summary":['experiment_id','compute_node'],
                        "Log":['settings'],
                        "__SYSTEM_ALL":[],};
                let control_data =  component.create_control_map(control_map,tab_map);
                var inner_controls = control_data[0];
                var all_controls = control_data[1];
                
                //
                // SHOW/HIDE TABS
                //
                let f_show_section = function(id){
                    all_controls.forEach(item => item.hide());
                    inner_controls[id].forEach(item => item.show());
                };
                let tab_links = [];
                Object.keys(tab_map).forEach( (tab_id) => {
                    tab_links.push(link.create({'label':tab_id,'on_click':function(){f_show_section(tab_id)}}));
                });

                //
                // TAB TOPS
                // 
                var nav_tabs = tabs.create({'controls':tab_links});
                
                /// Assemble Components
                var fields = [];
                fields.push(button.create({'label':'Back',
                                          'on_click':function()
                                          {
                                            instance.view_component.hide();
                                            instance.edit_component.hide();
                                            instance.process_component.show();
                                          }}));
                
                fields.push(nav_tabs);
                all_controls.forEach(item => fields.push(item));
                component.view_form = object_form.create({'title':"Create User",  'subtitle':"Register a new user.",  'fields':fields, });
                let section_tbl = page_padding.create({"content":section.create({'content':component.view_form}) });
                $(`#${component.id()}`).html(section_tbl.render());
                component.view_form.bind();
                let default_key = Object.keys(inner_controls)[0];
                f_show_section(default_key);
                
            };

            component.bind = function()
            {
                //instance.view_form.bind();
            }
            return component;
        }

        //
        // VIEW LIST
        //


        instance.create_process_component = function(instance,data)
        {
            instance.process_component = base.create(data);

            instance.process_component.display_table = (instance,rows,table_defs) => {
                // Invoke this function to refresh the view table with content
                instance.table_instance = table.create({'dataframe':rows,'def':table_defs}); // TODO -- default DEF
                let padded = page_padding.create({
                    'content': [`<h1 class='text-3xl text-white'>Processes</h1>`,
                                instance.table_instance]
                    });
                $(`#${instance.process_component.id()}`).html(padded.render());
                instance.table_instance.bind();
            }

            if (data.process_query)
                instance.process_component.process_query = data.process_query;
            else
                instance.process_component.process_query = {'status': ['running','queued'],'api_key':instance.appstate.get_api_key()};
            instance.process_component.refresh = function()
            {
                //var proq_q = {'status': ['running','queued','cleared'],'api_key':instance.appstate.get_api_key()}
                instance.load_list(instance);
            }

            instance.process_component.render = function () 
            {
                let padded = page_padding.create({'content':`<h3 class='text-3xl text-white' >(loading...)</h3>`});

                var html = `
                <div id='${instance.process_component.id()}' > 
                    ${padded.render()}
                </div>
                `;
                return html;
            }
        }        
        
        
        instance.create_process_component(instance,data);
        instance.view_component = instance.create_detail_component(instance,data,field_label);
        instance.edit_component = instance.create_detail_component(instance,data,field_text);
        instance.current = instance.process_component;
    
        instance.main = link.create({'label':`processes`,
                                     'on_click':function(){
                                         instance.process_component.refresh();
                                         instance.process_component.show();
                                      }});

        instance.as_plugin = function ()
        {
            var main =[{'instance':instance.main, 'location':instance.id()+'main_processes'}]; 
            //var sub =[{'instance':instance.welcome,'location':'welcome3'}, {'instance':instance.demo,'location':'demo3'}]; 
            var sub =[];
            var comp =[
                        {'instance':instance.process_component,'location':instance.id()+'processes_view'},
                        {'instance':instance.view_component,'location':instance.id()+'processes_view_detail'},
                        {'instance':instance.edit_component,'location':instance.id()+'processes_edit_detail'},
                      ]; 
            return {'main':main,'sub':sub,'components':comp,};
        }
        
        instance.load_list = (instance) =>
        {
            alert("Please read the process_manager/plugin.js function to find a template to implement.")
        }    
        return instance;
    } 
    
    
    
    return module;
});