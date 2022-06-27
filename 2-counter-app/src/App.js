import NavBar from "./components/navbar";
import Counters from "./components/counters";
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  // constructor() {
  //   super();
  //   console.log("App - Constructor");
  // }

  componentDidMount() {
    // Ajax call to some server
    // this.setState({})
    console.log("App - Mounted");
  }

  handleIncrement = (counter) => {
    // console.log("Event handler called", counterId);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleDelete = (counter) => {
    // console.log("Event handler called", counterId);
    const counters = this.state.counters.filter((c) => c.id !== counter.id);
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  render() {
    console.log("App - Render");
    return (
      <>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            counters={this.state.counters}
          />
        </main>
      </>
    );
  }
}

export default App;

// function App() {

// }
