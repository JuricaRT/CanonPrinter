import {
        AUTOFILL_SUGGESTIONS_FROM_API,
        CACHE_AUTOFILL_SUGGESTIONS,
        AUTOFILL_SUGGESTIONS_FROM_CACHE,
        UPDATE_AUTOFILL_DESCRIPTION
} from './types';

const MIN_PREFIX_LENGTH = 3
const NUMBER_OF_SUGGESTIONS = 7

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
        for (const def of defs) {
                if (def.indexOf(partOfSpeech) == 0) {
                        return def.substring(def.indexOf("\t") + 1);
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

export const updateAutofillDescription = (word, wordType) => (dispatch) => {
        if (word.indexOf(" ") != -1) {
                return;
        }
        
        if (wordType !== "noun" && wordType !== "verb" && wordType !== "adjective" && wordType !== "adverb") {
                return;
        }

        let partOfSpeech;

        if (wordType === "noun") {
                partOfSpeech = "n";
        } else if (wordType === "verb") {
                partOfSpeech = "v";
        } else if (wordType === "adjective") {
                partOfSpeech = "adj";
        } else if (wordType === "adverb") {
                partOfSpeech = "adv";
        }
        
        fetch(`https://api.datamuse.com/words?sp=${word}&md=d&max=1`)
                .then(response => {
                        if (!response.ok) {
                                return;
                        }
                        
                        return response.json();
                })
                .then(data => {
                        dispatch({
                                type : UPDATE_AUTOFILL_DESCRIPTION,
                                payload : defForPartOfSpeech(data[0].defs, partOfSpeech)
                        })
                })
}
