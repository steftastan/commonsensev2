import React, { Component } from 'react';
import './css/App.css';
import $ from 'jquery';

class Header extends Component {
    render() {
        return (
            <header className="wrapper header">
                <div className="grid__item grid__item--header">
                    <div className="header__logo icon-sialogo"></div>
                </div>
                <div className="grid__item grid__item--header">
                    <h1 className="header__mainTitle">Common Sense</h1>
                    <h2 className="header__subTitle">SIA Service Information Access Inc.</h2>
                </div>
            </header>
        );
    }
}

class Accordion extends Component {

    constructor() {
      super();
      this.filterLinkList = this.filterLinkList.bind(this);
      this.toggleElem = this.toggleElem.bind(this);
      this.state = {
          data: {}
      };
    }

    componentDidMount() {
        document.addEventListener('keyup', this.filterLinkList, false);

        $.ajax({
            url: '/data.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('ERR ERR ERR ');
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    }

    /**
     * logic behind showing or hiding the navigation elements when the search function is used
     * @param elem - an HTML element or array of HTML elements to be hidden and shown.
     * @param display - a string that takes a value for the CSS property display (none, block, inline, inline-block).
     * @param requiresOpenClass - a boolean that specifies if the element will need to have a toggle class added to them.
     * @param action - a string that determines what will be done with the openClass if it is required. accepted values are 'add' or 'remove'.
     * @param openClassName - the CSS class that will be applied.
     */
    toggleElem(elem, display, requiresOpenClass, action, openClassName) {
        // set default values
        var i = 0;
        var openClassName = openClassName ? openClassName : 'leftnav__item--open';
        var display = display ? display : '';
        var requiresOpenClass = requiresOpenClass ? requiresOpenClass : false;
        var action = action ? action : 'add';

        if (elem.length) {
            // element is an array of multiple elements, enclose code in loop
            for (i = 0; i < elem.length; i++) {
                elem[i].style.display = display;
                // element is an HTML object
                if (requiresOpenClass && action === 'add') {
                    elem[i].classList.add(openClassName);
                } else if (requiresOpenClass && action === 'remove')  {
                    elem[i].classList.remove(openClassName);
                }
            }
        } else {
            // element is an HTML object
            if (requiresOpenClass && action === 'add') {
                elem.classList.add(openClassName);
            } else if (requiresOpenClass && action === 'remove')  {
                elem.classList.remove(openClassName);
            }
            elem.style.display = display;
        }
    }

    filterLinkList() {
        // Declare variables
        var input, filter, ul, li, a, i, j;
        var result;
        var mainLinkClass = 'leftnav__child';
        var filteredMainLinks = [];
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();

        ul = document.getElementById("linkList");
        li = ul.getElementsByTagName('li');

        // loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a");

            if (filter.length) {
                for (j = 0; j < a.length; j++) {
                    if (a[j].innerHTML.toUpperCase().indexOf(filter) > -1) {

                        // if it finds a result, toggle ON all matching child links
                        this.toggleElem(a[j]);
                        filteredMainLinks.push(li[i]);
                        result = true;

                    } else {
                        // if it doesn't find a result
                        this.toggleElem(a[j], 'none');
                        this.toggleElem(li[i], 'none', true, 'remove');
                    }
                }

                if (result) {

                    /* we need to toggle ON the main link groups for every child
                       link that matches the search criteria, regardless of whether
                       these links themselves match the search.
                     */
                    this.toggleElem(filteredMainLinks, '', true, 'add');
                    this.toggleElem(li[i].getElementsByClassName(mainLinkClass), '');
                }

            } else {

                /* if the text box is empty, or the user clears up the text they
                   input, return the navigation to its default state.
                 */
                this.toggleElem(a, '');
                this.toggleElem(li[i], '', true, 'remove');
                this.toggleElem(li[i].getElementsByClassName(mainLinkClass), '');
            }
        }
    }

    render() {

        if (this.state.data.results && this.state.data.results.length) {
            var commonSenseLinkList = this.state.data.results.map(function(item, key) {
                return (
                    <Section key={key} id={key}>
                        <div className="leftnav__section">
                            <span className={"leftnav__child leftnav__icon " + item.icon + " " + item.color}></span>
                            <a className="leftnav__child leftnav__link" href={item.url}>{item.name}</a>
                            <a className="leftnav__child leftnav__arrow fa fa-chevron-right" href="#"></a>
                        </div>
                        <SubLinkList sublinks={item.sublinks} />
                    </Section>
                );
            }, this);
        }


        return (
            <div>
            <nav id="nav" className="wrapper leftnav">
                <ul className="leftnav__list">
                    <li className="leftnav__fixed">
                        <div className="leftnav__section--fixed">
                            <span className="leftnav__user">Welcome, John Doe</span>
                            <form className="form">
                                <i className="form__icon form__icon--company  fa fa-building"></i>
                                <select className="form__item form__selectCompany">
                                    <option>Switch company</option>
                                    <option>Company ABC</option>
                                    <option>Company DEF</option>
                                    <option>Company HIJ</option>
                                    <option>Company KLM</option>
                                    <option>Company NOP</option>
                                </select>
                            </form>
                        </div>
                    </li>
                    <li className="leftnav__fixed">
                        <div className="leftnav__section--fixed">
                            <span className="leftnav__search"></span>
                            <form className="form">
                                <i className="form__icon form__icon--search fa fa-search"></i>
                                <input id="searchInput" className="form__item form__filterLeftNav" type="text" placeholder="Filter navigation list" />
                            </form>
                        </div>

                    </li>
                    <li className="leftnav__item">
                        <div className="leftnav__section">
                            <a className="leftnav__link leftnav__link--dashboard" href="#">Dashboard</a>
                        </div>
                    </li>
                </ul>
                <ul id="linkList" className="leftnav__list">
                    {commonSenseLinkList}
                </ul>

            </nav>
            </div>
        );
    }
}

class Section extends Component {

    constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
      this.state = {
          open: false,
          childClass: "leftnav__child",
          sectionClass: "leftnav__section",
          className: 'leftnav__item '
      };
    }

    getInitialState() {
        return {
            open: false
        }
    }

    handleClick(event) {
        var sectionHeight;
        var subLinksHeight;
        var target;
        var allLinks;

        event.preventDefault();

        if(this.state.open) {
            this.setState({
                open: false,
                height: sectionHeight,
                className: 'leftnav__item '
            });
        } else {
            this.setState({
                open: true,
                height: sectionHeight+subLinksHeight,
                className: 'leftnav__item leftnav__item--open'
            });
        }
    };

    render() {
        return (
            <li id={this.props.id}  className={this.state.className} onClick={this.handleClick}>
                {this.props.children}
            </li>
        );
    }
}

class SubLinkList extends Component {

    render() {
        var subLinks = this.props.sublinks.map(function(item, key) {
            return (
                <a key={key} className="leftnav__subItem" href={item.url}>{item.name}</a>
            );
        }, this);

        return (
            <div className="leftNav__subLinks">
                {subLinks}
            </div>
        );
    }
}

class BreadCrumbs extends Component {

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

                if (languages[i].id == event.target.id) {
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

class Dashboard extends Component {
    render() {
        var dashboardLinks = this.props.dashboardLinks.map(function(item, key) {
            return (
                    <a key={key} className="category__item col-xs-12 col-lg-4" href={item.url}>
                        <article className={"category " + item.color}>
                            <span className={"category__icon--desktop " + item.icon + " " + item.color}></span>
                            <span className={"category__icon " + item.icon}></span>
                            <div className="category__text">
                                <span className="category__name">{item.category}</span>
                                <h4 className="category__link">{item.linkName}</h4>
                            </div>
                        </article>
                    </a>
            );
        });

        return (
            <section className="wrapper wrapper__content">
                <div className="wrapper wrapper__content--whiteBox">
                    <span className="tag--text">Sort by</span>
                    <span className="tag tag--inactive">Newest</span>
                    <span className="tag tag--active">Category</span>
                    <span className="tag tag--inactive">Alphabetical</span>
                </div>
                <div className="container-fluid wrapper__content--categoryGrid">
                    {dashboardLinks}
                </div>
            </section>
        );
    }
}

class App extends Component {

    render() {
        return (
          <div className="wrapper wrapper__app App">
            <Header userName={this.props.userData.name} company={this.props.userData.company}/>
            // <Accordion commonSenseLinkList={this.props.commonSenseLinkList} />
            <Accordion />
            <BreadCrumbs/>
            <Dashboard dashboardLinks={this.props.userData.dashboardLinks} />
          </div>
        );
    }
}

export default App;
