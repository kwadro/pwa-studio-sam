import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/stat/actions';
import * as asyncActions from '../store/actions/stat/asyncActions';
import bindActionCreators from '../util/bindActionCreators';

const StatContext = createContext();

const StatContextProvider = props => {
    const { actions, statState, asyncActions, children } = props;

    const statApi = useMemo(
        () => ({
            actions,
            ...asyncActions
        }),
        [actions, asyncActions]
    );
    const contextValue = useMemo(() => [statState, statApi], [statApi, statState]);
    return (
        <StatContext.Provider value={contextValue}>
            {children}
        </StatContext.Provider>
    );
};

const mapStateToProps = ({ stat }) => ({ statState: stat });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatContextProvider);

export const useStatContext = () => useContext(StatContext);
