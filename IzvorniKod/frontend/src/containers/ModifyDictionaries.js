import React, { useState, useEffect } from "react";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import * as Element from "../elements/mainscreen";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";

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
  const [selectedLanguageButton, setSelectedLanguageButton] = useState(null);
  const [dictionaryName, setDictionaryName] = useState("");
  const [addDictionaries, setAddDictionaries] = useState(false);
  const [languages, setLanguages] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) navigate("/");
  }, [isAuthenticated, navigate]);

  function createDictionary() {
    setAddDictionaries(!addDictionaries);
    setSelectedLanguageButton("");
    setLanguages(uniqueLang);
  }

  function changeDictionaryName(change) {
    setDictionaryName(change.target.value);
  }

  function submitDictionary() {
    setAddDictionaries(false);
    create_dictionary(dictionaryName, languages);
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
            <Element.SubmitButtonForAddingDictionary onClick={submitDictionary}>
              Submit
            </Element.SubmitButtonForAddingDictionary>
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
