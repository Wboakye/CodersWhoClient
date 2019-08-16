import React, { Component } from 'react'
import NewsCard from '../../NewsCard'
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import './unauth.scss'



const host = 'http://localhost:3005'

export class HomeUnauth extends Component {
    constructor(){
        super();
        this.state = {
            articles:[]
        }
    }

    componentWillMount(){
        axios.get(host + '/api/news/general')
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
                <h1>HOME PAGE NOT LOGGED IN</h1>
                <Divider />
                <div className='row mt-3'>
                    {this.state.articles.map((articles, index) => < NewsCard key={index} articles={articles}/>)}
                </div>
                <div className="ticker-wrap">
                    <div className="ticker">
                        {this.state.articles.map((articles, index) => <div className="ticker__item" href={articles.url}>{articles.title}</div>)}
                    </div>
                </div>
            </Container>
        )
    }
}
