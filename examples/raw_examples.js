// Extremely small section that supports show / hide etc
var home_section = base.create({});
home_section.render = function()
{
    home_section.home_sections_list = [];
    home_section.home_sections_list.push(section_split.create(top_section.create({'appstate':instance.appstate,'control':instance.contrib})));
    home_section.home_sections_list.push(section_split.create(mid_section.create({'appstate':instance.appstate,'control':instance.contrib})));
    var html = "";
    home_section.home_sections_list.forEach(function(item)
    {
        html = html + instance.extract_html(item);   
        return `<div id='${home_section.id()}'>${html}</div>`;
    });
}
