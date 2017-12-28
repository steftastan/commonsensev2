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

        /* Add event listeners to the navigation elements */
        if (navElem && navButton) {
            this.setState({
                nav: navElem,
                navButton: navButton
            });
            document.addEventListener('mousedown', this.clickAnywhereToClose, false);
            navButton.addEventListener('mousedown', this.toggleNav, false);
            navElem.addEventListener('mousedown', this.stopPropagation, false);
        }

        /* Store the langWrapper DOM element in the state to be used by other functions. */
        if (langWrapper) {
            this.setState({
                langWrapper: langWrapper
            });

            selectedLang = document.getElementById(defaultLang);
            this.toggleLang(selectedLang, true, true);
        }

        /* Build the toolbox element if it was passed down as a prop */
        if (this.props.toolBox) {
                this.toolBox = <ToolBox webService={this.props.toolBox.webService} />;
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
                    {this.toolBox}
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

export class ToolBox extends Component {

    constructor(props) {
      super(props);
      this.state = {
          toolBox: {},
          open: false,
          toggleClass: 'toolBox__wrapper--toggle'
      };
      this.toolBox = [];
      this.subLinks = [];
      this.toolButtonId = 'toolButton';
      this.toolBoxId = 'toolBoxWrapper';
      this.toolBoxClass = 'toolBox__group';
      this.toolBoxItem = 'toolBox__item';
      this.toolBoxLink = 'toolBox__link';
      this.toolBoxBack = 'toolBox__back';
      this.active = 'active';
      this.inactive = 'inactive';
      this.toolNav = [];
      this.animateToolBox = this.animateToolBox.bind(this);
      this.toggleNav = this.toggleNav.bind(this);
      this.resetNav = this.resetNav.bind(this);
    }

    /* Handle open/close button available on mobile */
    toggleNav(e) {
        e.stopPropagation();
        this.toolNav = document.getElementById(this.toolBoxId);
        this.toolButton = document.getElementById(this.toolButtonId);

        if(this.state.open) {
            this.setState({
                open: false
            });
            this.toolNav.classList.remove(this.state.toggleClass);
            this.toolButton.classList.add('fa-ellipsis-v');
            this.toolButton.classList.remove('fa-close');
            this.resetNav();

        } else {
            this.setState({
                open: true
            });
            this.toolNav.classList.add(this.state.toggleClass);
            this.toolButton.classList.add('fa-close');
            this.toolButton.classList.remove('fa-ellipsis-v');
        }
    }

    /* Reset the toolbox elements inside our navigation if the user closes out of it */
    resetNav() {
        var toolBoxGroups;
        toolBoxGroups = this.toolNav.getElementsByClassName(this.toolBoxClass);
        if (toolBoxGroups.length) {
            for (var i = 0; i < toolBoxGroups.length; i++) {
                if (i !== 0) toolBoxGroups[i].classList.remove(this.active);
                toolBoxGroups[i].classList.remove(this.inactive);
            }
        }
    }

    /* Allow the navigation to close if the user clicks anywhere on the window but the navigation */
    clickAnywhereToClose(event) {
        if(this.state.open) {
            this.setState({
                open: false
            });
            this.toolNav.classList.remove(this.state.toggleClass);
        }
    }

    componentDidMount() {
        var navButton = document.getElementById(this.toolButtonId);
        var toolBoxWrapper = document.getElementById(this.toolBoxId);

        /**
         * Obtain ToolBox data in order to build navigation
         */
        if (this.props && this.props.webService) {
            $.ajax({
                url: this.props.webService,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    if (data.results) {
                        this.setState({toolBox: data.results});
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

            /* Small fix to get the toolbox to work with the sliding feature,
             * we define its height post-mount. This is because the tool box
             * relies on multiple uses of absolute positioning which makes
             * calculating dimensions difficult. */
             //TODO: improve this
            //toolBoxWrapper.style.height = $(window).height()+'px';
        }

        /* Add click event to the tool box button on mobile */
        navButton.addEventListener('mousedown', this.toggleNav, false);
    }

    componentDidUpdate() {
        /**
         * Add mouse events here to trigger animation.
         */
        var toolBoxWrapper = document.getElementById(this.toolBoxId);
        toolBoxWrapper.addEventListener('click', this.animateToolBox);
    }

    /**
     *
     */
    animateToolBox(e) {
        e.preventDefault();
        var clickedItem = e.target;
        var toolBoxGroup;
        var childItem;
        var url;
        var activeButton;
        var backButton = null;
        var oldGroup;
        var newGroup;

        /* Ensure we have stored the correct DOM node, we need to move the entire group off the screen */
        if (!clickedItem.classList.contains(this.toolBoxClass)) {
            toolBoxGroup = (clickedItem.classList.contains(this.toolBoxItem) ? clickedItem.parentNode : clickedItem.parentNode.parentNode);
        }

        /* Ensure we have stored the correct DOM node, to bring in the new level of nav */
        childItem = clickedItem.getElementsByClassName(this.toolBoxClass) ? clickedItem.getElementsByClassName(this.toolBoxClass)[0] : [];

        /* Sliding logic for all buttons except the back button */
        if (!clickedItem.classList.contains(this.toolBoxBack)) {
            if (clickedItem.getElementsByClassName(this.toolBoxClass).length) {
                childItem = clickedItem.getElementsByClassName(this.toolBoxClass)[0];

            } else if (clickedItem.getElementsByClassName(this.toolBoxLink)) {
                childItem = clickedItem.parentNode.getElementsByClassName(this.toolBoxClass)[0];
            } else {
                childItem = [];
            }

            if (clickedItem.classList.contains(this.toolBoxBack)) {
                backButton = (clickedItem.classList.contains(this.toolBoxBack) ? clickedItem : clickedItem.parentNode);
            }

            /* There children tool box still */
            if (childItem) {
                /* Move the tool box off the screen */
                toolBoxGroup.classList.add(this.inactive);

                /* Move the new set of options into position*/
                childItem.classList.add(this.active);
                clickedItem.removeEventListener('click', this.animateToolBox);
                childItem.addEventListener('click', this.animateToolBox);
            }

            /* We reached the end of the list, allow the user to click on the option */
            if (!childItem) {
                activeButton = (clickedItem.classList.contains(this.toolBoxLink) ? clickedItem : clickedItem.childNodes[0]);
                if (activeButton) {
                    url = (activeButton.hasAttribute('href') ? activeButton.getAttribute('href') : '');
                    window.location.href = url;
                }

            }
        } else {
            /**
             * Logic to control the back button
             */
             backButton = (clickedItem.classList.contains(this.toolBoxBack) ? clickedItem : clickedItem.parentNode);
             oldGroup = (toolBoxGroup.parentNode.parentNode.classList.contains(this.inactive) ? toolBoxGroup.parentNode.parentNode : null);

             if (oldGroup) {
                 oldGroup.classList.remove(this.inactive);
             }
        }
    }

    render() {

        if (this.state.toolBox.toolBox) {
            this.toolBox = this.state.toolBox.toolBox.map(function(item, key) {
                if (item.subLinks && item.subLinks.length) {
                    this.subLinks = item.subLinks;
                }
                return (
                    <li className="toolBox__item" key={key} id={key}>
                        <a className="toolBox__link" href={item.url}>{item.linkName}</a>
                        <SubLinks subLinks={this.subLinks}/>
                    </li>
                );
            }, this);
        }

        return (
            <section className="toolBox">
                <div id="toolButton" className="grid__item leftnav__ellipsis leftnav--desktopHidden fa fa-ellipsis-v"></div>
                <div id="toolBoxWrapper" className="toolBox__wrapper">
                    <ul className="toolBox__group toolBox__barDesktop active">
                        {this.toolBox}
                    </ul>
                    <div id="toolBoxColumns" className="toolBox--mobileHidden toolBox__columns"></div>
                </div>
            </section>
        );
    }
}

/**
 * Recursively generates the list of links for the tool box widget.
 */
export class SubLinks extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
      this.toolBox = [];
      this.subLinks = [];
    }

    render() {
        var tools = [];
        var subMenu = [];

        if (this.props.subLinks) {
            tools = this.props.subLinks.map(function(item, key) {

                /* Clear the subMenu array to prepare for each new iteration */
                if (subMenu) {
                    subMenu = [];
                }

                /**
                 * Recursively call this function as long
                 * as the application keeps finding subLink arrays.
                 */
                if (item.subLinks) {
                    subMenu = <SubLinks subLinks={item.subLinks}/>;
                }

                return (
                    <li className="toolBox__item toolBox__item--child" key={key} id={key}>
                        <a className="toolBox__link toolBox__link--child" href={item.url}>{item.linkName}</a>
                        {subMenu}
                    </li>
                );
            }, this);
        }

        return (
            <ul className="toolBox__group toolBox__group--child">
                <li className="toolBox__item toolBox__back">
                    <a href="#" className="toolBox__link toolBox__back"><span className="toolBox__back toolBox__caret fa fa-angle-left"></span>Back</a>
                </li>
                {tools}
            </ul>
        );
    }
}
