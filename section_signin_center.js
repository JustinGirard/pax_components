define(["jquery","components/base","components/content"], function($,base,content_module) {
    var module = { 'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />`,  
            'module_content':content_module,
        }
    };
    module.create = (data) => {
        var instance =base.create(data);
        instance['form_html'] = data['form']
        instance.controls = [instance['form_html']];
        instance.logo = data.logo;
        instance.title = data.title;
        
        if (data.logo == undefined)
            instance.logo = `<img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">`;
        
        if (data.title == undefined)
            instance.title = "Sign in to your account";
        
        instance.render = () => {
            return `<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"    id='${instance.id()}' style='display:none;'>
      <div class="max-w-md w-full space-y-8">
          ${instance.logo}
          <h2 class="mt-6 text-center text-6xl font-extrabold text-gray-900">
            ${instance.title}
          </h2>
              ${instance['form_html'].render('login_form')}
          </div>
        </div>`;

        } 
        return instance;
    } 
    return module;
});