import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './index.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { email, password } = this.state;
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { email, password } = this.state;
      try {
        const response = await axios.post('http://localhost:5000/api/login', { email, password });
        Cookies.set('userToken', response.data.token, { expires: 7 });
        console.log('User logged in');
        // Redirect to a protected route or show success message
      } catch (err) {
        console.error('Error logging in:', err.response.data);
        // Show error message
      }
    }
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 login-page">
        <div className="bg-white p-3 rounded w-25">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded-0"
                onChange={this.handleInput}
                name="email"
                value={email}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded-0"
                onChange={this.handleInput}
                name="password"
                value={password}
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
            <p>If you are new Here!?</p>
            <Link to="/signup" className="btn btn-default border w-100 rounded-0 text-decoration-none">Create Account</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
