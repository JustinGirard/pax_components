define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.img = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80";
        instance.title = "'img','title','note','detail','on_click'";
        instance.note = "a";
        instance.detail = "This is an event";
        instance.on_click = function (){alert(instance.id());};
        
        instance.bind = function()
        {
            $("div #"+instance.id()+'_link').click(instance['on_click']);
        } 
        
        
        instance.render = function()
        {
            var open = "";
            var close = "";
            
            if (instance.on_click != undefined)
            {
                open =  `<a  id='${instance.id()}_link' href="#" class="text-base font-medium text-white hover:text-gray-300">`;
                close = `</a>`;
            }
            return `<li class="py-4" id='${instance.id()}' >
                        ${open}
                          <div class="flex space-x-3">
                            <img class="h-6 w-6 rounded-full" src="${instance.img}" alt="">
                            <div class="flex-1 space-y-1">
                              <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium">${instance.title} </h3>
                                <p class="text-sm text-gray-500">${instance.note}</p>
                              </div>
                              <p class="text-sm text-gray-500">${instance.detail}</p>
                            </div>
                          </div>
                        ${close}
                    </li>`;
        }  
        return instance;
    } 
    return module;
});