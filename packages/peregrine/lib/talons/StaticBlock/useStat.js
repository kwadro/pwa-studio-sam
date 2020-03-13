import { useCallback } from 'react';
import { useStatContext } from '../../../../peregrine/lib/context/stat';

export const useStat = () => {
    const [
        { freeShippingPopupOpen},
        { toggleFreeShippingPopup }
    ] = useStatContext();

    const handleFreeShippingPopupClick = useCallback(() => {
        toggleFreeShippingPopup();
        }, [toggleFreeShippingPopup]);
    return {
        freeShippingPopupOpen,
        handleFreeShippingPopupClick,
    };
};
