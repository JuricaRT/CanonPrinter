import {
        AUTOFILL_SUGGESTIONS_FROM_API,
        CACHE_AUTOFILL_SUGGESTIONS,
        AUTOFILL_SUGGESTIONS_FROM_CACHE,
        UPDATE_AUTOFILL_DESCRIPTION,
        RESET_AUTOFILL
} from './types';

const MIN_PREFIX_LENGTH = 1
const NUMBER_OF_SUGGESTIONS = 50

function autofillSuggestionsApi(word, num) {
        return fetch(`https://api.datamuse.com/sug?s=${word}&max=${num}`)
                .then(response => {
                        if (!response.ok) {
                                return [];
                        }

                        return response.json();
                })
                .then(data => {
                        let ret = [];

                        data.forEach(element => {
                                if (element.word.indexOf(" ") == -1) {
                                        ret.push(element.word);
                                }
                        });

                        return ret;
                })
}

function defForPartOfSpeech(defs, partOfSpeech) {

        if (defs !== undefined && defs.length > 1) {
                for (const def of defs) {
                        if (def.indexOf(partOfSpeech) == 0) {
                                return def.substring(def.indexOf("\t") + 1);
                        }
                }
        } else if (defs !== undefined && defs.length == 1) {
                try {
                        return defs.substring(defs.indexOf("\t") + 1);
                } catch {
                        return ""
                }
        }

        return "";
}

export const updateAutofillSuggestions = (word) => async (dispatch, getState) => {
        if (word.indexOf(" ") > -1) {
                return;
        }

        const prefix = word.slice(0, MIN_PREFIX_LENGTH);

        if (word.length >= MIN_PREFIX_LENGTH) {
                if (prefix !== getState().autofillReducer.cachedPrefix) {
                        dispatch({
                                type: CACHE_AUTOFILL_SUGGESTIONS,
                                suggestionsPayload: await autofillSuggestionsApi(prefix, 1000),
                                prefixPayload: prefix
                        });
                }

                dispatch({
                        type: AUTOFILL_SUGGESTIONS_FROM_CACHE,
                        wordPayload: word,
                        numOfSuggestionsPayload: NUMBER_OF_SUGGESTIONS
                })
        } else {
                dispatch({
                        type: AUTOFILL_SUGGESTIONS_FROM_API,
                        suggestionsPayload: await autofillSuggestionsApi(word, NUMBER_OF_SUGGESTIONS)
                });
        }
};


function getDescription(word) {
        return fetch(`https://api.datamuse.com/words?sp=${word}&md=d&max=1`)
                .then(response => {
                        if (!response.ok) {
                                return;
                        }

                        return response.json();
                })
                .then(data => {
                        if (data.length > 0) {
                                return data[0].defs;
                        }
                        return ""
                })
}

export const updateAutofillDescription = (word, wordType) => async (dispatch) => {

        if (word === null || word.indexOf(" ") != -1) {
                return;
        }

        if (wordType !== "imenica" && wordType !== "glagol" && wordType !== "pridjev" && wordType !== "prijedlog") {
                return;
        }

        let partOfSpeech;

        if (wordType === "imenica") {
                partOfSpeech = "n";
        } else if (wordType === "glagol") {
                partOfSpeech = "v";
        } else if (wordType === "pridjev") {
                partOfSpeech = "adj";
        } else if (wordType === "prijedlog") {
                partOfSpeech = "adv";
        }

        let data = await getDescription(word)

        dispatch({
                type: UPDATE_AUTOFILL_DESCRIPTION,
                payload: defForPartOfSpeech(data, partOfSpeech)
        })
}

export const resetAutofill = () => async (dispatch) => {
        dispatch({ type: RESET_AUTOFILL });
};