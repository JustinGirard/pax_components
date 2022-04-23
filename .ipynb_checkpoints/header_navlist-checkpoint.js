define(["jquery",'components/base','components/link','components/uuid4'], function($,base,link) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create(data);
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
        //instance['logo'] = instance.extract_field(data['logo'],`<img class="h-8 w-auto" src="assets/decelium_logo_small.png" alt="">`);
        instance['logo'] = undefined;
        if (data['logo'])
        {
            instance['logo'] = instance.extract_field(data['logo'],``);
        }
        instance['_id'] ='header_'+uuid4();
        instance['_id_mobile'] ='header_'+uuid4();
        
        instance.hide_link = link.create({'label':`<span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>`, 'on_click':function(){$(`#${instance['_id_mobile']}`).fadeOut(100);}});
        instance.show_link = link.create({'label':`
                              <span class="sr-only">Open main menu</span>
                              <!-- Heroicon name: outline/menu -->
                              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>`, 'on_click':function(){$(`#${instance['_id_mobile']}`).fadeIn(100);}});

        instance.mobile_hide_menu = `<button type="button" class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                            <span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>CLOSE2
                          </button>`;
        
           instance.mobile_show_menu = `<button type="button" class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white" aria-expanded="false">
                              <span class="sr-only">Open main menu</span>
                              <!-- Heroicon name: outline/menu -->
                              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                            </button>`;
        
        instance.mobile_hide_menu = instance.hide_link.render();
        instance.mobile_show_menu = instance.show_link.render();
        
        instance.head = function()
        {
            return "";
        } 
        instance.refresh = function()
        {
            // alert('e');
            // $(element).is(":visible");
            // $(element).is(":hidden");  
            
            var hidden = true;
            
            [$(`#${instance['_id']}_left_1`).children(), 
             $(`#${instance['_id']}_right_1`).children()].forEach( list =>
            {
                list.each((ind,item)=>{
                   //alert(hidden);
                   //alert(item.is_visible());
                   //console.log($(item).css("display"));
                    //alert(item.css("display"));
                   hidden = hidden && ($(item).css("display")=='none');  
                })
            });
            if (hidden) 
                instance.hide();
            else 
                instance.show();
            
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
            var logo_html_top = "";
            if (instance.logo)
               logo_html_top = `<a href="#" class ='md:mr-10'  >${instance.logo}</a>`;  
            else
                logo_html_top = '';
            // style="border: 5px solid red;" TODO -- use this for debuggning.
            var logo_html_bottom = "";
            if (instance.logo)
               logo_html_bottom = `<div >${instance.logo}</div>`;  
            else
                logo_html_bottom = '';
            //class="flex-shrink-0 relative h-16 bg-white flex items-center"
            return ` 
                <header class="relative"  id='${instance['_id']}'>
                  <div class=" pt-6">
                    <nav class="relative mx-auto flex items-center justify-between px-4 pb-5 sm:px-6" aria-label="Global">
                      <div class="flex items-center flex-1">
                        <div class="flex items-center justify-between w-full md:w-auto">
                            ${logo_html_top}
                          <div class="-mr-2 flex items-center md:hidden">
                            ${instance.mobile_show_menu}
                          </div>
                        </div>
                        <div id='${instance['_id']}_left_1' class="hidden space-x-8 md:flex " >
                         ${instance.extract_html(instance.left_items)}
                        </div>
                      </div>
                      <div id='${instance['_id']}_right_1' class="hidden md:flex md:items-center md:space-x-6" >
                         ${instance.extract_html(instance.right_items)}
                      </div>
                    </nav>
                  </div>

                  <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden" style='display:none;z-index: 11;' id='${instance['_id_mobile']}'>
                    <div class="rounded-lg shadow-md bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div class="px-5 pt-4 flex items-center justify-between">
                        <div class="-mr-2">
                            ${instance.mobile_hide_menu}
                        </div>
                      </div>
                      <div class="pt-5 pb-6">
                        <div class="px-2 space-y-1">
                         ${instance.extract_html(instance.left_items,`<div class="mt-6 px-5 text-center">`,`</div>`)}
                        </div>
                        <div class="px-2 space-y-1">
                         ${instance.extract_html(instance.right_items,`<div class="mt-6 px-5 text-center">`,`</div>`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </header>`;
        } 
        instance.bind= function()
        {
            var lst = [instance.show_link,instance.hide_link,instance.signin];
            lst = lst.concat( instance.right_items);
            lst.forEach(function(i){
                if (i != undefined && i.bind != undefined  )
                    i.bind();
            });
        } 
        
        return instance;
    } 
    return module;
});