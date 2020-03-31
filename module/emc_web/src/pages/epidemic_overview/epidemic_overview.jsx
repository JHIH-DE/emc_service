import React from "react";
import './epidemic_overview.less';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import CoronaMap from "./components/corona_map/corona_map";

const client = new ApolloClient({
    uri: 'https://covid19-graphql.now.sh/'
});

class EpidemicOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: 'confirmed',
            selectedDate: new Date('2020-03-28')
        }
    }

    componentDidMount() {
        console.log('EpidemicOverview componentDidMount...')
        
    }

    handleChange = (event, value) => {
        this.setState({ selectedCategory: value });
    }

    handleDateChange = (event, value)  => {
        this.setState({ selectedDate: value });
    };

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="date-picker-inline"
                                label="日期"
                                minDate={new Date('2020-01-01')}
                                maxDate={new Date('2020-03-29')}
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

                <ToggleButtonGroup
                    value={this.state.selectedCategory}
                    exclusive
                    onChange={this.handleChange}
                    aria-label="text alignment"
                >
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
                <ApolloProvider client={client}>
                    <div>
                        <CoronaMap selectedCategory={this.state.selectedCategory} selectedDate={this.state.selectedDate} />
                    </div>
                </ApolloProvider>
            </div>
        );
    }
}

export default EpidemicOverview;