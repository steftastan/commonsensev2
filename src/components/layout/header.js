import React, { Component } from 'react';

export class Header extends Component {
    render() {

        var icon;
        var defaultCompanyName = (this.props.defaultCompanyName ? this.props.defaultCompanyName : '');
        var commonSense = (this.props.defaultCompanyName ? 'CommonSense 2.0' : '');

        if (this.props.defaultCompanyIcon) {
            icon = (<img className="header__logo--img" src={this.props.defaultCompanyIcon}/>);
        } else {
            icon = (<div></div>);
        }

        return (
            <header id="header" className="wrapper header">
                <div className="grid__item grid__item--header header__logo">
                    {icon}
                </div>
                <div className="grid__item grid__item--header header__companyName">
                    <h1 className="header__mainTitle">{defaultCompanyName}</h1>
                    <h2 className="header__subTitle">{commonSense}</h2>
                </div>
            </header>
        );
    }
}
