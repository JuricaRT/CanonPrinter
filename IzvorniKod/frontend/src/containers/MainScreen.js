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
  select_dictionary_view,
  select_language_view,
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
  selected_dictionary_view,
  selected_language_view,
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

  //-------------------------------------------------------------------
  const [viewLanguages, setViewLanguages] = useState(null);
  const [viewDisplayLanguages, setViewDisplayLanguages] = useState(true);
  const [viewDisplayDictionaries, setViewDisplayDictionaries] = useState(false);
  const [viewSelectedLanguage, setViewSelectedLanguage] = useState(null);
  const [viewSelectedDictionary, setViewSelectedDictionary] = useState(null);
  const [viewDictionary, setViewDictionary] = useState(false);
  const [viewWords, setViewWords] = useState(false);

  useEffect(() => {
    get_dictionaries();

    if (!isAuthenticated || isAuthenticated === null) {
      navigate("/");
    }

    if (selectedMode !== null) {
      navigate("/mode12Screen"); // napisano samo ovako na prvu, nema još putanje do toga kasnije ću dodati
    }
  }, [isAuthenticated, navigate, selectedMode, get_dictionaries]);

  // set values from states
  useEffect(() => {
    setViewSelectedLanguage(selected_language_view);
    setViewSelectedDictionary(selected_dictionary_view);
    setSelectedLanguage(selected_language);
    setSelectedDictionary(selected_dictionary);
    setSelectedMode(selected_mode);
  }, [
    selected_language,
    selected_dictionary,
    selected_mode,
    selected_dictionary_view,
    selected_language_view,
  ]);

  useEffect(() => {
    if (selectedLanguage !== null) {
      setDisplayLanguages(false);
      setDisplayDictionaries(true);
    }
    if (selectedDictionary !== null) {
      setDisplayDictionaries(false);
      setDisplayModes(true);
    }
    if (viewSelectedLanguage !== null) {
      setViewDisplayLanguages(false);
      setViewDisplayDictionaries(true);
    }
    if (viewSelectedDictionary !== null) {
      setViewWords(true);
      setViewDisplayDictionaries(false);
    }
  }, [
    selectedLanguage,
    selectedDictionary,
    viewSelectedLanguage,
    viewSelectedDictionary,
  ]);

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

  function viewDictionaryBack() {
    setViewDisplayDictionaries(false);
    setViewDisplayLanguages(true);
    select_language(null);
  }

  function modeBack() {
    setDisplayModes(false);
    setDisplayDictionaries(true);
    select_dictionary(null);
  }

  function customizeViewDictionary() {
    setViewDictionary(!viewDictionary);
    setViewLanguages(uniqueLang);
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
        <Element.ViewDictionary onClick={customizeViewDictionary}>
          View dictionary
        </Element.ViewDictionary>
        {viewDictionary && (
          <>
            {viewDisplayLanguages && (
              <Element.LanguageSelect>
                Select language
                <List elements={viewLanguages} type="lang view" />
              </Element.LanguageSelect>
            )}
            {viewDisplayDictionaries && (
              <Element.DictionarySelect>
                Select dictionary
                <List
                  elements={dictionaries[viewSelectedLanguage]}
                  type="dict view"
                />
                <Element.DictionaryBack onClick={viewDictionaryBack}>
                  &larr;
                </Element.DictionaryBack>
              </Element.DictionarySelect>
            )}
            {viewWords && <button>Jeeeej</button>}
          </>
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
  selected_language_view: state.learningSpecsReducer.languageView,
  selected_dictionary_view: state.learningSpecsReducer.selectedDictionaryView,
});

export default connect(mapStateToProps, {
  get_dictionaries,
  select_dictionary,
  select_language,
  select_dictionary_view,
  select_language_view,
})(MainScreen);
