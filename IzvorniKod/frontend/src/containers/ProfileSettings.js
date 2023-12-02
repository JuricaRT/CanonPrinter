import React from 'react';
import { Container, GlobalStyle, Button1 } from '../elements/global';
import * as Element from '../elements/formpages';
import * as ProfileMisc from '../elements/profilesettings'
import Banner from './Banner';

let error = false;
let showPassword = false;
let togglePasswordVisibility = false;

const ProfileSettings = () => (
  <React.Fragment>
  <GlobalStyle />
    <Container>
      <Element.LoginForm /*onSubmit={handleSubmit}*/>
        <Banner></Banner>
        <Element.HorizontalSeparator>
        <Element.LeftSideImage></Element.LeftSideImage>
        <ProfileMisc.ProfileFormDiv>
          <FormElement param="Username"/>
          <FormElement param="New Password"/>
          <FormElement param="Confirm Password"/>
          <FormElement param="Name"/>
          <FormElement param="Last Name"/>
          <ProfileMisc.ButtonsDiv>
            <Element.FlattenedButton>Delete Account</Element.FlattenedButton>
            <Element.FlattenedButton>Save Changes</Element.FlattenedButton>
          </ProfileMisc.ButtonsDiv>
        </ProfileMisc.ProfileFormDiv>
        </Element.HorizontalSeparator>
      </Element.LoginForm>
    </Container>
  </React.Fragment>
);


const FormElement = ({param}) => (
  <Element.StandardDiv>
    <ProfileMisc.InfoLabel>{`${param}:`}</ProfileMisc.InfoLabel>
    <Element.Input
      //type={showPassword ? "text" : "password"}
      //value={password}
      //onChange={(e) => setPassword(e.target.value)}
      placeholder={`${param}...`}
    />
  </Element.StandardDiv>
);

export default ProfileSettings;

