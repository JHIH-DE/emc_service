import React, { useState } from "react";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/world.js');

export function CoronaMap(props) {
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

    const getWorldOption = (data) => {
        const latlong = props.latlong;
        let timeline = [];
        let options = [];
        let visualMap = [];
        for (var n = 0; n < props.dates.length; n++) {
            timeline.push(props.dates[n]);
            options.push({
                title: {
                    show: true,
                    'text': props.dates[n] + ''
                },
                series: {
                    name: props.dates[n],
                    type: 'scatter',
                    data: data[props.dates[n]].map((itemOpt) => {
                        if (latlong[itemOpt.name] !== undefined) {
                            return {
                                name: latlong[itemOpt.name].name_cn,
                                value: [
                                    latlong[itemOpt.name].longitude,
                                    latlong[itemOpt.name].latitude,
                                    itemOpt[selectedCategory]
                                ],
                            };
                        }
                    })
                }
            });

            let max = -Infinity;
            let min = Infinity;
            data[props.dates[n]].forEach((itemOpt, index) => {
                if (itemOpt[selectedCategory] > max) {
                    max = itemOpt[selectedCategory];
                }
                if (itemOpt[selectedCategory] < min) {
                    min = itemOpt[selectedCategory];
                }
            });


            visualMap.push({
                show: false,
                type: 'continuous',
                min: min,
                max: max,
                text: ['高', '低'],
                calculable: true,
                seriesIndex: n,
                realtime: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered'], symbolSize: [6, 60]
                },
                outOfRange: {       // 选中范围外的视觉配置
                    symbolSize: [30, 100]
                },
                textStyle: {
                    color: '#fff'
                }
            });
        }

        if (!isEmpty(latlong)) {
            return {
                baseOption: {
                    timeline: {
                        axisType: 'category',
                        orient: 'vertical',
                        autoPlay: true,
                        inverse: true,
                        playInterval: 1000,
                        left: null,
                        right: 0,
                        top: 20,
                        bottom: 20,
                        width: 65,
                        height: null,
                        label: {
                            color: '#999'
                        },
                        symbol: 'none',
                        lineStyle: {
                            color: '#555'
                        },
                        checkpointStyle: {
                            color: '#bbb',
                            borderColor: '#777',
                            borderWidth: 2
                        },
                        controlStyle: {
                            showNextBtn: false,
                            showPrevBtn: false,
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            label: {
                                color: '#fff'
                            },
                            controlStyle: {
                                color: '#aaa',
                                borderColor: '#aaa'
                            }
                        },
                        data: timeline
                    },
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
                    visualMap: visualMap,
                    // {
                    //     min: 0,
                    //     max: max,
                    //     text: ['高', '低'],
                    //     calculable: true,
                    //     inRange: {
                    //         color: ['lightskyblue', 'yellow', 'orangered'], symbolSize: [6, 60]
                    //     },
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    // },
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
                            name: '2020-01-31',
                            data: data['2020-1-31'].map((itemOpt) => {
                                if (latlong[itemOpt.name] !== undefined) {
                                    return {
                                        name: latlong[itemOpt.name].name_cn,
                                        value: [
                                            latlong[itemOpt.name].longitude,
                                            latlong[itemOpt.name].latitude,
                                            itemOpt[selectedCategory]
                                        ],
                                    };
                                }
                            })
                        }
                    ],
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'quinticInOut'
                },
                options: options
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