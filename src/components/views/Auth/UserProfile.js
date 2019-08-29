import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
const host = 'http://localhost:3005'



export default class UserProfile extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            firstName: "",
            followers: [],
            following: [],
            groups: [],
            lastName: "",
            username: "",
            _id: ""
        }
    }

    // componentDidUpdate(prevProps) {
    //     const { match: { params } } = this.props;

    //     console.log(`Params: ${params.userId}`)

    //     if (prevProps.match.params !== params){
    //       axios.post(`${host}/api/user/${params.userId}`)
    //         .then((response) => {
    //             // this.setState({
            
    //             // });
    //             console.log(response.data)

    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //     }
    //   }

      componentDidMount() {
        const { match: { params } } = this.props;

        console.log(`Params: ${params.userId}`)
        axios.post(`${host}/api/user/profile`, {
            userId: params.userId
        })
            .then((response) => {
                let body = response.data.body
                this.setState({
                    _id: body._id,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    username: body.username, 
                    following: body.following,
                    followers: body.followers,
                    groups: body.groups,
                    email: body.email
                });
                console.log(response.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        
      }
      
    render() {
        return (
            <div>
                <Container className="mt-3" component="main" maxWidth="xl">
                 
                        <h1>Profile Page</h1>
                        <h1>Profile Page</h1>
                        <h3>{this.state._id}</h3>
                        <h3>{this.state.firstName}</h3>
                        <h3>{this.state.lastName}</h3>
                        <h3>{this.state.email}</h3>
                        <h3>{this.state.followers}</h3>
                        <h3>{this.state.following}</h3>
                        <h3>{this.state.groups}</h3>
                   
                </Container>
            </div>
        )
    }
}
