define(["jquery",'components/uuid4'], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['left_items'] =data['left_items']; // pass as mem_list
        /* instance['left_items'] = EXAMPLE:
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Product</a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Features</a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Marketplace</a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Company</a>
        */
        
        instance['right_items'] =data['right_items']; // pass as mem_list
        /*
            <div class="mt-6 px-5">
              <a href="#" class="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700">Start free trial</a>
            </div>
            <div class="mt-6 px-5">
              <p class="text-center text-base font-medium text-gray-500">Existing customer? <a href="#" class="text-gray-900 hover:underline">Login</a></p>
            </div>
        */
        
        instance['logo_item'] =data['logo_item']; // pass as mem_list
        instance['_id'] ='header_'+uuid4();
        instance.head = function()
        {
            return "";
        } 
        
        instance.id = function()
        {
            return instance['_id'];
        }
        
        instance.extract_html_menu = function(items,pre,post)
        {
            var html = "";
            if (pre == undefined)
                pre = "";
            if (post == undefined)
                post = "";
            if (items == undefined)
                html = "";
            else if (typeof items === 'string' || items instanceof String)
            {
                 return pre+items+post;
            }
            else
            {
                html = "";
                items.forEach(function(item){
                    if (item.render == undefined)
                        html += pre+item+post;
                    else
                        html += pre+item.render()+post;
                });
            }
            return html;
        }
        
        instance.render = function()
        { 
            //instance.extract_html_menu(instance.left_items);

            instance.right_items_html = "Hey. ERROR IN header_navlist.right_items";
            instance.right_items_html = instance.extract_html_menu(instance.right_items);
            
            
            //class="flex-shrink-0 relative h-16 bg-white flex items-center"
            return ` 
                <header class="relative"  id='${instance['_id']}'>
                  <div class="bg-gray-900 pt-6">
                    <nav class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
                      <div class="flex items-center flex-1">
                        <div class="flex items-center justify-between w-full md:w-auto">
                          <a href="#">
                            <span class="sr-only">Workflow</span>
                            <img class="h-8 w-auto sm:h-10" src="assets/decelium_logo_small.png" alt="">
                          </a>
                          <div class="-mr-2 flex items-center md:hidden">
                            <button type="button" class="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white" aria-expanded="false">
                              <span class="sr-only">Open main menu</span>
                              <!-- Heroicon name: outline/menu -->
                              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="hidden space-x-8 md:flex md:ml-10">
                         ${instance.extract_html_menu(instance.left_items)}
                        </div>
                      </div>
                      <div class="hidden md:flex md:items-center md:space-x-6">
                         ${instance.extract_html_menu(instance.right_items)}
                      </div>
                    </nav>
                  </div>

                  <!--
                    Mobile menu, show/hide based on menu open state.

                    Entering: "duration-150 ease-out"
                      From: "opacity-0 scale-95"
                      To: "opacity-100 scale-100"
                    Leaving: "duration-100 ease-in"
                      From: "opacity-100 scale-100"
                      To: "opacity-0 scale-95"
                  -->
                  <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden">
                    <div class="rounded-lg shadow-md bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div class="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <img class="h-8 w-auto" src="assets/decelium_logo_small.png" alt="">
                        </div>
                        <div class="-mr-2">
                          <button type="button" class="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                            <span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="pt-5 pb-6">
                        <div class="px-2 space-y-1">
                         ${instance.extract_html_menu(instance.left_items,`<div class="mt-6 px-5 text-center">`,`</div>`)}
                        </div>
                        <div class="px-2 space-y-1">
                         ${instance.extract_html_menu(instance.right_items,`<div class="mt-6 px-5 text-center">`,`</div>`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </header>`;
        } 
        instance.bind= function()
        {
            instance.instance.signin.bind();
        } 
        
        return instance;
    } 
    return module;
});