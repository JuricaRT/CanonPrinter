import React, { useState, useEffect } from "react";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import * as Element from "../elements/modifyDictionaries";
import { add_word_to_dictionary } from "../actions/admin";
import { create_dictionary } from "../actions/admin";

const ModifyDictionaries = ({
  isAuthenticated,
  create_dictionary,
  add_word_to_dictionary
}) => {
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
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate]);
  
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

  function submitWord() {
    if (currentAddWordButtonAction === "Add") {
      setDictionaryChanges(false)
      /*
      add_word_to_dictionary(
        "temp",
        //selectedDictionary,
        word,
        wordLanguage,
        translation,
        wordType,
        definition
      );*/
    }
  }

  function submitDictionary() {
    setAddDictionaries(false);
    create_dictionary(dictionaryName, language);
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

        { dictionaryChanges && (
          <>
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
});

export default connect(mapStateToProps, {
  create_dictionary,
  add_word_to_dictionary,
})(ModifyDictionaries);
