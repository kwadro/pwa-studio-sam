import { useCallback } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useLoginTrigger = () => {
    const [, { toggleDrawer }] = useAppContext();
    const [ user ] = useUserContext();
    const handleOpenLogin = useCallback(() => {
        toggleDrawer('login');
    }, [toggleDrawer]);
    const isSignedIn = user.isSignedIn;
    return {
        handleOpenLogin,
        isSignedIn
    };
};
