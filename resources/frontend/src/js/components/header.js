import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="sse-header">
        <div className="container">
          <Link className="navbar-brand" exact to='/'>Go SSE</Link>
          <div class="navbar-nav mr-auto">
            <NavLink className="nav-item nav-link" exact to='/' activeClassName="active">Home</NavLink>
            <NavLink className="nav-item nav-link" exact to='/about' activeClassName="active">About</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
