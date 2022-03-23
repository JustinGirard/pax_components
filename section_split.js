define(["jquery",'components/base','components/content','components/uuid4'], function($,base,content) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create();
        instance['_id'] ='section_'+uuid4();
        instance['background_image'] =data['background_image'];
        instance['left_component'] =data['left_instance'];
        instance['right_component'] =data['right_instance'];
        instance['section_classes'] =data['section_classes'];
        /*
            <div class="grid grid-rows-3 grid-flow-col gap-4">
              <div class="row-span-3 ...">01</div>
              <div class="col-span-2 ...">02</div>
              <div class="row-span-2 col-span-2 ...">03</div>
            </div>        
        */
        instance['mobile_expand_1'] = 'col-span-4';
        instance['mobile_expand_2'] = 'col-span-4';
        if (instance.is_mobile()==true)
        {
            if (data.m_cols_1)
                instance['mobile_expand_1'] = 'col-span-'+data['m_cols_1'];          
            if (data.m_cols_2)
                instance['mobile_expand_2'] = 'col-span-'+data['m_cols_2'];          
            if (data.m_cols_2 == 0)
                instance['mobile_expand_2'] = 'hidden'; 
            if (data.m_cols_1 == 0)
                instance['mobile_expand_1'] = 'hidden'; 
        }
        
        instance['y_gap'] =instance.extract_field(data['y_gap'],10);
        instance['x_gap'] =instance.extract_field(data['x_gap'],10);
        instance['text_classes'] =instance.extract_field(data['text_classes'],'text-base text-gray-500');
        
        if (instance.section_classes == undefined)
        {
            instance.section_classes = "bg-white";
        }
        
        instance.head = function()
        {
            return "";
        } 
                
        instance.render = function()
        {
            
            instance.left_html = instance.extract_html(instance.left_component);
            instance.right_html = instance.extract_html(instance.right_component);
            if (instance.is_mobile())
            {
                instance.left_html = instance.left_html.replaceAll("3xl", "6xl");
                instance.left_html = instance.left_html.replaceAll("text-lg", " text-lg text-3xl ");
                instance.right_html = instance.right_html.replaceAll("3xl", "6xl");
                instance.right_html = instance.right_html.replaceAll("text-lg", " text-lg text-3xl ");
            }
            
            if (instance.background_image == undefined)
                instance.background_image_html = "";
            else
            {
                if (instance.background_image.render == undefined)
                    instance.background_image_html = `${instance.background_image}`;
                else
                    instance.background_image_html = `${instance.background_image.render()}`;
            }
            
            
            
            //overflow-hidden
            return `<div id ='${instance.id()}' class="py-12 ${instance.section_classes} " style='${instance.background_image_html}'>
                      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="mt-${instance['y_gap']}">
                          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-8 md:gap-x-8 md:gap-y-10">

                            <div class="relative  ${instance['mobile_expand_1']} ">
                              <dd class=" ml-${instance['x_gap']} ${instance['text_classes']}">
                                ${instance.left_html}
                              </dd>
                            </div>
                            <div class="relative  ${instance['mobile_expand_2']} ">
                              <dd class=" ml-${instance['x_gap']} ${instance['text_classes']}">
                                ${instance.right_html}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>`;
            
            return ` 
            <div id="${instance['_id']}" class="grid grid-cols-2 gap-4">
              <div>${instance.left_html}</div>
              <div>${instance.right_html}</div>
            </div>`;
        } 
        instance.bind= function()
        {
            if (instance.right_component != undefined && instance.right_component.bind != undefined)
                instance.right_component.bind();
            if (instance.left_component != undefined && instance.left_component.bind != undefined)
                instance.left_component.bind();
            
        } 
        
        return instance;
    } 
    return module;
});