/*
TODO
- tabs as a plugin view
- object "view_edit" as a standalone plugin, supporting tabs

*/
define(["jquery",'components/base','components/list_detailed_item','components/link','components/uuid4'], 
       function($,base,list_item_detailed,link) {
    var module = { 'dependencies':{} };
    module.create = function(data)
    {
        var instance =base.create(data);
        var classes = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm';
        if( data['controls'] == undefined)
        {
            instance.controls = [link.create({'label':'First',
                                              'classes':classes,
                                              'on_click':function(){alert(1)}}),
                                 link.create({'label':'Second',
                                              'classes':classes,
                                              'on_click':function(){alert(2)}})];
        }
        else
        {
            instance.controls = data.controls;
            instance.controls.forEach(function(item){item.classes += classes; });
        }   
        
        instance.reload = function()
        {
            $(`#${instance.id()} ul`).empty();
            $(`#${instance.id()} ul`).html(instance.extract_html(instance.items));
            instance.bind();
        }
        
        instance.render = function()
        {
            //instance.control_set_labels
            let lbl_html = "";
            let opt_html = "";
            instance.controls.forEach(function(control){
                lbl_html = lbl_html + control.render();
                opt_html = opt_html + `<option>${control.label}</option>`;
                });
            
            return `
<div id='${instance['_id']}' >
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">Select a tab</label>
    <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
    <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
        ${opt_html}
    </select>
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
        ${lbl_html}
      </nav>
    </div>
  </div>
  
  
  
</div>`;
        } 
        instance.bind = function()
        {
            instance.controls.forEach(function(item){ 
                    item.bind();
            });
        }
        return instance;
    } 
    return module;
});