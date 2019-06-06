import React, { Component } from "react";
import Login from "./Dialogs/Login";
import Register from "./Dialogs/Register";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerPage: false,
            login: false
        }
        this.sendRegisterPage = this.sendRegisterPage.bind(this);
        this.sendLoginPage = this.sendLoginPage.bind(this);
    }

    sendRegisterPage() {
        if (this.state.registerPage == false) {
            this.setState({ registerPage: true });
        }
    }

    sendLoginPage() {
        if (this.state.registerPage == true) {
            this.setState({ registerPage: false });
        }
    }

    getList(email) {
        this.setState({ email: email });
    }

    render() {
        return this.state.registerPage ? <Register loginPage={this.sendLoginPage} ></Register> : <Login registerPage={this.sendRegisterPage} ></Login>

    }
}