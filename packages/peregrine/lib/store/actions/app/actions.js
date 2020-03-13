import { createActions } from 'redux-actions';

const prefix = 'APP';
const actionTypes = [
    'TOGGLE_DRAWER',
    'SET_ONLINE',
    'SET_OFFLINE',
    'TOGGLE_SEARCH',
    'EXECUTE_SEARCH',
    'MARK_ERROR_HANDLED',
    'CLOSE_BANNER',
    'TOGGLE_LOGIN',
    'TOGGLE_REGISTRATION'
];

export default createActions(...actionTypes, { prefix });
