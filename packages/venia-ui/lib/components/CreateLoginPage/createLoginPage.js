import React from 'react';
import { shape, string } from 'prop-types';
import { useCreateLoginPage } from '../../../../peregrine/lib/talons/CreateLoginPage/useCreateLoginPage';

import CreateLoginForm from '../CreateLogin';
import { mergeClasses } from '../../classify';
import defaultClasses from './createLoginPage.css';
import {useCreateAccountPage} from "@magento/peregrine/lib/talons/CreateAccountPage/useCreateAccountPage";
import CreateAccountForm from "../CreateAccount";

const CreateLoginPage = props => {
    const talonPropsLogin = useCreateLoginPage();
    const { initialValuesLogin, handleCreateLogin} = talonPropsLogin;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonPropsAccount = useCreateAccountPage();
    const { initialValues, handleCreateAccount } = talonPropsAccount;

    return (
        <div>
            <div className={classes.container}>
                <CreateAccountForm
                    initialValues={initialValues}
                    onSubmit={handleCreateAccount}
                />
            </div>
            <div className={classes.container}>
                <CreateLoginForm
                    initialValuesLogin={initialValuesLogin}
                    onSubmit={handleCreateLogin}
                />
            </div>
        </div>
    );
};
CreateLoginPage.propTypes = {
    classes: shape({
        container: string
    }),
    initialValues: shape({}),
    initialValuesLogin: shape({})
};

export default CreateLoginPage;
