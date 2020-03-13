import { handleActions } from 'redux-actions';

import actions from '../actions/app';

export const name = 'app';

const initialState = {
    drawer: null,
    hasBeenOffline: !navigator.onLine,
    isOnline: navigator.onLine,
    overlay: false,
    searchOpen: false,
    loginOpen: false,
    registerOpen: false,
    bannerOpen: true,
    query: '',
    pending: {}
};

const reducerMap = {
    [actions.toggleDrawer]: (state, { payload }) => {
        return {
            ...state,
            drawer: payload,
            overlay: !!payload
        };
    },
    [actions.toggleSearch]: state => {
        return {
            ...state,
            searchOpen: !state.searchOpen
        };
    },
    [actions.closeBanner]: state => {
        return {
            ...state,
            bannerOpen: !state.bannerOpen
        };
    },
    [actions.toggleLogin]: state => {
        return {
            ...state,
            loginOpen: !state.loginOpen
        };
    },
    [actions.toggleRegistration]: state => {
        return {
            ...state,
            registrationOpen: !state.registrationOpen
        };
    },
    [actions.executeSearch]: (state, { payload }) => {
        return {
            ...state,
            query: payload
        };
    },
    [actions.setOnline]: state => {
        return {
            ...state,
            isOnline: true
        };
    },
    [actions.setOffline]: state => {
        return {
            ...state,
            isOnline: false,
            hasBeenOffline: true
        };
    }
};

export default handleActions(reducerMap, initialState);
