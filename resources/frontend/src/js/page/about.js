import React, { Component } from 'react';
import Layout from '../layout/pagelayout';

class About extends Component {
  render() {
    return (
      <Layout>
        <div className="signin">
          <div class="form-label-group">
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
            <label for="inputEmail">Email address</label>
          </div>
          <div class="form-label-group">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
            <label for="inputPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </div>
      </Layout>
    );
  }
};

export default About;
