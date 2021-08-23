define(['require',"jquery","paxdk",'components/cookie','d3','c3'], function(require,$,paxdk,cookie) {
    
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
                            'data2': 'x2',
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
            /*
            setTimeout(function(){ 
                                    instance.pq.query('price',{'api_key' : instance.api_key,
                                                     'Ticker':'ADAUSDT',
                                                     'start_date':ys,
                                                     'end_date':td,
                                                     'resolution':'hour',
                                                              },instance.price_summary);
                                 
                                 }, 500);*/
        }
        
        instance.price_summary = function (data){
            cd = ['data2'];
            dd = ['x2'];
            first = -1000;
            for (d in data)
            {
                if (data[d]['ClosePrice'] > first)
                    first = data[d]['ClosePrice'];
                cd.push(data[d]['ClosePrice']/first);        
                dd.push(data[d]['DateTime'].split('.')[0]);        
            }
            //console.log(cd);
            instance.chart.load({columns: [cd,dd]});    
        }
        
        
        return instance;
    } 
    return module;
});