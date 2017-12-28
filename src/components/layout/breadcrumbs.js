import React, { Component } from 'react';
import $ from 'jquery';

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
      this.toggleNav = this.toggleNav.bind(this);
      this.clickAnywhereToClose = this.clickAnywhereToClose.bind(this);
      this.stopPropagation = this.stopPropagation.bind(this);
      this.openLang = this.openLang.bind(this);
      this.toggleLang = this.toggleLang.bind(this);
      this.state = {
          open: false,
          selectedLang: ''
      };
      this.defaultLang = 'en';
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

        /* Add event listeners to the navigation elements */
        if (this.nav && this.navButton) {
            document.addEventListener('mousedown', this.clickAnywhereToClose, false);
            this.nav.addEventListener('mousedown', this.stopPropagation, false);
            this.navButton.addEventListener('mousedown', this.toggleNav, false);
        }

        /* Store the langWrapper DOM element in the state to be used by other functions. */
        if (this.langWrapper) {
            selectedLang = document.getElementById(this.defaultLang);
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
                    // act upon the clicked element
                    this.setState({
                        selectedLang: languages[i].id
                    });
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

    getInitialState() {
        return {
            open: false
        }
    }

    toggleNav(event) {
        event.stopPropagation();
        if(this.state.open) {
            this.setState({
                open: false
            });
            this.nav.classList.remove(this.toggleClass);
            this.navButton.classList.add('fa-navicon');
            this.navButton.classList.remove('fa-close');
        } else {
            this.setState({
                open: true
            });
            this.nav.classList.add(this.toggleClass);
            this.navButton.classList.add('fa-close');
            this.navButton.classList.remove('fa-navicon');
        }
    }

    clickAnywhereToClose(event) {
        if(this.state.open) {
            this.setState({
                open: false
            });
            this.nav.classList.remove(this.toggleClass);
        }
    }

    render() {
        return (
            <section className="breadcrumbs">
                <div className="wrapper wrapper__breadcrumbs">
                    <div id="navButton" className="grid__item leftnav__hamburger leftnav--desktopHidden fa fa-navicon"></div>
                    <div className="grid__item breadcrumbs__trail">
                        <span className="breadcrumbs__link">Dashboard</span>
                        <span className="breadcrumbs__arrow fa fa-chevron-right"></span>
                        <span className="breadcrumbs__link">Financials</span>
                    </div>
                    {this.props.children}
                    <div className="grid__item rightnav rightnav--mobileHidden">
                        <div id="langWrapper" className="wrapper rightnav__langSelect">
                            <div className="rightnav__container">
                            <span id="en" className="rightnav__lang">EN</span>
                            <span id="fr" className="rightnav__lang">FR</span>
                            </div>
                        </div>
                        <a className="rightnav__logout" href="/logout">Logout</a>
                    </div>
                </div>
            </section>
        );
    }
}
