import React from "react";
import './epidemic_monitor.less';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import CoronaStatus from "./components/corona_status/corona_status";
import configureStore from '../../store';
import { fetchCountryData } from '../../actions/actions';
import { Provider } from 'react-redux';

const client = new ApolloClient({
    uri: 'https://covid19-graphql.now.sh/'
});

const store = configureStore();

class EpidemicMonitor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        store.dispatch(fetchCountryData());
    }

    render() {
        return (
            <Provider store={store}>
                <ApolloProvider client={client}>
                        <CoronaStatus />
                </ApolloProvider>
            </Provider>
        );
    }
}

export default EpidemicMonitor;