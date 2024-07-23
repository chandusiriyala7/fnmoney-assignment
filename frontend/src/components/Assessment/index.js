import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './index.css';

class Assessment extends Component {
  state = {
    email: '',
    mobileNumber: '',
    githubLink: '',
    websiteLink: '',
    experience: '',
    errors: {},
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { email, mobileNumber, githubLink, websiteLink, experience } = this.state;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!mobileNumber) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      errors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!githubLink) {
      errors.githubLink = 'GitHub repository link is required';
    } else if (!/^https?:\/\/(www\.)?github\.com\/.+\/.+$/.test(githubLink)) {
      errors.githubLink = 'GitHub link is invalid';
    }

    if (!websiteLink) {
      errors.websiteLink = 'Website link is required';
    } else if (!/^https?:\/\/.+\..+$/.test(websiteLink)) {
      errors.websiteLink = 'Website link is invalid';
    }

    if (!experience) {
      errors.experience = 'Experience is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { email, mobileNumber, githubLink, websiteLink, experience } = this.state;
      try {
        const response = await axios.post('http://localhost:5000/api/assessments', { email, mobileNumber, githubLink, websiteLink, experience });
        console.log('Assessment submitted', response.data);
        // Show success message or redirect
      } catch (err) {
        console.error('Error submitting assessment:', err.response.data);
        // Show error message
      }
    }
  };

  render() {
    const { email, mobileNumber, githubLink, websiteLink, experience, errors } = this.state;
    return (
      <div className="assessment">
        <h1><strong>Submit Your Assessment</strong></h1>
        <div className='form-elements bg-light'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={mobileNumber}
                onChange={this.handleInput}
              />
              {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGithubLink">
              <Form.Label>GitHub Repository Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="GitHub Repo Link"
                name="githubLink"
                value={githubLink}
                onChange={this.handleInput}
              />
              {errors.githubLink && <span className="text-danger">{errors.githubLink}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWebsiteLink">
              <Form.Label>Website Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Deployed Website Link"
                name="websiteLink"
                value={websiteLink}
                onChange={this.handleInput}
              />
              {errors.websiteLink && <span className="text-danger">{errors.websiteLink}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>Experiences While Doing Assessment</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="experience"
                value={experience}
                onChange={this.handleInput}
              />
              {errors.experience && <span className="text-danger">{errors.experience}</span>}
            </Form.Group>
            <button type="submit" className="btn btn-primary">Submit Assessment</button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Assessment;
