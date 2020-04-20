import React, { useState, useEffect } from "react";
import './epidemic_overview.less';

import { Provider } from 'react-redux';
import CoronaDashboard from "./components/corona_dashboard/corona_dashboard";
import configureStore from '../../store';
import { fetchCountryData, fetchCoronavirusData } from '../../actions/actions';

const store = configureStore();


export default function EpidemicOverview(props) {

    useEffect(() => {
        store.dispatch(fetchCountryData());
        store.dispatch(fetchCoronavirusData());
    }, []);

    return (
        <Provider store={store}>
            <CoronaDashboard />
        </Provider>
    );

}

