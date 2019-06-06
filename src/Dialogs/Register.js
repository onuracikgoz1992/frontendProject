import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Utils from "./../Utils/Util";

export default class Register extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      email: "",
      password: "",
      name:"",
      surname:"",
      error:""
    };
    this.successfullRegister=this.successfullRegister.bind(this);
  }
  

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }
  
  successfullRegister(){
    window.confirm('Kullanıcı kayıtı başarılı oldu. Giriş yapmak için login sayfasına yönlenin.'); 
    this.setState({name:"",surname:"",name:"",email:"",password:"",error:""})
  }

  unsuccessfullRegister(){
    window.confirm('Farklı kullanıcı ile kayıt olunuz veya sistemsel bir hatadan kaynaklı olabilir.');  
  }

  register(){
    let params={
      name:this.state.name,
      surname:this.state.surname,
      email:this.state.email,
      password:this.state.password
    }
    Utils.request(params,"registerUser",this.successfullRegister,this.unsuccessfullRegister); 
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
            <FormLabel>Name</FormLabel>
            <FormControl
              autoFocus
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="surname" bsSize="large">
            <FormLabel>Surname</FormLabel>
            <FormControl
              autoFocus
              type="surname"
              value={this.state.surname}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
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
          <Button
            block
            bsSize="large" 
            type="submit"
            onClick={()=>this.props.loginPage()}
          >
            LoginPage
          </Button>
          <Button
            block
            bsSize="large" 
            type="submit"
            onClick={()=>this.register()}
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}