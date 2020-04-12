import React from 'react';
import Header from '../components/header';

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container mt-3">
          {this.props.children}
        </div>
      </React.Fragment>
    );
  };
}

export default Layout;
