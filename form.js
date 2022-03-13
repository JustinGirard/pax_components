define(["jquery","components/base","components/link","components/button",
        "components/object_field_container","components/object_field_text","components/object_form",
        'components/uuid4'], 
function($,base,link,button, field_container,field_text,object_form) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create({});
        var fields = [];
        instance.on_finish = data.on_finish;
        instance.appstate = data.appstate;
        var form_schema = data.form_schema;
        /*
        var form_schema= 
        {
            "title":"Book A Demo",
            "subtitle":"Someone from the team will get back to you right away!",
            "fields":[
                    {'name':'first_name','title':'First Name','type':field_text},
                    {'name':'last_name','title':'Last Name','type':field_text},
                    {'name':'company','title':'Company Name','type':field_text}, 
                    {'name':'email','title':'Business Email','type':field_text},
                    {'name':'phone','title':'Phone Number','type':field_text},          
                    ],
            "actions":[
                    {'label':'Finish Booking','on_click':function()
                           {
                               var form_data = {}
                               Object.keys(instance.form_controls).forEach(function(c_name)
                               {
                                   var cntrl = instance.form_controls[c_name]; 
                                   form_data[c_name]= $(`#${cntrl.id()}`).val();
                               });
                               var success = function(data){alert(JSON.stringify(data))};
                               var fail = function(data){alert(JSON.stringify(data))};
                                var destroy = {'api_key':"pkey-a0f8540cacc41427ae251101ce1dc1f612068ffcbe9801f27294251a",
                                                 'address':form_data['email'],
                                                 'subject':"Demo Booking",
                                                 'text':JSON.stringify(form_data),
                                              }
                                instance.appstate.get('pq').query('send_email',destroy,function(data) 
                                {
                                    alert("success");
                                    if (instance.on_finish) instance.on_finish();
                                });            
                           },
                     'type':button}
                    ],
            
        };*/
        
        instance.form_controls = {};
        instance.form_actions = [];
        form_schema.fields.forEach(function(item){instance.form_controls[item.name] = item.type.create(item);});
        form_schema.actions.forEach(function(item){instance.form_actions.push(item.type.create(item));});
        
        Object.values = Object.values || function(o){return Object.keys(o).map(function(k){return o[k]})};
        fields = Object.values(instance.form_controls);
        fields.push(field_container.create({'name':'actions', 'title':'', 'control':instance.form_actions})  );
        instance.create_form = object_form.create({'title':form_schema.title, 
                                            'subtitle':form_schema.subtitle, 
                                            'fields':fields, });
        instance.subs_add(instance.create_form,'book_demo');
        
        instance.bind = function ()   { instance.subs_get_children().forEach(function(item){item.bind()}); }
        instance.show = function ()   { instance.create_form.show(); }
        instance.hide = function ()   { instance.create_form.hide(); }
        instance.render = function () { return  instance.extract_html(instance.create_form); }
        return instance;
    } 
    return module;
});
/*
Full example
            instance.form_book_demo = {};
            var form_schema= 
            {
                "title":"Book A Demo",
                "subtitle":"Someone from the team will get back to you right away!",
                "fields":[
                        {'name':'first_name','title':'First Name','type':field_text},
                        {'name':'last_name','title':'Last Name','type':field_text},
                        {'name':'company','title':'Company Name','type':field_text}, 
                        {'name':'email','title':'Business Email','type':field_text},
                        {'name':'phone','title':'Phone Number','type':field_text},          
                        ],
                "actions":[
                        {'label':'Finish Booking','on_click':function()
                               {
                                   var form_data = {}
                                   Object.keys(instance.form_book_demo.form_controls).forEach(function(c_name)
                                   {
                                       var cntrl = instance.form_book_demo.form_controls[c_name]; 
                                       form_data[c_name]= $(`#${cntrl.id()}`).val();
                                   });
                                   var success = function(data){alert(JSON.stringify(data))};
                                   var fail = function(data){alert(JSON.stringify(data))};
                                    var destroy = {'api_key':"pkey-a0f8540cacc41427ae251101ce1dc1f612068ffcbe9801f27294251a",
                                                     'address':form_data['email'],
                                                     'subject':"Demo Booking",
                                                     'text':JSON.stringify(form_data),
                                                  }
                                    instance.form_book_demo.appstate.get('pq').query('send_email',destroy,function(data) 
                                    {
                                        alert("success");
                                        if (instance.form_book_demo.on_finish) instance.form_book_demo.on_finish();
                                    });            
                               },
                         'type':button}
                        ],
            };            
            
            instance.form_book_demo = form_book_demo.create({'appstate':appstate,
                                                             'form_schema':form_schema,
                                                             'on_finish':function(){instance.demo_form.hide();}});
            
            var s = require('assets/demo_form');
            s = {'left_instance':s['html'],
                 'right_instance':instance.form_book_demo};
            var create_section = section_split.create(s)
            instance.demo_form = popup.create({'controls':create_section});
            instance.all_sections.push(instance.demo_form);
            instance.learn_more_butt =  button.create({'label':`BOOK DEMO`, 'on_click':function(){ instance.demo_form.show();}});    



*/


