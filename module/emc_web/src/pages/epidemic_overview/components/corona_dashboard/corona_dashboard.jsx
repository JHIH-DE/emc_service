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


class CoronaDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    render() {
        return (
            <div>
                <Query query={this.state.getCountryQuery}>
                    {({ loading, error, data }) => {
                        if (loading) return <div className="progress-content"> <CircularProgress /></div>;
                        if (error) return <p>Error :(</p>;

                        const confirmed_world = data.results.map(el => el.confirmed).reduce((a, b) => a + b);
                        const recovered_world = data.results.map(el => el.recovered).reduce((a, b) => a + b);
                        const deaths_world = data.results.map(el => el.deaths).reduce((a, b) => a + b);

                        data.results = data.results.filter(item => item.country.name !== "Diamond Princess");
                        let ranking = data.results.sort((a, b) => {
                            return b[this.props.selectedCategory] - a[this.props.selectedCategory];
                        });
                        let result = ranking.slice(0, 20);
                        let rank = 1;
                        const latlong = this.props.latlong;
                        for (let i = 0; i < result.length; i++) {
                            // increase rank only if current score less than previous
                            if (i > 0 && result[i][this.props.selectedCategory] <= result[i - 1][this.props.selectedCategory]) {
                                rank++;
                            }
                            result[i].rank = rank;
                            result[i].name_cn = latlong[result[i].country.name].name_cn;
                            result[i].code = latlong[result[i].country.name].code;
                        }
                        return (
                            <div>
                                <Grid container spacing={3} style={{ padding: "20px" }}>
                                    <Grid item xs={4}>
                                        <Paper elevation={0} variant="outlined" className="pane-content">
                                            <h3 className="panel_top_title">{"全球累積確診病例"}</h3>
                                            <h1 className="panel_bottom_content">
                                                <NumberFormat value={confirmed_world} displayType={'text'} thousandSeparator={true} />
                                            </h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={0} variant="outlined" className="pane-content">
                                            <h3 className="panel_top_title">{"全球累積恢復人數"}</h3>
                                            <h1 className="panel_bottom_content">
                                                <NumberFormat value={recovered_world} displayType={'text'} thousandSeparator={true} />
                                            </h1>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={0} variant="outlined" className="pane-content">
                                            <h3 className="panel_top_title">{"全球累積死亡人數"}</h3>
                                            <h1 className="panel_top_content">
                                                <NumberFormat value={deaths_world} displayType={'text'} thousandSeparator={true} />
                                            </h1>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <CoronaRanking data={result} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CoronaMap data={data.results} latlong={this.props.latlong} selectedCategory={this.props.selectedCategory} />
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
        latlong: temp
    }
};

export default connect(mapStateToProps)(CoronaDashboard);