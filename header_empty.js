define(["jquery",'components/uuid4'], function($) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['_id'] ='header_'+uuid4();
        instance['signin'] =data['signin'];
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
            
            return ` 
<header  id='${instance['_id']}' class="flex-shrink-0 relative h-16 bg-white flex items-center">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
         
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        ${instance.signin.render('logout_link')}
      </div>
    </div>
</header>`;
        } 
        instance.bind= function()
        {
            instance.instance.signin.bind();
        } 
        
        return instance;
    } 
    return module;
});