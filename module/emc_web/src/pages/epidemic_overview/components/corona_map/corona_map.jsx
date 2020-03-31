import React from "react";
import ReactEcharts from 'echarts-for-react';
import { apiGetCountries } from "../../../service";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import countries from '../../../../countries.js';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

require('echarts/map/js/china.js');
require('echarts/map/js/world.js');

class CoronaMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latlong: {},
            data: [],
            getCountryQuery: gql`
            {
                results(
               countries: [${countries}]
                date: {eq: "${this.props.selectedDate}"})
                {
                  country{
                    name
                  }
                  date
                  deaths
                  confirmed
                  recovered
                }
              }
            `
        };
    }

    hasOwnProperty = Object.prototype.hasOwnProperty;

    componentDidMount() {
        console.log('呼叫apiGetCountries...');
        apiGetCountries()
            .then(res => {
                let temp = {};
                res.data.forEach(item => {
                    temp[item.keyword] = item;
                });
                this.setState({ latlong: temp });
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidUpdate(){
        //執行內容
        console.log('時間一分一秒在跑...')
    }

    componentWillUnmount(){
        //這裡記錄移除掉的時間
        console.log(`移除組件..`)
    }
    

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDate !== this.props.selectedDate) {
            let date = this.formatDate(nextProps.selectedDate);
            if (nextProps.selectedDate !== null) {
                let getCountryQuery = gql`
          {
              results(
             countries: [${countries}]
              date: {eq: "${date}"})
              {
                country{
                  name
                }
                date
                deaths
                confirmed
                recovered
              }
            }
          `;
                this.setState({ getCountryQuery: getCountryQuery });
            }
        }
    }



    formatDate(date) {
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

    isEmpty(obj) {
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    getWorldOption = (data) => {
        let max = -Infinity;
        let min = Infinity;
        const latlong = this.state.latlong;
        data.forEach((itemOpt, index) => {
            if (itemOpt[this.props.selectedCategory] > max) {
                max = itemOpt[this.props.selectedCategory];
            }
            if (itemOpt[this.props.selectedCategory] < min) {
                min = itemOpt[this.props.selectedCategory];
            }
        });
        if (!this.isEmpty(latlong)) {
            return {
                backgroundColor: '#404a59',
                color: ['#E3493B', '#EEBA4C', '#23B5AF', '#A9DDD9'],
                title: {
                    text: `COVID-19 Daily Report (${this.formatDate(this.props.selectedDate)})`,
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
                                        itemOpt[this.props.selectedCategory]
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

    render() {
        return (
            <div>
                <Query query={this.state.getCountryQuery}>
                    {({ loading, error, data }) => {
                        if (loading) return <div className="progress-content"> <CircularProgress /></div>;
                        if (error) return <p>Error :(</p>;
                        data.results = data.results.filter(item => item.country.name !== "Diamond Princess");
                        let ranking = data.results.sort((a, b) => {
                            return b[this.props.selectedCategory] - a[this.props.selectedCategory];
                        });
                        let result = ranking.slice(0, 20);
                        let rank = 1;
                        
                        for (let i = 0; i < result.length; i++) {
                            // increase rank only if current score less than previous
                            if (i > 0 && result[i][this.props.selectedCategory] < result[i - 1][this.props.selectedCategory]) {
                                rank++;
                            }
                            result[i].rank = rank;
                            // console.log(result[i].country.name);
                            // console.log(this.state.latlong);
                           // result[i].name_cn = this.state.latlong[result[i].country.name].name_cn;
                           result[i].name_cn =result[i].country.name;
                        }
                        return (
                            <div>
                                <ReactEcharts
                                    option={this.getWorldOption(data.results)}
                                    style={{ height: '500px', width: '100%' }}
                                    className='react_for_echarts' />
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <h1>確診</h1>
                                        <TableContainer component={Paper}>
                                            <Table size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>排名</TableCell>
                                                        <TableCell align="right">國家</TableCell>
                                                        <TableCell align="right">確診</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {result.map(row => (
                                                        <TableRow key={row.rank}>
                                                            <TableCell component="th" scope="row">
                                                                {row.rank}
                                                            </TableCell>
                                                            <TableCell align="right">{row.name_cn}</TableCell>
                                                            <TableCell align="right">{row.confirmed}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <h1>恢復</h1>
                                        <TableContainer component={Paper}>
                                            <Table size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>排名</TableCell>
                                                        <TableCell align="right">國家</TableCell>
                                                        <TableCell align="right">恢復</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {result.map(row => (
                                                        <TableRow key={row.rank}>
                                                            <TableCell component="th" scope="row">
                                                                {row.rank}
                                                            </TableCell>
                                                            <TableCell align="right">{row.name_cn}</TableCell>
                                                            <TableCell align="right">{row.recovered}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <h1>死亡</h1>
                                        <TableContainer component={Paper}>
                                            <Table size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>排名</TableCell>
                                                        <TableCell align="right">國家</TableCell>
                                                        <TableCell align="right">死亡</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {result.map(row => (
                                                        <TableRow key={row.rank}>
                                                            <TableCell component="th" scope="row">
                                                                {row.rank}
                                                            </TableCell>
                                                            <TableCell align="right">{row.name_cn}</TableCell>
                                                            <TableCell align="right">{row.deaths}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    };
}

export default CoronaMap;