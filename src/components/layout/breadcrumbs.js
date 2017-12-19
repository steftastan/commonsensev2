import React, { Component } from 'react';

export class BreadCrumbs extends Component {

    constructor() {
      super();
      this.toggleNav = this.toggleNav.bind(this);
      this.clickAnywhereToClose = this.clickAnywhereToClose.bind(this);
      this.stopPropagation = this.stopPropagation.bind(this);
      this.openLang = this.openLang.bind(this);
      this.toggleLang = this.toggleLang.bind(this);
      this.state = {
          open: false,
          openClassName: '',
          navButtonId: 'navButton',
          navButton: {},
          navId: 'nav',
          nav: {},
          toggleClass: 'leftnav--toggle',
          langWrapper: {},
          langWrapperId: 'langWrapper',
          langWrapperOpenClass: 'rightnav__langSelect--open',
          defaultLang: '',
          selectedLang: '',
          langListClass: 'rightnav__lang',
          activeClass: 'rightnav__lang--active',
          openClass: 'rightnav__lang--open',
          selectedClass: 'rightnav__lang--selected'
      };
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.langWrapper.addEventListener('mouseenter', this.openLang, false);
        this.state.langWrapper.addEventListener('mouseleave', this.openLang, false);
        this.state.langWrapper.addEventListener('mousedown', this.openLang, false);
    }

    componentDidMount() {
        var navElem = document.getElementById(this.state.navId);
        var navButton = document.getElementById(this.state.navButtonId);
        var langWrapper = document.getElementById(this.state.langWrapperId);
        var defaultLang = this.state.defaultLang ? this.state.defaultLang : 'en';
        var selectedLang;

        if (navElem && navButton) {
            this.setState({
                nav: navElem,
                navButton: navButton
            });
            document.addEventListener('mousedown', this.clickAnywhereToClose, false);
            navButton.addEventListener('mousedown', this.toggleNav, false);
            navElem.addEventListener('mousedown', this.stopPropagation, false);
        }

        if (langWrapper) {
            this.setState({
                langWrapper: langWrapper
            });

            selectedLang = document.getElementById(defaultLang);
            this.toggleLang(selectedLang, true, true);
        }
    }

    openLang(event) {
        var languages = document.getElementsByClassName(this.state.langListClass);
        var clickedLang;
        var i;

        if (event.type === 'mouseenter') {
            for (i = 0; i < languages.length; i++) {
                this.state.langWrapper.classList.add(this.state.langWrapperOpenClass);
                this.toggleLang(languages[i], true);
            }
        } else if (event.type === 'mouseleave') {
            for (i = 0; i < languages.length; i++) {
                this.state.langWrapper.classList.remove(this.state.langWrapperOpenClass);
                this.toggleLang(languages[i], false);
            }
        } else if (event.type === 'mousedown') {
            this.state.langWrapper.classList.remove(this.state.langWrapperOpenClass);
            for (i = 0; i < languages.length; i++) {

                if (languages[i].id === event.target.id) {
                    // act upon the clicked element
                    this.setState({
                        selectedLang: languages[i].id
                    });
                    clickedLang = document.getElementById(languages[i].id);
                    if (!clickedLang.classList.contains(this.state.selectedClass)) {
                        clickedLang.classList.add(this.state.selectedClass, this.state.activeClass, this.state.openClass);
                        this.toggleLang(languages[i], false);
                    } else {
                        this.toggleLang(languages[i], true);
                    }

                } else {
                    // modify non-clicked languages
                    languages[i].classList.remove(this.state.selectedClass);
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
            lang.classList.add(this.state.selectedClass);
        }

        if (lang) {
            if (active) {
                if (!lang.classList.contains(this.state.selectedClass)) {
                    lang.classList.add(this.state.openClass);
                } else {
                    lang.classList.add(this.state.activeClass, this.state.openClass);
                }
            } else {
                if (!lang.classList.contains(this.state.selectedClass)) {
                    lang.classList.remove(this.state.activeClass, this.state.openClass);
                }
            }
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    getInitialState() {
        return {
            open: false,
            defaultLang : 'en'
        }
    }

    toggleNav(event) {
        event.stopPropagation();
        if(this.state.open) {
            this.setState({
                open: false
            });
            this.state.nav.classList.remove(this.state.toggleClass);
            this.state.navButton.classList.add('fa-navicon');
            this.state.navButton.classList.remove('fa-close');
        } else {
            this.setState({
                open: true
            });
            this.state.nav.classList.add(this.state.toggleClass);
            this.state.navButton.classList.add('fa-close');
            this.state.navButton.classList.remove('fa-navicon');
        }
    }

    clickAnywhereToClose(event) {
        if(this.state.open) {
            this.setState({
                open: false
            });
            this.state.nav.classList.remove(this.state.toggleClass);
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
