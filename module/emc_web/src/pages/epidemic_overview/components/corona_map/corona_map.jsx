import React, { useState } from "react";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/world.js');

export function CoronaMap(props) {
    const [data, setData] = useState(props.data);
    const [selectedCategory, setSelectedCategory] = useState('confirmed');

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

    const getWorldOption = (data) => {
        let max = -Infinity;
        let min = Infinity;
        const latlong = props.latlong;
        data.forEach((itemOpt, index) => {
            if (itemOpt[selectedCategory] > max) {
                max = itemOpt[selectedCategory];
            }
            if (itemOpt[selectedCategory] < min) {
                min = itemOpt[selectedCategory];
            }
        });
        if (!isEmpty(latlong)) {
            return {
                backgroundColor: '#404a59',
                color: ['#E3493B', '#EEBA4C', '#23B5AF', '#A9DDD9'],
                title: {
                    text: `COVID-19 Daily Report (${formatDate(props.selectedDate)})`,
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
                visualMap: {
                    min: 0,
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
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: data.map((itemOpt) => {
                            if (latlong[itemOpt.country.name] !== undefined) {
                                return {
                                    name: latlong[itemOpt.country.name].name_cn,
                                    value: [
                                        latlong[itemOpt.country.name].longitude,
                                        latlong[itemOpt.country.name].latitude,
                                        itemOpt[selectedCategory]
                                    ],
                                };
                            }
                        })
                    }
                ]
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
                aria-label="text alignment">
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
                style={{ height: '600px' }}
                className='react_for_echarts' />
        </div>
    );
}