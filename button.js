define(['require','jquery','components/uuid4'],function (require,$) 
{
    var module = {'dependencies':{
                                }
                 };
    
    module.create = function(data)
    {
        var instance = {}
        instance['__id'] = "button_"+uuid4();
        instance['label'] = data.label;
        instance['on_click'] = data.on_click;
        //return  true;
        module.head = function()
        {
            return  "";
        } 
        instance.show_loader = function()
        {
            //alert("spinning");
            $("#"+instance.__id+" .animate-spin").fadeIn(10);
            $("#"+instance.__id+" .label").css('opacity',0.0);
            
        }
        instance.hide_loader = function()
        {
            $("#"+instance.__id+" .animate-spin").fadeOut(10);
            $("#"+instance.__id+" .label").css('opacity',1.0);
        }
        
        instance.render = function()
        {
            return  `<button id='${instance['__id']}' type="button" class="relative inline-flex items-center mx-1.5 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
            $("div #"+instance.__id).click(instance['click_decorate']);
        } 
        return instance
    } 
    
    return module;
});