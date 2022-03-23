define(["jquery",'components/button','components/uuid4'], function($,button) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='section_'+uuid4();
        instance.list_generator = data.function_list_generator;
        
        instance.save_button = button.create({'label':'Save',});
        instance.exit_button = button.create({'label':'Close',});
        instance.exit_button.on_click = function (event){
            event.preventDefault();
            $("#"+instance['_id']).fadeOut(100);
            
        }
        instance.head = function()
        {
            return "";
        } 
        
        instance.id = function()
        {
            return instance['_id'];
        }
        
        instance.render = function()
        {
            /*
                              <button type="button" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create new job
                              </button>*/
            /*
            if (instance.upper_component == undefined)
            {
                instance.upper_html = "";
            }
            else
            {
                instance.upper_html = instance.upper_component.render();
            }
            
            if (instance.title.render == undefined)
            {
                instance.title_html = instance.title;
            }
            else
            {
                instance.title_html = instance.title.render();
            }*/
            
            //overflow-hidden
            return `
<div id="${instance.id()}" class="fixed z-10 inset-0 overflow-y-auto show-me-always" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-7 sm:p-7">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Download
        </h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Choose the month you would like to download.
          </p>
        </div>
        <form class="mt-5 sm:flex sm:items-center">
              <div class="w-full sm:max-w-xs">
              <select id="${instance.id()}_select"  name="location" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>A</option>
                <option selected>B</option>
                <option>C</option>
              </select>
            </div>
          ${instance.save_button.render()}
          ${instance.exit_button.render()}
        </form>
      </div>
    </div>
</div>`;
        } 
        

        instance.show= function()
        {
            instance.items = instance.list_generator() 
            html = "";
            instance.items.forEach(function(item){
                html = html + `<option value='${item.id}'>${item.label}</option>`;
                //console.log(item);
            });
            $(`#${instance.id()}_select` ).html(html);
            
            instance.save_button.on_click= function(event)
            {
                event.preventDefault();
                var v = $(`#${instance.id()}_select` ).val();
                console.log(v);
                instance.items.forEach(function(item)
                {
                    if (item['id'] == v)
                    {
                        item.func();
                    }
                });
            };
        } 
        
        
        instance.bind= function()
        {
            instance.exit_button.bind();
            instance.save_button.bind();
        } 
        
        return instance;
    } 
    return module;
});