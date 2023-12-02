import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { ButtonLayout, Button1 } from '../elements/global';

const Banner = ({isAuthenticated, origin}) => {
    let navigation = [['/login', "Login"], ['/signup', "Sign Up"]];
    if (isAuthenticated) {
        navigation[0][0] = '/mainScreen';
        navigation[0][1] = 'Main Screen';
        navigation[1][0] = '/profileSettings';
        navigation[1][1] = 'Profile';
    }

    switch(origin) {
        case "MainScreen":
            navigation.shift();
        break;
        case "ProfileSettings":
            navigation.pop();
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
        </ButtonLayout>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
  export default connect(mapStateToProps, { })(Banner);