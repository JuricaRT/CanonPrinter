import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import * as Element from "../elements/mainscreen";
import Banner from "./Banner";

import {
  get_dictionaries,
  get_modes,
  select_dictionary,
  select_language,
} from "../actions/learningSpecs";
import modes from "../actions/modes";
import List from "../components/List";
import Admin from "../reducers/admin";
import ModifyUsers from "./ModifyUsers";

const MainScreen = ({
  isAuthenticated,
  dictionaries,
  uniqueLang,
  selected_dictionary,
  selected_mode,
  selected_language,
  get_dictionaries,
  select_language,
  select_dictionary,
}) => {
  const navigate = useNavigate();
  const [displayLearning, setDisplayLearning] = useState(true);
  const [displayLanguages, setDisplayLanguages] = useState(false);
  const [displayDictionaries, setDisplayDictionaries] = useState(false);
  const [displayModes, setDisplayModes] = useState(false);
  const [languages, setLanguages] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDictionary, setSelectedDictionary] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    get_dictionaries();

    if (!isAuthenticated || isAuthenticated === null) {
      navigate("/");
    }

    if (selectedMode !== null) {
      navigate("/learning"); // napisano samo ovako na prvu, nema još putanje do toga kasnije ću dodati
    }
  }, [isAuthenticated, navigate, selectedMode, get_dictionaries]);

  // set values from states
  useEffect(() => {
    setSelectedLanguage(selected_language);
    setSelectedDictionary(selected_dictionary);
    setSelectedMode(selected_mode);
  }, [selected_language, selected_dictionary, selected_mode]);

  useEffect(() => {
    if (selectedLanguage !== null) {
      setDisplayLanguages(false);
      setDisplayDictionaries(true);
    }

    if (selectedDictionary !== null) {
      setDisplayDictionaries(false);
      setDisplayModes(true);
    }
  }, [selectedLanguage, selectedDictionary]);

  function customizeLearning() {
    setDisplayLearning(false);
    setLanguages(uniqueLang);
    setDisplayLanguages(true);
  }

  function dictionaryBack() {
    setDisplayDictionaries(false);
    setDisplayLanguages(true);
    select_language(null);
  }

  function modeBack() {
    setDisplayModes(false);
    setDisplayDictionaries(true);
    select_dictionary(null);
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Banner origin="MainScreen"></Banner>
        <hr />
        {displayLearning && (
          <Element.LearningStart onClick={customizeLearning}>
            Customize learning
          </Element.LearningStart>
        )}
        {displayLanguages && (
          <Element.LanguageSelect>
            Select language
            <List elements={languages} type="lang" />
          </Element.LanguageSelect>
        )}
        {displayDictionaries && (
          <Element.DictionarySelect>
            Select dictionary
            <List elements={dictionaries[selectedLanguage]} type="dict" />
            <Element.DictionaryBack onClick={dictionaryBack}>
              &larr;
            </Element.DictionaryBack>
          </Element.DictionarySelect>
        )}
        {displayModes && (
          <Element.ModeSelect>
            Select mode
            <List elements={Object.values(modes)} type="mode" />
            <Element.ModeBack onClick={modeBack}>&larr;</Element.ModeBack>
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
  uniqueLang: state.learningSpecsReducer.uniqueLang,
  selected_dictionary: state.learningSpecsReducer.selectedDictionary,
  selected_mode: state.learningSpecsReducer.selectedMode,
  selected_language: state.learningSpecsReducer.language,
});

export default connect(mapStateToProps, {
  get_dictionaries,
  select_dictionary,
  select_language,
})(MainScreen);
