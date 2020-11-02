import React, { useState } from "react";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/world.js');

export function CoronaMapTop(props) {
    const [data, setData] = useState(props.data);
    const [selectedCategory, setSelectedCategory] = useState('new_confirmed');

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const isEmpty = (obj) => {
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    const handleChange = (event, value) => {
        setSelectedCategory(value);
    }

    const convertData = (data)=>{
        const latlong = props.latlong;
        let res = [];
        data.map((itemOpt) => {
            if (latlong[itemOpt.name] !== undefined) {
                res.push( {
                    name: latlong[itemOpt.name].name_cn,
                    value: [
                        latlong[itemOpt.name].longitude,
                        latlong[itemOpt.name].latitude,
                        itemOpt[selectedCategory]
                    ],
                });
            }
        })
        res = res.sort(function (a, b) {
            return b.value[2] - a.value[2];
        }).slice(0, 21);

        return res;
    }


    const getWorldOption = (data) => {
        const latlong = props.latlong;
        if (!isEmpty(props.dates)) {
        let n = props.dates.length - 1;
        const items = convertData(data[props.dates[n]]);
        let max = -Infinity;
        let min = Infinity;
        items.forEach((itemOpt, index) => {
            if (itemOpt.value[2] > max) {
                max = itemOpt.value[2];
            }
            if (itemOpt.value[2] < min) {
                min = itemOpt.value[2];
            }
        });

        if (!isEmpty(latlong)) {
            return {
                baseOption: {
                    backgroundColor: '#404a59',
                    color: ['#E3493B', '#EEBA4C', '#23B5AF', '#A9DDD9'],
                    title: {
                        text: `COVID-19 Daily Report (${formatDate(props.dates[props.dates.length - 1])})`,
                        subtext: 'Data Source: CSSEGISandData/COVID-19',
                        left: 'center',
                        top: 'top',
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var value = (params.value + '').split(',');
                            value = value[2].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                            return params.name + ' : ' + value;
                        }
                    },
                    visualMap: 
                    {
                        show: false,
                        min: min,
                        max: max,
                        text: ['高', '低'],
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered'], symbolSize: [6, 60]
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        name: 'World Population (2010)',
                        type: 'map',
                        map: 'world',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: [
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            name: props.dates[props.dates.length - 1],
                            data: items,         
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                        }
                    ],
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'quinticInOut'
                },
                //options: options
            }
        }
        else {
            return {};
        }
    }
    else {
        return {};
    }
    };

    return (
        <div>
            <ToggleButtonGroup
                value={selectedCategory}
                exclusive
                onChange={handleChange}
                color="primary"
                aria-label="text alignment">
                <ToggleButton value="new_confirmed" aria-label="centered">
                    新增病例
                    </ToggleButton>
                <ToggleButton value="confirmed" aria-label="centered">
                    確診
                    </ToggleButton>
                <ToggleButton value="recovered" aria-label="centered">
                    已恢復
                    </ToggleButton>
                <ToggleButton value="deaths" aria-label="centered">
                    死亡
                    </ToggleButton>
            </ToggleButtonGroup>
            <ReactEcharts
                option={getWorldOption(data)}
                style={{ height: '55vh' }}
                className='react_for_echarts' />
        </div>
    );
}