import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from '../../classify';
import defaultClasses from './LinkLoginPage.css';
import { User as UserIcon } from 'react-feather';
import Icon from '../Icon';
import {Link, resourceUrl} from '@magento/venia-drivers';
import {useLoginTrigger} from '../../../../peregrine/lib/talons/Header/useLoginTrigger';

/**
 * A component that renders a logo in the header.
 *
 * @typedef Logo
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const LinkLoginPage = props => {
    const { size } = props;
    const { isSignedIn } = useLoginTrigger();
    const classes = mergeClasses(defaultClasses, props.classes);
    const titleLogin = isSignedIn ? "My account":"Sign In";
    const resUrl = isSignedIn ? "/account":"/login";
    return (
         <Link to={resourceUrl(resUrl)}>
            <Icon src={UserIcon} attrs={{size:size}} />
            <span className={classes.span} >{titleLogin}</span>
         </Link>
    );
};


LinkLoginPage.propTypes = {
    size: PropTypes.number,
};

LinkLoginPage.defaultProps = {
    size:32
};

export default LinkLoginPage;
