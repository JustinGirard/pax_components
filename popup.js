define(["jquery","components/base","components/link",'components/uuid4'], 
function($,base,link) 
{
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.on_close = function (){};
        if (data.on_close)
            instance.on_close = data.on_close;
        instance.close_link = link.create({'on_click':function (event){instance.on_close();instance.hide(); event.preventDefault();},
                                           'label':`<div class=" sm:block absolute top-0 right-0 pt-4 pr-4">
              <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="open = false">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" x-description="Heroicon name: outline/x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
</svg>
              </button>
            </div>`});
        
        instance.controls =  data.controls;
        
        
        instance.bind = function (){
            instance.close_link.bind();
            instance.recursive_bind(instance.controls);
        }
        instance.overlay_classes =`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`;
        if (instance.is_mobile())
        {
            instance.overlay_classes =`flex  justify-center min-h-screen pt-4 px-4 pb-20 text-center`;
        }
        else
        {
        }
        
        instance.render = function ()
        {
            return `<div id='${instance.id()}' style='display:none;' class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="${instance.overlay_classes}">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <div class="inline-block popup-style align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6">
    ${instance.extract_html(instance.close_link)}
    ${instance.extract_html(instance.controls)}
    
    </div>
  </div>
</div>`;
        
        }
        return instance;
    } 
    return module;
});