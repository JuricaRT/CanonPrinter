import React, { useState, useEffect, useRef } from "react";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import { create_dictionary, add_word_to_dictionary } from "../actions/admin";
import { get_dictionaries } from "../actions/learningSpecs";
import { updateAutofillSuggestions, updateAutofillDescription, resetAutofill } from "../actions/autofill";
import {
  Autocomplete, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel,
  Button, Box, InputLabel, MenuItem, Select
} from "@mui/material"

const ModifyDictionaries = ({
  isAuthenticated,
  dictionaries,
  uniqueLang,
  autofillSuggestions,
  autofillDescription,

  create_dictionary,
  add_word_to_dictionary,
  get_dictionaries,
  updateAutofillSuggestions,
  updateAutofillDescription,
  resetAutofill
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) {
      navigate("/");
    }
    get_dictionaries();
  }, [isAuthenticated, navigate, get_dictionaries]);


  /* ------------------------------------------------------------------------------------ */

  // for Add Dictionary
  const [dictionaryName, setDictionaryName] = useState("");
  const [language, setLanguage] = useState("");


  // for display control
  const [displayAddDictionaries, setDisplayAddDictionaries] = useState(false);
  const [displayAddWordForm, setDisplayAddWordForm] = useState(false);


  // for Add Word
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordType, setWordType] = useState("imenica");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDictionary, setSelectedDictionary] = useState("");

  /* ------------------------------------------------------------------------------------ */


  function resetUIAddDictionary() {
    setDictionaryName("")
    setLanguage("")
  }

  function resetUIAddWord() {
    resetAutofill()

    setWord("")
    setTranslation("")
    setDefinition("")
    setWordType("imenica")
    setSelectedLanguage("")
    setSelectedDictionary("")
  }

  function submitWord() {
    var variables = [
      selectedDictionary,
      word,
      selectedLanguage,
      translation,
      wordType,
      definition,
    ];
    if (variables.every((variable) => variable !== "")) {
      setDisplayAddWordForm(false);
      resetUIAddWord()
      add_word_to_dictionary(
        selectedDictionary,
        word,
        selectedLanguage,
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
        

        {/* Add Dictionary */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={() => {
            setDisplayAddDictionaries(!displayAddDictionaries)
            resetUIAddDictionary()
          }} sx={{ width: "10%", marginBottom: "1em" }} variant="contained">Add dictionary</Button>


          {displayAddDictionaries && (
            <>
              <TextField type="text" name="dictionaryName" label="Dictionary name..." sx={{ width: "30%", marginBottom: "1em" }}
                onChange={(change) => setDictionaryName(change.target.value)} />

              <TextField type="text" name="dictionaryLanguage" label="Language..." sx={{ width: "30%", marginBottom: "1em" }}
                onChange={(change) => setLanguage(change.target.value)} />

              <Button onClick={() => {
                if (dictionaryName !== "" && language !== "") {
                  setDisplayAddDictionaries(false);
                  resetUIAddDictionary()
                  create_dictionary(dictionaryName, language)
                  // TODO: nac manje seosko rjesnje
                  setTimeout(() => {
                    get_dictionaries();
                  }, 250);
                }
              }} sx={{ width: "30%", marginBottom: "2em" }} variant="outlined">Create dictionary</Button>
            </>
          )}
        </div>


        {/* Add Word */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={() => {
            setDisplayAddWordForm(!displayAddWordForm);
            resetUIAddWord()
          }} sx={{ width: "10%", marginBottom: "1em" }} variant="contained">Add word</Button>


          {displayAddWordForm && (
            <>
              <FormControl sx={{ width: "30%" }}>
                <FormLabel>Word type</FormLabel>
                <RadioGroup
                  row
                  defaultValue={wordType}
                  onChange={(change) => setWordType(change.target.value)}>
                  <FormControlLabel value="imenica" control={<Radio />} label="Imenica" />
                  <FormControlLabel value="pridjev" control={<Radio />} label="Pridjev" />
                  <FormControlLabel value="glagol" control={<Radio />} label="Glagol" />
                  <FormControlLabel value="prijedlog" control={<Radio />} label="Prijedlog" />
                </RadioGroup>
              </FormControl>

              <Box sx={{ width: "30%", marginBottom: "1em" }}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select>
                    {uniqueLang.map((elem) => (
                      <MenuItem onClick={() => setSelectedLanguage(elem)} value={elem}>{elem}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ width: "30%", marginBottom: "1em" }}>
                <FormControl fullWidth>
                  <InputLabel>Dictionary</InputLabel>
                  {selectedLanguage !== "" ? get_dictionaries() && (
                      <Select>
                        {dictionaries[selectedLanguage].map((elem) => (
                          <MenuItem onClick={() => setSelectedDictionary(elem)} value={elem}>{elem}</MenuItem>
                        ))}
                      </Select>
                    ) : (<Select disabled></Select>)
                  }
                </FormControl>
              </Box>

              <Autocomplete
                onChange={(change, newValue) => {
                  setDefinition("")
                  updateAutofillDescription(newValue, wordType)
                  setWord(newValue)
                }}
                options={autofillSuggestions}
                sx={{ width: "30%", marginBottom: "1em" }}
                renderInput={(params) =>
                  <TextField {...params} label="Word..." onChange={(change) => {
                    updateAutofillSuggestions(change.target.value)
                    setWord(change.target.value);
                  }}/>}
              />

              <TextField value={definition} type="text" name="definition" label="Definition..." sx={{ width: "30%", marginBottom: "1em" }}
                onClick={() =>  setDefinition(autofillDescription)} onChange={(change) => setDefinition(change.target.value)} />
              
              <TextField type="text" name="translation" label="Translation..." sx={{ width: "30%", marginBottom: "1em" }} 
                onChange={(change) => setTranslation(change.target.value)} />


              <Button onClick={submitWord} sx={{ width: "30%", marginBottom: "2em" }} variant="outlined">Add word</Button>
            </>
          )}
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  dictionaries: state.learningSpecsReducer.dictionaries,
  uniqueLang: state.learningSpecsReducer.uniqueLang,
  autofillSuggestions: state.autofillReducer.autofillSuggestions,
  autofillDescription: state.autofillReducer.autofillDescription
});

export default connect(mapStateToProps, {
  create_dictionary,
  add_word_to_dictionary,
  get_dictionaries,
  updateAutofillSuggestions,
  updateAutofillDescription,
  resetAutofill
})(ModifyDictionaries);
