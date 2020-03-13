import React from 'react';
import {shape, string} from 'prop-types';

import {useCartTrigger} from '@magento/peregrine/lib/talons/Header/useCartTrigger';

import {mergeClasses} from '../../classify';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import defaultClasses from './cartTrigger.css';


const CartTrigger = props => {
    const {handleClick, itemCount} = useCartTrigger({
        createCartMutation: CREATE_CART_MUTATION,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY
    });

    const classes = mergeClasses(defaultClasses, props.classes);
    const buttonAriaLabel = `Toggle mini cart. You have ${itemCount} items in your cart.`;

    let count = itemCount ? itemCount : 0;
    const itemCounter = <span className={classes.counter}>{count}</span>

    return (
        <button
            className={classes.root}
            aria-label={buttonAriaLabel}
            onMouseEnter={handleClick}
        >
            {itemCounter}
        </button>
    );
};

CartTrigger.propTypes = {
    classes: shape({
        root: string
    })
};

export default CartTrigger;
