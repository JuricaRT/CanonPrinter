import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';

//TODO dodaj initial state

const Layout = ({ children, checkAuthenticated, load_user }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();  
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};
export default connect(null, { checkAuthenticated, load_user })(Layout);