define(["jquery"], function($) {
    var module = {
        'dependencies':{
        }
    };
    module.create = function(data)
    {
        /*
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>        
        */
        var instance ={};
        instance['content'] = `
        <a id='nav_link${data.id}' href="#" class="bg-gray-900 text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
          <span class="sr-only">${data.label}</span>
          <!-- Heroicon name: outline/inbox -->
          ${data.icon}
        </a>`;
        instance['id'] = data.id;
        instance['label'] = data.label;
        instance['event'] = data.event;
        instance['icon'] = data.icon;
        instance.head = function()
        {
            return "";
        } 
        instance.render = function()
        {
            return instance['content'];
        }
        instance.bind = function ()
        {
            $(`#nav_link${data.id}`).click(instance.event);
            
        }
        //console.log("what the hell");
        //console.log(instance.render());
        return instance;
    } 
    return module;
});