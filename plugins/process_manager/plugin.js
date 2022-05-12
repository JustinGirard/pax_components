define(["jquery","components/base","components/content","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link',        'components/view_plugin_layered','components/table','components/content',
  "components/object_field_container","components/object_field_label","components/object_field_text","components/object_form",
  'components/section','components/page_padding','components/plugins/list_view_edit/plugin',
        "components/plugins/process_manager/relaunch_button",          
        "components/plugins/process_manager/process_setting_button",          
        "components/plugins/process_manager/process_halt_button",          
        "components/plugins/process_manager/process_delete_button",
        "components/object_field_label",
        "components/object_field_text",       
        "components/table",       
], 
       function($,base,content_module,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link,page_layered,table,content,
                field_container,field_label,field_text,object_form,
                section,page_padding,list_view_edit_plugin,
                 relaunch_button,
                 process_setting_button,
                 process_halt_button,
                 process_delete_button,
                 field_label,
                 field_text,
                 table,
                
                ) {
    var module = {};
    
    module.create = (data) => {
        var instance = list_view_edit_plugin.create(data);
        instance.appstate = data.appstate;
        
        instance.create_log_section = (data) =>
        {
            var i_log_section = base.create(data);
            i_log_section.experiment_id = data.experiment_id;
            i_log_section.appstate = data.appstate;
            i_log_section.render = function(){
                //return `<div id='${i_log_section.id()}'>loading ${data.experiment_id}</div>`;
                //console.log(data.appstate);
                var dt = new Date();
                var hrs = dt .getHours() - 2;
                if  (hrs < 0) hrs = 0; 
                var start_date = new Date(dt .getUTCFullYear(), dt .getUTCMonth(), dt .getUTCDate(), hrs, 0, 0, 0);
                var end_date = new Date(dt .getUTCFullYear(), dt .getUTCMonth(), dt .getUTCDate(), 
                                        dt .getHours(), dt .getMinutes(), dt .getSeconds(), 0);
                start_date = start_date.toISOString().split(".")[0];
                end_date = end_date.toISOString().split(".")[0];
                
                i_log_section.appstate.get('pq').query('get_data',{'experiment_id':i_log_section.experiment_id,
                                                              'start_date':start_date,'end_date':end_date,
                                                             },function(data) {
                    let rows = [];
                    let cols = {};
                    var h_out = "";
                    data.forEach((row) =>{ 

                        if (row.date) 
                            h_out = h_out + `<br><b>${row.date}</b>`.replaceAll('\n','<br>');
                        if (row.stdout) 
                            h_out = h_out + `<br><p>${row.stdout}</p>`.replaceAll('\n','<br>');
                        if (row.stderr) 
                            h_out = h_out + `<br><p>${row.runtime_log}</p>`.replaceAll('\n','<br>');
                    });
                    $(`#${i_log_section.id()}`).html(h_out);
                });
                return `<div id='${i_log_section.id()}'>loading ${data.experiment_id}</div>`;
            };
            return i_log_section;
        }
        
        instance.load_row_into = (rows,process_data,index,selected_keys) =>
        {
            var row = [];
            var data_list = {};
            Object.keys(instance.view_defs).forEach(function(key) 
            { 
                if ( selected_keys.includes(key))
                {
                    row.push({'content':process_data[key][index]}); 
                }
                data_list[key]= process_data[key][index];
            });
            var controls =[];
            controls.push( process_setting_button.create({'appstate':instance.appstate,'label':'Auto On', 
                                                          'experiment_id':data_list['experiment_id'],
                                                         'key':'auto_restart','value':true,}));
            controls.push( process_setting_button.create({'appstate':instance.appstate,'label':'Auto Off', 
                                                          'experiment_id':data_list['experiment_id'],
                                                         'key':'auto_restart','value':false,}));
            controls.push( relaunch_button.create({'appstate':instance.appstate,'label':'Relaunch'}));
            controls.push( process_halt_button.create({'appstate':instance.appstate,'label':'Halt', 
                                                          'experiment_id':data_list['experiment_id']}));
            controls.push( process_delete_button.create({'appstate':instance.appstate,'label':'Delete', 
                                                          'experiment_id':data_list['experiment_id'],}));
            
            row.push({'label':'view','on_click':function()
            {
                instance.process_component.hide();
                var tab_map = {
                        "Summary":['summary_table','settings','execution_notes','__network_settings'],
                        "Logs":['log_table'],
                        "__SYSTEM_ALL":[],};
                var control_map = {};
                var c_index = 0; 
                let rows = [
                            [{'content':"Name:".concat(data_list['name'])},
                             {'content':"Contact:"+data_list['last_contact']},
                             {'content':"id:"+data_list['experiment_id']}],
                            [{'content':"Status:"+data_list['status']},
                             {'content':"Auto Restart:"+data_list['auto_restart']},
                             {'content':"Finished:"+data_list['finished']}],
                           ];
                control_map[`summary_table`] = table.create({'def':{'field_1':content,'field_2':content,'field_3':content},
                                                             'dataframe':rows});
                control_map[`log_table`] = instance.create_log_section({'experiment_id':data_list['experiment_id'],
                                                                       'appstate':instance.appstate
                                                                       });
                controls.forEach((control) => { control_map[`control_${c_index }`]=control;c_index = c_index+1;});                
                Object.keys(data_list).forEach(function(key) {
                    control_map[key]=field_label.create({'title':key, 
                                          'type':'text', 
                                          'content':JSON.stringify(data_list[key])});
                });
                instance.view_component.load_data(control_map,tab_map);
                instance.view_component.show();
            }});
            
            
            row.push({'label':'edit','on_click':function()
            {
                instance.process_component.hide();
                var tab_map = {
                        "Summary 2":['experiment_id','compute_node'],
                        "Log 2":['settings'],
                        "__SYSTEM_ALL":[],};   
                var control_map = {};
                Object.keys(data_list).forEach(function(key) {
                    control_map[key]=field_text.create({'title':key, 
                                          'type':'text', 
                                          'content':JSON.stringify(data_list[key])}) ;
                });
                controls.forEach((control) => { control_map[`control_${c_index }`]=control;});                
                                
                instance.edit_component.load_data(control_map,tab_map );
                instance.edit_component.show();
            }});

            //let b = instance.create_delete_button(instance.appstate,data_list['experiment_id'],'Delete');                       
            let b = process_delete_button.create({'appstate':instance.appstate,'label':'Delete', 
                                                          'experiment_id':data_list['experiment_id'],})                            

            row.push({'label':b.label,'on_click':b.on_click});
            rows.push(row);        
        
        }
        
        instance.load_list = (instance) =>{
            
            var proq_q = instance.process_component.process_query;
            if (instance.appstate.get_api_key()== undefined)
                return;
            proq_q['api_key'] = instance.appstate.get_api_key();
            instance.appstate.get('pq').query('find_processes',proq_q,function(process_data) 
            {
                var rows = [];
                var selected_keys =['experiment_id', 'last_contact', 'name','status','auto_restart',]; 
                instance.table_defs = {}; // TODO -- default DEF
                instance.view_defs = {}; // TODO -- default DEF
                instance.table_instance = undefined;
                let example_key = undefined;
                // Extract data and component definitions
                Object.keys(process_data).forEach(function(key)
                {
                    if ( selected_keys.includes(key))
                        instance.table_defs[key] = content;
                    instance.view_defs[key] = content;
                    example_key = key;
                });
                instance.table_defs['view_button'] = button;
                instance.table_defs['edit_button'] = button;
                instance.table_defs['delete_button'] = button;

                let proc_indexes = Object.keys(process_data[example_key]);
                proc_indexes.forEach(i => instance.load_row_into(rows,process_data,i,selected_keys)); 

                instance.process_component.display_table(instance,rows,instance.table_defs)
            });
        }
        return instance;
    }
    return module;
});