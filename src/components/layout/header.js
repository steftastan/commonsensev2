import React, { Component } from 'react';

export class Header extends Component {
    render() {
        return (
            <header className="wrapper header">
                <div className="grid__item grid__item--header header__logo">
                    <img className="header__logo--img" src={this.props.defaultCompanyIcon}/>
                </div>
                <div className="grid__item grid__item--header header__companyName">
                    <h1 className="header__mainTitle">{this.props.defaultCompanyName}</h1>
                    <h2 className="header__subTitle">Common Sense</h2>
                </div>
            </header>
        );
    }
}
