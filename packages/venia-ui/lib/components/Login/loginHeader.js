import React, { Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';
import {
    ArrowLeft as ArrowLeftIcon,
    Menu as MenuIcon,
    X as CloseIcon
} from 'react-feather';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import Trigger from '../Trigger';
import defaultClasses from './loginHeader.css';
import { useLoginHeader } from '../../../../peregrine/lib/talons/Login/useLoginHeader';

const titles = {
    CREATE_ACCOUNT: 'Create Account',
    FORGOT_PASSWORD: 'Forgot Password',
    MY_ACCOUNT: 'My Account',
    SIGN_IN: 'Sign In',
    MENU: 'Main Menu'
};

const LoginHeader = props => {
    const { isTopLevel, onBack, onClose, view } = props;

    const talonProps = useLoginHeader({
        isTopLevel,
        onBack,
        onClose,
        view
    });

    const { handleClose, handleBack, isTopLevelMenu } = talonProps;
    const title = titles[view] || titles.SIGN_IN;
    const backIcon = isTopLevelMenu ? MenuIcon : ArrowLeftIcon;
    const backButton = !isTopLevelMenu ? (
        <Trigger key="backButton" action={handleBack}>
            <Icon src={backIcon} />
        </Trigger>
    ) : null;

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
            {backButton}
            <h2 key="title" className={classes.title}>
                <span>{title}</span>
            </h2>
            <Trigger key="closeButton" action={handleClose}>
                <Icon src={CloseIcon} />
            </Trigger>
        </Fragment>
    );
};

export default LoginHeader;

LoginHeader.propTypes = {
    classes: shape({
        title: string
    }),
    isTopLevel: bool,
    onBack: func.isRequired,
    onClose: func.isRequired,
    view: string.isRequired
};
