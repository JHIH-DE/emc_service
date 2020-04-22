import React, { useState, useEffect } from "react";

import InfectedList from "./components/infected_list/infected_list";
import configureStore from '../../store';
import { fetchInfectedData } from '../../actions/actions';
import { Provider } from 'react-redux';

const store = configureStore();

export default function EpidemicManager() {

    useEffect(() => {
        store.dispatch(fetchInfectedData());
    }, []);

    return (
        <Provider store={store}>
            <InfectedList />
        </Provider>
    );

}