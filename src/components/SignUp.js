import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';


const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

  const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  onFieldChange = (event) => {
    const newValue = event.target.value
    const name = event.target.name
    this.setState(byPropKey(name, newValue))
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          name='username'
          onChange={this.onFieldChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          name='email'
          onChange={this.onFieldChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          name='passwordOne'
          onChange={this.onFieldChange}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          name='passwordTwo'
          onChange={this.onFieldChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }

      </form>
    );
  }

}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
