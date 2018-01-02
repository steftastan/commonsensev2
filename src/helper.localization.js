import './global.languages.js';
import './global.variables.js';

var defaultLang = global.defaultLang;

export function Localization(phrase) {

    var translation;
    var dictionary;

    ///TODO make everything camelcase and changeampersands to and
    if (phrase && phrase.length) {

        phrase = phrase.trim();
        dictionary = global.languages[phrase];

        console.log(dictionary);
        if (dictionary) {
            if (defaultLang === 'en') {
                translation = dictionary[0];
            } else if (defaultLang === 'fr') {
                translation = dictionary[1];
            }
        } else {
            translation = 'No translation available';
        }
    }

    return translation;
}
