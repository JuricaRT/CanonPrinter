import React, {useEffect, useState} from 'react';
import { useTimer } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, GlobalStyle } from '../elements/global';
import * as Element from '../elements/formpages';
import * as ProfileMisc from '../elements/profilesettings'
import Banner from './Banner';
import CSRFToken from '../components/CSRFToken';
import { update_profile } from '../actions/profile';
import { delete_account } from '../actions/auth';
import ProfileFormElement from '../components/ProfileFormElement';

const ProfileSettings = (
  {
    isAuthenticated,
    delete_account,
    update_profile,
    username_global,
    name_global,
    last_name_global
  }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: name_global,
      last_name: last_name_global,
      username: username_global,
      });
  }, [name_global, last_name_global, username_global]);

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null)
      navigate('/');
  }, [isAuthenticated, navigate]);

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

    if (password !== c_password) {
      alert("Passwords do not match");
      return;
    }

    let passwordSet = true;
    if (password === "" || password === null)
      passwordSet = false;

    update_profile(username, password, name, last_name, passwordSet);
  };



  const [deleteButtonText, setDeleteButtonText] = useState("Delete Account");
  const [confirmed, setConfirmedDelete] = useState(false)

  let {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({onExpire: () => {
    setConfirmedDelete(false);  
    setDeleteButtonText("Delete Account"); }
  });

  const handleDelete = () => {
    if (!isRunning) {
      setConfirmedDelete(false);
    }
    
    if (confirmed === false) {
      setConfirmedDelete(true);
      setDeleteButtonText("Confirm");
      let time = new Date();
      time.setSeconds(time.getSeconds() + 3);
      restart(time);
    }
    else if (confirmed === true) {
      delete_account();
    }
  }

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
            <ProfileFormElement param="Username" name="username" val={username} type="text" onChangeFunc={onChange}/>
            <ProfileFormElement param="New Password" name="password" val={password} type="password" onChangeFunc={onChange}/>
            <ProfileFormElement param="Confirm Password" name="c_password" val={c_password} type="password" onChangeFunc={onChange}/>
            <ProfileFormElement param="Name" name="name" val={name} type="text" onChangeFunc={onChange}/>
            <ProfileFormElement param="Last Name" name="last_name" val={last_name} type="text" onChangeFunc={onChange}/>
            <ProfileMisc.ButtonsDiv>
              <Element.FlattenedButton onClick={handleDelete} type="button">{deleteButtonText}</Element.FlattenedButton>
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

