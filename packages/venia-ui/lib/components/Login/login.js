import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import { useLogin } from '../../../../peregrine/lib/talons/Login/useLogin';

import { mergeClasses } from '../../classify';
import AuthBar from '../AuthBar';
import CategoryTree from '../CategoryTree';
import LoadingIndicator from '../LoadingIndicator';
import LoginHeader from './loginHeader';
import defaultClasses from './login.css';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';

const AuthModal = React.lazy(() => import('../AuthModal'));

const Login = props => {
    const {
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        showCreateAccount,
        showForgotPassword,
        showMainMenu,
        showMyAccount,
        showSignIn,
        view
    } = useLogin({ customerQuery: GET_CUSTOMER_QUERY });

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const modalClassName = hasModal ? classes.modal_open : classes.modal;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;
    const rootHeaderClassName =
        isTopLevel && view === 'MENU' ? classes.isRoot : classes.header;

    // Lazy load the auth modal because it may not be needed.
    const authModal = hasModal ? (
        <Suspense fallback={<LoadingIndicator />}>
            <AuthModal
                closeDrawer={handleClose}
                showCreateAccount={showCreateAccount}
                showForgotPassword={showForgotPassword}
                showMainMenu={showMainMenu}
                showMyAccount={showMyAccount}
                showSignIn={showSignIn}
                view={view}
            />
        </Suspense>
    ) : null;

    return (
        <aside className={rootClassName}
               onMouseLeave={handleClose}
              >
            <header className={rootHeaderClassName}>
                <LoginHeader
                    isTopLevel={isTopLevel}
                    onBack={handleBack}
                    onClose={handleClose}
                    view={view}
                />
            </header>

            <div className={classes.footer}>
                <AuthBar
                    disabled={hasModal}
                    showMyAccount={showMyAccount}
                    showSignIn={showSignIn}
                />
            </div>
            <div className={modalClassName}>{authModal}</div>
        </aside>
    );
};

export default Login;

Login.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string,
        isRoot: string
    })
};
