import * as Element from '../elements/formpages';
import * as ProfileMisc from '../elements/profilesettings'

const ProfileFormElement = ({param, name, val, type="text", onChangeFunc}) => (
    <Element.StandardDiv>
      <ProfileMisc.InfoLabel>{`${param}:`}</ProfileMisc.InfoLabel>
      <Element.Input
        type={type}
        value={val}
        name={name}
        onChange={(e) => onChangeFunc(e)}
        placeholder={`${param}...`}
      />
    </Element.StandardDiv>
);

export default ProfileFormElement;