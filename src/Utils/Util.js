import axios from 'axios';
import React, { Component } from "react";
const request = (params, request, successful, unsuccessful) => {
    axios.post('http://localhost:8083/api/'+request, null, { params })
        .then(response => {
            if (successful) {
                console.log(response.data);
                if (response.data) {
                    successful(response.data);
                } else {
                    unsuccessful();
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            if (unsuccessful) {
                unsuccessful();
            }
        });
} 

export default { request }