import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import * as Element from "../elements/modifyDictionaries";
import List from "../components/List";
import { add_word_to_dictionary } from "../actions/admin";
import {
  get_dictionaries,
  select_dictionary,
  select_language,
} from "../actions/learningSpecs";
import { create_dictionary } from "../actions/admin";

const ModifyDictionaries = ({
  isAuthenticated,
  dictionaries,
  uniqueLang,
  selected_dictionary,
  selected_mode,
  selected_language,
  get_dictionaries,
  select_language,
  select_dictionary,
  create_dictionary,
}) => {
  //matejev dio
  const [displayLearning, setDisplayLearning] = useState(true);
  const [displayLanguages, setDisplayLanguages] = useState(false);
  const [displayDictionaries, setDisplayDictionaries] = useState(false);
  const [displayModes, setDisplayModes] = useState(false);
  const [languages, setLanguages] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDictionary, setSelectedDictionary] = useState(null);

  //moj dio
  const [dictionaryName, setDictionaryName] = useState("");
  const [addDictionaries, setAddDictionaries] = useState(false);
  const [language, setLanguage] = useState("");
  const [dictionaryChanges, setDictionaryChanges] = useState(false);

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordType, setWordType] = useState("");
  const [wordLanguage, setWordLanguage] = useState("");
  const [selectedAddition, setSelectedAddition] = useState(false);
  const [selectedRemove, setSelectedRemove] = useState(false);
  const [currentAddWordButtonAction, setCurrentWordButtonAction] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    get_dictionaries();
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate, get_dictionaries]);

  //moj dio
  function createDictionary() {
    setAddDictionaries(!addDictionaries);
  }

  function changeDictionaryName(change) {
    setDictionaryName(change.target.value);
  }

  function changeLanguageName(change) {
    setLanguage(change.target.value);
  }

  function submitDictionary() {
    setAddDictionaries(false);
    create_dictionary(dictionaryName, language);
  }

  function changeDictionaryChanges() {
    setDictionaryChanges(!dictionaryChanges);
    setSelectedRemove(false);
    setSelectedAddition(false);
  }

  function changeToAdd() {
    setSelectedAddition(true);
    setSelectedRemove(false);
    setCurrentWordButtonAction("Add");
  }

  function changeToRemove() {
    setSelectedRemove(true);
    setSelectedAddition(false);
    setCurrentWordButtonAction("Remove");
  }

  function changeWord(change) {
    setWord(change.target.value);
  }

  function changeTranslation(change) {
    setTranslation(change.target.value);
  }

  function changeDefinition(change) {
    setDefinition(change.target.value);
  }

  function changeWordType(change) {
    setWordType(change.target.value);
  }

  function changeWordLanguage(change) {
    setWordLanguage(change.target.value);
  }

  //matejev dio

  useEffect(() => {
    setSelectedLanguage(selected_language);
    setSelectedDictionary(selected_dictionary);
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

  function submitWord() {
    if (currentAddWordButtonAction === "Add") {
      //setDictionaryChanges(false)
      add_word_to_dictionary(
        selectedDictionary,
        word,
        wordLanguage,
        translation,
        wordType,
        definition
      );
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Banner origin="ModifyDictionaries"></Banner>
        <hr />
        <Element.AddDictionary onClick={createDictionary}>
          Add Dictionary
        </Element.AddDictionary>
        {addDictionaries && (
          <>
            <Element.AddDictionaryName
              type="text"
              placeholder="Dictionary name..."
              onChange={(change) => changeDictionaryName(change)}
            ></Element.AddDictionaryName>
            <Element.LanguageSelectionForDictionary
              type="text"
              placeholder="Language..."
              onChange={(change) => changeLanguageName(change)}
            ></Element.LanguageSelectionForDictionary>
            <Element.SubmitButtonForAddingDictionary onClick={submitDictionary}>
              Submit
            </Element.SubmitButtonForAddingDictionary>
          </>
        )}
        <Element.ChangeDictionaryButton onClick={changeDictionaryChanges}>
          Add/remove words
        </Element.ChangeDictionaryButton>
        {dictionaryChanges && (
          <>
            {/* matejev dio */}
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
                <Element.ModeBack onClick={modeBack}>&larr;</Element.ModeBack>
              </Element.ModeSelect>
            )}
            {/* moj dio */}
            <Element.WordAdditionInput
              type="text"
              placeholder="Word..."
              onChange={(change) => changeWord(change)}
            ></Element.WordAdditionInput>
            <Element.WordAdditionInput
              type="text"
              placeholder="Translation..."
              onChange={(change) => changeTranslation(change)}
            ></Element.WordAdditionInput>
            <Element.WordAdditionInput
              type="text"
              placeholder="Definition..."
              onChange={(change) => changeDefinition(change)}
            ></Element.WordAdditionInput>
            <Element.WordAdditionInput
              type="text"
              placeholder="Word type..."
              onChange={(change) => changeWordType(change)}
            ></Element.WordAdditionInput>
            <Element.WordAdditionInput
              type="text"
              placeholder="Language..."
              onChange={(change) => changeWordLanguage(change)}
            ></Element.WordAdditionInput>
            <Element.WordChangesDiv>
              {selectedRemove ? (
                <Element.SelectedWordAdditionButton>
                  Remove
                </Element.SelectedWordAdditionButton>
              ) : (
                <Element.WordAdditionButton onClick={changeToRemove}>
                  Remove
                </Element.WordAdditionButton>
              )}
              {selectedAddition ? (
                <Element.SelectedWordAdditionButton>
                  Add
                </Element.SelectedWordAdditionButton>
              ) : (
                <Element.WordAdditionButton onClick={changeToAdd}>
                  Add
                </Element.WordAdditionButton>
              )}

              <Element.WordAdditionButton onClick={submitWord}>
                Submit
              </Element.WordAdditionButton>
            </Element.WordChangesDiv>
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
});

export default connect(mapStateToProps, {
  get_dictionaries,
  select_dictionary,
  select_language,
  create_dictionary,
  add_word_to_dictionary,
})(ModifyDictionaries);
