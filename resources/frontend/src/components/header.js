import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <div className="bg-light">
                <div className="sse-header">
                    <Link className="navbar-brand" to='/'>Go SSE</Link>
                </div>
            </div>
        );
    }
}