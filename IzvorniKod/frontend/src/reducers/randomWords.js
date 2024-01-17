import {
        UPDATE_RANDOM_WORDS
} from '../actions/types';


const initialState = {
        randomWords: []
};

export default function randomWordsReducer(state = initialState, action) {
        switch (action.type) {
                case UPDATE_RANDOM_WORDS:
                        return {
                                ...state,
                                randomWords: action.payload
                        };
                default:
                        return state;
        }
};
    