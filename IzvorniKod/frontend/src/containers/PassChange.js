import React from 'react';
import { Container, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import Banner from './Banner';
import * as PassChangeMisc from '../elements/passchange'

let error = false;

const PassChange = () => (
  <React.Fragment>
  <GlobalStyle />
    <Container>
      <Element.LoginForm /*onSubmit={handleSubmit}*/>
        <Banner></Banner>
        <Element.HorizontalSeparator>
        <Element.LeftSideImage></Element.LeftSideImage>
        <Element.LoginFormDiv>
          <PassChangeMisc.ConfirmPassLabel>
            Please enter your desired password:
          </PassChangeMisc.ConfirmPassLabel>
          <Element.StandardDiv>
            <Element.Input
              type="text"
              placeholder="New Password..."
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
                placeholder="Confirm Password..."
              />
            </Element.StandardDiv>
            </Element.PasswordButtonAlignment>
          </div>
            <Element.FlattenedButton>OK</Element.FlattenedButton>
        </Element.LoginFormDiv>
        </Element.HorizontalSeparator>
      </Element.LoginForm>
    </Container>
  </React.Fragment>
    /*
    <form className={styles.form} onSubmit={handlePassword}>
    <h1>Password change</h1>
    <div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        style={{ width: "250px", margin: "10px" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={togglePassword}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
    <div>
      <input
        type={showRepeatedPassword ? "text" : "password"}
        placeholder="Repeat password"
        style={{ width: "250px", margin: "10px" }}
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
      ></input>
      <button onClick={toggleRepeated}>
        {showRepeatedPassword ? "Hide" : "Show"}
      </button>
    </div>
    {passError === true && (
      <p style={{ color: "red" }}>
        Make sure you enter the same passwords!!!
      </p>
    )}
    {backendError === true && (
      <p style={{ color: "red" }}> Try again we have an error!</p>
    )}
    <button
      style={{
        backgroundColor: "beige",
        marginLeft: "250px",
        marginRight: "20px",
        marginTop: "40px",
      }}
    >
      OK
    </button>
  </form>
  */
);

export default PassChange;