define(["jquery",'zdog','components/uuid4'], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='zdog_'+uuid4();
        instance.height_list = data['list'];
        
        instance.head = function()
        {
            return "";
        } 
        
        instance.render = function()
        {
            return `<canvas style='background-color:#JJJ' id="${instance._id}" width="100" height="50"></canvas>`;
        } 
        
        instance.bind= function()
        {
            if  (Zdog == undefined)
            {
                require('zdog');
            }
            let illo = new Zdog.Illustration({
              // set canvas with selector
              element: `#${instance._id}`,
            });
            // add circle
            var max = -1000
            var min = +1000
            instance.adj_height = []
            instance.height_list.forEach(function(height)
            {
                if (height > max)
                    max = height;
                if (height < min)
                    min = height;
            });
            var adj_max = max - min;
            instance.height_list.forEach(function(height)
            {
                val = height - min;
                val = (val / adj_max)*25.25 + 2.25;
                instance.adj_height.push(val);
            });
            
            var offset = -40;
            var ydown = 20;
            
            instance.adj_height.forEach(function(xoffset){
                //var xoffset = instance.adj_height[xid];
                new Zdog.Rect({
                  addTo: illo,
                  width: 10,
                  height: xoffset,
                  stroke: 1,
                  fill:true,
                  translate: { x: offset,y:-(xoffset+15)/2.0+ydown },                    
                  color: '#AAA',
                });
                 offset = offset+ 13;
                
            });

            // update & render
            illo.updateRenderGraph();     
            
            // ANIMATE
            /*
            function animate() {
              // rotate illo each frame
              illo.rotate.y += 0.03;
              illo.updateRenderGraph();
              // animate next frame
              requestAnimationFrame( animate );
            }
            // start animation
            animate();    */        
        } 
        
        return instance;
    } 
    return module;
});