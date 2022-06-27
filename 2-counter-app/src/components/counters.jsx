import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { onReset, counters, onDelete, onIncrement, onDecrement } =
      this.props;

    return (
      <>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        <table className="table">
          <tbody>
            {counters.map((counter) => (
              <Counter
                key={counter.id} //used internally in react, cannot access so we need to pass it again in id
                onDelete={onDelete}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                // value={counter.value}
                // id={counter.id}
                counter={counter} // pass the entire object instead to carry all the data needed
              >
                {/* passing in children prop, not gonna use tho */}
                {/* <h4>Counter #{counter.id}</h4> */}
              </Counter>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Counters;
