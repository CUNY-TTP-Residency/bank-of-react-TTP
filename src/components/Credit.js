import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

import Transaction from './Transaction';
import AccountBalance from './AccountBalance';

export default class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        credits: [],
        accountBalance: this.props.accountBalance,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNewCredit = this.handleNewCredit.bind(this);
  }

  async componentDidMount() {
    try {
        let credit = await axios.get("https://moj-api.herokuapp.com/credits")
        this.setState({
            credits: credit.data
        })
    } catch (error) {
        console.error(error)
    }
  }

  handleNewCredit(event) {
    let name = document.getElementById("description").value;
    name = name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") //Uppercases all first letters.
    let amount = document.getElementById("amount").value;
    let date = Date.now();
    let id = ((Math.random()*99999).toString());
    let newCredit = {
        amount: amount,
        description: name,
        date: date,
        id: id,
    }
    let newCredits = this.state.credits;
    newCredits.unshift(newCredit);
    this.setState({
        credits: newCredits,
        accountBalance: parseFloat(this.state.accountBalance) + parseFloat(amount),
    })
  }



  render() {
      return(
          <div>
              <Link to="/">Homepage</Link> <br/>
              <Link to="/userProfile">Back</Link>
              <hr/>

              <h1> Credits </h1>
              <h3><AccountBalance accountBalance={this.state.accountBalance}/></h3>
              <> 
                <label htmlFor="description">Enter Credit: </label>
                <input type="text" id="description" name="description" placeholder="Uber"></input><br/>
                <label htmlFor="amount">Amount: </label>
                <input type="text" id="amount" name="amount" placeholder="$14.93"></input><br/>
                <button onClick={this.handleNewCredit}>Submit</button>
              </>

              {this.state.credits.map((transaction, index) => (
                    <Transaction 
                        key={index} 
                        description={transaction.description}
                        amount={transaction.amount}
                        date={transaction.date}
                        id={transaction.id}
                        
                    />
                ))}
          </div>
      )
  }
}