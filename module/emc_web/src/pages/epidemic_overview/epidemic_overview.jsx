import React from "react";
import './epidemic_overview.less';

import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import CoronaDashboard from "./components/corona_dashboard/corona_dashboard";
import configureStore from '../../store';
import { fetchData } from '../../actions/actions';

const client = new ApolloClient({
    uri: 'https://covid19-graphql.now.sh/'
});

const store = configureStore();

class EpidemicOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: 'confirmed',
            selectedDate: new Date('2020-04-14')
        }
    }

    componentDidMount() {
        store.dispatch(fetchData('/countries'));
    }

    handleChange = (event, value) => {
        this.setState({ selectedCategory: value });
    }

    handleDateChange = (event, value) => {
        this.setState({ selectedDate: value });
    };

    render() {
        return (
            <Provider store={store}>
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
                                maxDate={new Date('2020-04-16')}
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>


                <ApolloProvider client={client}>
                    <div>
                        <CoronaDashboard selectedCategory={this.state.selectedCategory} selectedDate={this.state.selectedDate} />
                    </div>
                </ApolloProvider>
            </Provider>
        );
    }
}

export default EpidemicOverview;