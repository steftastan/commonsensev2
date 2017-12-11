import React, { Component } from 'react';
import $ from 'jquery';

export class Header extends Component {
    render() {
        return (
            <header className="wrapper header">
                <div className="grid__item grid__item--header">
                    <div className="header__logo icon-sialogo"></div>
                </div>
                <div className="grid__item grid__item--header">
                    <h1 className="header__mainTitle">CommonSense Test</h1>
                    <h2 className="header__subTitle">SIA Service Information Access Inc.</h2>
                </div>
            </header>
        );
    }
}
