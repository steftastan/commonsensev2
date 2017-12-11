import React, { Component } from 'react';
import $ from 'jquery';

export class Accordion extends Component {

    constructor() {
      super();
      this.filterLinkList = this.filterLinkList.bind(this);
      this.toggleElem = this.toggleElem.bind(this);
      this.state = {
          data: {},
          companies: {},
          employeeName: ''
      };
    }

    componentDidMount() {

        $.ajax({
            url: 'webservices/FullMenu.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        $.ajax({
            url: 'webservices/Companies.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({companies: data});
                this.setState({employeeName: data.employeeName});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        document.addEventListener('keyup', this.filterLinkList, false);

    }


    componentWillUnmount() {
        document.removeEventListener('keyup', this.filterLinkList, false);
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

        if (this.state.companies.results && this.state.companies.results.length) {
            var companiesList = this.state.companies.results.map(function(item, key) {
                return (<option key={key} selected={item.selected} id={key}>{item.name}</option>);
            }, this);
        }

        return (
            <div>
            <nav id="nav" className="wrapper leftnav">
                <ul className="leftnav__list">
                    <li className="leftnav__fixed">
                        <div className="leftnav__section--fixed">
                            <span className="leftnav__user">Welcome, {this.state.employeeName}</span>
                            <form className="form">
                                <i className="form__icon form__icon--company  fa fa-building"></i>
                                <select className="form__item form__selectCompany">
                                    {companiesList}
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

export class Section extends Component {

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

export class SubLinkList extends Component {

    render() {

        var subLinks;

        if (this.props.sublinks && this.props.sublinks && this.props.sublinks.length) {
            subLinks = this.props.sublinks.map(function(item, key) {
                return (
                    <a key={key} className="leftnav__subItem" href={item.url}>{item.name}</a>
                );
            }, this);
        }

        return (
            <div className="leftNav__subLinks">
                {subLinks}
            </div>
        );
    }
}
