import React from 'react';
import { Link } from "react-router-dom";
import { Container, ButtonLayout, Button1, Button2, GlobalStyle } from '../elements/global';
import * as Element from '../elements/homepage';

let loggedIn = false;

const Banner = () => (
    <ButtonLayout>
    {loggedIn == true ? 
        <Link to="/mainScreen">
        <Button1>Main screen</Button1>
        </Link>
    : 
        <Link to="/login">
        <Button1>Log in</Button1>
        </Link>
    }
    {loggedIn == true ? 
        <Link to="/profileSettings">
        <Button2>Profile</Button2>
        </Link>
    : 
        <Link to="/signup">
        <Button2>Sign up</Button2>
        </Link>
    }
    </ButtonLayout>
);

export default Banner;