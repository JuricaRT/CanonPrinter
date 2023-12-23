import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import * as Element from "../elements/mainscreen";
import Banner from "./Banner";
import AdminPage from "./Admin";
import { get_dictionaries, get_modules } from "../actions/learningSpecs";

const MainScreen = ({
  isAuthenticated,
  is_superuser,
  dictionaries,
  modules,
}) => {
  const navigate = useNavigate();
  const [displayLearning, setDisplayLearning] = useState(true);
  const [displayDictionaries, setDisplayDictionaries] = useState(false);
  const [displayModules, setDisplayModules] = useState(false);

  useEffect(
    function () {
      if (displayDictionaries === true) {
        get_dictionaries();
      }
    },
    [displayDictionaries]
  );

  useEffect(
    function () {
      if (displayModules === true) {
        get_modules();
      }
    },
    [displayModules]
  );

  function startLearning() {
    setDisplayLearning(false);
    setDisplayDictionaries(true);
  }

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Banner origin="MainScreen"></Banner>
        <Element.TopDiv>
          {is_superuser ? <AdminPage></AdminPage> : <></>}
        </Element.TopDiv>
        <hr />
        {displayLearning && (
          <Element.LearningStart onClick={startLearning}>
            Start learning
          </Element.LearningStart>
        )}
        {displayDictionaries && (
          <Element.DictionarySelect>Select dictionary</Element.DictionarySelect>
        )}
        {displayModules && (
          <Element.ModuleSelect>Select module</Element.ModuleSelect>
        )}
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_superuser: state.profile.is_admin,
  dictionaries: state.learningSpecsReducer.dictionaries,
  modules: state.learningSpecsReducer.modules,
});

export default connect(mapStateToProps, {})(MainScreen);
