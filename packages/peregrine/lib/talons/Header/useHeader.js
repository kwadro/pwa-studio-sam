import { useCallback } from 'react';
import { useAppContext } from '../../../../peregrine/lib/context/app';
import actions from "../../store/actions/app/actions";
export const useHeader = () => {
    const [
        { hasBeenOffline, isOnline, searchOpen,loginOpen,registerOpen,bannerOpen},
        { toggleSearch,closeBanner,toggleLogin,toggleRegistration }
    ] = useAppContext();

    const handleSearchTriggerClick = useCallback(() => {
        console.log('handleSearchTriggerClick')
        toggleSearch();
    }, [toggleSearch]);

    const handleBannerCloseClick = useCallback(() => {
        console.log('handleBannerCloseClick')
        closeBanner();
    }, [closeBanner]);

    const handleLoginTriggerClick = useCallback(() => {
        console.log('handleLoginTriggerClick')
        toggleLogin();
    }, [toggleLogin]);

    const handleRegistrationTriggerClick = useCallback(() => {
        console.log('handleRegistrationTriggerClick')
        toggleRegistration();
    }, [toggleRegistration]);
    return {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen,
        loginOpen,
        registerOpen,
        bannerOpen,
        handleBannerCloseClick,
        handleLoginTriggerClick,
        handleRegistrationTriggerClick
    };
};
