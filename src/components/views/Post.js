import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

import PostComment from "../PostComment";

import store from "../../redux/store";
import TextEditor from "../TextEditor";

import "../componentsCSS/textEditor.css";
import { theme } from "../theme";

const jwtDecode = require("jwt-decode");
const host = process.env.REACT_APP_API_HOST;

export class Post extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      likes: [],
      comments: [],
      title: "",
      subTitle: "",
      description: "",
      group: "",
      userId: "",
      firstName: "",
      lastName: "",
      username: "",
      date: "",
      mustSignInModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postNewComment = this.postNewComment.bind(this);
  }

  handleSubmit() {
    this.refs.child.submit();
  }

  postNewComment(comment) {
    if (!store.getState().auth.isLoginSuccess) {
      alert("Not Logged In");
      this.setState({ mustSignInModal: true });
    } else {
      const token = sessionStorage.getItem("CWJWT");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      const firstName = decodedToken.firstName;
      const lastName = decodedToken.lastName;
      const username = decodedToken.username;
      const date = Date.now();
      const _id =
        date.toString(36) +
        Math.random()
          .toString(36)
          .substr(2);

      let newComment = {
        date: date,
        _id: _id,
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        username: username,
        comment: comment
      };
      console.log("axios post");
      axios
        .patch(`${host}/api/posts/comment/${this.state._id}`, newComment)
        .then(response => {
          console.log(response);
          let body = response.data;
          this.setState({
            _id: body._id,
            likes: body.likes,
            comments: body.comments,
            title: body.title,
            subTitle: body.subTitle,
            description: body.description,
            group: body.group,
            userId: body.userId,
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            date: body.date
          });
        })
        .catch(function(err) {
          // handle error
          console.log(` NEW COMMENT ERROR: ${err}`);
        });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    const {
      match: { params }
    } = this.props;

    axios
      .get(`${host}/api/posts/${params.postId}`)
      .then(response => {
        console.log("Finished API Fetch");
        if (this._isMounted) {
          let body = response.data;
          this.setState({
            _id: body._id,
            likes: body.likes,
            comments: body.comments,
            title: body.title,
            subTitle: body.subTitle,
            description: body.description,
            group: body.group,
            userId: body.userId,
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            date: body.date
          });
        }
      })
      .catch(function(err) {
        // handle error
        console.log(`POST ERROR: ${err}`);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <ThemeProvider theme={theme}>
          <Fade in={true} {...{ timeout: 750 }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mb-3">
                  <Paper className="p-3 mb-3" style={{ minWidth: 275 }}>
                    <div className="my-3">
                      <h3>{this.state.title}</h3>
                    </div>
                    <div className="my-3">
                      <h4>{this.state.subTitle}</h4>
                    </div>
                    <div className="my-3">
                      <h6>{`By ${this.state.firstName} ${this.state.lastName}`}</h6>
                    </div>
                    <div>{this.state.description}</div>
                  </Paper>
                  <Paper className="p-3 mb-3" style={{ minWidth: 275 }}>
                    <TextEditor
                      placeholder="Leave a comment..."
                      ref="child"
                      postNewComment={this.postNewComment}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleSubmit}
                    >
                      Post
                    </Button>
                  </Paper>
                  {this.state.comments.reverse().map((comment, index) => (
                    <PostComment comment={comment} key={index} />
                  ))}
                </div>
                <div className="col-lg-4">USER INFO</div>
              </div>
            </div>
          </Fade>
        </ThemeProvider>
      </div>
    );
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
