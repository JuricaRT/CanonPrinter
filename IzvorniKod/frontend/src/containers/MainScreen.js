import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../elements/global";
import { connect } from "react-redux";
import Banner from "./Banner";
import {
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
  remove_word_from_reducer_state,
  update_word_in_reducer_state
} from "../actions/admin";

import {
  get_dictionaries,
  select_dictionary,
  select_language,
  start_learning,
} from "../actions/learningSpecs";

import modes from "../actions/modes";

import {
  Autocomplete,
  TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel,
  Button, Box, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Stepper, Step, StepLabel, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
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
  wordsStats,

  get_dictionaries,
  select_dictionary,
  select_language,
  start_learning,
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
  remove_word_from_reducer_state,
  update_word_in_reducer_state
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
  const [steps, setSteps] = useState(["Select dictionary", "View words", "View word"])

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
      edit_word(...variables)
      update_word_in_reducer_state(savedOldWordValue, selectedWord, selectedWordTranslation,
        selectedWordDefinition, selectedWordType)
      setSavedOldWordValue(selectedWord)
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
      steps[2] = "View or edit word"
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
                <Alert severity="info">
                  In order to be able to select dictionary for learning, it has to have at least 4 words of each type.
                  Check View Dictionary for more details.
                </Alert>
              </Box>


              <Autocomplete
                sx={{ width: "30%", marginBottom: "1em" }}
                onChange={(change, language) => {
                  setSelectedLanguage(language)
                  select_language(language)
                }}
                options={learnableLanguages}
                renderInput={(params) =>
                  <TextField {...params} sx={{ input: { cursor: 'pointer' } }} label="Language" />}
              />


              <Autocomplete
                disabled={selectedLanguage === ""}
                sx={{ width: "30%", marginBottom: "1em" }}
                onChange={(change, dictionary) => {
                  setSelectedDictionary(dictionary)
                  select_dictionary(dictionary)
                }}
                options={learnableDictionaries[selectedLanguage] ? learnableDictionaries[selectedLanguage] : []}
                renderInput={(params) =>
                  <TextField {...params} sx={{ input: { cursor: 'pointer' } }} label="Dictionary" />}
              />


              <Autocomplete
                disabled={selectedDictionary === ""}
                sx={{ width: "30%", marginBottom: "1em" }}
                onChange={(change, mode) => {
                  setSelectedMode(mode)
                }}
                options={Object.values(modes)}
                renderInput={(params) =>
                  <TextField {...params} sx={{ input: { cursor: 'pointer' } }} label="Mode" />}
              />


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
                      <Autocomplete
                        value={selectedDictionaryLanguage}
                        sx={{ marginBottom: "1em" }}
                        onChange={(change, language) => {
                          setSelectedDictionaryLanguage(language)
                        }}
                        options={uniqueLang}
                        renderInput={(params) =>
                          <TextField {...params} sx={{ input: { cursor: 'pointer' } }} label="Language" />}
                      />

                      
                      <Autocomplete
                        value={selectedDictionaryName}
                        disabled={selectedDictionaryLanguage === ""}
                        sx={{ marginBottom: "1em" }}
                        onChange={(change, dictionary) => {
                          setSelectedDictionaryName(dictionary)
                          get_dictionary_words(selectedDictionaryLanguage, dictionary);
                        }}
                        options={dictionaries[selectedDictionaryLanguage] ? dictionaries[selectedDictionaryLanguage] : []}
                        renderInput={(params) =>
                          <TextField {...params} sx={{ input: { cursor: 'pointer' } }} label="Dictionary" />}
                      />


                    </>)}

                  {activeStep === 1 && (
                    <>
                      <TableContainer sx={{ marginBottom: "2em" }}>
                        <Table sx={{ maxWidth: "100%" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Word type</TableCell>
                              <TableCell align="center">Imenica</TableCell>
                              <TableCell align="center">Pridjev</TableCell>
                              <TableCell align="center">Glagol</TableCell>
                              <TableCell align="center">Prilog</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">Count</TableCell>
                              <TableCell align="center">{wordsStats.nounCount}</TableCell>
                              <TableCell align="center">{wordsStats.adjectiveCount}</TableCell>
                              <TableCell align="center">{wordsStats.verbCount}</TableCell>
                              <TableCell align="center">{wordsStats.adverbCount}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>


                      <Autocomplete
                        defaultValue=""
                        value={selectedWord}
                        disabled={selectedDictionaryName === ""}
                        sx={{ marginBottom: "1em" }}
                        onChange={(change, word_str) => {
                          const word_params = words.filter((w) => w.word_str === word_str)[0]
                          if (word_params !== undefined) {
                            setSelectedWord(word_str)
                            setSelectedWordType(word_params.word_type)
                            setSelectedWordDefinition(word_params.definition)
                            setSelectedWordTranslation(word_params.cro_translation)
                            setSavedOldWordValue(word_str)
                          } else {
                            setSelectedWord("")
                          }
                        }}
                        options={words ? words.map((word) => word.word_str) : []}
                        renderInput={(params) =>
                          <TextField {...params} sx={{ input: { cursor: 'pointer' } }} label="Word"/>}
                      />
                      

                    </>
                  )}


                  {activeStep === 2 && (
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
                          <FormControlLabel value="prilog" control={<Radio />} label="Prilog" />
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
                            remove_word_from_reducer_state(savedOldWordValue)
                            remove_word_from_dictionary(selectedDictionaryName, savedOldWordValue, selectedDictionaryLanguage);
                            setSelectedWord("")
                            setActiveStep((prevActiveStep) => prevActiveStep -1)
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
                      selectedDictionaryName !== "" && (
                        <Button onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
                          Next
                        </Button>
                      )}

                    {activeStep === 1 && selectedWord !== "" && (
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
  wordsStats: state.admin.wordsStats
});

export default connect(mapStateToProps, {
  get_dictionaries,
  select_dictionary,
  select_language,
  start_learning,
  get_dictionary_words,
  remove_word_from_dictionary,
  edit_word,
  remove_word_from_reducer_state,
  update_word_in_reducer_state
})(MainScreen);
