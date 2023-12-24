import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import * as Element from "../elements/mainscreen";
import Banner from "./Banner";
import AdminPage from "./Admin";
import {
  get_dictionaries,
  get_modes,
  select_dictionary,
} from "../actions/learningSpecs";
import modes from "../actions/modes";
import List from "../components/List";

const MainScreen = ({
  isAuthenticated,
  is_superuser,
  dictionaries,
  selected_dictionary,
  selected_mode,
}) => {
  const navigate = useNavigate();
  const [displayLearning, setDisplayLearning] = useState(true);
  const [displayDictionaries, setDisplayDictionaries] = useState(false);
  const [displayModes, setDisplayModes] = useState(false);
  const [selectedDictionary, setSelectedDictionary] =
    useState(selected_dictionary);
  const [selectedMode, setSelectedMode] = useState(selected_mode);

  useEffect(
    function () {
      if (displayDictionaries === true) {
        get_dictionaries();
      }
    },
    [displayDictionaries]
  );

  // useEffect(
  //   function () {
  //     if (displayModes === true) {
  //       get_modes();
  //     }
  //   },
  //   [displayModes]
  // );

  useEffect(
    function () {
      if (selectedDictionary !== null) {
        setDisplayDictionaries(false);
        setDisplayModes(true);
      }
    },
    [selectedDictionary]
  );

  useEffect(
    function () {
      if (selectedMode !== null) {
        navigate("/learning"); // napisano samo ovako na prvu, nema još putanje do toga kasnije ću dodati
      }
    },
    [selectedMode, navigate]
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
          <Element.DictionarySelect>
            Select dictionary
            <List elements={dictionaries} type="dict" />
          </Element.DictionarySelect>
        )}
        {displayModes && (
          <Element.ModeSelect>
            Select module
            <List elements={modes} type="mode" />
          </Element.ModeSelect>
        )}
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_superuser: state.profile.is_admin,
  dictionaries: state.learningSpecsReducer.dictionaries,
  selected_dictionary: state.learningSpecsReducer.selectedDictionary,
  selected_mode: state.learningSpecsReducer.selectedMode,
  // modules: state.learningSpecsReducer.modes,
});

export default connect(mapStateToProps, {})(MainScreen);
