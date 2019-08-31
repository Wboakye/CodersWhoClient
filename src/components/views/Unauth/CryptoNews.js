import React, { Component } from 'react'
import NewsCard from '../../NewsCard'
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import '../../componentsCSS/newsTicker.scss'

import Fade from '@material-ui/core/Fade';

const host = 'http://localhost:3005'

export default class CryptoNews extends Component {
    constructor(){
        super();
        this.state = {
            fade: false,
            articles:[]
        }
    }

    //Updates component when new params are input
    componentDidUpdate(prevProps) {
        const { match: { params } } = this.props;

        if (prevProps.match.params !== params){
          axios.get(`${host}/api/news/${params.subject}`)
            .then((response) => {
                this.setState({
                    fade: true,
                    articles: response.data.articles
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
      }


    componentWillMount(){
        const { match: { params } } = this.props;

        axios.get(`${host}/api/news/${params.subject}`)
            .then((response) => {
                this.setState({
                    fade: true,
                    articles: response.data.articles
                });
                console.log(response.data.articles)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <Container className="mt-3" component="main" maxWidth="xl">
                <h1> NEWS PAGE NOT LOGGED IN</h1>
                <Divider />
                <Fade
                in={this.state.fade}
                {...({ timeout: 750 })}
              > 
                    <div className='row mt-3'>
                        {this.state.articles.map((articles, index) => < NewsCard key={index} height="25%" articles={articles}/>)}
                    </div>
                </Fade>
            </Container>
        )
    }
}
