import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const validCreateLoginParams = ['email','password'];

const getCreateLoginInitialValues = search => {
    const params = new URLSearchParams(search);

    return validCreateLoginParams.reduce(
        (values, param) => ({ ...values, [param]: params.get(param) }),
        {}
    );
};

/**
 * Returns props necessary to render CreateAccountPage component.
 *
 * @returns {{
 *   handleCreateAccount: function,
 *   initialValues: object
 * }}
 */
export const useCreateLoginPage = () => {
    const history = useHistory();
    const { search } = useLocation();

    const handleCreateLogin = useCallback(() => {
        history.push('/');
    }, [history]);

    const initialValuesLogin = useMemo(() => getCreateLoginInitialValues(search), [
        search
    ]);

    return {
        handleCreateLogin,
        initialValuesLogin
    };
};
