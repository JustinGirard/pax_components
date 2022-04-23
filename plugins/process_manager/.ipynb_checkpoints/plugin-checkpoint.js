<<<<<<< HEAD
define(["jquery","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link'], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link) {
    var module = { 'dependencies':{ } };
    
    module.create_process_component = function(instance,data)
    {
        instance.process_component = base.create({});
        instance.process_component.render = function () 
        {
            var proq_q = {'status': ['running','queued','cleared'],'api_key':instance.appstate.get_api_key()}
            if (instance.appstate.get_api_key())
            {
                instance.appstate.get('pq').query('find_processes',proq_q,function(process_data) 
                {
                    var header = [];
                    var rows = [];
                    var selected_keys =['experiment_id', 'last_contact', 'name','status','status']; 
                    // GET ROWS
                    ////////////////////////////////
                    console.log(JSON.stringify(instance.appstate.get_api_key()));
                    console.log(JSON.stringify(process_data));
                    Object.keys(process_data).forEach(function(key)
                    {
                        if ( selected_keys.includes(key))
                        {
                            header.push(key);
                        }
                    });                
                    Object.keys(process_data[header[0]]).forEach(function(index)
                    {
                        var row = [];
                        header.forEach(function(key) 
                        { 
                            if ( selected_keys.includes(key))
                            {
                                row.push(process_data[key][index]); 
                            }                    
                        });
                        rows.push(row);
                    });

                    // RENDER ROWS
                    //////////////////////////////////////////
                    var process_item = {};
                    process_item.create = function(data)
                    {
                        var slf = base.create(data);
                        var r= "";
                        data.items.forEach(function(item){ r = r + `<div>${item}</div>`;});

                        slf.render = function (){
                            return `<div id='${slf.id()}'  class="grid grid-cols-5 gap-2" >
                                        ${r}
                                    </div>`;            
                        }
                        return slf;
                    }
                    var procs = [];
                    procs.push( li.create({'component':process_item.create({'items':header})}));                 
                    rows.forEach(function(row){ procs.push( li.create({'component':process_item.create({'items':row})})); });
                    var process_component_list = list_detaied.create({'items':procs});
                    $(`#${instance.process_component.id()}`).html(process_component_list.render());
                });
            }
            var html = `
            <div id='${instance.process_component.id()}' > 
                <h3> Processes (loading...)</h3>
=======
define(["jquery","components/base","components/content","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link',        'components/view_plugin_layered','components/table','components/content',
  "components/object_field_container","components/object_field_label","components/object_field_text","components/object_form",
  'components/section','components/page_padding',      
], 
       function($,base,content_module,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link,page_layered,table,content,
                field_container,field_label,field_text,object_form,
                section,page_padding) {
    var module = {};
    
    module.create_relaunch_button = function(appstate,label)
    {
        var func = function ()
        {
            if (appstate.get_api_key())
            {
                appstate.get('pq').query('func', 
                {'function_id':'pax-action-gwella-test',
                'api_key':appstate.get_api_key(),
                'arguments':{'query_name':'purge_job',}},
                function(resp) 
                {
                    alert(JSON.stringify(resp));
                    appstate.get('pq').query('func', 
                    {'function_id':'pax-action-gwella-test',
                    'api_key':appstate.get_api_key(),
                    'arguments':{'query_name':'start_job',}},
                    function(resp) 
                    {
                        alert(JSON.stringify(resp));
                    });
                    
                });
            }
            else
            {
                alert ("need to be logged in");
            }
        
        }        
        var b = button.create({'label':label,
                               'on_click':func});    
        return b;
    }    
    
    module.create_setting_button = function(appstate,experiment_id,label,key,value)
    {
        var func = function ()
        {
            if (appstate.get_api_key())
            {
                var transaction = {'experiment_id': experiment_id,
                              'api_key':appstate.get_api_key(),
                              'key':key,
                              'val':value}
                //alert(JSON.stringify(transaction));
                appstate.get('pq').query('set_setting',
                                         transaction,
                                         function(resp) 
                {
                    alert(resp);
                });
            }
            else
            {
                alert ("need to be logged in");
            }
        
        }        
        var b = button.create({'label':label,
                               'on_click':func});    
        return b;
    }

    module.create_halt_button = function(appstate,experiment_id,label)
    {
        var func = function ()
        {
            if (appstate.get_api_key()) {
                var transaction = {'experiment_id': experiment_id,'api_key':appstate.get_api_key(),};
                //alert(JSON.stringify(transaction));
                appstate.get('pq').query('halt_process', transaction, function(resp) {
                    alert(resp);
                });
            }
            else {
                alert ("need to be logged in");
            }
        }        
        return button.create({'label':label, 'on_click':func});    
    }    
    
    module.create_delete_button = function(appstate,experiment_id,label)
    {
        var func = function ()
        {
            if (appstate.get_api_key()) {
                var transaction = {'experiment_id': experiment_id,'api_key':appstate.get_api_key(),};
                //alert(JSON.stringify(transaction));
                appstate.get('pq').query('delete_process', transaction, function(resp) {
                    console.log(resp);
                });
            }
            else {
                alert ("need to be logged in");
            }
        }        
        return button.create({'label':label, 'on_click':func});    
    }    
    
    //
    // VIEW/EDIT A PROCESS
    // 
    module.create_detail_component = function(instance,data,field)
    {
        var component = base.create(data);

        component.render = function () 
        {
            //alert(instance.view_form.render);
            var html = `
            <div id='${component.id()}' > 
                <h3 style="color:white;"> OBJECT VIEW LOADING</h3>
            </div>`;
            return html;
        }
        
        component.load_data = function(data_list)
        {
            var fields = [];
            Object.keys(data_list).forEach(function(key)
            {
                let item = data_list[key];
                fields.push(field.create({'title':key,
                                                'type':'text',
                                                'content':JSON.stringify(item)}));
            
            });
            
            fields.push(button.create({'label':'Back',
                                      'on_click':function()
                                      {
                                        instance.view_component.hide();
                                        instance.edit_component.hide();
                                        instance.process_component.show();
                                      }}));
            
            fields.push( module.create_setting_button(instance.appstate,
                                                      data_list['experiment_id'],
                                                      'Auto On',
                                                      'auto_restart',
                                                      true));
            fields.push( module.create_setting_button(instance.appstate,
                                                      data_list['experiment_id'],
                                                      'Auto Off',
                                                      'auto_restart',
                                                      false));
            
            fields.push( module.create_relaunch_button(instance.appstate,'Relaunch'));
            console.log("making",JSON.stringify(data_list));
            fields.push( module.create_halt_button(instance.appstate,
                                                      data_list['experiment_id'],
                                                      'Halt'));
            fields.push( module.create_delete_button(instance.appstate,
                                                      data_list['experiment_id'],
                                                      'Delete'));
            
            /*
            var save =  button.create({'label':'Save', 'on_click':function() { alert(1);}  }); 
            var i_back = 

            fields.push(field_container.create({'name':'actions', 'title':'Actions', 'control':save }));
            */
            component.view_form = object_form.create({'title':"Create User", 
                                                'subtitle':"Register a new user.", 
                                                'fields':fields, });
            
            let section_tbl = page_padding.create({"content":section.create({'content':component.view_form}) });
            $(`#${component.id()}`).html(section_tbl.render());
            component.view_form.bind();
        };
        
        component.bind = function()
        {
            //instance.view_form.bind();
        }
        return component;
    }
    
    //
    // VIEW A PROCESS LIST
    //
    module.create_process_component = function(instance,data)
    {
        instance.process_component = base.create(data);
        if (data.process_query)
            instance.process_component.process_query = data.process_query;
        else
            instance.process_component.process_query = {'status': ['running','queued'],'api_key':instance.appstate.get_api_key()};
        instance.process_component.refresh = function()
        {
            //var proq_q = {'status': ['running','queued','cleared'],'api_key':instance.appstate.get_api_key()}
            var proq_q = instance.process_component.process_query;
            if (instance.appstate.get_api_key())
            {
                proq_q['api_key'] = instance.appstate.get_api_key();
                instance.appstate.get('pq').query('find_processes',proq_q,function(process_data) 
                {
                    console.log({process_data});
                    var rows = [];
                    var selected_keys =['experiment_id', 'last_contact', 'name','status','auto_restart',]; 
                    instance.table_defs = {}; // TODO -- default DEF
                    instance.view_defs = {}; // TODO -- default DEF
                    
                    instance.table_instance = undefined;
                    let example_key = undefined;
                    //
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
                    
                    Object.keys(process_data[example_key]).forEach(function(index)
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
                        
                        row.push({'label':'view','on_click':function()
                        {
                            instance.process_component.hide();
                            instance.view_component.load_data(data_list);
                            instance.view_component.show();
                        }});
                        row.push({'label':'edit','on_click':function()
                        {
                            instance.process_component.hide();
                            instance.edit_component.load_data(data_list);
                            instance.edit_component.show();
                        }});
                        
                        let b = module.create_delete_button(instance.appstate,data_list['experiment_id'],'Delete');                       
                        row.push({'label':b.label,'on_click':b.on_click});
                        rows.push(row);
                    }); 
                    
                    instance.table_instance = table.create({'dataframe':rows,'def':instance.table_defs}); // TODO -- default DEF
                    let padded = page_padding.create({
                        'content': [`<h1 class='text-3xl text-white'>Processes</h1>`,
                                    instance.table_instance]
                        });
                    // var process_component_list = list_detaied.create({'items':procs});
                    $(`#${instance.process_component.id()}`).html(padded.render());
                    instance.table_instance.bind();
                    
                });
            }        
        }
        
        instance.process_component.render = function () 
        {
            let padded = page_padding.create({'content':`<h3 class='text-3xl text-white' > Processes (loading...)</h3>`});

            var html = `
            <div id='${instance.process_component.id()}' > 
                ${padded.render()}
>>>>>>> e3194f08703f29fb357994ff964deb550321069b
            </div>
            `;
            return html;
        }
    }
    
    
    module.create = function(data)
    {
        var instance =base.create(data);
        var fields = []
        instance.appstate = data.appstate;
        module.create_process_component(instance,data);
<<<<<<< HEAD
        
        instance.welcome = link.create({'label':`Welcome3`,
                                                            'classes':"text-gray hover:text-gray-700",
                                                            'on_click':function(){
                                                                                alert(5);
                                                                                 }});

        instance.main = link.create({'label':`processes`,
                                                            'on_click':function(){
                                                                   instance.process_component.show();
                                                                }});

        instance.as_plugin = function ()
        {
            var main =[{'instance':instance.main,'location':'main_processes'}]; 
            //var sub =[{'instance':instance.welcome,'location':'welcome3'}, {'instance':instance.demo,'location':'demo3'}]; 
            var sub =[];
            var comp =[{'instance':instance.process_component,'location':'processes_view'},]; 
            return {'main':main,'sub':sub,'components':comp,};
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
            if (instance.default_view) instance.default_view.bind();
        }
=======
        instance.view_component = module.create_detail_component(instance,data,field_label);
        instance.edit_component = module.create_detail_component(instance,data,field_text);
        instance.current = instance.process_component;
    
        instance.main = link.create({'label':`processes`,
                                     'on_click':function(){
                                         instance.process_component.refresh();
                                         instance.process_component.show();
                                      }});

        instance.as_plugin = function ()
        {
            var main =[{'instance':instance.main, 'location':'main_processes'}]; 
            //var sub =[{'instance':instance.welcome,'location':'welcome3'}, {'instance':instance.demo,'location':'demo3'}]; 
            var sub =[];
            var comp =[
                        {'instance':instance.process_component,'location':'processes_view'},
                        {'instance':instance.view_component,'location':'processes_view_detail'},
                        {'instance':instance.edit_component,'location':'processes_edit_detail'},
                      ]; 
            return {'main':main,'sub':sub,'components':comp,};
        }
>>>>>>> e3194f08703f29fb357994ff964deb550321069b
        return instance;
    } 
    return module;
});