define([],function (require) 
{
    var module = {'dependencies':{
                                }
                 };
    
    module.create = function(data)
    {
        module['html'] = data;
        return  true;
    } 
    module.head = function()
    {
        return  "";
    } 

    module.render = function()
    {
        return  module['html'];
    } 
    module.bind = function()
    {
    } 
    
    return module;
});