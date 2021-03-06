import React, { Component } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import "../componentsCSS/newsTicker.scss";

const host = process.env.REACT_APP_API_HOST;

export class HomeUnauth extends Component {
    constructor() {
        super();
        this.state = {
            articles: []
        };
    }

    componentWillMount() {
        axios
            .get(host + "/api/news/general")
            .then(response => {
                this.setState({ articles: response.data.articles });
                console.log("UNAUTH ARTICLES");
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .finally(function() {});
    }

    render() {
        return (
            <Container className="mt-3" component="main" maxWidth="xl">
                <h1>HOME PAGE NOT LOGGED IN</h1>
                <Divider />
            </Container>
        );
    }
}
