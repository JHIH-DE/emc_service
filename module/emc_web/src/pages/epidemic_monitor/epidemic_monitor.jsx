import React from "react";
import './epidemic_monitor.less';
import { apiGetInfectedMain } from "./service";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import CoronaStatus from "./components/corona_status/corona_status";
import configureStore from '../../store';
import {fetchData} from '../../actions/actions';
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
        store.dispatch(fetchData('/countries'));
        console.log('EpidemicOverview componentDidMount...');

    }

    render() {
        return (
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <div>
                        <CoronaStatus />
                    </div>
                </ApolloProvider>
            </Provider>
        );
    }
}

export default EpidemicMonitor;