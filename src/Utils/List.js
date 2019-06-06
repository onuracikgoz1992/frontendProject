import React, { Component } from "react";
import "./../index.css";
import { Button } from "react-bootstrap";
import Utils from "./Util";

export const Item = ({ name, description, status, updateClick, deleteClick }) => {
    return (
        <div className="rowC">
            <div style={{ width: "20%", height: 50 }}>{name}</div>
            <div style={{ width: "20%", height: 50 }}>{description}</div>
            <div style={{ width: "20%", height: 50 }}>{status}</div>
            <div style={{ width: "20%", height: 50 }} onClick={() => updateClick(name)}>{"update"}</div>
            <div style={{ width: "20%", height: 50 }} onClick={() => deleteClick(name)}>{"delete"}</div>
        </div>
    );
}

export const CreateIssue = ({ handleChange, create }) => {
    return (
        <div>
            <div><input style={{ width: "50%", height: 50 }} placeholder={"Name"} onChange={(event) => handleChange("name", event.target.value)}></input></div>
            <div><input style={{ width: "50%", height: 50 }} placeholder={"Description"} onChange={(event) => handleChange("description", event.target.value)}></input></div>

            <Button onClick={() => create()}>create</Button>
            <Button onClick={() => handleChange("createIssue", false)}>cancel</Button>
        </div>
    );
}



export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            createIssue: false,
            data: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.createIssue = this.createIssue.bind(this);
        this.updateIssue = this.updateIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.successful = this.successful.bind(this);
        this.init = this.init.bind(this);
        this.init();
    }

    init() {
        let params = {
            email: this.props.email
        }
        Utils.request(params, "getList", this.successful, this.unsuccessful);

    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    listItem() {
        let itemsArr = [];
        let data = this.state.data;
        if (data) {
            let items = data.itemList ? data.itemList.items : "";
            if (items) {
                let keys = Object.keys(items);
                for (let k = 0; k < keys.length; k++) {
                    itemsArr.push(<Item name={items[keys[k]].name} description={items[keys[k]].description} status={items[keys[k]].status} updateClick={this.updateIssue} deleteClick={this.deleteIssue}></Item>)
                }
            }
        }
        return itemsArr;
    }

    createIssue() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        let params = {
            email: this.props.email,
            name: this.state.name,
            description: this.state.description,
            dateLine: today
        }
        Utils.request(params, "addItem", this.successful, this.unsuccessful);
    }

    updateIssue(name) {
        let params = {
            email: this.props.email,
            name: name
        }
        Utils.request(params, "updateItem", this.successful, this.unsuccessful);
    }

    deleteIssue(name) {
        let params = {
            email: this.props.email,
            name: name
        }
        Utils.request(params, "removeItem", this.successful, this.unsuccessful);
    }

    successful(data) {
        this.setState({ data: data, createIssue: false });
    }

    unsuccessful() {
        window.confirm("unsucessful");
    }

    render() {
        return (
            <div>
                {this.state.createIssue ? <CreateIssue create={this.createIssue} handleChange={this.handleChange}></CreateIssue> :
                    <div><div onClick={() => this.setState({ createIssue: true })}>Create Issue</div>
                        {this.listItem()}</div>}
            </div>
        );
    }
}