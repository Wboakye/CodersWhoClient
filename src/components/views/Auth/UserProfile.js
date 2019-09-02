import React, { Component } from 'react'
import axios from 'axios'
import PostsCard from '../../PostsCard'
import ProfileCard from '../../ProfileCard'
import ProfileActions from '../../ProfileActions'



const host = 'http://localhost:3005'



export default class UserProfile extends Component {
    _isMounted = false;
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
            _id: "",
            posts: []

        }
    }

    // componentDidUpdate(prevProps) {
    //     const { match: { params } } = this.props;

    //     console.log(`Params Update: ${params.userId}`)

    //     if (prevProps.match.params !== params){
    //       axios.post(`${host}/api/user/${params.userId}`)
    //         .then((response) => {
    //             let body = response.data.body
    //             this.setState({
    //                 _id: body._id,
    //                 firstName: body.firstName,
    //                 lastName: body.lastName,
    //                 username: body.username, 
    //                 following: body.following,
    //                 followers: body.followers,
    //                 groups: body.groups,
    //                 email: body.email,
    //                 posts: body.posts
    //             });
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //     }
    //   }

      componentDidMount() {
        this._isMounted = true;

        const { match: { params } } = this.props;

        console.log(`Params Did Mount: ${params.userId}`)
        axios.post(`${host}/api/user/profile`, {
            userId: params.userId
        })
            .then((response) => {
                console.log('Finished API Fetch')
                if (this._isMounted) {
                    let body = response.data.body
                    this.setState({
                        _id: body._id,
                        firstName: body.firstName,
                        lastName: body.lastName,
                        username: body.username, 
                        following: body.following,
                        followers: body.followers,
                        groups: body.groups,
                        email: body.email,
                        posts: body.posts
                    });
                    console.log('updated state')
                }
            })
            .catch(function (err) {
                // handle error
                console.log(`USER PROFILE ERROR: ${err}`);
            })
        
      }
      componentWillUnmount() {
        this._isMounted = false;
      }
      
    render() {
        let actionsInfo = {
            following: this.state.following,
            followers: this.state.followers,
            groups: this.state.groups
        }
        return (
            <div className="my-3 my-md-5">
                <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <ProfileCard user={this.state}/>
                        <ProfileActions actionsInfo={actionsInfo}/>                       
                    </div>
                    <div className="col-lg-8">
                        {this.state.posts.map((post, index) => < PostsCard className="mb-3" key={index} height="25%" post={post}/>)}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
