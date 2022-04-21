define(['require','components/uuid4'],function (require) 
{
    var module = {'dependencies':{
                                }
                 };
    module.create = function(args)
    {
        var instance ={};
        instance['_id'] ='content_'+uuid4();
        if (args == undefined)
        {
            instance['body'] = "";
        }
        else if (args.content == null)
        {
            instance['body'] = args;
        }
        else
        {
            instance['body'] = args.content;
        }
        if (instance['body'].length != undefined)
        {
            if (instance['body'].length > 200)
            {
                instance['body'] = instance['body'].substring(0,120);
            }
        }
        instance['head'] = "";
        instance.head = function()
        {
            return  instance['head'];
        } 

        instance.render = function()
        {
            return  `<div id='${instance._id}'>${instance.body}</div>`;
        } 
        instance.id = function()
        {
            return instance['_id']
            
        }
        instance.bind = function()
        {
            
        } 
        return instance;
        
    } 
    return module;
});