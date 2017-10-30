import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container pt-3">
                    {this.props.children}
                </div>
            </div>
        );
    }
}