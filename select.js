define(['require','jquery','components/base','components/button','components/uuid4'],function (require,$,base,button) 
{
    var module = {'dependencies':{}};
    
    module.create = function(data)
    {
        var instance = base.create(data);
        instance['label'] = instance.extract_field(data.label,"'label' field");
        instance['options'] =  instance.extract_field(data.options,{'example_1':"Example 1",'example_2':`{'example_1':"Example 1",'example_2':"Example 2"}`});
        instance['on_click'] =  instance.extract_field(data.on_click,function(){});
        instance['on_change'] =  instance.extract_field(data.on_change,function(){alert("'on_change' field needs to be assigned")});
        module.head = function()
        {
            return  "";
        } 
        instance.mobile_classes = "";
        if (instance.is_mobile()==true)
        {
            instance.mobile_classes = " text-4xl ";
        }
        
        instance.render = function()
        { //<option value="volvo">Volvo</option>
            let o_html = "";
            let os = instance.options;
            Object.keys(instance.options).forEach((key) =>{o_html += `<option value="${key}">${os[key]}</option>`});
            return  `<select id='${instance.id()}'  name="cars">${o_html}</select>`;
        } 
        instance.click_decorate = (event) => {
            instance.on_click(event);
        }
        instance.change_decorate = (event) => {
            instance.on_change(event);
        }
        instance.bind = () => {
            $("#"+instance.id()).change(instance['change_decorate']);
            $("#"+instance.id()).click(instance['click_decorate']);
        }         
        return instance
    } 
    
    return module;
});