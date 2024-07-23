import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    errors: {},
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { name, email, password } = this.state;
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

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
      const { name, email, password } = this.state;
      try {
        const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
        console.log('User registered', response.data);
 
      } catch (err) {
        console.error('Error registering user:', err.response.data);
 
      }
    }
  };

  render() {
    const { name, email, password, errors } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center signup-page vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Signup</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name"><strong>Name</strong></label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control rounded-0"
                onChange={this.handleInput}
                name="name"
                value={name}
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
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
            <button type="submit" className="btn btn-success w-100 rounded-0">Signup</button>
            <p>Existing User or Created Account!?</p>
            <Link to="/login" className="btn btn-default border w-100 rounded-0 text-decoration-none">Login</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
