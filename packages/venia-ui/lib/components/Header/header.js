import React, {Suspense} from 'react';
import {shape, string} from 'prop-types';
import FreeShipping from '../FreeShipping';
import Logo from '../Logo';
import {Link, resourceUrl, Route} from '@magento/venia-drivers';

import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';

import OnlineIndicator from './onlineIndicator';
import {useHeader} from '@magento/peregrine/lib/talons/Header/useHeader';

import {mergeClasses} from '../../classify';
import defaultClasses from './header.css';
import FreePopup from '../FreePopup';
import LoginTrigger from './loginTrigger';
import LinkLoginPage from './LinkLoginPage';

const SearchBar = React.lazy(() => import('../SearchBar'));


const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen,
        loginOpen,
        registrationOpen,
        bannerOpen,
        handleBannerCloseClick,
        handleLoginTriggerClick,
        handleRegistrationTriggerClick,
    } = useHeader();

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader}/>
            </div>
        </div>
    );
    const searchBar = searchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route
                render={({history, location}) => (
                    <SearchBar
                        isOpen={searchOpen}
                        history={history}
                        location={location}
                    />
                )}
            />
        </Suspense>
    ) : null;

    return (
        <header className={rootClass}>
            <FreeShipping/>
            <FreePopup/>
            <div className={classes.toolbar}>
                <div className={classes.primaryActions}>
                    <NavTrigger/>
                    <SearchTrigger
                        active={searchOpen}
                        onClick={handleSearchTriggerClick}
                    />
                    {searchBar}
                </div>

                <OnlineIndicator
                    hasBeenOffline={hasBeenOffline}
                    isOnline={isOnline}
                />

                <Link to={resourceUrl('/')}>
                    <Logo classes={{logo: classes.logo}}/>
                </Link>

                <LinkLoginPage/>

                <div className={classes.loginActions}>
                    <LoginTrigger/>
                </div>
                <div className={classes.secondaryActions}>

                    <CartTrigger/>
                </div>
            </div>

        </header>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    })
};

export default Header;
