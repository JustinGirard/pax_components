define(['require',"jquery","paxdk",'components/cookie','components/application_state','d3','c3'], function(require,$,paxdk,cookie,appstate) {
    
    var module = {
        'dependencies':{}
    };
    module.create = function(data)
    {
        var instance ={};
        instance['inner_component'] =data['content_instance'];
        instance['title'] =data['title'];
        instance.head = function()
        {
            return "";
        } 
        instance.render = function()
        {
            return `<div id='chart_id'>loading . . . </div>`;
        } 
        instance.bind = function()
        {
            console.log("BINDING THE CHART!!");
            instance.pq = new Paxdk(url_version_in='stage');
            instance.api_key = cookie.get('pax_api_key');
            instance.mid = 'live_binance_jg'
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 15);
            today.setDate(today.getDate() + 5);
            var ys = yesterday.toISOString().split('.')[0];
            var td = today.toISOString().split('.')[0];
            if (typeof c3 === 'undefined') { c3 = require('c3');}            
            instance.chart = c3.generate({
                bindto: '#chart_id',
                data: {
                        xs: {
                            'data1': 'x1',
                            //'data2': 'x2',
                        },        
                        xFormat: '%Y-%m-%dT%H:%M:%S',
                          columns: [
                  ],
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        localtime: false,
                        tick: {
                            format:'%Y-%m-%dT%H'
                             },
                        },
                },
                point: {
                  show: false
                }    
            });
            
            //instance.count_summary();            
        }
        
        instance.show = function ()
        {
            console.log("SHOWING DATA");
            data = appstate.get('detail_data_bars');
            if (data != undefined)
            {
                console.log("SHOWING DATA3");
                console.log(data);
                y_vals = ['data1'];
                x_vals = ['x1'];
                x_list = [];
                y_list = [];
                data.forEach(function(element)
                {
                    console.log("Graph Element");
                    console.log(element);
                    x_vals.push(element['DateTime']);
                    y_vals.push(element['CloseValue']);
                });
                instance.chart.load({columns: [y_vals,x_vals]});    
            }                
        }
        
        
        return instance;
    } 
    return module;
});