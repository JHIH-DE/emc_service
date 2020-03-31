import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import ReactEcharts from "echarts-for-react";
import './corona_status.less';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { apiGetCountries } from "../../service";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class CoronaStatus extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            country: '台灣',
            countries: [],
            progress: 0,
            newCasesToday: 0,
            getCountryQuery: gql`
            {
                country(name: "Taiwan*") {
                    name
                        results{
                    date
                    deaths
                    confirmed
                    recovered
                    growthRate
                  }
                }
              }
            `
        }
    }

    componentDidMount() {
        console.log('呼叫apiGetCountries...');
        apiGetCountries()
            .then(res => {
                console.log(res);
                this.setState({ countries: res.data })


            })
            .catch(err => {
                console.log(err)
            });
    }



    handleChange = (event, value) => {
        console.log(value);
        if (value !== null) {
            let getCountryQuery = gql`
        {
            country(name: "${value.keyword}" ) {
                name
                    results{
                date
                deaths
                confirmed
                recovered
                growthRate
              }
            }
          }
        `;

            this.setState({
                country: value.name_cn,
                getCountryQuery: getCountryQuery
            });
        }
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    getOption = (data) => {
        let dateList = data.map(({ date }) => {
            return date;
        }
        );
        let confirmedData = data.map(({ confirmed }) => {
            return confirmed;
        }
        );

        let recoveredData = data.map(({ recovered }) => {
            return recovered;
        }
        );

        let deathsData = data.map(({ deaths }) => {
            return deaths;
        }
        );

        return {
            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }, {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: dateList.length - 1
            }],
            legend: {
                width: '5%',
                top: '11%',
                right: '0',
                data: ['確診', '已恢復', '死亡'],
                type: 'scroll',
                orient: 'vertical',
                tooltip: {
                    show: true
                },
            },
            title: {
                text: `COVID-19 ( 武漢肺炎 ) 感染趨勢圖 - ${this.state.country}`,
                subtext: 'Data Source: CSSEGISandData/COVID-19',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: [{
                splitLine: { show: false }
            }],
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        show: true,
                        title: { zoom: '區域縮放', back: '縮放還原' }
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Save As PNG',
                        yAxisIndex: 'none'
                    },
                    dataView: {
                        readOnly: false,
                        title: '數據預覽'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            series: [{
                name: '確診',
                type: 'line',
                showSymbol: false,
                data: confirmedData
            },
            {
                name: '已恢復',
                type: 'line',
                showSymbol: false,
                data: recoveredData
            },
            {
                name: '死亡',
                type: 'line',
                showSymbol: false,
                data: deathsData
            }]
        };
    };

    countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }


    render() {
        return (
            <div>
                <FormControl style={{ minWidth: 120 }}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.state.countries}
                        getOptionLabel={option => option.name}
                        onChange={this.handleChange}
                        defaultValue={{ id: 146, code: "TW", name: "Taiwan", name_cn: "台灣", latitude: 121, longitude: 23.5, keyword: "Taiwan*" }}
                        renderOption={option => (
                            <React.Fragment>
                                <span>{this.countryToFlag(option.code)}</span>
                                {option.label}  {option.name}
                            </React.Fragment>
                        )}
                        style={{ width: 300, marginTop: 16 }}
                        renderInput={params => <TextField {...params} label="國家" />}
                    />
                </FormControl>

                <Query query={this.state.getCountryQuery}>
                    {({ loading, error, data }) => {
                        if (loading) return <div className="progress-content"> <CircularProgress /></div>;
                        if (error) return <p>Error :(</p>;

                        let newest = data.country.results[data.country.results.length - 1];
                        let nearlyNew = data.country.results[data.country.results.length - 2];
                        let newCasesToday = newest.confirmed - nearlyNew.confirmed;
                        return (
                            <div>
                                <Grid container spacing={3} style={{ padding: "20px" }}>
                                    <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"今日新增確診病例"}</h3>
                                            <h1 className="panel_bottom_content">{newCasesToday}</h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"目前確診病例"}</h3>
                                            <h1 className="panel_top_content">{newest.confirmed}</h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"死亡"}</h3>
                                            <h1 className="panel_top_content">{newest.deaths}</h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"已恢復"}</h3>
                                            <h1 className="panel_bottom_content">{newest.recovered}</h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"增長率"}</h3>
                                            <h1 className="panel_bottom_content">{(newest.growthRate * 100).toFixed(2)} %</h1>
                                        </Paper>
                                    </Grid>
                                    {/* <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"治癒率"}</h3>
                                            <h1 className="panel_bottom_content">{((newest.recovered / newest.confirmed)* 100).toFixed(2)} %</h1>
                                        </Paper>
                                    </Grid> */}
                                    <Grid item xs={2}>
                                        <Paper className="pane-content">
                                            <h3 className="panel_top_title">{"死亡率"}</h3>
                                            <h1 className="panel_top_content">{((newest.deaths / newest.confirmed) * 100).toFixed(2)} %</h1>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <ReactEcharts
                                    option={this.getOption(data.country.results)}
                                    style={{ height: '500px', width: '100%' }}
                                    className='react_for_echarts' />
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default CoronaStatus;