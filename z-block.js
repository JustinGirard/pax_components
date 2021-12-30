define(["jquery",'zdog','components/uuid4'], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='section_'+uuid4();
        instance.html = data.html;
        instance.r = {}
        instance.r.cur = [0,0,0];
        instance.r.min = [-360,-360,-360];
        instance.r.max = [360,360,360];
        instance.r.offset = [0,0,0];
        instance.r.factor = [0,0,0];

        instance.t = {}
        instance.t.cur = [0,0,0];
        instance.t.min = [-1000,-1000,-1000];
        instance.t.max = [1000,1000,1000];
        instance.t.offset = [0,0,0];
        instance.t.factor = [0,0,0];
        
        ['r','t'].forEach(function(var_type){
            ['cur','min','max','offset','factor'].forEach(function(var_name){
                if (data[var_type] != undefined && data[var_type][var_name] != undefined )
                    instance[var_type][var_name] = data[var_type][var_name];
            });
        });
        
        instance.head = function()
        {
            return "";
        } 
        
        instance.render = function()
        {
            return `<div id='img_rot_${instance['_id']}'>${instance.html}</div>`;
        } 
        instance.bind= function()
        {
            function animate() 
            {
              var elem = document.getElementById(`img_rot_${instance['_id']}`);
              //get the distance scrolled on body (by default can be changed)
              var distanceScrolled = document.body.scrollTop;
              //create viewport offset object
              var elemRect = elem.getBoundingClientRect();
              //get the offset from the element to the viewport
              var elemViewportOffset = elemRect.top;
              //add them together
              var totalOffset = distanceScrolled + elemViewportOffset;
              var ang  = (totalOffset /100)%360;
                
              var dimensions = [0,1,2];
              var collections = [instance.r,instance.t];
              dimensions.forEach(function(d){
                  collections.forEach(function(c){
                    c.cur[d] = c.offset[d] + ang*c.factor[d]
                    if (c.min[d] != undefined && c.cur[d] < c.min[d])
                         c.cur[d] = c.min[d]; 
                    if (c.max[d] != undefined && c.cur[d] > c.max[d])
                         c.cur[d] = c.max[d]; 
                  });
              });
              
              var rx = instance.r.cur[0];
              var ry = instance.r.cur[1];
              var rz = instance.r.cur[2];
              var tx = instance.t.cur[0];
              var ty = instance.t.cur[1];
              var tz = instance.t.cur[2];
              elem.style.transform = "rotateX("+rx+"deg) rotateY("+ry+"deg) rotateZ("+rz+"deg) translate("+tx+"px,"+ty+"px)";                
              setTimeout(animate, 3);            
            }
            setTimeout(animate, 3);            
        } 
        return instance;
    } 
    return module;
});