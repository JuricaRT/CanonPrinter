import React from 'react';
import { Container, Button1, Button2, ButtonLayout, BannerTitle, GlobalStyle } from '../elements/global';
import * as Element from '../elements/login';
import Banner from './Banner';

let loggedIn = false;
let error = false;
let togglePasswordVisibility = false;
let showPassword = false;

const SignUp = () => (
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
              //className={styles.emailInput}
              //type="text"
              placeholder="Email..."
              //value={mail}
              //onChange={(e) => setMail(e.target.value)}
            />
          </Element.StandardDiv>
          {error ? (
            <p className={"styles.wrongDataError"}>
              *Something went wrong, try again*
            </p>
          ) : (
            ""
          )}
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

export default SignUp;