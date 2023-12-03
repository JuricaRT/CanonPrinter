import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import * as ProfileMisc from '../elements/profilesettings'
import Banner from './Banner';
import CSRFToken from '../components/CSRFToken';
import { update_profile } from '../actions/profile';
import { delete_account } from '../actions/auth';

const ProfileSettings = (
  {
    isAuthenticated,
    update_profile,
    username_global,
    name_global,
    last_name_global
  }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null)
      navigate('/');
    console.log(username_global);
    setFormData({
      name: name_global,
      last_name: last_name_global,
      username: username_global,
      });

  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    last_name: ''
  });

  const { username, password, c_password, name, last_name } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    if (password != c_password) {
      alert("Passwords do not match");
      return;
    }

    let passwordSet = true;
    if (password == "" || password == null)
      passwordSet = false;

    update_profile(username, password, name, last_name, passwordSet);
  };

  const FormElement = ({param, name, val, type="text"}) => (
    <Element.StandardDiv>
      <ProfileMisc.InfoLabel>{`${param}:`}</ProfileMisc.InfoLabel>
      <Element.Input
        type={type}
        value={val}
        name={name}
        onChange={(e) => onChange(e)}
        placeholder={`${param}...`}
      />
    </Element.StandardDiv>
  );

  return (
    <React.Fragment>
    <GlobalStyle />
      <Container>
        <Element.LoginForm onSubmit={e => onSubmit(e)}>
          <Banner origin="ProfileSettings"></Banner>
          <Element.HorizontalSeparator>
          <Element.LeftSideImage></Element.LeftSideImage>
          <ProfileMisc.ProfileFormDiv>
            <CSRFToken />
            <FormElement param="Username" name="username" val={username} type="text"/>
            <FormElement param="New Password" name="password" val={password} type="password"/>
            <FormElement param="Confirm Password" name="c_password" val={c_password} type="password"/>
            <FormElement param="Name" name="name" val={name} type="text"/>
            <FormElement param="Last Name" name="last_name" val={last_name} type="text"/>
            <ProfileMisc.ButtonsDiv>
              <Element.FlattenedButton onClick={delete_account}>Delete Account</Element.FlattenedButton>
              <Element.FlattenedButton>Save Changes</Element.FlattenedButton>
            </ProfileMisc.ButtonsDiv>
          </ProfileMisc.ProfileFormDiv>
          </Element.HorizontalSeparator>
        </Element.LoginForm>
      </Container>
    </React.Fragment>
  );
}




const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  name_global: state.profile.name,
  last_name_global: state.profile.last_name,
  username_global: state.profile.username,
});

export default connect(mapStateToProps, { delete_account, update_profile })(ProfileSettings);

