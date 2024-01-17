import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ButtonLayout, Button1, Logo, BannerLayout } from "../elements/global";
import { logout } from "../actions/auth";

const Banner = ({ isAuthenticated, origin, logout, is_superuser }) => {
  let navigation = [
    ["/login", "Login"],
    ["/signup", "Sign Up"],
  ];
  if (isAuthenticated) {
    navigation[0][0] = "/mainScreen";
    navigation[0][1] = "Main Screen";
    navigation[1][0] = "/profileSettings";
    navigation[1][1] = "Profile";
  }

  let adminModify = [
    ["/modifyUsers", "Modify users"],
    ["/modifyDictionaries", "Modify dictionaries"],
  ];

  let _logout = [];

  let modifyOpen = true;

  let modifyDictionaries = true;

  switch (origin) {
    case "MainScreen":
      navigation.shift();
      _logout.push("Logout");
      break;
    case "ProfileSettings":
      navigation.pop();
      _logout.push("Logout");
      break;
    case "PassChange":
      navigation.pop();
      navigation.pop();
      break;
    case "ModifyUsers":
      modifyOpen = false;
      _logout.push("Logout");
      break;
    case "ModifyDictionaries":
      modifyDictionaries = false;
      _logout.push("Logout");
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <BannerLayout>
        <Logo>FLIP MEMO</Logo>
        <ButtonLayout>
          {navigation.map((item) => (
            <Link to={item[0]} key={item[0]}>
              <Button1>{item[1]}</Button1>
            </Link>
          ))}
          {isAuthenticated ? (
            is_superuser ? (
              modifyOpen ? (
                <>
                  <Link to={adminModify[0][0]} key={adminModify[0][0]}>
                    <Button1>{adminModify[0][1]}</Button1>
                  </Link>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            is_superuser ? (
              modifyDictionaries ? (
                <>
                  <Link to={adminModify[1][0]} key={adminModify[1][0]}>
                    <Button1>{adminModify[1][1]}</Button1>
                  </Link>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {_logout.map((item) => (
            <Button1 onClick={logout}>{item}</Button1>
          ))}
        </ButtonLayout>
      </BannerLayout>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_superuser: state.profile.is_admin,
});

export default connect(mapStateToProps, { logout })(Banner);

// modifyDictionaries ? (
//   <Link to={adminModify[1][0]} key={adminModify[1][0]}>
//     <Button1>{adminModify[1][1]}</Button1>
//   </Link> : (
//   <></>
// )

// ) : (
// <></>
// )
