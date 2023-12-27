/* Kako koristiti

import { autofill } from "./autofill.js"; // Relativni put do ove datoteke

// Ekvivalentna dva poziva
autofill("aut").then((suggestions) => { console.log(suggestions) });
console.log(await autofill("aut")); // Mora biti unutar async funkcije

*/

const PREFIX_LEN_FOR_CACHE = 3; // Cutoff point for which prefix length will following API calls be cached
const NUM_SUGGESTIONS_RETURNED = 7;

var cached_prefix = ""; // The prefix for which "cached_call" is valid
var cached_call = []; // Cached autofill suggestions for the word "cached_prefix"

// Function returns an array up to "num" autofill suggestions gotten from an API call for the word "word"
function autofill_api(word, num) {
        // Calling the API
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
                                // Filtering and extracting single worded results
                                if (element.word.indexOf(" ") == -1) {
                                        ret.push(element.word);
                                }
                        });

                        return ret;
                })
}

// Function returns an array up to "NUM_SUGGESTIONS_RETURNED" autofill suggestions gotten from a previously cached API call
function autofill_cache(word) {
        return cached_call
                .filter((suggestion) => {
                        // Checking if "word" is a prefix of the cached entry "suggestion"
                        return suggestion.slice(0, word.length) === word;
                })
                .slice(0, NUM_SUGGESTIONS_RETURNED);
}

// Function returns up to "NUM_SUGGESTIONS_RETURNED" autofill suggestions for the word given by "word"
export async function autofill(word) {
        // "word" should be a single word
        if (word.indexOf(" ") > -1) {
                return [];
        }

        let prefix = word.slice(0, PREFIX_LEN_FOR_CACHE);

        // Checking from where to get the autofill suggestions
        if (word.length >= PREFIX_LEN_FOR_CACHE) {
                // Checking if a previous API call was cahced with the same prefix
                if (prefix !== cached_prefix) {
                        // Cache a large API call
                        return autofill_api(prefix, 1000).then((suggestions) => {
                                cached_call = suggestions;
                                cached_prefix = prefix;

                                return autofill_cache(word);
                        });
                }
                
                // Get autofill from cache
                return autofill_cache(word);
        } else {
                // Get autofill from a small API call
                return autofill_api(word, NUM_SUGGESTIONS_RETURNED);
        }
}
