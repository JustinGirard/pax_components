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
        instance.form_controls = {}
        instance.form_controls['first_name'] = field_text.create({'name':'first_name','title':'First Name','type':'text'});
        instance.form_controls['last_name'] = field_text.create({'name':'last_name','title':'Last Name','type':'text'});  
        instance.form_controls['company'] = field_text.create({'name':'company','title':'Company Name','type':'text'});  
        instance.form_controls['email'] = field_text.create({'name':'email','title':'Business Email','type':'text'});  
        instance.form_controls['phone'] = field_text.create({'name':'phone','title':'Phone Number','type':'text'});  
        var save =  button.create({'label':'Save',
                                   'on_click':function()
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
                                       }
                                  }); 
        Object.values = Object.values || function(o){return Object.keys(o).map(function(k){return o[k]})};
        
        fields = Object.values(instance.form_controls);
        fields.push(field_container.create({'name':'actions', 'title':'Actions', 'control':save })  );
        instance.create_form = object_form.create({'title':"Book A Demo", 
                                            'subtitle':"Someone from the team will get back to you right away!", 
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



