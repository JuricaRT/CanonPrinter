import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
// connect iz react-redux?

const Layout = ({ children/*, checkAuthenticated, load_user*/ }) => {
    useEffect(() => {
        //checkAuthenticated();
        //load_user();
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};
export default connect(null, { /*checkAuthenticated, load_user*/ })(Layout);