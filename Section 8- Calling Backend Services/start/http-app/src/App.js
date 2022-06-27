import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService.js";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // no try catch block bc theres no expected errors, also no state to revert to
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    // axios.patch: updates one or more properties
    // axios.put: updates all properties
    await http.put(config.apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const postIdx = posts.indexOf(post);
    posts[postIdx] = { ...post };
    this.setState({ posts });
    // console.log("Update", data);
  };

  handleDelete = async (post) => {
    // optimistic update
    // assumes most of the time, call to server succeeds.
    // track original state, update UI first(makes UX seem fast), then wrap server in try catch an restore to original if needed

    // pessimistic update: update server first - if it fails nothing else runs.
    const originalPosts = this.state.posts;

    const posts = [...this.state.posts.filter((p) => p.id !== post.id)];
    this.setState({ posts });
    try {
      await http.delete("s" + config.apiEndpoint + "/" + post.id);
      // throw new Error("");
    } catch (ex) {
      // Expected error: invalid id (404 not found), submit bad/wrong data (400 bad req) -> all client errors
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted");

      // Unexpected error: (should not happen) network down, server down, db down, bug
      // need to log, and display generic and friendly error message
      // moved code to the axios interceptor
      // else {
      //   console.log("Logging error", ex);
      //   alert("Something failed while deleting a post!");
      // }
      this.setState({ posts: originalPosts });
    }
    // console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
