import React, { useEffect } from "react";
import AdminPage from "./Admin";
import { Container, GlobalStyle } from "../elements/global";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const ModifyUsers = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Banner origin="ModifyUsers"></Banner>
        <AdminPage></AdminPage>
      </Container>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ModifyUsers);
