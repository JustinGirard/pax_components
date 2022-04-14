define(["jquery","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link',        'components/view_plugin_layered',
], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link,page_layered) {
    var module = { 'dependencies':{ } };
    
    module.create_process_component = function(instance,data)
    {
        instance.process_component = base.create({});
        instance.process_component.render = function () 
        {
            //var proq_q = {'status': ['running','queued','cleared'],'api_key':instance.appstate.get_api_key()}
            var proq_q = {'status': ['running','queued'],'api_key':instance.appstate.get_api_key()}
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
        
        instance.current = instance.process_component;
        
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
        
        
        
        return instance;
    } 
    return module;
});