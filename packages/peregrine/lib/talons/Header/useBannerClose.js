import { useCallback } from 'react';
export const useBannerClose = props => {
    const { onClick } = props;
    const handleClick = useCallback(() => {
        onClick();
    }, [onClick]);
    return {
        handleClick
    };
};
