import React from "react";
import './epidemic_overview.less';

import { Provider } from 'react-redux';
import CoronaDashboard from "./components/corona_dashboard/corona_dashboard";
import configureStore from '../../store';
import { fetchCountryData, fetchCoronavirusData } from '../../actions/actions';

const store = configureStore();

class EpidemicOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        store.dispatch(fetchCountryData());
        store.dispatch(fetchCoronavirusData());
    }

    render() {
        return (
            <Provider store={store}>
                    <CoronaDashboard/>
            </Provider>
        );
    }
}

export default EpidemicOverview;