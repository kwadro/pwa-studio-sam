import React, {useCallback} from 'react';

import {useStat} from '../../../../peregrine/lib/talons/StaticBlock/useStat';

import {useStaticBlock} from '@magento/peregrine/lib/talons/StaticBlock/useStaticBlock';
import GET_STATIC_BLOCK from '../../queries/getCmsBlocks.graphql';

import BannerClose from "../Header/bannerClose";
import { mergeClasses } from '../../classify';
import defaultClasses from "./freePopup.css";
const FreePopup = props => {
    const {
        freeShippingPopupOpen,
        handleFreeShippingPopupClick
    } = useStat();

    const talonProps = useStaticBlock({
        query: GET_STATIC_BLOCK,
        identifiers: 'stores-list-international-websites',
    });

    const {html,loading} = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const freePopupHtml =  !loading && freeShippingPopupOpen  ? (
        <div className={classes.freepopup}>
            <div dangerouslySetInnerHTML={{__html: html}}/>
            <BannerClose active={freeShippingPopupOpen}
                         onClick={handleFreeShippingPopupClick}
            />
        </div>
    ) : null;

    return (
          <div >
              {freePopupHtml}
          </div>
    );
};
export default FreePopup;
