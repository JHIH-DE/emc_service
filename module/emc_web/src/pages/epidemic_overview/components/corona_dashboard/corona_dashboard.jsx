import React from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import { CoronaRanking } from "../corona_ranking/corona_ranking";
import { CoronaMap } from "../corona_map/corona_map";
import { CoronaMapTop } from "../corona_map/corona_map_top";
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
// import mask from '../../../../../dist/assets/mask.png';
// import health from '../../../../../dist/assets/health.png';
// import death from '../../../../../dist/assets/death.png';

export default function CoronaDashboard(props) {
    const latlong = useSelector(state => {
        let temp = {};
        state.countries.data.forEach(item => {
            temp[item.keyword] = item;
        });
        return temp;
    });
    const coronavirus = useSelector(state => state.coronavirus);
    const worldData = useSelector(state => state.worldData);

    return (
        <div>
            {coronavirus.isLoading ? <div className="progress-content"> <CircularProgress /></div> :
                <div>
                    <Grid container spacing={3} style={{ padding: "20px" }} >
                        <Grid item xs={3}>
                            <Paper elevation={0} variant="outlined" className="pane-content">
                                <h3 className="panel_top_title">{"全球新增確診病例"}</h3>
                                <h1 className="panel_bottom_content">
                                    {/* <img src={mask} alt="Mask" /> */}
                                    <NumberFormat value={worldData.new_confirmed} displayType={'text'} thousandSeparator={true} />
                                </h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={0} variant="outlined" className="pane-content">
                                <h3 className="panel_top_title">{"全球累積確診病例"}</h3>
                                <h1 className="panel_bottom_content">
                                    {/* <img src={mask} alt="Mask" /> */}
                                    <NumberFormat value={worldData.confirmed} displayType={'text'} thousandSeparator={true} />
                                </h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={0} variant="outlined" className="pane-content">
                                <h3 className="panel_top_title">{"全球累積恢復人數"}</h3>
                                <h1 className="panel_bottom_content">
                                    {/* <img src={health} alt="health" /> */}
                                    <NumberFormat value={worldData.recovered} displayType={'text'} thousandSeparator={true} />
                                </h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={0} variant="outlined" className="pane-content">
                                <h3 className="panel_top_title">{"全球累積死亡人數"}</h3>
                                <h1 className="panel_top_content">
                                    {/* <img src={death} alt="Death" /> */}
                                    <NumberFormat value={worldData.deaths} displayType={'text'} thousandSeparator={true} />
                                </h1>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {worldData.latestData.length === 0 ? <div className="progress-content"> <CircularProgress /></div> : <CoronaRanking style={{ height: "50%" }} data={worldData.latestData} latlong={latlong} />}
                        </Grid>
                        <Grid item xs={6}>
                            <CoronaMap data={coronavirus.data} dates={coronavirus.dates} latlong={latlong} />
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}
