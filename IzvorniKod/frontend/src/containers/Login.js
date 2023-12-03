import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { Container, Button1, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import Banner from './Banner';
import CSRFToken from '../components/CSRFToken';
import { login } from '../actions/auth'

const Login = ({login, isAuthenticated}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)
      navigate('/mainScreen');
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  const [passwordVisibilityText, setpasswordVisiblityText] = useState("Show Password");

  const togglePasswordVisibility = () => {
    var el = document.getElementById("passInput");
    if (el.type === "password") {
      el.type = "text";
      setpasswordVisiblityText("Hide Password")
    } else {
      el.type = "password";
      setpasswordVisiblityText("Show Password");
    }
  }

  return (
    <React.Fragment>
    <GlobalStyle />
      <Container>
        <Element.LoginForm onSubmit={e => onSubmit(e)}>
          <Banner origin="Login"></Banner>
          <Element.HorizontalSeparator>
          <Element.LeftSideImage></Element.LeftSideImage>
          <CSRFToken />
          <Element.LoginFormDiv>
            <Element.StandardDiv>
              <Element.Input
                type="text"
                placeholder="Email..."
                name="email"
                onChange={e => onChange(e)}
                value={email}
                required
              />
            </Element.StandardDiv>

            <Element.PasswordButtonAlignment>
              <Element.StandardDiv>
                <Element.Input
                  id="passInput"
                  type='password'
                  placeholder='Password...'
                  name='password'
                  onChange={e => onChange(e)}
                  value={password}
                  minLength='1'
                  required                
                />
              </Element.StandardDiv>
              </Element.PasswordButtonAlignment>
            
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
            <Element.StandardDiv>
              <Element.FlattenedButton>Log in</Element.FlattenedButton>
              <Element.FlattenedButton onClick={togglePasswordVisibility} type="button">
                  {passwordVisibilityText}
              </Element.FlattenedButton>
            </Element.StandardDiv>
          </Element.LoginFormDiv>
          </Element.HorizontalSeparator>
        </Element.LoginForm>
      </Container>
    </React.Fragment>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

