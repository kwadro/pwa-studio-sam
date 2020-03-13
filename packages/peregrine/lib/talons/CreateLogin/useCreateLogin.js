import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

/**
 * Returns props necessary to render CreateAccount component. In particular this
 * talon handles the submission flow by first doing a pre-submisson validation
 * and then, on success, invokes the `onSubmit` prop, which is usually the action.
 *
 * @param {Object} props.initialValues initial values to sanitize and seed the form
 * @param {Function} props.onSubmit the post submit callback
 * @param {String} createAccountQuery the graphql query for creating the account
 * @param {String} signInQuery the graphql query for logging in the user (and obtaining the token)
 * @returns {{
 *   errors: array,
 *   handleSubmit: function,
 *   isDisabled: boolean,
 *   isSignedIn: boolean,
 *   initialValues: object
 * }}
 */
export const useCreateLogin = props => {
    const {
        createCartMutation,
        customerQuery,
        getCartDetailsQuery,
        initialValues = {},
        onSubmit,
        signInMutation
    } = props;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, { createCart, getCartDetails, removeCart }] = useCartContext();
    const [
        { isGettingDetails, isSignedIn },
        { getUserDetails, setToken }
    ] = useUserContext();



    const [fetchCartId] = useMutation(createCartMutation);
    const [signIn, { error: signInError }] = useMutation(signInMutation);
    const fetchUserDetails = useAwaitQuery(customerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const errors = [];

    if (signInError) {
        errors.push(signInError.graphQLErrors[0]);
    }

    const handleSubmit = useCallback(
        async formValues => {
            setIsSubmitting(true);
            try {
                // Sign in and save the token
                const response = await signIn({
                    variables: {
                        email: formValues.customer.email,
                        password: formValues.password
                    }
                });

                const token =
                    response && response.data.generateCustomerToken.token;

                await setToken(token);

                await getUserDetails({ fetchUserDetails });

                await removeCart();

                await createCart({
                    fetchCartId
                });

                await getCartDetails({
                    fetchCartId,
                    fetchCartDetails
                });

                // Finally, invoke the post-submission callback.
                onSubmit();
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        [
            createCart,
            fetchCartDetails,
            fetchCartId,
            fetchUserDetails,
            getCartDetails,
            getUserDetails,
            onSubmit,
            removeCart,
            setToken,
            signIn
        ]
    );

    const sanitizedInitialValues = useMemo(() => {
        const { email,  ...rest } = initialValues;

        return {
            customer: { email },
            ...rest
        };
    }, [initialValues]);

    return {
        errors,
        handleSubmit,
        isDisabled: isSubmitting || isGettingDetails,
        isSignedIn,
        initialValues: sanitizedInitialValues
    };
};
