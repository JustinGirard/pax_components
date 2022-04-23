define(['require','components/base','components/section','components/content','components/uuid4','jquery',],
       function (require,base,content,section) 
{
    var module = {'dependencies':{}
                 };
    /*
    
    // LOADING VIEW EXAMPLE
    // LOADS TO 90% then stops
    instance.loading_view = loading_section.create({})
    instance.test_popup = popup.create({'controls':instance.loading_view,'on_close':function(){alert('cancel!')}});


    instance.test_popup.show();
    var myTimeout = {};
    var f_popup_update = function(instance)
    {
        var progress = instance.loading_view.progress + 1;
        instance.loading_view.submit_progress_update({'progress': progress,'title': 'tit2','step': 'one3'});
        if (progress >= 90)
          clearInterval(myTimeout);
    }
    var myTimeout = setInterval(f_popup_update.bind(null, instance), 100);
    
    */
    module.create = function(args)
    {
        var instance =base.create(args);
        instance.progress= args.progress;
        instance.title=args.title ;
        instance.step=args.step ;

        
        if (args.progress == undefined)
            instance.progress = 50.0;
        if (args.title == undefined)
            instance.title = 'Loading...';
        if (args.step == undefined)
            instance.step = 'Step...';
        instance.submit_progress_update = function(args_in)
        {
            if (args_in.title)
            {
                instance.title =  args_in.title;
                $(`#${instance.id()} .current_title`).html(instance.extract_html(instance.title));
                instance.recursive_bind(instance.title);            
            }
            if (args_in.step)
            {
                instance.step =  args_in.step;
                $(`#${instance.id()} .current_step`).html(instance.extract_html(instance.step));
                instance.recursive_bind(instance.step);            
            }
            if (args_in.progress)
            {
                instance.progress =  args_in.progress;
                $(`#${instance.id()} .current_progress`).css(`width`,`${instance.progress}%`);
            }
            
            
        
        }
        instance.bind = function()
        {
            instance.recursive_bind(instance.title);
            instance.recursive_bind(instance.step);
        }
        instance.render = function()
        {
            return `
<div id="${instance.id()}" class="">
  <h4 class="sr-only">Status</h4>
  <p class="text-sm font-medium text-gray-900 current_title">${instance.extract_html(instance.title)}</p>
  <div class="mt-6" aria-hidden="true">
    <div class="bg-gray-200 rounded-full overflow-hidden">
      <div class="h-2 bg-indigo-600 rounded-full current_progress" style="width: ${instance.progress}%"></div>
    </div>
    <div class="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
      <div class="text-indigo-600 current_step">${instance.extract_html(instance.step)}</div>
    </div>
  </div>
</div>`;
        } 
        return instance;
    } 
    return module;
});