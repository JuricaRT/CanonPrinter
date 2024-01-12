import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import {
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
} from "../actions/admin";

import {
  get_dictionaries,
  select_dictionary,
  select_language,
  start_learning,
} from "../actions/learningSpecs";

import modes from "../actions/modes";

import {
  TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel,
  Button, Box, InputLabel, MenuItem, Select,
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Stepper, Step, StepLabel
} from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete'

const MainScreen = ({
  isAuthenticated,
  is_superuser,
  dictionaries,
  learnableDictionaries,
  learnableLanguages,
  uniqueLang,
  selected_mode,
  words,

  get_dictionaries,
  select_dictionary,
  select_language,
  start_learning,
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
}) => {
  const navigate = useNavigate();


  /* ------------------------------------- Customize Learning ------------------------------------- */

  // for display control
  const [displayCustomizeLearningForm, setDisplayCustomizeLearningForm] = useState(false);
  const [displayConfirmDeleteDialog, setDisplayConfirmDeleteDialog] = useState(false);

  // form variables
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDictionary, setSelectedDictionary] = useState("");
  const [selectedMode, setSelectedMode] = useState("")

  function resetUICustomizeLearning() {
    setSelectedLanguage("");
    setSelectedDictionary("");
    setSelectedMode("");
  }

  /* ---------------------------------------------------------------------------------------------- */




  /* ------------------------------------- View Dictionary ---------------------------------------- */

  // for display control
  const [displayViewDictionaryForm, setDisplayViewDictionaryForm] = useState(false);
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState(["Select word", "View word"])

  // Select word form variables
  const [selectedDictionaryLanguage, setSelectedDictionaryLanguage] = useState("")
  const [selectedDictionaryName, setSelectedDictionaryName] = useState("")
  const [selectedWord, setSelectedWord] = useState("")

  // Edit word form variables
  const [selectedWordType, setSelectedWordType] = useState("imenica")
  const [selectedWordDefinition, setSelectedWordDefinition] = useState("")
  const [selectedWordTranslation, setSelectedWordTranslation] = useState("")

  // old word_str value required by remove_word_from_dictionary
  const [savedOldWordValue, setSavedOldWordValue] = useState("")

  function resetUIViewDictionary() {
    setActiveStep(0);

    setSelectedDictionaryLanguage("");
    setSelectedDictionaryName("");
    setSelectedWord("")

    setSelectedWordType("imenica")
    setSelectedWordDefinition("")
    setSelectedWordTranslation("")

    setSavedOldWordValue("")
  }

  function saveChanges() {
    var variables = [
      savedOldWordValue,
      selectedWord,
      selectedDictionaryLanguage,
      selectedWordTranslation,
      selectedWordDefinition,
      selectedWordType]

    if (variables.every((variable) => variable !== "")) {
      setDisplayViewDictionaryForm(false);
      resetUIViewDictionary();
      edit_word(...variables)
    }
  }

  /* ---------------------------------------------------------------------------------------------- */


  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) {
      navigate("/");
    }

    get_dictionaries();

    if (selected_mode !== null) {
      navigate("/mode12Screen");
    }

    if (is_superuser) {
      steps[1] = "View or edit word"
    }

  }, [isAuthenticated, navigate, selectedMode, steps]);


  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <Banner origin="MainScreen"></Banner>
        <hr />

        {/* Customize Learning */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={() => {
            setDisplayCustomizeLearningForm(!displayCustomizeLearningForm);
            resetUICustomizeLearning();
          }} sx={{ width: "10%", marginBottom: "1em" }} variant="contained">Customize Learning</Button>

          {displayCustomizeLearningForm && (
            <>
              <Box sx={{ width: "30%", marginBottom: "1em" }}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select>
                    {learnableLanguages.map((elem) => (
                      <MenuItem onClick={() => {
                        setSelectedLanguage(elem)
                        select_language(elem)
                      }} value={elem}>{elem}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>


              <Box sx={{ width: "30%", marginBottom: "1em" }}>
                <FormControl fullWidth>
                  <InputLabel>Dictionary</InputLabel>
                  {selectedLanguage !== "" ? (
                    <Select>
                      {learnableDictionaries[selectedLanguage].map((elem) => (
                        <MenuItem onClick={() => {
                          setSelectedDictionary(elem)
                          select_dictionary(elem)
                        }} value={elem}>{elem}</MenuItem>
                      ))}
                    </Select>
                  ) : (<Select disabled></Select>)
                  }
                </FormControl>
              </Box>


              <Box sx={{ width: "30%", marginBottom: "1em" }}>
                <FormControl fullWidth>
                  <InputLabel>Learning mode</InputLabel>
                  {selectedDictionary !== "" ? (
                    <Select>
                      {Object.values(modes).map((elem) => (
                        <MenuItem onClick={() => {
                          setSelectedMode(elem)
                        }} value={elem}>{elem}</MenuItem>
                      ))}
                    </Select>
                  ) : (<Select disabled></Select>)
                  }
                </FormControl>
              </Box>


              <Button onClick={() => {
                if (selectedLanguage !== "" && selectedDictionary !== "" && selectedMode !== "") {
                  setDisplayCustomizeLearningForm(false);
                  resetUICustomizeLearning();
                  start_learning(selectedMode, selectedDictionary, selectedLanguage);
                }
              }} sx={{ width: "30%", marginBottom: "2em" }} variant="outlined">Start quiz</Button>


            </>
          )}
        </div>


        {/* View Dictionary */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={() => {
            setDisplayViewDictionaryForm(!displayViewDictionaryForm)
            resetUIViewDictionary();
          }} sx={{ width: "10%", marginBottom: "1em" }} variant="contained">View Dictionary</Button>

          {displayViewDictionaryForm && (
            <>
              <div style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: '100%' }}>
                  <Stepper sx={{ marginBottom: "1em" }} activeStep={activeStep}>
                    {steps.map((label, index) => {
                      return (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>)
                    })}
                  </Stepper>


                  {activeStep === 0 && (
                    <>
                      <Box sx={{ marginBottom: "1em" }}>
                        <FormControl fullWidth>
                          <InputLabel>Language</InputLabel>
                          <Select value={selectedDictionaryLanguage}>
                            {uniqueLang.map((elem) => (
                              <MenuItem onClick={() => {
                                setSelectedDictionaryLanguage(elem)
                              }} value={elem}>{elem}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>


                      <Box sx={{ marginBottom: "1em" }}>
                        <FormControl fullWidth>
                          <InputLabel>Dictionary</InputLabel>
                          {selectedDictionaryLanguage !== "" ? (
                            <Select value={selectedDictionaryName}>
                              {dictionaries[selectedDictionaryLanguage].map((elem) => (
                                <MenuItem onClick={() => {
                                  setSelectedDictionaryName(elem)
                                  get_dictionary_words(selectedDictionaryLanguage, elem);
                                }} value={elem}>{elem}</MenuItem>
                              ))}
                            </Select>
                          ) : (<Select disabled></Select>)
                          }
                        </FormControl>
                      </Box>


                      <Box sx={{ marginBottom: "1em" }}>
                        <FormControl fullWidth>
                          <InputLabel>Word</InputLabel>
                          {selectedDictionaryName !== "" ? (
                            <Select value={selectedWord}>
                              {words.map((elem) => (
                                <MenuItem onClick={() => {
                                  setSelectedWord(elem.word_str)
                                  setSelectedWordType(elem.word_type)
                                  setSelectedWordDefinition(elem.definition)
                                  setSelectedWordTranslation(elem.cro_translation)
                                  setSavedOldWordValue(elem.word_str)

                                }} value={elem.word_str}>{elem.word_str}</MenuItem>
                              ))}
                            </Select>
                          ) : (<Select disabled></Select>)
                          }
                        </FormControl>
                      </Box>


                    </>
                  )}


                  {activeStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                      <FormControl disabled={!is_superuser} sx={{ alignSelf: "flex-start", marginBottom: "1em" }}>
                        <FormLabel>Word type</FormLabel>
                        <RadioGroup
                          row
                          defaultValue={selectedWordType}
                          onChange={(change) => setSelectedWordType(change.target.value)}>
                          <FormControlLabel value="imenica" control={<Radio />} label="Imenica" />
                          <FormControlLabel value="pridjev" control={<Radio />} label="Pridjev" />
                          <FormControlLabel value="glagol" control={<Radio />} label="Glagol" />
                          <FormControlLabel value="prijedlog" control={<Radio />} label="Prijedlog" />
                        </RadioGroup>
                      </FormControl>

                      <TextField disabled={!is_superuser} value={selectedWord} type="text" name="word" label="Word..."
                        sx={{ width: "100%", marginBottom: "1em" }}
                        onChange={(change) => setSelectedWord(change.target.value)} />

                      <TextField disabled={!is_superuser} value={selectedWordDefinition} type="text" name="definition" label="Definition..."
                        sx={{ width: "100%", marginBottom: "1em" }} 
                        onChange={(change) => setSelectedWordDefinition(change.target.value)} />

                      <TextField disabled={!is_superuser} value={selectedWordTranslation} type="text" name="translation" label="Translation..."
                        sx={{ width: "100%", marginBottom: "1em" }} 
                        onChange={(change) => setSelectedWordTranslation(change.target.value)} />


                      {is_superuser && (
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                          <Button color="error" startIcon={<DeleteIcon />}
                            onClick={() => {
                              setDisplayConfirmDeleteDialog(true)
                            }}
                            sx={{ width: "100%", height: "50%" }} variant="outlined">Delete</Button>

                          <Button onClick={saveChanges}
                            sx={{ width: "100%", height: "50%" }} variant="outlined">Save changes</Button>
                        </Box>
                      )}


                      <Dialog open={displayConfirmDeleteDialog} onClose={() => setDisplayConfirmDeleteDialog(false)}>
                        <DialogTitle>Confirm delete</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete selected word?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setDisplayConfirmDeleteDialog(false)}>Cancel</Button>
                          <Button onClick={() => {
                            setDisplayConfirmDeleteDialog(false);
                            setDisplayViewDictionaryForm(false);
                            resetUIViewDictionary();
                            remove_word_from_dictionary(selectedDictionaryName, savedOldWordValue, selectedDictionaryLanguage);
                          }} autoFocus>
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>


                    </div>
                  )}


                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}>Back</Button>

                    <Box sx={{ flex: '1 1 auto' }} />

                    {activeStep === 0 &&
                      selectedDictionaryLanguage !== "" &&
                      selectedDictionaryName !== "" &&
                      selectedWord !== "" && (

                        <Button onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
                          Next
                        </Button>
                      )}
                  </Box>

                </Box>
              </div>
            </>)}
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_superuser: state.profile.is_admin,
  dictionaries: state.learningSpecsReducer.dictionaries,
  learnableDictionaries: state.learningSpecsReducer.learnableDictionaries,
  learnableLanguages: state.learningSpecsReducer.learnableLanguages,
  uniqueLang: state.learningSpecsReducer.uniqueLang,
  selected_mode: state.learningSpecsReducer.selectedMode,
  words: state.admin.words,
});

export default connect(mapStateToProps, {
  get_dictionaries,
  select_dictionary,
  select_language,
  start_learning,
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
})(MainScreen);
