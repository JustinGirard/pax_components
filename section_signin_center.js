define(["jquery","components/base","components/content"], function($,base,content_module) {
    var module = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />`,  
            'module_content':content_module,
        }
    };
    module.create = function(data)
    {
        var instance =base.create(data);
        //instance['page_begin'] = module.dependencies['page_begin'];
        instance['page_end'] = module.dependencies['page_end'];
        instance['form_html'] = data['form']
        instance['page_head'] = module.dependencies['page_head'];
        
        if (data.logo == undefined)
            instance.logo = "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg";
        else
            instance.logo = data.logo;
        
        if (data.title == undefined)
            instance.title = "Sign in to your account";
        else
            instance.title = data.title;
        
        instance.head = function()
        {
            return instance['page_head'];
        } 
        instance.render = function()
        {
            return instance['page_begin']+ instance['form_html'].render('login_form')+ instance['page_end'];
        } 
        instance.bind = function()
        {
            instance['form_html'].bind();
        } 
        instance.hide = function()
        {
            $(`#${instance.id()}`).fadeOut(10);
        } 
        instance.show = function()
        {
            $(`#${instance.id()}`).fadeIn(10);
        } 
        
        instance['page_begin'] = `<!-- THIS IS BEGIN OF SIGNIN--><div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"    id='${instance.id()}' style='display:none;'>
      <div class="max-w-md w-full space-y-8">
          <img class="mx-auto h-12 w-auto" src="${instance.logo}" alt="Workflow">
          <h2 class="mt-6 text-center text-6xl font-extrabold text-gray-900">
            ${instance.title}
          </h2>`;
        
        instance['page_end'] = `</div></div><!-- THIS IS END OF SIGNIN-->`;
        
        return instance;
    } 
    return module;
});