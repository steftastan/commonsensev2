import './global.languages.js';
import './global.variables.js';

var defaultLang = global.defaultLang;

/**
 * Localization function, takes in key and returns its matching test in the current active language.
 * @param dictionary_entry [String], a string of code that represents the key in our translation object.
 * The formar per dictionary entry is as follows:
 *
 * "dashboard" : ["Dashboard", "Tableau de Bord"],
 *
 * Where the key is the camelCase-format value represented by dictionary_entry.
 * key[0] must always be the english version.
 * key[1] must always be the french version.
 *
 * This format also makes it easier add new languages by creating one more element in the array
 * and adding the the logic in the Localization() function accordingly.
 *
 * USAGE:
 * To translate any given string on the page, follow these steps:
 * 1) Ensure an entry exists in the dictionary, following the format described above.
 * 2) Create a variable where you'll be storing the value returned by the Localization()
 * function. This variable *MUST* have the suffix __text (two underscores), this is so we
 * can easily find what is getting translated.
 * 3) Print the variable__text as you normally would.
 *
 */
export function Localization(dictionary_entry) {
    var translation;
    var phrase;

    if (dictionary_entry && dictionary_entry.length) {

        dictionary_entry = Camelize(dictionary_entry.trim());
        phrase = global.languages[dictionary_entry];

        if (phrase) {
            if (defaultLang === 'en') {
                translation = phrase[0];
            } else if (defaultLang === 'fr') {
                translation = phrase[1];
            }
        } else {
            translation = '';
        }

    }
    return translation;
}

/**
 * Converts any given string to camelCase, in order to match tke
 * key values in the languages dictionary.
 */
export function Camelize(str) {
    if (str.indexOf(' ') !== -1) str = str.toLowerCase();
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}
