/*
TODO
- tabs as a plugin view
- object "view_edit" as a standalone plugin, supporting tabs

*/
define(["jquery",'components/base','components/list_detailed_item','components/uuid4'], function($,base,list_item_detailed) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        var demo_items = ['<li> "items" a collection of items</li>'];
        demo_items.push(list_item_detailed.create({}));
        demo_items.push(list_item_detailed.create({}));
        if( data['controls'] == undefined)
            instance.items = instance.extract_field(data['items'],demo_items);
        else
            instance.items = instance.extract_field(data['controls'],demo_items);
            
        instance.reload = function()
        {
            $(`#${instance.id()} ul`).empty();
            $(`#${instance.id()} ul`).html(instance.extract_html(instance.items));
            instance.bind();
        }
        
        instance.render = function()
        {
            //                          ${instance.extract_html(instance.items)}

            return `
<div id='${instance['_id']}' >
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">Select a tab</label>
    <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
    <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
      <option>My Account</option>

      <option>Company</option>

      <option selected>Team Members</option>

      <option>Billing</option>
    </select>
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"> My Account </a>

        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"> Company </a>

        <a href="#" class="border-indigo-500 text-indigo-600 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm" aria-current="page"> Team Members </a>

        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"> Billing </a>
      </nav>
    </div>
  </div>
  
  
  
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