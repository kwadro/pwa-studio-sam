import { createActions } from 'redux-actions';

const prefix = 'STAT';
const actionTypes = [
    'TOGGLE_FREE_SHIPPING_POPUP'
];
console.log(createActions(...actionTypes, { prefix }))
export default createActions(...actionTypes, { prefix });
