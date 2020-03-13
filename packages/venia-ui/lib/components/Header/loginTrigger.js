import React from 'react';
import { node, shape, string } from 'prop-types';
import { User as UserIcon } from 'react-feather';

import Icon from '../Icon';
import { mergeClasses } from '../../classify';
import defaultClasses from './loginTrigger.css';
import { useLoginTrigger } from '../../../../peregrine/lib/talons/Header/useLoginTrigger';

/**
 * A component that toggles the navigation menu.
 */
const LoginTrigger = props => {
    const { handleOpenLogin,isSignedIn } = useLoginTrigger();
    const classes = mergeClasses(defaultClasses, props.classes);
    const titleLogin = isSignedIn ? "My account":"Sign In";

    return (
        <button
            className={classes.root}
            aria-label="Login navigation panel"
            onMouseEnter={handleOpenLogin}
        >
            <Icon src={UserIcon} attrs={{size:32}} />
            <span className={classes.span} >{titleLogin}</span>
        </button>
    );
};

LoginTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default LoginTrigger;
