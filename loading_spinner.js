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
            instance['style'] ='full';
        }
        else if (args.style == null)
        {
            instance['style'] ='full';
        }
        else
        {
            instance['style'] =args['style'];
        }
        instance['head'] = "";
        instance.head = function()
        {
            return  instance['head'];
        } 

        instance.render = function()
        {
            if (instance.style == 'full')
            {
                instance.full_html = `	<h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
	<p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
`;                
            }
            
            return  `
            <style>
.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
            <div wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
	<div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    ${instance.full_html}
</div>`;
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