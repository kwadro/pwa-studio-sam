import { handleActions } from 'redux-actions';

import actions from '../actions/stat';

export const name = 'app';

const initialState = {
    freeShippingPopupOpen: true,
};

const reducerMap = {

    [actions.toggleFreeShippingPopup]: state => {
        return {
            ...state,
            freeShippingPopupOpen: !state.freeShippingPopupOpen
        };
    }

};

export default handleActions(reducerMap, initialState);
