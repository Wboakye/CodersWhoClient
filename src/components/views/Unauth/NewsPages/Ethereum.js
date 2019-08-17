import React, { Component } from 'react'
import NewsCard from '../../../NewsCard'
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import '../../../componentsCSS/newsTicker.scss'

import NewsTicker from '../../../NewsTicker'

const host = 'http://localhost:3005'

export default class EthereumNews extends Component {
    constructor(){
        super();
        this.state = {
            articles:[]
        }
    }

    componentWillMount(){
        axios.get(host + '/api/news/ethereum')
            .then((response) => {
                this.setState({articles: response.data.articles});
                console.log(response.data.articles)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally( function() {

            });
    }

    render() {
        return (
            <Container className="mt-3" component="main" maxWidth="xl">
                <h1> NEWS PAGE NOT LOGGED IN</h1>
                <Divider />
                <div className='row mt-3'>
                    {this.state.articles.map((articles, index) => < NewsCard key={index} articles={articles}/>)}
                </div>
                < NewsTicker />
            </Container>
        )
    }
}
