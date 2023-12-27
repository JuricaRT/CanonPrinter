import {
        AUTOFILL_SUGGESTIONS_FROM_API,
        CACHE_AUTOFILL_SUGGESTIONS,
        AUTOFILL_SUGGESTIONS_FROM_CACHE
} from '../actions/types';

function autofillApi(word, num) {
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

export const updateAutofillSuggestions = (word) => async (dispatch, getState) => {
        if (word.indexOf(" ") > -1) {
                return;
        }

        const prefix = word.slice(0, 3);

        if (word.length >= 3) {
                if (prefix !== getState().autofillReducer.cachedPrefix) {
                        dispatch({
                                type: CACHE_AUTOFILL_SUGGESTIONS,
                                suggestionsPayload: await autofillApi(prefix, 1000),
                                prefixPayload: prefix
                        });
                }

                dispatch({
                        type: AUTOFILL_SUGGESTIONS_FROM_CACHE,
                        wordPayload: word
                })
        } else {
                dispatch({
                        type: AUTOFILL_SUGGESTIONS_FROM_API,
                        suggestionsPayload: await autofillApi(word, 7)
                });
        }
};
