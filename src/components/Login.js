import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogginIn: false, 
      invalidLogin: false, 
      userInfo: undefined
    };
  }

  handleLogin = (usernameText, passwordText) => {
    let userData = { username: usernameText, password: passwordText }
    let that = this;
    fetch('/login', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(userData), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json()
      }).then(response => {
        console.log('after response: ', response);
        that.setState({
          userLogginIn: true,
          userInfo: response
        });
      })
      .catch(error => {
        console.error('Error:', error)
        that.setState({
          invalidLogin: true
        });
      });
  }

  handleSignUp = (usernameText, passwordText) => {
    let userData = { username: usernameText, password: passwordText }
    fetch('/signup', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(userData), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    const { userLogginIn, invalidLogin, userInfo } = this.state;

    if (userLogginIn === true) {
      return <Redirect to={{
                pathname: '/main',
                state: { referrer: userInfo}
            }}/>
    }

    let failedLogin;
    if (invalidLogin) failedLogin = <div>Invalid username/password combination</div>;
    else failedLogin = <div></div>;


    return (
      <div>
        <input type="text" name="username" id="usernameInput" placeholder="Username"/>
        <input type="text" name="password" id="passwordInput" placeholder="Password"/>
        <button onClick={() => {
          let usernameText = document.getElementById('usernameInput').value;
          let passwordText = document.getElementById('passwordInput').value;
          console.log('Clicked Login Button:', usernameText, passwordText);
          // this.login(usernameText, passwordText);
          this.handleLogin(usernameText, passwordText);
        }}>Login</button>
        <button onClick={() => {
          let usernameText = document.getElementById('usernameInput').value;
          let passwordText = document.getElementById('passwordInput').value;
          console.log('Clicked Signup Button:', usernameText, passwordText);
          // this.signUp(usernameText, passwordText);
          this.handleSignUp(usernameText, passwordText);
        }}>Sign Up</button>
        {failedLogin}
      </div>
    )
  }
}

export default Login;