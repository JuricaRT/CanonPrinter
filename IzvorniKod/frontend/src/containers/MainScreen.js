import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import * as Element from "../elements/mainscreen";
import Banner from "./Banner";
import {
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
} from "../actions/admin";
import * as SecondElement from "../elements/modifyDictionaries";

import {
  get_dictionaries,
  get_modes,
  select_dictionary,
  select_language,
  select_dictionary_view,
  select_language_view,
  close_view_dictionary,
} from "../actions/learningSpecs";
import modes from "../actions/modes";
import List from "../components/List";
import Admin from "../reducers/admin";
import ModifyUsers from "./ModifyUsers";

const MainScreen = ({
  remove_word_from_dictionary,
  isAuthenticated,
  is_superuser,
  dictionaries,
  uniqueLang,
  selected_dictionary,
  selected_mode,
  selected_language,
  get_dictionaries,
  select_language,
  select_dictionary,
  select_dictionary_view,
  selected_dictionary_view,
  selected_language_view,
  select_language_view,
  close_view_dictionary,
  get_dictionary_words,
  all_dictionary_words,
  edit_word,
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
  const [viewWords, setViewWords] = useState([]);
  const [viewAllWords, setViewAllWords] = useState(false);
  const [deleteWord, setDeleteWord] = useState(false);
  const [wordClicked, setWordClicked] = useState("");
  const [editWordButton, setEditWordButton] = useState(false);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordTypeChosen, setWordTypeChosen] = useState("");

  console.log(all_dictionary_words);

  useEffect(() => {
    get_dictionaries();
  }, [get_dictionaries]);

  useEffect(() => {
    // get_dictionaries();

    if (!isAuthenticated || isAuthenticated === null) {
      navigate("/");
    }

    if (selectedMode !== null) {
      navigate("/mode12Screen");
    }

    // if (selectedMode === modes["mode1"] || selectedMode === modes["mode2"]) {
    //   navigate("/mode12Screen", { state: selectedMode });
    // } else if (selectedMode === modes["mode3"]) {
    //   navigate("/mode3Screen");
    // } else if (selectedMode === modes["mode4"]) {
    //   navigate("/mode12Screen", { state: selectedMode });
    // }
  }, [isAuthenticated, navigate, selectedMode]);

  // set values from states
  useEffect(() => {
    setViewSelectedLanguage(selected_language_view);
    setViewSelectedDictionary(selected_dictionary_view);
    setSelectedLanguage(selected_language);
    setSelectedDictionary(selected_dictionary);
    setSelectedMode(selected_mode);
    setViewLanguages(uniqueLang);
    if (all_dictionary_words) {
      setViewWords(all_dictionary_words);
    }
  }, [
    selected_language_view,
    selected_dictionary_view,
    selected_language,
    selected_dictionary,
    selected_mode,
    uniqueLang,
    all_dictionary_words,
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
    if (viewWords.length !== 0) {
      setViewAllWords(true);
      setViewDisplayDictionaries(false);
    }
  }, [
    selectedLanguage,
    selectedDictionary,
    viewSelectedLanguage,
    viewSelectedDictionary,
    get_dictionary_words,
    viewWords,
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
    select_language_view(null);
  }

  function modeBack() {
    setDisplayModes(false);
    setDisplayDictionaries(true);
    select_dictionary(null);
  }

  function customizeViewDictionary() {
    setViewDictionary(!viewDictionary);
    close_view_dictionary();
    setViewDisplayDictionaries(false);
    setViewDisplayLanguages(true);
    setViewAllWords(false);
    setDeleteWord(false);
    setEditWordButton(false);
    setWordClicked("");
  }

  function deleteClicked() {
    setDeleteWord(!deleteWord);
    setEditWordButton(false);
  }

  function buttonClicked(word) {
    setWordClicked(word.word_str);
    setTranslation(word.cro_translation);
    setDefinition(word.definition);
    setWordTypeChosen(word.word_type);
    setWord(word.word_str);
  }

  function buttonSelectedClicked() {
    setWordClicked("");
    setTranslation("");
    setDefinition("");
    setWordTypeChosen("");
    setWord("");
  }

  function editClicked() {
    setEditWordButton(!editWordButton);
    setDeleteWord(false);
  }

  function submitFunction() {
    if (wordClicked !== "" && deleteWord === true) {
      viewWords.map((word) =>
        wordClicked === word.word_str
          ? remove_word_from_dictionary(
              viewSelectedDictionary,
              word.word_str,
              word.language,
              word.cro_translation,
              word.word_type,
              word.definition
            )
          : null
      );
    }
    var variables = [
      viewSelectedLanguage,
      word,
      translation,
      wordTypeChosen,
      definition,
    ];
    if (
      wordClicked !== "" &&
      editWordButton &&
      variables.every((variable) => variable !== "")
    ) {
      viewWords.map((oldWord) =>
        wordClicked === oldWord.word_str
          ? edit_word(
              oldWord.word_str,
              word,
              viewSelectedLanguage,
              translation,
              definition,
              wordTypeChosen
            )
          : null
      );
    }
    customizeViewDictionary();
    buttonSelectedClicked();
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

  function wordTypeButtonClicked(type) {
    setWordTypeChosen(type);
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
                <List elements={viewLanguages} type="langView" />
              </Element.LanguageSelect>
            )}
            {viewDisplayDictionaries && (
              <Element.DictionarySelect>
                Select dictionary
                <List
                  elements={dictionaries[viewSelectedLanguage]}
                  type="dictView"
                />
                <Element.DictionaryBack onClick={viewDictionaryBack}>
                  &larr;
                </Element.DictionaryBack>
              </Element.DictionarySelect>
            )}
            {viewAllWords && viewWords && viewWords.length !== 0 && (
              <>
                {is_superuser ? (
                  <>
                    <Element.WordSelection>
                      {viewWords.map((word, index) =>
                        wordClicked === word.word_str ? (
                          <Element.CustomButtonWord
                            onClick={buttonSelectedClicked}
                          >
                            {word.word_str}
                          </Element.CustomButtonWord>
                        ) : (
                          <button
                            key={index}
                            onClick={() => buttonClicked(word)}
                          >
                            {word.word_str}
                          </button>
                        )
                      )}
                    </Element.WordSelection>
                    <Element.DictionaryChanges>
                      {deleteWord ? (
                        <Element.DeleteWord onClick={deleteClicked}>
                          Delete
                        </Element.DeleteWord>
                      ) : (
                        <Element.DeleteWordNot onClick={deleteClicked}>
                          Delete
                        </Element.DeleteWordNot>
                      )}
                      {editWordButton ? (
                        <Element.EditWord onClick={editClicked}>
                          Edit
                        </Element.EditWord>
                      ) : (
                        <Element.EditWordNot onClick={editClicked}>
                          Edit
                        </Element.EditWordNot>
                      )}
                      <Element.SubmitChanges onClick={submitFunction}>
                        Submit
                      </Element.SubmitChanges>
                    </Element.DictionaryChanges>
                    {editWordButton ? (
                      <Element.EditWordClickedDiv>
                        <SecondElement.WordAdditionInput
                          type="text"
                          placeholder="Word..."
                          value={word}
                          onChange={(change) => changeWord(change)}
                        ></SecondElement.WordAdditionInput>
                        <SecondElement.WordAdditionInput
                          type="text"
                          placeholder="Translation..."
                          value={translation}
                          onChange={(change) => changeTranslation(change)}
                        ></SecondElement.WordAdditionInput>
                        <SecondElement.WordAdditionInput
                          type="text"
                          placeholder="Definition..."
                          value={definition}
                          onChange={(change) => changeDefinition(change)}
                        ></SecondElement.WordAdditionInput>
                        <SecondElement.WordTypeButtons>
                          {wordTypeChosen === "imenica" ? (
                            <SecondElement.WordTypeButtonChosen>
                              imenica
                            </SecondElement.WordTypeButtonChosen>
                          ) : (
                            <SecondElement.WordTypeButton
                              onClick={() => wordTypeButtonClicked("imenica")}
                            >
                              imenica
                            </SecondElement.WordTypeButton>
                          )}
                          {wordTypeChosen === "pridjev" ? (
                            <SecondElement.WordTypeButtonChosen>
                              pridjev
                            </SecondElement.WordTypeButtonChosen>
                          ) : (
                            <SecondElement.WordTypeButton
                              onClick={() => wordTypeButtonClicked("pridjev")}
                            >
                              pridjev
                            </SecondElement.WordTypeButton>
                          )}
                          {wordTypeChosen === "glagol" ? (
                            <SecondElement.WordTypeButtonChosen>
                              glagol
                            </SecondElement.WordTypeButtonChosen>
                          ) : (
                            <SecondElement.WordTypeButton
                              onClick={() => wordTypeButtonClicked("glagol")}
                            >
                              glagol
                            </SecondElement.WordTypeButton>
                          )}
                          {wordTypeChosen === "prijedlog" ? (
                            <SecondElement.WordTypeButtonChosen>
                              prijedlog
                            </SecondElement.WordTypeButtonChosen>
                          ) : (
                            <SecondElement.WordTypeButton
                              onClick={() => wordTypeButtonClicked("prijedlog")}
                            >
                              prijedlog
                            </SecondElement.WordTypeButton>
                          )}
                        </SecondElement.WordTypeButtons>
                      </Element.EditWordClickedDiv>
                    ) : null}
                  </>
                ) : (
                  <Element.WordSelection>
                    {viewWords.map((word, index) => (
                      <span>{word.word_str}</span>
                    ))}
                  </Element.WordSelection>
                )}
              </>
            )}
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
  all_dictionary_words: state.admin.words,
});

export default connect(mapStateToProps, {
  get_dictionaries,
  select_dictionary,
  select_language,
  select_dictionary_view,
  select_language_view,
  close_view_dictionary,
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
})(MainScreen);
