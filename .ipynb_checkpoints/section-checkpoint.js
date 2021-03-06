define(["jquery",'components/content','components/uuid4'], function($,content) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='section_'+uuid4();
        
        instance['inner_component'] =data['content'];
        instance['upper_component'] =data['header'];
        instance['title'] =data['title'];
        instance['section_classes'] =data['section'];
        
        if (instance.section_classes == undefined)
        {
            instance.section_classes = "bg-white";
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
            if (instance.upper_component == undefined)
            {
                instance.upper_html = "";
            }
            else
            {
                if (instance.upper_component.render == undefined)
                {
                    instance.upper_html = instance.upper_component;
                }
                else
                {
                    instance.upper_html = instance.upper_component.render();
                }
            }
            
            
            if (instance.inner_component == undefined)
            {
                instance.inner_component = content.create("");
            }
            else if (instance.inner_component.render == undefined)
            {
                instance.inner_component = content.create(instance.inner_component);
            }
            
            
            if (instance.title == undefined)
            {
                instance.title_html = "";
            }
            else if (instance.title.render == undefined)
            {
                instance.title_html = instance.title;
            }
            else
            {
                instance.title_html = instance.title.render();
            }
            
            //overflow-hidden 
            // <div class="-ml-4 mt-2 flex flex-wrap sm:flex-nowrap">
            return ` 
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
            </div>`;
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