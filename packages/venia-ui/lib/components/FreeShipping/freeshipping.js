import React from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './freeshipping.css';
import { useStaticBlock } from '@magento/peregrine/lib/talons/StaticBlock/useStaticBlock';
import GET_STATIC_BLOCK from '../../queries/getCmsBlocks.graphql';

const FreeShipping = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useStaticBlock({
        query: GET_STATIC_BLOCK,
        identifiers:'stores-list-international-websites'
    });
    const { html,loading } = talonProps;
    if(loading){
        return null;
    }

    return (
        <div className={classes.freeshipping}>
            <div   dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
    );
};

export default FreeShipping;
