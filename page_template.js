
              
              
define(["jquery","components/content"], function($,content_module) {
    var module = {
        'dependencies':{
        }
    };
    module.create = function(data)
    {
        var instance ={};
        
        instance.head = function()
        {
            return "";
        } 
        instance.id = function()
        {
            return "page_people_gfudaab";
        } 
        instance.bind = function()
        {
            //
        } 
        instance.hide = function()
        {
            $(`#${instance.id()}`).fadeOut(10);
        } 
        
        instance.show = function()
        {
            $(`#${instance.id()}`).fadeIn(10);
        } 
        
        instance.render = function()
        {
            
            return "Hello World";
        } 
        return instance;
    } 
    return module;
});