// jsx gets better code completion
// controlled component, no local states and completely controlled by parent
import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    // can use the cahnges in props and state objects to decide whether we should make a server call
  }
  componentWillUnmount() {
    // called when the component is unrendered
  }
  // state = {
  //   value: this.props.counter.value, // only updated when first created
  //   // imageUrl: "https://picsum.photos/200",
  //   tags: [],
  //   // tags: ["tag1", "tag2", "tag3"],
  // };

  //   conditionally render content
  // renderTags() {
  //   if (this.state.tags.length === 0) return <p>There are no tags!</p>;
  //   return (
  //     <ul>
  //       {this.state.tags.map((tag) => (
  //         //   need a key property when using map so React knows what exacty changed
  //         <li key={tag}>{tag}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this); // need this to set `this`, or maybe use arrow fn
  //   }
  //   handleIncrement() {
  //     console.log("Increment clicked", this);
  //   }

  // Must raise an event and have the parent change it
  // handleIncrement = () => {
  //   // console.log(product);
  //   console.log("Increment clicked", this);
  //   this.setState({ value: this.state.value + 1 });
  // };
  render() {
    // this.props are inputs passed to this child class from counters
    // console.log("props", this.props);
    return (
      // React.Fragment allows us to add multiple children but without double divs
      // <React.Fragment>
      <div className="row">
        {/* <img src={this.state.imageUrl} alt="" /> */}

        {/* {this.props.children} */}
        <div className="col-1">
          {/* we can write any valid js expression, this refers to the current class */}
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            // can simply pass a product object to a fn by calling it in an arrow fn
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
          >
            <Icon.PlusLg />
          </button>
          <button
            // can simply pass a product object to a fn by calling it in an arrow fn
            onClick={() => this.props.onDecrement(this.props.counter)}
            className={this.formatDecrement()}
            disabled={this.props.counter.value === 0 ? "a" : ""}
          >
            <Icon.Dash />
          </button>
          {/* This modifies a value originating from counters.jsx, so that component should handle modifying the value */}
          {/* We'll raise an event here and handle it in counters.jsx */}
          <button
            onClick={() => this.props.onDelete(this.props.counter)}
            className="btn btn-danger btn-sm m-2"
          >
            <Icon.X />
          </button>
        </div>

        {/* The logical and between non boolean values, '' is falsy but non empty strings are truthy*/}
        {/* {this.state.tags.length === 0 && "Please create a new tag!"} */}

        {/* {this.renderTags()} */}
        {/* </React.Fragment> */}
      </div>
    );
  }

  formatDecrement() {
    let classes = "btn btn-secondary btn-sm m-2";
    // classes +=
    return classes;
  }
  handleCount() {
    return this.props.counter.value > 0 ? false : true;
  }
  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
