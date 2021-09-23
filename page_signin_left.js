define(["jquery","components/content"], function($,content_module) {
    var module = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />`,  
            'page_begin':`

<div style='display:none;' id='page_signin_gfuda' class="min-h-screen bg-white flex">
  <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <!--<img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"> -->
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <!--- <p class="mt-2 text-sm text-gray-600">
          Or
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            start your 14-day free trial
          </a>
        </p> --->
      </div>
      <div class="mt-8">`,
            'page_end':`
      </div>
    </div>
  </div>
  <div class="hidden lg:block relative w-0 flex-1">
    <img class="absolute inset-0 h-full w-full object-cover" src="http://2.bp.blogspot.com/-8F2aCa4lEsw/VYe72D5xbmI/AAAAAAAAIj4/YCvLJfGwoeo/s1600/abstract-mushroom-cluster-painting.jpg" alt="">
  </div>
</div>
`,
         
            
            'module_content':content_module,
            
        }
    };
    module.create = function(form_instance)
    {
        var instance ={};
        instance['page_begin'] = module.dependencies['page_begin'];
        instance['page_end'] = module.dependencies['page_end'];
        instance['form_html'] = form_instance
        instance['page_head'] = module.dependencies['page_head'];
        
        
        instance.head = function()
        {
            return instance['page_head'];
        } 
        instance.id = function()
        {
            return "page_signin_gfuda";
        } 
        instance.render = function()
        {
            return instance['page_begin']+ instance['form_html'].render('login_form')+ instance['page_end'];
        } 
        instance.bind = function()
        {
            instance['form_html'].bind();
        } 
        return instance;
    } 
    return module;
});