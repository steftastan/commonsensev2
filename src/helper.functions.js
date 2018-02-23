import React from 'react';
import $ from 'jquery';
import './global.languages.js';
import './global.variables.js';
 /*TODO lang*/

/**
 * HELPER FUNCTION LIBRARY.
 * A library of globally-available functions that each perform very specific tasks.
 * Please thoroughly document every function that is added here, and keep
 * this use strictly for global helper functions only.
 *
 * What can be considered a global helper, ask yourself the following questions.
 *
 * 1) Does my code need to be used in two or more components of my application?
 * 2) Did I have to copy and paste a block of code onto another component?
 *
 * If your answer to those 2 questions is yes, then put your code here, and bind it
 * to your components as a function, now it'll be available everywhere!
 *
 */

/**
 * Function that saves session details
 * @param language [String] the selected language
 * @param filename [String] the selected company
 * @param user [String] the corresponding username
 */
export function SaveSessionDetails(language, filename, user) {
	/**
	 * TODO: Check to see if this plugin would be helpful for this operation
	 * https://ciphertrick.com/demo/jquerysession/
	 */
	language = language ? language : '';
	filename = filename ? filename : '';
	user = user ? user : '';

	$.ajax({
		url: global.endpoints.session.dev,
		method: 'PUT',
		cache: false,
		data: {language: language, filename: filename, user: user},
		success: function(data, status) {
			console.log(data);
			window.location.reload();
		},
		error: function(xhr, status, err) {
			console.error(xhr, err.toString());
		}
   });
}

export function HandleWebFacingLink(link) {
	 window.open(global.paths.devServletLink + link + "&turnCacheOff=" + (new Date()).getTime(), "appa", "scrollbars=yes,status=1,resizable=yes,menubar=0,screenX=0,screenY=0,left=0,top=0,width=" + (window.availWidth-10) + ",height=" + (window.availHeight-50));
};

export function HandlePopupLink(link, windowName, width, height) {
	windowName = windowName ? windowName : '';
	width = width ? width : 1024;
	height = height ? height : 768;
	 window.open(global.paths.devServletLink + link, windowName, "height=" + height + ",width=" + width + ",resizeable=yes,menubar=0,toolbar=0,location=0,directories=0,scrollbars=1,status=0");
};

export function HandleRegularLink(link) {
	window.location.href = global.paths.dev+link;
};

export function GetLanguage() {
    var defaultLanguage = 'en_CA';
    return defaultLanguage;
}


 /**
   * Allows to build an AJAX call object depending on the parameters passed.
   * @param widget [Object] The widget's config as it appears in the options constant.
   */
 export function RequestWidget(widget) {
     var arr = [];
	 //var request = $.getJSON(widget.endpoint);
	 var d = $.Deferred();
     var request = {
         	request: $.ajax({
            url: widget.endpoint,
            dataType: 'json',
            cache: false,
            success: function(data, status) {
                 /**
                  * Successful operation, but we don't do anything here
                  * rather, we pass an array of ajax calls to our async function.
                  * where we can manipulate the data after they have all executed.
                  */
				  d.resolve(data);
            },
            error: function(xhr, status, err) {
                console.error(xhr, err.toString());
				d.resolve();
            },
        }),
        widget: widget || {}
    };
    return d;
 }

 /** https://css-tricks.com/multiple-simultaneous-ajax-requests-one-callback-jquery/
   * Although the guide referenced above says these AJAX queries will
   * run in parallel, they actually run in waterfall format, so if the first one fails,
   * the rest will NOT be excecuted.
   *
   * We structured our code like this because we have to avoid at all costs calling the
   * setState() function too many times in the application, because doing so will trigger
   * a re-render of the page.
   *
   * We fetch all our data from our Endpoint. We return a callback function to allow
   * each page to render their corresponding components.
   *
   */
export function Async(that, requestsArray, cb) {
    var widgets = [];
    var data = {};
	//console.log(requestsArray);
    $.when(requestsArray).then(function() {
        for (var i = 0; i < requestsArray.length; i++) {

			console.log(requestsArray[i].request);

			if (requestsArray[i].request.status == 200 && requestsArray[i].request.readyState === 4) {
				if (requestsArray[i].request.responseJSON.results instanceof Array) {
					widgets.push({widget: requestsArray[i].widget, arr: requestsArray[i].request.responseJSON.results});
				} else {
					widgets.push({widget: requestsArray[i].widget, arr: Object.values(requestsArray[i].request.responseJSON.results)});
				}
			}

        }
        data = {that: that, widgets: widgets};
        return data;
    }).done(function(data) {
        cb(data);
    });
}

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
     var defaultLang = GetLanguage();

     if (dictionary_entry && dictionary_entry.length) {

         dictionary_entry = Camelize(dictionary_entry.trim());

         phrase = global.languages[dictionary_entry];

         if (phrase) {
             if (defaultLang === 'en_CA') {
                 translation = phrase[0];
             } else if (defaultLang === 'fr_CA') {
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
  * It also changes any ampersands to the literal word 'and'
  * Removes parentheses, hyphens, slashes and dots. If any more characters
  * need to be removed, add them inside the [brackets] in the second regular expression.
	* @param firstLetterUpper {boolean} Flag that specifies if the first letter should be kept uppercase or not.
	* If not specified, always lowercase the letter.
  */
 export function Camelize(str, firstLetterUpper) {
	if (str.indexOf(' ') !== -1) str = str.toLowerCase();
    return str.replace(/&/g, "and")
		.replace(/[()-/.]/g, "")
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			if (index === 0 && !firstLetterUpper) {
				return letter.toLowerCase();
			} else {
				return letter.toUpperCase();
			}
		}).replace(/\s+/g, '');
 }

 /**
  * Replaces spaces and special characters to hyphens
	* Use this to build URLs when necessary
  */

 export function Hyphenize(myStr) {
    myStr = myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
    if(myStr.charAt(0) === '-') {
        myStr = myStr.replace('-','/');
    }
    return myStr;
 }

/**
 * This function checks the device the site is currently being viewed on.
 * Received no parameters, returns a boolean value.
 *
 * true - the website is being viewed from a mobile device.
 * false - the website is being viewed from either desktop or iPad.
 */
export function WhichDevice() {
    var device = '';
    var ua = navigator.userAgent;

    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
        if (window.matchMedia("only screen and (min-device-width : 768px) and (max-device-width : 1024px)").matches) {
            device = 'tablet';
        } else {
            device = 'mobile';
        }
    } else {
        device = 'desktop';
    }

    return device;
}


/**
 * Sets the default company in the global variable per result received from Web Service.
 */
export function SetCompany(company) {
    global.company = company;
}


/**
 * Sets the default company in the global variable per result received from Web Service.
 */
export function GetCompany() {
    return global.company;
}


/**
 * Transform an RGB code to RGBA and apply the specified opacity
 * @param color [String] the color to be converted.
 * @param opacity [Number] The desired opacity to be aplied, must be a decimal from 0 to 1.
 */
export function ConvertRgbToRgba(color, opacity) {
    color = color.replace("rgb", "rgba").replace(')', ', '+opacity+')');
    return color;
}
