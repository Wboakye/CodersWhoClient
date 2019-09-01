import React, { Component } from 'react'

import Container from '@material-ui/core/Container';


export class Home extends Component {
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <Container className="mt-3" component="main" maxWidth="xl">

                <h1>HOMEPAGE</h1>
                <h1>HOMEPAGE</h1>
                <h1>HOMEPAGE</h1>
                <h1>HOMEPAGE</h1>
                <h1>HOMEPAGE</h1>
                <h1>HOMEPAGE</h1>
                <h1>HOMEPAGE</h1>
            </Container>
        )
    }
}
