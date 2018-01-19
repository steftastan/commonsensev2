import React, { Component } from 'react';
import './../../global.variables.js';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Localization, WhichDevice, GetLanguage } from './../../helper.functions.js';

/**
 * BREADCRUMBS LAYOUT COMPONENT
 *
 * The breadcrumbs are the horizontal navigation bar that contain the breadcrumb breadcrumb trail
 * of links, as well as the Language Switch, and can also allow room for the links
 * toolbox that comes with most inner pages.
 *
 */
export class BreadCrumbs extends Component {

    constructor(props) {
      super(props);
      this.Localization = Localization;
      this.WhichDevice = WhichDevice;
      this.GetLanguage = GetLanguage;
      this.toggleNav = this.toggleNav.bind(this);
      this.toggleLayout = this.toggleLayout.bind(this);
      this.clickAnywhereToClose = this.clickAnywhereToClose.bind(this);
      this.stopPropagation = this.stopPropagation.bind(this);
      this.openLang = this.openLang.bind(this);
      this.toggleLang = this.toggleLang.bind(this);
      this.buildCrumbs = this.buildCrumbs.bind(this);
      this.saveSessionLang = this.saveSessionLang.bind(this);
      this.state = {
          open: true,
          selectedLang: this.GetLanguage()
      };
      this.defaultLang = this.GetLanguage;
      this.openClassName = '';
      this.navButtonId = 'navButton';
      this.navButton = {};
      this.navId = 'nav';
      this.nav = {};
      this.toggleClass = 'leftnav--toggle';
      this.langWrapper = {};
      this.langWrapperId = 'langWrapper';
      this.langWrapperOpenClass = 'rightnav__langSelect--open';
      this.langListClass = 'rightnav__lang';
      this.activeClass = 'rightnav__lang--active';
      this.openClass = 'rightnav__lang--open';
      this.selectedClass = 'rightnav__lang--selected';
      this.toolBox;
      this.trail = '';
      this.elemsToToggle = {
          header: 'header',
          breadcrumbs: 'breadcrumbs',
          contentWrapper: 'contentWrapper'
      };
    }

    componentWillMount() {
        this.buildCrumbs();
    }

    componentDidUpdate(prevProps, prevState) {
        this.langWrapper.addEventListener('mouseenter', this.openLang, false);
        this.langWrapper.addEventListener('mouseleave', this.openLang, false);
        this.langWrapper.addEventListener('mousedown', this.openLang, false);
    }

    componentDidMount() {
        var selectedLang;

        this.nav =  document.getElementById(this.navId);
        this.navButton =  document.getElementById(this.navButtonId);
        this.langWrapper = document.getElementById(this.langWrapperId);

        if (this.state.open) {
            this.toggleNav();
        }

        if (this.WhichDevice() === 'mobile') {
            $("#"+this.langWrapperId).appendTo("#langWrapper--mobile")
        }

        /* Add event listeners to the navigation elements */
        if (this.nav && this.navButton) {
            document.addEventListener('mousedown', this.clickAnywhereToClose, false);
            this.nav.addEventListener('mousedown', this.stopPropagation, false);
            this.navButton.addEventListener('mousedown', this.toggleNav, false);
        }

        /* Grab the default language from the global variable and set it.  */
        if (this.langWrapper) {
            selectedLang = document.getElementById(this.GetLanguage());
            this.toggleLang(selectedLang, true, true);
        }
    }

    openLang(event) {
        var languages = document.getElementsByClassName(this.langListClass);
        var clickedLang;
        var i;

        if (event.type === 'mouseenter') {
            for (i = 0; i < languages.length; i++) {
                this.langWrapper.classList.add(this.langWrapperOpenClass);
                this.toggleLang(languages[i], true);
            }
        } else if (event.type === 'mouseleave') {
            for (i = 0; i < languages.length; i++) {
                this.langWrapper.classList.remove(this.langWrapperOpenClass);
                this.toggleLang(languages[i], false);
            }
        } else if (event.type === 'mousedown') {
            this.langWrapper.classList.remove(this.langWrapperOpenClass);
            for (i = 0; i < languages.length; i++) {

                if (languages[i].id === event.target.id) {
                    this.setState({
                        selectedLang: languages[i].id
                    });

                    /* Language is saved to session here */
                    this.saveSessionLang(this.state.selectedLang);

                    clickedLang = document.getElementById(languages[i].id);
                    if (!clickedLang.classList.contains(this.selectedClass)) {
                        clickedLang.classList.add(this.selectedClass, this.activeClass, this.openClass);
                        this.toggleLang(languages[i], false);
                    } else {
                        this.toggleLang(languages[i], true);
                    }

                } else {
                    // modify non-clicked languages
                    languages[i].classList.remove(this.selectedClass);
                    this.toggleLang(languages[i], false);
                }
            }
        }
    }

