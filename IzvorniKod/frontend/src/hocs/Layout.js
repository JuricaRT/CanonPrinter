import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';
import { session_exists } from '../actions/mode12';
import { useNavigate } from 'react-router-dom';

//TODO dodaj initial state

const Layout = ({ children, checkAuthenticated, load_user, isAuthenticated, has_initial_pass, session_exists }) => {
    const navigate = useNavigate();
    useEffect(() => {
        checkAuthenticated();
        load_user(); 
    }, []);

    useEffect(() => {
        if (isAuthenticated && has_initial_pass) {
            navigate('/passChange')
        }
    }, [navigate, has_initial_pass, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            session_exists();
        }
    }, [isAuthenticated])

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    has_initial_pass: state.profile.has_initial_pass
  })

export default connect(mapStateToProps, { checkAuthenticated, load_user, session_exists })(Layout);