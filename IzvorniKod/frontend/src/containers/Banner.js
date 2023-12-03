import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { ButtonLayout, Button1 } from '../elements/global';
import { logout } from '../actions/auth';

const Banner = ({isAuthenticated, origin, logout}) => {
    let navigation = [['/login', "Login"], ['/signup', "Sign Up"]];
    if (isAuthenticated) {
        navigation[0][0] = '/mainScreen';
        navigation[0][1] = 'Main Screen';
        navigation[1][0] = '/profileSettings';
        navigation[1][1] = 'Profile';
    }

    let _logout = []

    switch(origin) {
        case "MainScreen":
            navigation.shift();
            _logout.push('Logout');
        break;
        case "ProfileSettings":
            navigation.pop();
            _logout.push('Logout');
        break;
        case "PassChange":
            navigation.pop();
            navigation.pop();
        break;
        default:
        break;
    }

    return (
        <ButtonLayout>
            {
                navigation.map((item) => (
                    <Link to={item[0]}>
                    <Button1>{item[1]}</Button1>
                    </Link>
                ))
            }
            {
                _logout.map((item) => (
                    <Button1 onClick={logout}>{item}</Button1>
                ))
            }
        </ButtonLayout>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
export default connect(mapStateToProps, { logout })(Banner);