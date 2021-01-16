import AccountBalance from "./AccountBalance";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Display from "./display";

class Debit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debit: {
        id: "",
        description: "",
        amount: "",
        date: "",
      },
    };

  }



  handleChange = (event) => {
    const name = event.target.name;
    const inputValue = event.target.value;
    const newDebit = { ...this.state.debit };

    newDebit[name] = inputValue;
        this.setState({
            debit: newDebit
        })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.newCredit(this.state.debit);

  }

  render() {
    return (
      <div>
        <h1>Debit</h1>
        <Link to="/">Home</Link>

        <div>
          <AccountBalance accountBalance={this.props.accountBalance} />
        </div>

        <div>
          <h1>new transaction</h1>
          <form onSubmit={this.handleSubmit}>
            <label for="description">Description:</label>
            <input
              name="description"
              value={this.state.debit.description}
              onChange={this.handleChange}
              placeholder="eg. food"
            />
            <label for="amount">Amount:</label>
            <input
              name="amount"
              value={this.state.debit.amount}
              onChange={this.handleChange}
              placeholder="eg. 120"
            />
            <button>add debit</button>
            </form>
            </div> 
          
        

        <div>
          <h1>Past transaction:</h1>
        </div>
        <div>
          {this.props.debit.map((debit) => (
            <Display
              key={debit.id}
              description={debit.description}
              amount={debit.amount}
              date={debit.date}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Debit;
