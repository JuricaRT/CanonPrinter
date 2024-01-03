import {
    AUTOFILL_SUGGESTIONS_FROM_API,
    CACHE_AUTOFILL_SUGGESTIONS,
    AUTOFILL_SUGGESTIONS_FROM_CACHE,
    UPDATE_AUTOFILL_DESCRIPTION
} from '../actions/types';


const initialState = {
    cachedPrefix: "", // The prefix for which "cachedCall" is valid
    cachedCall: [], // Cached autofill suggestions for the word "cachedPrefix"
    autofillSuggestions: [], // Current autofill suggestions
    autofillDescription: "" // Current word description suggestion 
};

export default function autofillReducer(state = initialState, action) {
    switch (action.type) {
        case AUTOFILL_SUGGESTIONS_FROM_API:
            return {
                ...state,
                autofillSuggestions: action.suggestionsPayload
            };
        case CACHE_AUTOFILL_SUGGESTIONS:
            return {
                ...state,
                cachedPrefix: action.prefixPayload,
                cachedCall: action.suggestionsPayload,
                autofillSuggestions: []
            };
        case AUTOFILL_SUGGESTIONS_FROM_CACHE:
            const word = action.wordPayload;

            return {
                ...state,
                autofillSuggestions: state.cachedCall
                                        .filter((suggestion) => {
                                                return suggestion.slice(0, word.length) === word;
                                        })
                                        .slice(0, action.numOfSuggestionsPayload)
            };
        case UPDATE_AUTOFILL_DESCRIPTION:
            return {
                ...state,
                autofillDescription: action.payload
            }
        default:
            return state;
    }
};
