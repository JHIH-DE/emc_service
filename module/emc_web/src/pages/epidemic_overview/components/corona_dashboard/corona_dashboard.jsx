import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import countries from '../../../../countries.js';

import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { CoronaRanking } from "../corona_ranking/corona_ranking";
import { CoronaMap } from "../corona_map/corona_map";
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
// import mask from '../../../../../dist/assets/mask.png';
// import health from '../../../../../dist/assets/health.png';
// import death from '../../../../../dist/assets/death.png';

class CoronaDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: this.props.selectedDate,
            latestDate: this.generateLatestDate(),
            getCountryQuery: gql`
            {
                results(
               countries: [${countries}]
                date: {gt: "${this.props.selectedDate}"})
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

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        return [year, month, day].join('-');
    }

    generateLatestDate = () => {
        let stopTime = new Date();
        stopTime.setDate(stopTime.getDate() - 2);
        return stopTime;
    }

    wrapperDataByDate= (data) => {
        let dates = Object.keys(data);
        let processedData = data;
        return { dates, processedData };
    }

    transDataToRanking = (data) => {
        //let latestData = data[this.formatDate(this.state.latestDate)];
        let latestData = data['2020-4-17'];

        const confirmed_world = latestData.map(el => el.confirmed).reduce((a, b) => a + b);
        const recovered_world = latestData.map(el => el.recovered).reduce((a, b) => a + b);
        const deaths_world = latestData.map(el => el.deaths).reduce((a, b) => a + b);

        let temp = latestData.filter(item => (item.name !== "Diamond Princess" && item.name !== "Taiwan*"));
        latestData = latestData.filter(item => item.name !== "Diamond Princess");

        let taiwan = latestData.filter(item => item.name === "Taiwan*")[0];
        let ranking = temp.sort((a, b) => {
            return b[this.props.selectedCategory] - a[this.props.selectedCategory];
        });
        let rankingData = ranking.slice(0, 20);
        rankingData.push(taiwan);

        const latlong = this.props.latlong;
        for (let i = 0; i < rankingData.length; i++) {
            rankingData[i].name_cn = latlong[rankingData[i].name].name_cn;
            rankingData[i].code = latlong[rankingData[i].name].code;
        }

        return { rankingData, confirmed_world, recovered_world, deaths_world }
    }
    render() {
        return (
            <div>
                <Query query={this.state.getCountryQuery}>
                    {({ loading, error, data }) => {
                        if (loading) return <div className="progress-content"> <CircularProgress /></div>;
                        if (error) return <p>Error :(</p>;

                        let { dates, processedData } = this.wrapperDataByDate(this.props.coronavirus);
                        let { rankingData, confirmed_world, recovered_world, deaths_world } = this.transDataToRanking(processedData);
                        return (
                            <div>
                                <Grid container spacing={3} style={{ padding: "20px" }}>
                                    <Grid item xs={4}>
                                        <Paper elevation={0} variant="outlined" className="pane-content">
                                            <h3 className="panel_top_title">{"全球累積確診病例"}</h3>
                                            <h1 className="panel_bottom_content">
                                                {/* <img src={mask} alt="Mask" /> */}
                                                <NumberFormat value={confirmed_world} displayType={'text'} thousandSeparator={true} />
                                            </h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={0} variant="outlined" className="pane-content">
                                            <h3 className="panel_top_title">{"全球累積恢復人數"}</h3>
                                            <h1 className="panel_bottom_content">
                                                {/* <img src={health} alt="health" /> */}
                                                <NumberFormat value={recovered_world} displayType={'text'} thousandSeparator={true} />
                                            </h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={0} variant="outlined" className="pane-content">
                                            <h3 className="panel_top_title">{"全球累積死亡人數"}</h3>
                                            <h1 className="panel_top_content">
                                                {/* <img src={death} alt="Death" /> */}
                                                <NumberFormat value={deaths_world} displayType={'text'} thousandSeparator={true} />
                                            </h1>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <CoronaRanking data={rankingData} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CoronaMap data={processedData} dates={dates} latlong={this.props.latlong} selectedCategory={this.props.selectedCategory} />
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

const mapStateToProps = (state) => {
    let temp = {};
    state.countries.data.forEach(item => {
        temp[item.keyword] = item;
    });

    return {
        latlong: temp,
        coronavirus: state.coronavirus.data
    }
};

export default connect(mapStateToProps)(CoronaDashboard);