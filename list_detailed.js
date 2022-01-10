define(["jquery",'components/base','components/list_detailed_item','components/uuid4'], function($,base,list_item_detailed) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        var demo_items = ['<li> "items" a collection of items</li>'];
        demo_items.push(list_item_detailed.create({}));
        demo_items.push(list_item_detailed.create({}));

        instance.items = instance.extract_field(data['items'],demo_items);
        instance.render = function()
        {
            return `<div id='${instance['_id']}' >
                      <ul role="list" class="divide-y divide-gray-200">
                          ${instance.extract_html(instance.items)}
                      </ul>
                    </div>`;
        } 
        instance.bind = function()
        {
            instance.items.forEach(function(item){ 
                if (item.bind != undefined)
                    item.bind();
            });
        }
        return instance;
    } 
    return module;
});