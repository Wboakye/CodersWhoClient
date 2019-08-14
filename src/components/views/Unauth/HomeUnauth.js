import React, { Component } from 'react'

import Container from '@material-ui/core/Container';


export class HomeUnauth extends Component {
    render() {
        return (
            <Container className="mt-3" component="main" maxWidth="xl">

                <h1>HOMEPAGE NOT LOGGED IN</h1>
            </Container>
        )
    }
}