    saveSessionLang(selected) {
        /**
         * TODO: Check to see if this plugin would be helpful for this operation
         * https://ciphertrick.com/demo/jquerysession/
         */


        $.ajax({
            url: global.endpoints.language.dev,
            method: 'PUT',
            cache: false,
            headers: {"X-HTTP-Method-Override": "PUT"},
            data: 'language='+selected,
            success: function(data, status) {
                console.log(data);

            },
            error: function(xhr, status, err) {
                console.error(xhr, err.toString());
            },
       });

       window.location.reload();
    }

    buildCrumbs() {
            var caret;
            var link__text;
            var trail = this.props.breadcrumbs.map(function(item, key) {
                link__text = this.Localization(item.name);
                if (key > 0 && key < this.props.breadcrumbs.length) {
                    caret = 'fa fa-caret-right';
                } else {
                    caret = '';
                }
                return (
                    <Link key={key} className={"breadcrumbs__link"} to={item.path}>
                        <span className={"breadcrumbs__caret " + caret}></span>
                        {link__text}
                    </Link>
                );
            }, this);

            this.trail = (
                <div className="grid__item breadcrumbs__trail">
                    {trail}
                </div>
            );
    }

    /**
     * Applies the styles to show or hide languages depending on the chosen language
     * @param lang - the HTML element that represents the language tag
     * @param active - a boolean flag that specifies this is the currently-selected language.
     * @param defaultLang - a boolean flag that allows the default language to be highlighted after a page load.
     */
    toggleLang(lang, active, defaultLang) {

        if (defaultLang) {
            lang.classList.add(this.selectedClass);
        }

        if (lang) {
            if (active) {
                if (!lang.classList.contains(this.selectedClass)) {
                    lang.classList.add(this.openClass);
                } else {
                    lang.classList.add(this.activeClass, this.openClass);
                }
            } else {
                if (!lang.classList.contains(this.selectedClass)) {
                    lang.classList.remove(this.activeClass, this.openClass);
                }
            }
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    toggleNav(event) {
        if (event) event.stopPropagation();

        if (this.nav) this.toggleLayout();

        this.setState({
            open: !this.state.open
        });
    }

    /**
     * Handle open/close menu button and apply the classes to resize the
     * main content view accordingly.
     */
    toggleLayout() {
        var header = document.getElementById(this.elemsToToggle.header);
        var breadcrumbs = document.getElementById(this.elemsToToggle.breadcrumbs);
        var contentWrapper = document.getElementById(this.elemsToToggle.contentWrapper);
        var openFlag = '--open';

        if(this.state.open) {
            this.nav.classList.remove(this.toggleClass);

            if (this.WhichDevice() === 'mobile') {
                this.navButton.classList.remove('fa-close');
                this.navButton.classList.add('fa-navicon');
            } else {
                this.navButton.classList.remove('fa-navicon');
                this.navButton.classList.add('fa-close');
            }

            header.classList.add(this.elemsToToggle.header+openFlag);
            breadcrumbs.classList.add(this.elemsToToggle.breadcrumbs+openFlag);
            contentWrapper.classList.add(this.elemsToToggle.contentWrapper+openFlag);

        } else {
            this.nav.classList.add(this.toggleClass);

            if (this.WhichDevice() === 'mobile') {
                this.navButton.classList.remove('fa-navicon');
                this.navButton.classList.add('fa-close');
            } else {
                this.navButton.classList.remove('fa-close');
                this.navButton.classList.add('fa-navicon');
            }



            header.classList.remove(this.elemsToToggle.header+openFlag);
            breadcrumbs.classList.remove(this.elemsToToggle.breadcrumbs+openFlag);
            contentWrapper.classList.remove(this.elemsToToggle.contentWrapper+openFlag);
        }

    }

    clickAnywhereToClose(event) {
        if (this.WhichDevice() === 'mobile') {
            if (this.state.open) {
                this.toggleNav(event);
            }
        }
    }

    render() {
        var logout__text =  this.Localization('logout');
        return (
            <section id="breadcrumbs" className="breadcrumbs">
                <div className="wrapper wrapper__breadcrumbs">
                    <div id="navButton" className="grid__item leftnav__hamburger fa fa-close"></div>
                    {this.trail}
                    {this.props.children}
                    <div className="grid__item rightnav rightnav--mobileHidden">
                        <div id="langWrapper" className="wrapper rightnav__langSelect">
                            <div className="rightnav__container">
                            <span id="en_CA" className="rightnav__lang">EN</span>
                            <span id="fr_CA" className="rightnav__lang">FR</span>
                            </div>
                        </div>
                        <Link className="rightnav__logout" to="/logout">{logout__text}</Link>
                    </div>
                </div>
            </section>
        );
    }
}
