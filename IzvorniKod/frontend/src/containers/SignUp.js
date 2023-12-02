import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Button1, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import Banner from './Banner';
import { register } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';

const SignUp = ({isAuthenticated}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)
      navigate('/mainScreen');
  });

  const [formData, setFormData] = useState({
    email: '',
  });

  const {email} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    register(email)
  }

  return (
    <React.Fragment>
    <GlobalStyle />
    <Container>
        <Element.LoginForm onSubmit={e => onSubmit(e)}>
          <Banner origin="SignUp"></Banner>
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(SignUp);