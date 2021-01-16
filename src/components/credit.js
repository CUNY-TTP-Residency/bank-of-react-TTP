import AccountBalance from "./AccountBalance";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Display from "./display"

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credit: {
        id: "",
        description: "",
        amount: "",
        date: "",
      },
    };

  }
  render() {
    return (
      <div>
          <div>
        <h1>credit</h1>
        <Link to="/">Home</Link>
        <div>
          <AccountBalance accountBalance={this.props.accountBalance} />
        </div>

        </div>

        
        
        <div>
          <h1>Past transaction:</h1>
        </div>
        <div>
          {this.props.credit.map((credit) => (
            <Display
              key={credit.id}
              description={credit.description}
              amount={credit.amount}
              date={credit.date}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Credit;
