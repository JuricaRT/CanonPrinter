import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import Banner from './Banner';
import * as PassChangeMisc from '../elements/passchange'
import CSRFToken from '../components/CSRFToken';
import { update_password } from '../actions/profile';

const PassChange = ({isAuthenticated, has_initial_pass, update_password}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null)
      navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && !has_initial_pass)
      navigate('/mainScreen');
  }, [isAuthenticated, has_initial_pass, navigate]);

  const [formData, setFormData] = useState({
    password: '',
    c_password: ''
  });

  const {password, c_password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password == "" || password == null) {
      alert("Password is invalid");
      return; 
    }

    if (password != c_password) {
      alert("Passwords do not match");
      return;    
    }

    update_password(password);
  }

  return (
  <React.Fragment>
  <GlobalStyle />
    <Container>
      <Element.LoginForm onSubmit={e => onSubmit(e)}>
        <Banner origin="PassChange"></Banner>
        <Element.HorizontalSeparator>
        <Element.LeftSideImage></Element.LeftSideImage>
        <Element.LoginFormDiv>
          <CSRFToken />
          <PassChangeMisc.ConfirmPassLabel>
            Please enter your desired password:
          </PassChangeMisc.ConfirmPassLabel>
          <Element.StandardDiv>
            <Element.Input
              type='password'
              name='password'
              onChange={e => onChange(e)}
              value={password}
              minLength='1'
              required    
              placeholder="New Password..."
            />
          </Element.StandardDiv>
          <div>
          <Element.PasswordButtonAlignment>
            <Element.StandardDiv>
              <Element.Input
                type='password'
                name='c_password'
                onChange={e => onChange(e)}
                value={c_password}
                minLength='1'
                required    
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
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  has_initial_pass: state.profile.has_initial_pass
})

export default connect(mapStateToProps, { update_password })(PassChange);