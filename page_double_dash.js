define(["jquery",'components/sidenav_item'], function($,nav_item) {
    var module = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        `}
        
    };
    module.create = function(data)
    {
        var instance = function (){};
        try { instance.nav_items = data.nav_items;} catch(err) { instance.nav_items = null; }
        try { instance.bar_items  = data.bar_items;  } catch(err) { instance.bar_items = null}
        try { instance.header_bar  = data.header_bar;  } catch(err) { console.log("NO HEADER BAR");  instance.header_bar = null}
        instance.main_items = data.main_items
        
        instance['page_head'] = module.dependencies['page_head'];
        instance['page_inner_list'] =[];

        instance.head = function()
        {
            return instance['page_head'];
        } 
        instance.id = function()
        {
            return "page_main_bdjff";
        } 

        instance.render = function()
        {
            if (instance.header_bar == null)
            {
                header_html = "NO HEADER";
            }
            else
            {
                
                header_html = instance.header_bar.render();
                
            }
            if (instance.nav_items == null)
            {
                console.log("NO NAV BAR 2");
                sidebar_html = "";
            }
            else
            {
                 console.log("HAVE NAV BAR 2");
                sidebar_html =`<nav aria-label="Sidebar" class="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
                  <div class="relative w-20 flex flex-col p-3 space-y-3">
                  ${instance.nav_items.render()}
                  </div>
                </nav>`;
            }
            if (instance.bar_items == null)
            {
                bar_html = "";
            }
            else
            {
                bar_html =`<aside class="hidden lg:block lg:flex-shrink-0 lg:order-first">
                <div class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100 space-y-3 p-3">
                  ${instance.bar_items.render()}
                </div>
              </aside>`;
            }
            
            page_html = `<div id='page_main_bdjff' style='display:none' class="h-screen overflowDEAD-hiddenDEAD bg-gray-100 flex flex-col">
  <!-- Top nav-->
    ${header_html}

  <!-- Bottom section -->
  <div class="min-h-0 flex-1 flex overflow-auto">
    <!-- Narrow sidebar-->
    ${sidebar_html}

    <!-- Main area -->
    <main class="min-w-0 flex-1 border-t border-gray-200 lg:flex">
      <!-- Primary column -->
      <section aria-labelledby="primary-heading" class="min-w-0 flex-1 h-full flex flex-col overflowDEAD-hiddenDEAD lg:order-last p-3 space-y-3 ">
        <h1 id="primary-heading" class="sr-only">Home</h1>
        <!-- Your content -->
      ${instance.main_items.render()}
      </section>

      <!-- Secondary column (hidden on smaller screens) -->
    ${bar_html}
    </main>
  </div>
</div>`;            
            
            
            return page_html;
        }
        instance.bind = function()
        {
            if (instance.bar_items != null) {instance.bar_items.bind()} 
            if (instance.nav_items != null) {instance.nav_items.bind()} 
            if (instance.main_items != null) {instance.main_items.bind()} 
        }
        return instance;
    } 
    return module;

});