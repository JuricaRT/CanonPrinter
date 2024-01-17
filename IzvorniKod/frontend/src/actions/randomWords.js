import {
        UPDATE_RANDOM_WORDS,
} from './types';

const MAX_RANDOM_WORDS_PER_TYPE = 20;

function randomChar() {
        return String.fromCharCode(Math.round(Math.random() * 26) + 97)
}

function defForPartOfSpeech(defs, partOfSpeech) {
        for (const def of defs) {
                if (def.indexOf(partOfSpeech) == 0) {
                        return def.substring(def.indexOf("\t") + 1);
                }
        }
}

export const updateRandomWords = () => async (dispatch) => {
        return fetch(`https://api.datamuse.com/words?sp=???*&lc=${randomChar()}&rc=${randomChar()}&md=pd&max=1000`)
                .then(response => {
                        if (!response.ok) {
                                return;
                        }
                        
                        return response.json();
                })
                .then(data => {
                        let nouns = [];
                        let verbs = [];
                        let adjectives = [];
                        let adverbs = [];

                        for (const word of data) {
                                if (!word.tags || !word.defs) {
                                        continue;
                                }

                                for (const partOfSpeech of word.tags) {
                                        let wordCat;
                                        let newWord = {
                                                language: "english",
                                                word_str: word.word,
                                                cro_translation: "",
                                                definition: "",
                                                word_type: "",
                                                audio_bytes: null
                                        };

                                        if (partOfSpeech === "n") {
                                                newWord.word_type = "noun";
                                                wordCat = nouns;
                                        } else if (partOfSpeech === "v") {
                                                newWord.word_type = "verb";
                                                wordCat = verbs;
                                        } else if (partOfSpeech === "adj") {
                                                newWord.word_type = "adjective";
                                                wordCat = adjectives;
                                        } else if (partOfSpeech === "adv") {
                                                newWord.word_type = "adverb";
                                                wordCat = adverbs;
                                        } else {
                                                continue;
                                        }
                                        
                                        let def = defForPartOfSpeech(word.defs, partOfSpeech);
                                        
                                        if (!def) {
                                                continue;
                                        }

                                        newWord.definition = def;

                                        if (wordCat.length < MAX_RANDOM_WORDS_PER_TYPE) {
                                                wordCat.push(newWord);
                                        }
                                }
                        }

                        dispatch({
                                type: UPDATE_RANDOM_WORDS,
                                payload: [...nouns, ...verbs, ...adjectives, ...adverbs]
                        });
                })
};
