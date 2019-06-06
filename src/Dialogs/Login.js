import React, { Component } from "react";
import "./Login.css";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Utils from "./../Utils/Util";
import List from "./../Utils/List";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      login: false
    };
    this.loginSuccessful = this.loginSuccessful.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  loginSuccessful() {
    window.confirm('Login gerçekleşti');
    this.setState({ login: true })
  }

  loginFailed() {
    window.confirm('Login gerçekleşemedi');
  }

  loginUser() {
    let params = {
      email: this.state.email,
      password: this.state.password
    }
    Utils.request(params, "loginUser", this.loginSuccessful, this.loginFailed);
  }

  render() {
    return (
      this.state.login ?
        <List email={this.state.email}></List> : (<div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel>email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <div 
              style={{border:1,borderColor:"black",width:20,height:10}}
              onClick={() => this.loginUser()}
            >
              Login
          </div>
            <Button
              id="registerPage"
              block
              bsSize="large"
              type="submit"
              onClick={() => this.props.registerPage()}
            >
              Register
          </Button>
          </form>
        </div>)
    );
  }
}