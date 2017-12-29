import React, { Component } from 'react';
import $ from 'jquery';

export class ToolBox extends Component {

    constructor(props) {
      super(props);
      this.state = {
          open: false,
          toolBox: []
      };
      this.toggleClass = 'toolBox__wrapper--toggle';
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
      this.toolBoxWrapper;
      this.toolBoxHeight;
    }

    /* Handle open/close button available on mobile */
    toggleNav(e) {
        e.stopPropagation();
        this.toolNav = document.getElementById(this.toolBoxId);
        this.toolButton = document.getElementById(this.toolButtonId);
        var firstToolBox;

        if(this.state.open) {
            this.setState({
                open: false
            });
            this.toolNav.classList.remove(this.toggleClass);
            this.toolButton.classList.add('fa-ellipsis-v');
            this.toolButton.classList.remove('fa-close');
            this.resetNav();

        } else {
            this.setState({
                open: true
            });
            this.toolNav.classList.add(this.toggleClass);
            this.toolButton.classList.add('fa-close');
            this.toolButton.classList.remove('fa-ellipsis-v');
            var firstToolBox = document.getElementById('firstToolBox');

            /* Get the child's computed height so we can adjust the wrapper accordingly. */
            this.toolBoxHeight = window.getComputedStyle(firstToolBox);
            this.toolBoxHeight = this.toolBoxHeight.getPropertyValue('height');
            this.toolBoxWrapper.style.height = this.toolBoxHeight;
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
            this.toolNav.classList.remove(this.toggleClass);
        }
    }

    componentWillMount() {
        /**
         * Obtain ToolBox data in order to build navigation
         */
        if (this.props.settings && this.props.settings.webService) {
            $.ajax({
                url: this.props.settings.webService,
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
        }

    }

    componentDidMount() {
        var navButton = document.getElementById(this.toolButtonId);
        var toolBoxWrapper = document.getElementById(this.toolBoxId);

        /* Add click event to the tool box button on mobile */
        navButton.addEventListener('mousedown', this.toggleNav, false);
    }

    componentDidUpdate() {
        /**
         * Add mouse events here to trigger animation.
         */
        this.toolBoxWrapper = document.getElementById(this.toolBoxId);
        this.toolBoxWrapper.addEventListener('click', this.animateToolBox);
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

                /* Get the child's computed height so we can adjust the wrapper accordingly. */
                this.toolBoxHeight = window.getComputedStyle(childItem);
                this.toolBoxHeight = this.toolBoxHeight.getPropertyValue('height');
                this.toolBoxWrapper.style.height = this.toolBoxHeight;

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
        var renderToolBox;
        if (this.state.toolBox.toolBox) {
            renderToolBox = this.state.toolBox.toolBox.map(function(item, key) {
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
                    <ul id="firstToolBox" className="toolBox__group toolBox__barDesktop active">
                        {renderToolBox}
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
