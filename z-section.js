define(["jquery",'zdog'], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance.head = function()
        {
            return "";
        } 
        
        
        instance.render = function()
        {
            
            return ` 
 
            <div class="bg-white overflow-hidden shadow rounded-lg space-x-1">
              <div class="px-4 py-5 sm:p-6">
                <!-- Content goes here -->
                    <div class="pb-5 border-b border-gray-200">
                      <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
                        <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
                          ZTIME
                        </h3>
                        <p class="ml-2 mt-1 text-sm text-gray-500 truncate">in Engineering</p>
                      </div>
                    </div>
                        <p>ZCANVAS</p>
                        <canvas class="zdog-canvas" width="24" height="24"></canvas>
              </div>
            </div>

            `;
        } 
        instance.bind= function()
        {
            let illo = new Zdog.Illustration({
              // set canvas with selector
              element: '.zdog-canvas',
            });

            // add circle
            new Zdog.Ellipse({
              addTo: illo,
              diameter: 80,
              stroke: 20,
              color: '#636',
            });

            // update & render
            illo.updateRenderGraph();     
            
            // ANIMATE
            function animate() {
              // rotate illo each frame
              illo.rotate.y += 0.03;
              illo.updateRenderGraph();
              // animate next frame
              requestAnimationFrame( animate );
            }
            // start animation
            animate();            
        } 
        
        return instance;
    } 
    return module;
});