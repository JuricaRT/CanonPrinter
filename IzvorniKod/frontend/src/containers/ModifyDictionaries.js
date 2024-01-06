import React, { useState, useEffect } from "react";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import * as Element from "../elements/modifyDictionaries";
import {
  add_word_to_dictionary,
  remove_word_from_dictionary,
} from "../actions/admin";
import { create_dictionary } from "../actions/admin";
import List from "../components/List";
import {
  get_dictionaries,
  select_dictionary,
  select_language,
  close_adding,
} from "../actions/learningSpecs";

const ModifyDictionaries = ({
  isAuthenticated,
  close_adding,
  create_dictionary,
  add_word_to_dictionary,
  remove_word_from_dictionary,
  dictionaries,
  uniqueLang,
  selected_dictionary,
  selected_mode,
  selected_language,
  get_dictionaries,
  select_language,
  select_dictionary,
}) => {
  const [dictionaryName, setDictionaryName] = useState("");
  const [addDictionaries, setAddDictionaries] = useState(false);
  const [language, setLanguage] = useState("");
  const [dictionaryChanges, setDictionaryChanges] = useState(false);

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [selectedAddition, setSelectedAddition] = useState(false);
  const [currentAddWordButtonAction, setCurrentWordButtonAction] = useState("");
  const [displayCurrentDictionary, setDisplayCurrentDictionary] =
    useState(false);
  const [wordTypeChosen, setWordTypeChosen] = useState("");

  //----------------------------------------
  //const [displayLearning, setDisplayLearning] = useState(true);
  const [displayLanguages, setDisplayLanguages] = useState(false);
  const [displayDictionaries, setDisplayDictionaries] = useState(false);
  const [languages, setLanguages] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDictionary, setSelectedDictionary] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    get_dictionaries();
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate, get_dictionaries]);

  useEffect(() => {
    setSelectedLanguage(selected_language);
    setSelectedDictionary(selected_dictionary);
    if (selected_dictionary !== null) {
      setDisplayCurrentDictionary(true);
    }
  }, [selected_language, selected_dictionary, selected_mode]);

  useEffect(() => {
    if (selectedLanguage !== null) {
      setDisplayLanguages(false);
      setDisplayDictionaries(true);
    }

    if (selectedDictionary !== null) {
      setDisplayDictionaries(false);
    }
  }, [selectedLanguage, selectedDictionary]);

  // function customizeLearning() {
  //   setDisplayLearning(false);
  //   setLanguages(uniqueLang);
  //   setDisplayLanguages(true);
  // }

  function dictionaryBack() {
    setDisplayDictionaries(false);
    setDisplayLanguages(true);
    select_language(null);
  }

  //-----------------------------------------------------
  function createDictionary() {
    setAddDictionaries(!addDictionaries);
  }

  function changeDictionaryName(change) {
    setDictionaryName(change.target.value);
  }

  function changeLanguageName(change) {
    setLanguage(change.target.value);
  }

  function changeDictionaryChanges() {
    setDictionaryChanges(!dictionaryChanges);
    setDisplayCurrentDictionary(false);
    setSelectedAddition(false);
    setLanguages(uniqueLang);
    setDisplayLanguages(true);
    setWordTypeChosen(false);
    close_adding();
  }

  function changeToAdd() {
    setSelectedAddition(true);
    setCurrentWordButtonAction("Add");
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

  function submitWord() {
    var variables = [
      selectedDictionary,
      word,
      selectedLanguage,
      translation,
      wordTypeChosen,
      definition,
    ];
    if (
      currentAddWordButtonAction === "Add" &&
      variables.every((variable) => variable !== "")
    ) {
      changeDictionaryChanges();
      add_word_to_dictionary(
        selectedDictionary,
        word,
        selectedLanguage,
        translation,
        wordTypeChosen,
        definition
      );
    }
  }

  function submitDictionary() {
    setAddDictionaries(false);
    create_dictionary(dictionaryName, language);
  }

  function wordTypeButtonClicked(type) {
    setWordTypeChosen(type);
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Banner origin="ModifyDictionaries"></Banner>
        <hr />
        <Element.AddDictionary onClick={createDictionary}>
          Add dictionary
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
          Add word
        </Element.ChangeDictionaryButton>

        {dictionaryChanges && (
          <>
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
            {displayCurrentDictionary && (
              <Element.SelectedDictionaryDisplay>
                {selectedDictionary}
              </Element.SelectedDictionaryDisplay>
            )}
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
            {selectedLanguage && (
              <Element.WordAdditionInput
                type="text"
                value={selectedLanguage}
                readOnly={true}
              ></Element.WordAdditionInput>
            )}
            <Element.WordTypeButtons>
              {wordTypeChosen === "imenica" ? (
                <Element.WordTypeButtonChosen>
                  imenica
                </Element.WordTypeButtonChosen>
              ) : (
                <Element.WordTypeButton
                  onClick={() => wordTypeButtonClicked("imenica")}
                >
                  imenica
                </Element.WordTypeButton>
              )}
              {wordTypeChosen === "pridjev" ? (
                <Element.WordTypeButtonChosen>
                  pridjev
                </Element.WordTypeButtonChosen>
              ) : (
                <Element.WordTypeButton
                  onClick={() => wordTypeButtonClicked("pridjev")}
                >
                  pridjev
                </Element.WordTypeButton>
              )}
              {wordTypeChosen === "glagol" ? (
                <Element.WordTypeButtonChosen>
                  glagol
                </Element.WordTypeButtonChosen>
              ) : (
                <Element.WordTypeButton
                  onClick={() => wordTypeButtonClicked("glagol")}
                >
                  glagol
                </Element.WordTypeButton>
              )}
              {wordTypeChosen === "prijedlog" ? (
                <Element.WordTypeButtonChosen>
                  prijedlog
                </Element.WordTypeButtonChosen>
              ) : (
                <Element.WordTypeButton
                  onClick={() => wordTypeButtonClicked("prijedlog")}
                >
                  prijedlog
                </Element.WordTypeButton>
              )}
            </Element.WordTypeButtons>
            <Element.WordChangesDiv>
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
  create_dictionary,
  add_word_to_dictionary,
  get_dictionaries,
  select_dictionary,
  select_language,
  remove_word_from_dictionary,
  close_adding,
})(ModifyDictionaries);
