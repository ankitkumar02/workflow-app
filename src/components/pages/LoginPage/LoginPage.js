import React, { Component } from 'react';
import './LoginPage.scss';
import ActionButton from '../../common/Button/Action';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    remember: false,
    isLoginPage: true
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.name === 'remember' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSignup = event => {
    event.preventDefault();
    axios
      .post('/signup', {
        email,
        password
      })
      .then(response => {
        console.log(response);
        if (response.data) {
          console.log('Successfully signed up');
        } else {
          console.log('Signup error');
        }
      })
      .catch(error => {
        console.log('server error', error);
      });
  };

  handleLogin = () => {
    const { email, password, remember } = this.state;
    console.log('email, password, remember', email, password, remember);
    if (email === 'test' && password === 'test') {
      this.props.history.push('/workflows');
    } else {
      console.log('Login failed');
    }
  };

  render() {
    return (
      <div className="login-page-container">
        <div className="login-box">
          <header className="login-header">Login</header>
          <input
            type="text"
            name="email"
            className="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            className="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <div className="remember-me">
            <input
              type="checkbox"
              name="remember"
              className="remember"
              checked={this.state.remember}
              onChange={this.handleInputChange}
            />
            Remember me
          </div>
          <ActionButton
            buttonText="Login"
            type="primary"
            onClick={this.handleLogin}
          />
          <div className="signup-message">
            Don't have an accout yet? Signup here.
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
