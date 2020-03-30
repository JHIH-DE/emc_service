import React from "react";
import './epidemic_monitor.less';
import { apiGetInfectedMain } from "./service";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import CoronaStatus from "./components/corona_status/corona_status";

const client = new ApolloClient({
    uri: 'https://covid19-graphql.now.sh/'
});

class EpidemicMonitor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {
        return (
            <div>
                <ApolloProvider client={client}>
                    <div>
                        <CoronaStatus />
                    </div>
                </ApolloProvider>
            </div>
        );
    }
}

export default EpidemicMonitor;