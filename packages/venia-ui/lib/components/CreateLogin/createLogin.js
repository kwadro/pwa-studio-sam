import React from 'react';
import { Redirect } from '@magento/venia-drivers';
import { func, shape, string } from 'prop-types';
import { Form } from 'informed';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Field from '../Field';
import TextInput from '../TextInput';
import combine from '../../util/combineValidators';
import {
    validateEmail,
    isRequired,
    validatePassword,
    validateConfirmPassword,
    hasLengthAtLeast
} from '../../util/formValidators';
import defaultClasses from './createLogin.css';
import { useCreateLogin } from '../../../../peregrine/lib/talons/CreateLogin/useCreateLogin';
import CREATE_ACCOUNT_MUTATION from '../../queries/createAccount.graphql';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import SIGN_IN_MUTATION from '../../queries/signIn.graphql';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';

const LEAD =
    'Please sign in account :';

const CreateLogin = props => {
    const talonProps = useCreateLogin({
        createAccountQuery: CREATE_ACCOUNT_MUTATION,
        createCartMutation: CREATE_CART_MUTATION,
        customerQuery: GET_CUSTOMER_QUERY,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        signInMutation: SIGN_IN_MUTATION
    });
    const {
        errors,
        handleSubmit,
        isDisabled,
        isSignedIn,
        initialValues
    } = talonProps;

    // Map over any errors we get and display an appropriate error.
    const errorMessage = errors.length
        ? errors
              .map(({ message }) => message)
              .reduce((acc, msg) => msg + '\n' + acc, '')
        : null;

    if (isSignedIn) {
        return <Redirect to="/" />;
    }

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <p className={classes.lead}>{LEAD}</p>


            <Field label="Email" required={true}>
                <TextInput
                    field="customer.email"
                    autoComplete="email"
                    validate={combine([isRequired, validateEmail])}
                    validateOnBlur
                />
            </Field>
            <Field label="Password" required={true}>
                <TextInput
                    field="password"
                    type="password"
                    autoComplete="new-password"
                    validate={combine([
                        isRequired,
                        [hasLengthAtLeast, 8],
                        validatePassword
                    ])}
                    validateOnBlur
                />
            </Field>

            <div className={classes.subscribe}>
                <Checkbox
                    field="save_my"
                    label="Save my"
                />
            </div>
            <div className={classes.error}>{errorMessage}</div>
            <div className={classes.actions}>
                <Button disabled={isDisabled} type="submit" priority="high">
                    {'Login'}
                </Button>
            </div>
        </Form>
    );
};

CreateLogin.propTypes = {
    classes: shape({
        actions: string,
        error: string,
        lead: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string
    }),
    onSubmit: func.isRequired
};

export default CreateLogin;
