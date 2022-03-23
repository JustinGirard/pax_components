define(["jquery","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link'], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link) {
    var module = { 'dependencies':{ } };
    module.create = function(data)
    {
        var instance =base.create(data);
        var save =  button.create({'label':'Save','on_click':function(){alert('saving');}}); 
        var fields = []
        fields.push(field_text.create({'name':'username','title':'Username!!!','type':'text'}))  
        fields.push(field_text.create({'name':'usernote','title':'User note','type':'text'}))  
        fields.push(field_text.create({'name':'password','title':'New password','type':'password'}))  
        fields.push(field_text.create({'name':'password','title':'Confirm new password','type':'password'}))          
        fields.push(field_container.create({'name':'actions', 'title':'Actions', 'control':save })  );
        
        instance.frm = object_form.create({'title':"Edit User 2", 'subtitle':"Change any user settings here!!", 'fields':fields, });
        instance.welcome = li.create({'component':link.create({'label':`Welcome3`,
                                                            'classes':"text-gray hover:text-gray-700",
                                                            'on_click':function(){
                                                                                alert(5);
                                                                                 }})});
        instance.demo = li.create({'component':link.create({'label':`Demo3 `,
                                                            'classes':"text-gray hover:text-gray-700",
                                                            'on_click':function(){alert(6)}})});




        // Main Items
        instance.account = li.create({'component':link.create({'label':`PROC`,'on_click':function(){
                            instance.welcome.show();
                            instance.demo.show();
                            instance.frm.show();
                             }})});


        instance.as_plugin = function ()
        {
            var main =[{'instance':instance.account,'location':'account_2'}]; 
            var sub =[{'instance':instance.welcome,'location':'welcome3'}, {'instance':instance.demo,'location':'demo3'}]; 
            var comp =[{'instance':instance.frm,'location':'edit_user_2'},]; 
            return {'main':main,'sub':sub,'components':comp,};
        }

        instance.bind = function() 
        {
        
        } 
        instance.hide = function() {} 
        instance.show = function() 
        {
        } 
        instance.render = function()
        {
            
            return "You can not render a plugin directly. You need to call .as_plugin, which will return all of the sub items that make up this item.";
        } 
        instance.bind = function()
        {
        }
        return instance;
    } 
    return module;
});