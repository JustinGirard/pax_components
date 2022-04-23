define(['require','jquery','components/base','components/button','components/uuid4'],function (require,$,base,button) 
{
    var module = {'dependencies':{}};
    
    module.create = function(data)
    {
        var instance = base.create(data);
        instance['label'] = instance.extract_field(data.label,"'label' field");
        instance['on_click'] =  instance.extract_field(data.on_click,function(){alert("'on_click' field needs to be assigned")});
        
        module.head = function()
        {
            return  "";
        } 
        instance.show_loader = function()
        {
            //alert("spinning");
            $("#"+instance.id()+" .animate-spin").fadeIn(10);
            $("#"+instance.id()+" .label").css('opacity',0.0);
            
        }
        instance.hide_loader = function()
        {
            $("#"+instance.id()+" .animate-spin").fadeOut(10);
            $("#"+instance.id()+" .label").css('opacity',1.0);
        }
        instance.mobile_classes = "";
        if (instance.is_mobile()==true)
        {
            instance.mobile_classes = " text-4xl ";
        }
        
        instance.render = function()
        {
            return  `<button id='${instance.id()}' type="button" class=" ${instance.mobile_classes} relative inline-flex items-center mx-1.5 px-4 py-2 border border-transparent shadow-sm text-sm font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg class="animate-spin h-5 w-5 mr-3" style="display:none; position:absolute;" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>          

            <p class='label' >${instance['label']}</p>
          </button>`;
        } 
        instance.click_decorate = function(event)
        {
            
            instance.show_loader();
            instance.on_click(event);
            setTimeout(function(){ instance.hide_loader(); }, 800);            
            
        }
        instance.bind = function()
        {
            $("div #"+instance.id()).click(instance['click_decorate']);
        } 
        return instance
    } 
    
    return module;
});