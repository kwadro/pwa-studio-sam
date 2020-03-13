import actions from './actions';

export const toggleDrawer = name => async dispatch =>
    dispatch(actions.toggleDrawer(name));

export const closeDrawer = () => async dispatch =>
    dispatch(actions.toggleDrawer(null));

export const toggleSearch = () => async dispatch =>
    dispatch(actions.toggleSearch());

export const closeBanner = () => async dispatch =>
    dispatch(actions.closeBanner());

export const toggleLogin = () => async dispatch =>
    dispatch(actions.toggleLogin());

export const toggleRegistration = () => async dispatch =>
    dispatch(actions.toggleRegistration());

export const closeSearch = () => async dispatch =>
    dispatch(actions.toggleSearch(false));

export const executeSearch = (query, history, categoryId) =>
    async function thunk(dispatch) {
        let searchQuery = `query=${query}`;
        if (categoryId) searchQuery += `&category=${categoryId}`;
        history.push(`/search.html?${searchQuery}`);
        dispatch(actions.executeSearch(query));
    };
