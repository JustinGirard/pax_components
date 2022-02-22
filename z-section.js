define(["jquery",'components/base','zdog'], function($,base) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance =base.create(data);
        instance.head = function()
        {
            return "";
        } 
        
        
        instance.render = function()
        {
            
            return ` 
                <canvas class="zdog-canvas" width="240" height="240" id='${instance.id()}'></canvas>
            `;
        } 
        instance.bind= function()
        {
            let illo = new Zdog.Illustration({
              // set canvas with selector
              element: '.zdog-canvas',
            });

            // add circle
            /*
            new Zdog.Ellipse({
              addTo: illo,
              diameter: 80,
              stroke: 20,
              color: '#636',
            });
            */
            let box = new Zdog.Box({
              addTo: illo,
              width: 120,
              height: 100,
              depth: 80,
              rotate: { x: -Zdog.TAU/8, y: Zdog.TAU/8 },
              stroke: false,
              color: '#C25', // default face color
              leftFace: '#EA0',
              rightFace: '#E62',
              topFace: '#ED0',
              bottomFace: '#636',
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