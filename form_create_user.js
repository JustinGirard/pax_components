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
        instance.appstate = data.appstate;
        var uname = field_text.create({'name':'username','title':'Username','type':'text'});
        var unote = field_text.create({'name':'usernote','title':'User note','type':'text'});  
        var pass1 = field_text.create({'name':'password','title':'New password','type':'password'});  
        var pass2 = field_text.create({'name':'password','title':'Confirm new password','type':'password'});
        var save =  button.create({'label':'Save',
                                   'on_click':function()
                                       {
                                           var username = $(`#${uname.id()}`).val();
                                           var password1 = $(`#${unote.id()}`).val();
                                           var password2 = $(`#${unote.id()}`).val();
                                           var success = function(data){alert(JSON.stringify(data))};
                                           var fail = function(data){alert(JSON.stringify(data))};
                                           instance.appstate.user_register(username,password1,password2,success,fail);
                                       }
                                  }); 
        
        fields = [uname,unote,pass1,pass2];
        fields.push(field_container.create({'name':'actions', 'title':'Actions', 'control':save })  );
        instance.create_form = object_form.create({'title':"Create User", 
                                            'subtitle':"Register a new user.", 
                                            'fields':fields, });
        instance.subs_add(instance.create_form,'create_user');
        
        instance.bind = function ()   { instance.subs_get_children().forEach(function(item){item.bind()}); }
        instance.show = function ()   { instance.create_form.show(); }
        instance.hide = function ()   { instance.create_form.hide(); }
        instance.render = function () { return  instance.extract_html(instance.create_form); }
        return instance;
    } 
    return module;
});