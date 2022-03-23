define(["jquery",'components/base','components/uuid4'], function($,base) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create({});
        
        instance.head = function()
        {
            var html =`
                <link rel="stylesheet" href="demo_space_looter/TemplateData/style.css">
                <script src="demo_space_looter/TemplateData/UnityProgress.js"></script>
                <script src="demo_space_looter/Build/UnityLoader.js"></script>
               <style>
              .overlay {
                width: 100%;
                height: 100%;
                background: rgba(51,51,51,0.7);
                z-index: 10;
              }
              </style>                
            `;
            return html;
        } 
        instance.render = function()//overlay webgl-content
        {
            var html =`<div class=" " style='display:none;' id='${instance.id()}'>
                      <div id="unityContainer" ></div>
                   </div>
                   `;
            return html;
        } 
        instance.bind= function()
        {
            
        } 
        instance.show = function()
        {
            /*
                       <script>
                        $( document ).ready(function() {
                                  var unityInstance = UnityLoader.instantiate("unityContainer", "demo_space_looter/Build/WebBuild.json", {onProgress: UnityProgress,doNotCaptureKeyboard: true});
                                  setTimeout(function(){$('#${instance.id()}').fadeIn(4000);}, 5000);
                        });                   
                       </script>
            
            */
            if (instance.unityInstance == null)
            {
                setTimeout(function(){
                                       //$(`#${instance.id()} canvas` ).height($(`#${instance.id()}`).height());
                                       $(`#${instance.id()}`).fadeIn(7000);
                                     
                                     }, 2000);
                instance.unityInstance = UnityLoader.instantiate("unityContainer", "demo_space_looter/Build/WebBuild.json", {onProgress: UnityProgress});
            }
            
        }
        instance.hide = function()
        {
            instance.unityInstance.Quit(function() {
                console.log("done!");
            });
            instance.unityInstance = null;
            $(`#${instance.id()}`).fadeOut(4000);            
        
        }
        
        return instance;
    } 
    return module;
});