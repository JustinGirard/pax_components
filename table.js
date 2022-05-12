define(['require',"jquery","components/base"], function(require,$,base) {
    var module = {
        'dependencies':{}
    };
    /*
                var dt = new Date();
                var start_date = new Date(dt .getUTCFullYear(), dt .getUTCMonth(), dt .getUTCDate(), 0, 0, 0, 0);
                var end_date = new Date(dt .getUTCFullYear(), dt .getUTCMonth(), dt .getUTCDate(), 
                                        dt .getHours(), dt .getMinutes(), dt .getSeconds(), 0);
                start_date = start_date.toISOString().split(".")[0];
                end_date = end_date.toISOString().split(".")[0];
                
                console.log("LOADING HERE");
                i_log_section.appstate.get('pq').query('get_data',{'experiment_id':i_log_section.experiment_id,
                                                              'start_date':start_date,'end_date':end_date,
                                                             },function(data) {
                    console.log("RESULTS");
                    console.log(data);
                    let rows = [];
                    let cols = {};
                    fkeys = Object.keys;
                    // Ennumeate Cols
                    data.forEach((row) =>{ fkeys(row).forEach(col => cols[col]=content)});
                    data.forEach((row) =>{ 
                        let rw = [];
                        fkeys(cols).forEach(col => {
                            rw.push({'content':row[col]});
                        });
                        rows.push(rw);
                    });
                    let i_summary_table = table.create({'def':cols,'dataframe':rows});        
                    $(`#${i_log_section.id()}`).html(i_summary_table.render());
                });
                return `<div id='${i_log_section.id()}'>loading ${data.experiment_id}</div>`;    
    
    
    
    */
    
    
    module.create = function(data)
    {
        var instance =base.create(data);
        instance['dataframe'] = data['dataframe']; // row of rows
        instance['def'] = data['def']; // Columns and IDS, where each column = {'name':'NAME', 'key':'KEY','component':}
        instance['classes'] = data.classes
        if (data.classes == undefined) instance.classes = "px-6 py-4 max-w-xs max-h-6";
        
        
        instance.head = function()
        {
            return "";
        } 
        instance.bind = function()
        {
            instance.sub_components.forEach(function(element){
                element.bind();
            });
            
        } 
        instance.render = function()
        {
            instance['sub_components'] = [];
            col_body_html = "";
            col_header_html = "";
            /*
            Object.keys(instance.def).forEach(function(key){
                col = instance.def[key];
                col_header_html = col_header_html + `<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                ${col['name']}
              </th>`;
            });
            */
            if (instance['dataframe'] != null)
            {
                instance.dataframe.forEach(function(row)
                {                
                    var component_keys = Object.keys(instance.def);
                    var component_index = 0;
                    col_body_html = col_body_html + "<tr>";
                    row.forEach(function(content)
                    {
                        let component_key = component_keys[component_index];
                        let component_def = instance.def[component_key];
                        let component_instance = component_def.create(content);
                        instance['sub_components'].push(component_instance);
                        col_body_html += `<td class="${instance.classes}">${component_instance.render()}</td>`;
                        component_index += 1;
                    });
                    col_body_html = col_body_html + "</tr>";
                });
            }
            
            return `<!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex flex-col" id="${instance.id()}">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <!--<thead class="bg-gray-50"><tr>${col_header_html}</tr></thead> -->
               <tbody class="bg-white divide-y divide-gray-200">${col_body_html}</tbody >
            </table>
          </div>
        </div>
      </div>
    </div>`;                
        } 
        return instance;
    } 
    return module;
});