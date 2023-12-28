import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import * as Element from "../elements/modifyDictionaries";

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
  const [dictionaryName, setDictionaryName] = useState("");
  const [addDictionaries, setAddDictionaries] = useState(false);
  const [language, setLanguage] = useState("");
  const [dictionaryChanges, setDictionaryChanges] = useState(false);

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordType, setWordType] = useState("");
  const [wordLanguage, setWordLanguage] = useState("");

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
        <Element.ChangeDictionaryButton>
          Add/remove words
        </Element.ChangeDictionaryButton>
        {dictionaryChanges && (
          <>
            <Element.AddDictionaryName
              type="text"
              placeholder="Word..."
              onChange={(change) => changeDictionaryName(change)}
            ></Element.AddDictionaryName>
            <Element.AddDictionaryName
              type="text"
              placeholder="Translation..."
              onChange={(change) => changeDictionaryName(change)}
            ></Element.AddDictionaryName>
            <Element.AddDictionaryName
              type="text"
              placeholder="Definition..."
              onChange={(change) => changeDictionaryName(change)}
            ></Element.AddDictionaryName>
            <Element.AddDictionaryName
              type="text"
              placeholder="Word type..."
              onChange={(change) => changeDictionaryName(change)}
            ></Element.AddDictionaryName>
            <Element.AddDictionaryName
              type="text"
              placeholder="Language..."
              onChange={(change) => changeDictionaryName(change)}
            ></Element.AddDictionaryName>
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
})(ModifyDictionaries);
