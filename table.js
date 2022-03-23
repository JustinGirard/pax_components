define(['require',"jquery"], function(require,$) {
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['dataframe'] = data['dataframe'];
        instance['def'] = data['def']; // Columns and IDS, where each column = {'name':'NAME', 'key':'KEY','component':}
        instance['sub_components'] = []
        
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
            col_body_html = "";
            col_header_html = "";
            Object.keys(instance.def).forEach(function(key){
                col = instance.def[key];
                col_header_html = col_header_html + `<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                ${col['name']}
              </th>`;
            });
            if (instance['dataframe'] != null)
            {
                instance.dataframe.rows().forEach(function(row){                
                    col_body_html = col_body_html + "<tr>";
                    Object.keys(instance.def).forEach(function(key){
                      def_row = instance.def[key];
                      //console.log(def_row.component);
                      //console.log(row[key]);
                      comp = def_row.component.create(row[key]);
                      instance['sub_components'].push(comp);
                      html = comp.render(); // whitespace-nowrap
                      col_body_html = col_body_html +`<td class="px-6 py-4 max-w-xs max-h-6">${html}</td>`;
                    
                    });
                    col_body_html = col_body_html + "</tr>";
                });
            }
            
            return `<!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr>${col_header_html}</tr></thead>
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