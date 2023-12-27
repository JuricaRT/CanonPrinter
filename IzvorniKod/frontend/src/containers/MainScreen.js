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
} from "../actions/learningSpecs";
import modes from "../actions/modes";
import List from "../components/List";
import Admin from "../reducers/admin";
import ModifyUsers from "./ModifyUsers";

const MainScreen = ({
  isAuthenticated,
  dictionaries,
  selected_dictionary,
  selected_mode,
  selected_language,
  get_dictionaries,
}) => {
  const navigate = useNavigate();
  const [displayLearning, setDisplayLearning] = useState(true);
  const [displayLanguages, setDisplayLanguages] = useState(false);
  const [displayDictionaries, setDisplayDictionaries] = useState(false);
  const [displayModes, setDisplayModes] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [addDictionaries, setAddDictionaries] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDictionary, setSelectedDictionary] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const [selectedLanguageButton, setSelectedLanguageButton] = useState(null);

  useEffect(
    function () {
      setSelectedLanguage(selected_language);
    },
    [selected_language]
  );

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

    const uniqueLang = [
      ...new Set(
        Object.keys(dictionaries)
          .filter((key) => Array.isArray(dictionaries[key]))
          .map((key) => key.toLowerCase())
      ),
    ];

    setLanguages(uniqueLang);

    setDisplayLanguages(true);
  }

  function createDictionary() {
    setAddDictionaries(!addDictionaries);
    setSelectedLanguageButton("");
    const uniqueLang = [
      ...new Set(
        Object.keys(dictionaries)
          .filter((key) => Array.isArray(dictionaries[key]))
          .map((key) => key.toLowerCase())
      ),
    ];

    setLanguages(uniqueLang);
  }

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate]);

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
          </Element.DictionarySelect>
        )}
        {displayModes && (
          <Element.ModeSelect>
            Select mode
            <List elements={Object.values(modes)} type="mode" />
          </Element.ModeSelect>
        )}
        <Element.AddDictionary onClick={createDictionary}>
          Add Dictionary
        </Element.AddDictionary>
        {addDictionaries && (
          <>
            <Element.AddDictionaryName
              type="text"
              placeholder="Dictionary name..."
            ></Element.AddDictionaryName>
            <Element.LanguageSelectionForDictionary>
              {languages.map((name) =>
                selectedLanguageButton === name ? (
                  <Element.SelectedLanguageForDictionary
                    onClick={() => {
                      setSelectedLanguageButton(name);
                    }}
                  >
                    {name}
                  </Element.SelectedLanguageForDictionary>
                ) : (
                  <Element.NotSelectedLanguageForDictionary
                    onClick={() => {
                      setSelectedLanguageButton(name);
                    }}
                  >
                    {name}
                  </Element.NotSelectedLanguageForDictionary>
                )
              )}
            </Element.LanguageSelectionForDictionary>
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
  selected_dictionary: state.learningSpecsReducer.selectedDictionary,
  selected_mode: state.learningSpecsReducer.selectedMode,
  selected_language: state.learningSpecsReducer.language,
});

export default connect(mapStateToProps, { get_dictionaries })(MainScreen);
