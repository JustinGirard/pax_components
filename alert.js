
define(['jquery','jquery_ui','components/uuid4'],function ($,jui) 
{
    var module = {'dependencies':{}
                 };
    module.create = function(args)
    {
        var instance ={};
        instance['html'] = args.html;
        instance['_id'] ='section_'+uuid4();
        
        
        instance['color'] = args.color;
        if (instance.color == undefined)
        {
            instance['color'] = 'red';
        }
        
        instance.head = function()
        {
            return  "";
        }
        
        instance.render = function()
        {
            var html =`<div id='simple_alert${instance['_id']}' style='display:none;' class="rounded-md bg-${instance['color']}-50 p-4 absolute top-10 left-5 ">
  <div class="flex">
    <div class="flex-shrink-0">
      <!-- Heroicon name: solid/check-circle -->
      <svg class="h-5 w-5 text-${instance['color']}-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-${instance['color']}-800 simple_alert_inner">
        ${instance['html']}
        </p>
    </div>
    <div class="ml-auto pl-3">
      <div class="-mx-1.5 -my-1.5">
        <button type="button" class="inline-flex bg-${instance['color']}-50 rounded-md p-1.5 text-${instance['color']}-500 hover:bg-${instance['color']}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${instance['color']}-50 focus:ring-${instance['color']}-600">
          <span class="sr-only">Dismiss</span>
          <!-- Heroicon name: solid/x -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>`;
            return  html;
        } 
        instance.show = function()
        {
            $(`#simple_alert${instance['_id']} .simple_alert_inner`).html(instance['html']);
            $(`#simple_alert${instance['_id']} `).fadeIn();
            $(`#simple_alert${instance['_id']} `).fadeOut(3500);
        } 
        return instance;
        
    } 
    return module;
});