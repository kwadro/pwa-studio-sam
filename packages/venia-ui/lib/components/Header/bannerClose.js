import React from 'react';
import { shape, string } from 'prop-types';
import { X as BannerIcon } from 'react-feather';

import Icon from '../Icon';

import { mergeClasses } from '../../classify';
import defaultClasses from './bannerClose.css';
import { useBannerClose } from '@magento/peregrine/lib/talons/Header/useBannerClose';

const BannerClose = props => {
    const { active, onClick } = props;
    const talonProps = useBannerClose({
        onClick
    });
    const { handleClick } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);
    const closeBannerClass = active ? classes.show : classes.hidden;

    return (
        <button
            className={closeBannerClass}
            aria-label={'Close'}
            onClick={handleClick}
        >
            <Icon src={BannerIcon} />
        </button>
    );
};

BannerClose.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default BannerClose;
