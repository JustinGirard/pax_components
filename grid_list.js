define(["jquery",'components/base','components/content','components/uuid4'], function($,base,content) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create({data});
        instance['_id'] ='section_'+uuid4();
        instance['controls'] =data['controls'];
        /*
        <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          <li class="relative">
            <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for IMG_4985.HEIC</span>
              </button>
            </div>
            <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">IMG_4985.HEIC</p>
            <p class="block text-sm font-medium text-gray-500 pointer-events-none">3.9 MB</p>
          </li>
        </ul>        
        */
        
        
        instance.render = function()
        {
            /*
                              <button type="button" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create new job
                              </button>*/

            
            //overflow-hidden 
            // <div class="-ml-4 mt-2 flex flex-wrap sm:flex-nowrap">
           /* return ` 
            <div id='${instance['_id']}' class=" ${instance.section_classes}  shadow rounded-lg space-x-1 section-container">
              <div class="px-4 py-5 sm:p-6 travis">
                        <div class="bg-white  py-5 border-gray-200 ">
                          <div class="-mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div class=" ">
                              <h3 class="text-lg leading-6 font-medium text-gray-900">
                                ${instance.title_html}
                              </h3>
                            </div>
                            <div class=" mt-2 flex-shrink-0">
                                ${instance.upper_html}
                            </div>
                          </div>
                        </div>
                        ${instance.inner_component.render()}
              </div>
            </div>`;*/
            
            
            return `<ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          <li class="relative">
            <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for IMG_4985.HEIC</span>
              </button>
            </div>
            <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">IMG_4985.HEIC</p>
            <p class="block text-sm font-medium text-gray-500 pointer-events-none">3.9 MB</p>
          </li>
        </ul>`
            
        } 
        instance.bind= function()
        {
            instance.inner_component.bind();
            if (instance.upper_component != undefined && instance.upper_component.bind != undefined )
            {
                instance.upper_component.bind();
            }
            
        } 
        
        return instance;
    } 
    return module;
});