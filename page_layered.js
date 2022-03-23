define(["jquery",'components/base','components/sidenav_item','components/header_navlist'], function($,base,nav_item,header) {
    var module = {
        'dependencies':{
            'page_head':`<link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        `}
        
    };
    /*
        header_bar  
        nav_items 
        bar_items  
        main_items    
    */
    module.create = function(data)
    {
        var instance = base.create(data);
        try { instance.nav_items = data.nav_items;} catch(err) { instance.nav_items = null; console.log('no nav items 1');}
        try { instance.bar_items  = data.bar_items;  } catch(err) { instance.bar_items = null}
        try { instance.header_bar  = data.header_bar;  } catch(err) { console.log("NO HEADER BAR");  instance.header_bar = null}
        instance.main_items = data.main_items
        instance['page_head'] = module.dependencies['page_head'];
        instance['page_inner_list'] =[];

        instance.head = function()
        {
            return instance['page_head'];
        } 

        instance.render = function()
        {
            /*
              var html =`
              <div class="relative overflow-hidden">
                ${instance.header_html}
                <main>
                ${sections_html}
                </main>
              </div>
            </div>`;
            
            
            */
            
            instance.header_instance = {} 
            header_html ="";
            if (instance.nav_items)
            {
                instance.header_instance = header.create({'left_items':instance.nav_items,
                                                    'logo':'<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                    'right_items':[],}); //instance.sign_in
                header_html = instance.header_instance.render();
            }
            
            sun_header_html = "";
            if (instance.bar_items)
            {
                instance.bar_instance = header.create({'left_items':instance.bar_items,
                                                    'logo':'<img class="h-8 w-auto" src="assets/pax_logo_small.png" alt="">',
                                                    'right_items':[],}); //instance.sign_in
                sun_header_html = instance.extract_html(instance.bar_instance);
            }
            
            page_html = `<div class="min-h-screen" id="${instance.id()}" style='display:none;' >
    ${header_html}
    ${sun_header_html}
    <main>
        ${instance.extract_html(instance.main_items)}
    </main>
</div>`;            
            return page_html;
        }

        instance.bind = function()
        {
            instance.recursive_bind(instance.bar_items);
            instance.recursive_bind(instance.main_items);
            instance.recursive_bind(instance.nav_items);
        }
        instance.hide = function() { $(`#${instance.id()}`).fadeOut(10);   } 
        instance.show = function() { $(`#${instance.id()}`).fadeIn(10); } 
        
        return instance;
    } 
    return module;

});