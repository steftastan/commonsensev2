import React, { Component } from 'react';
import $ from 'jquery';
import './css/App.css';


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
    }

    componentDidMount() {
        document.addEventListener('keyup', this.filterLinkList, false);
    }

    filterLinkList() {

        // Declare variables
        var input, filter, ul, li, a, i, j;
        var result;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();

        ul = document.getElementById("linkList");
        li = ul.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            if (filter.length) {
                //-if text has been input
                a = li[i].getElementsByTagName("a");

                for (j = 0; j < a.length; j++) {


                    if (a[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                        //- if it finds a result
                        a[j].style.display = "";

                        //-check if sublink or main linked

                        if (a[j].classList.contains('leftnav__child')) {
                            console.log('parent link');
                        }


                        //-if main-link.... then obscure allothers
                        // li[i].classList.add('leftnav__item--open');
                        // li[i].getElementsByClassName('leftnav__child')[0].style.display = "";
                        // li[i].getElementsByClassName('leftnav__child')[1].style.display = "";
                        // li[i].getElementsByClassName('leftnav__child')[2].style.display = "";
                        // li[i].style.display = "";
                        result = true;

                    } else {
                        //-  if it doesn't find a result
                        a[j].style.display = "none";
                        li[i].classList.remove('leftnav__item--open');
                        li[i].style.display = "none";
                        // result = false;
                    }
                }

                if (result) {
                    li[i].classList.add('leftnav__item--open');
                    li[i].getElementsByClassName('leftnav__child')[0].style.display = "";
                    li[i].getElementsByClassName('leftnav__child')[1].style.display = "";
                    li[i].getElementsByClassName('leftnav__child')[2].style.display = "";
                    li[i].style.display = "";
                }


            } else {
                //- if the text box is empty
                a = li[i].getElementsByTagName("a");
                for (j = 0; j < a.length; j++) {

                    if (a[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                        //-reset styles
                        a[j].style.display = "";
                        li[i].classList.add('leftnav__item--open');
                        li[i].getElementsByClassName('leftnav__child')[0].style.display = "";
                        li[i].getElementsByClassName('leftnav__child')[1].style.display = "";
                        li[i].getElementsByClassName('leftnav__child')[2].style.display = "";
                        li[i].style.display = "";

                    }
                }

                li[i].classList.remove('leftnav__item--open');

            }
        }
    }

    render() {
        var commonSenseLinkList = this.props.commonSenseLinkList.map(function(item, key) {
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

        return (
            <div>
            <nav id="nav" className="wrapper leftnav">
                <ul className="leftnav__list">
                    <li className="leftnav__item">
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
                    <li className="leftnav__item">
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


        //TODO: delete maybe
        // // Section
        // target = event.target.classList.contains(this.state.childClass) ? event.target.parentNode : event.target;
        // sectionHeight = target.offsetHeight;
        //
        // // Sublink
        // target = target.classList.contains(this.state.sectionClass) ? target.parentNode : target;
        // subLinksHeight = target.getElementsByClassName('leftNav__subLinks').length ? target.getElementsByClassName('leftNav__subLinks')[0].offsetHeight : 10;

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
      this.state = {
          open: false,
          openClassName: '',
          navButtonId: 'navButton',
          navId: 'nav',
          nav: {},
          toggleClass: 'leftnav--toggle',
      };
    }

    componentDidMount() {
        var navElem = document.getElementById(this.state.navId);
        var navButton = document.getElementById(this.state.navButtonId);
        if (navElem && navButton) {
            this.setState({
                nav: navElem
            });
            document.addEventListener('mousedown', this.clickAnywhereToClose, false);
            navButton.addEventListener('mousedown', this.toggleNav, false);
            navElem.addEventListener('mousedown', this.stopPropagation, false);
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
            this.state.nav.classList.remove(this.state.toggleClass);
        } else {
            this.setState({
                open: true
            });
            this.state.nav.classList.add(this.state.toggleClass);
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
                        <div className="wrapper rightnav__langSelect">EN</div>
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
            <Accordion commonSenseLinkList={this.props.commonSenseLinkList} />
            <BreadCrumbs/>
            <Dashboard dashboardLinks={this.props.userData.dashboardLinks} />
          </div>
        );
    }
}

export default App;
