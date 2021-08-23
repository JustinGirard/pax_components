
define(['jquery','jquery_ui'],function ($,jui) 
{
    var module = {'dependencies':{
        'html_open':`<div id='simple_alert' style='display:none;' class="rounded-md bg-red-50 p-4 absolute top-10 left-5 ">
  <div class="flex">
    <div class="flex-shrink-0">
      <!-- Heroicon name: solid/check-circle -->
      <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-red-800 simple_alert_inner">`,
        'html_close':`</p>
    </div>
    <div class="ml-auto pl-3">
      <div class="-mx-1.5 -my-1.5">
        <button type="button" class="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600">
          <span class="sr-only">Dismiss</span>
          <!-- Heroicon name: solid/x -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>`,}
                 };
    module.create = function(args)
    {
        var instance ={};
        instance['html_open'] = module.dependencies['html_open'];
        instance['html'] = args.html;
        instance['html_close'] = module.dependencies['html_close'];
        instance.head = function()
        {
            return  "";
        }
        instance.render = function()
        {
            return  instance['html_open']+instance['html']+instance['html_close'];
        } 
        instance.show = function()
        {
            $('#simple_alert .simple_alert_inner').html(instance['html']);
            //$('#simple_alert').dialog();
            $('#simple_alert').fadeIn();
            $('#simple_alert').fadeOut(2000);
            //alert(instance['html']);
            //return  instance['html_open']+instance['html']+instance['html_close'];
        } 
        return instance;
        
    } 
    return module;
});