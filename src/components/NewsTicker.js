import React, { Component } from "react";
import axios from "axios";
import "./componentsCSS/newsTicker.scss";
const host = "http://localhost:3005";

export default class NewsTicker extends Component {
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
        console.log(response.data.articles);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {});
  }

  render() {
    return (
      <div className="ticker-wrap">
        <div className="ticker">
          {this.state.articles.map((articles, index) => (
            <div className="ticker__item" href={articles.url}>
              {articles.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
