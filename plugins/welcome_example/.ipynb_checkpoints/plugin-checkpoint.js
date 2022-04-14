define(["jquery","components/base","components/content","components/page_double_dash","components/list_detailed","components/list_detailed_item","components/list_detailed_component",'components/object_form','components/section_split',
       'components/object_field_text','components/object_field_container','components/button','components/link'], 
       function($,base,content_module,dashboard,list_detaied,list_detailed_item,li,object_form,section_split,
                 field_text,field_container,button,link) {
    var module = { 'dependencies':{ } };
    module.create = function(data)
    {
        var instance =base.create(data);
        $.ajaxSetup({async:false});            
        instance.sect = "";
        $.get('content/welcome_section.json', function(s) {instance.sect = section_split.create(s);});            
        instance.welcome = link.create({'label':`Welcome`,
                                                    'classes':"text-gray hover:text-gray-700",
                                                    'on_click':function(){
                                                                        alert(5);
                                                                         }});
        instance.demo = link.create({'label':`Demo`,
                                                'classes':"text-gray hover:text-gray-700",
                                                'on_click':function(){alert(6)}});


        instance.home = link.create({'label':`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>`,'on_click':function(){
                                        instance.sect.show();
                                        instance.welcome.show();
                                        instance.demo.show();
                                     }});


        instance.as_plugin = function ()
        {
            var main =[{'instance':instance.home,'location':'welcone'}]; 
            var sub =[{'instance':instance.welcome,'location':'welcome_a'}, {'instance':instance.demo,'location':'welcome_b'}]; 
            var comp =[{'instance':instance.sect,'location':'welcome_full'},]; 
            return {'main':main,'sub':sub,'components':comp,};
        }
        //// BOILERPLATE BELOW :: TODO - EXTRACT INTO BASE CLASS!
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