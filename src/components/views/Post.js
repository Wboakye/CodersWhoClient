import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

import TextEditor from "../TextEditor";

import "../componentsCSS/textEditor.css";
import { theme } from "../theme";

const host = "http://localhost:3005";

export class Post extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
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
      date: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    this.refs.child.submit();
  }

  componentDidMount() {
    this._isMounted = true;

    const {
      match: { params }
    } = this.props;

    console.log(`Params Did Mount: ${params.postId}`);
    axios
      .get(`${host}/api/posts/${params.postId}`)
      .then(response => {
        console.log("Finished API Fetch");
        if (this._isMounted) {
          let body = response.data;
          this.setState({
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
          console.log(this.state);
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
                    <TextEditor placeholder="Leave a comment..." ref="child" />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleSubmit}
                    >
                      Post
                    </Button>
                  </Paper>
                  <Paper className="p-3 mb-1" style={{ minWidth: 275 }}>
                    Comments
                  </Paper>
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
