import React from 'react';
import { Link } from "react-router-dom";
import { Container, Button1, Button2, ButtonLayout, BannerTitle, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import Banner from './Banner';

let loggedIn = false;
let error = false;
let togglePasswordVisibility = false;
let showPassword = false;

const Login = () => (
  <React.Fragment>
  <GlobalStyle />
    <Container>
      <Element.LoginForm /*onSubmit={handleSubmit}*/>
        <Banner></Banner>
        <Element.HorizontalSeparator>
        <Element.LeftSideImage></Element.LeftSideImage>
        <Element.LoginFormDiv>
          <Element.StandardDiv>
            <Element.Input
              type="text"
              placeholder="Email..."
              //value={mail}
              //onChange={(e) => setMail(e.target.value)}
            />
          </Element.StandardDiv>
          <div>
          <Element.PasswordButtonAlignment>
            <Element.StandardDiv>
              <Element.Input
                //type={showPassword ? "text" : "password"}
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
              />
            </Element.StandardDiv>
              <Element.FlattenedButton onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </Element.FlattenedButton>
              {error ? (
                //todo: OVAJ DIO S ERROROM
                <p className={"styles.wrongDataError"}>*Wrong email or password* </p>
              ) : (
                ""
              )}
            </Element.PasswordButtonAlignment>
          </div>
          <Element.StandardDiv>
            <Element.ComingSoon>
              <div className={"styles.comingSoonText"}>Coming soon!</div>
              <Element.StandardDiv>
                <Button1 disabled>
                  Log in with Google
                </Button1>
              </Element.StandardDiv>
              <Element.StandardDiv>
                <Button1 disabled>
                  Log in with Apple
                </Button1>
              </Element.StandardDiv>
            </Element.ComingSoon>
          </Element.StandardDiv>
            <Element.FlattenedButton>OK</Element.FlattenedButton>
        </Element.LoginFormDiv>
        </Element.HorizontalSeparator>
      </Element.LoginForm>
    </Container>
  </React.Fragment>
);
export default Login;

