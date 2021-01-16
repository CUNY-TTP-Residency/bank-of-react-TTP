import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

import Transaction from './Transaction';
import AccountBalance from './AccountBalance';

export default class Debit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        debits: [],
        accountBalance: this.props.accountBalance,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNewDebit = this.handleNewDebit.bind(this);
  }

  async componentDidMount() {
    try {
        let debit = await axios.get("https://moj-api.herokuapp.com/debits")
        this.setState({
            debits: debit.data
        })
    } catch (error) {
        console.error(error)
    }
  }

  handleNewDebit(event) {
    let name = document.getElementById("description").value;
    name = name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") //Uppercases all first letters.
    let amount = document.getElementById("amount").value;
    let date = Date.now();
    let id = ((Math.random()*99999).toString());
    let newDebit = {
        amount: amount,
        description: name,
        date: date,
        id: id,
    }
    let newDebits = this.state.debits;
    newDebits.unshift(newDebit);
    this.setState({
        debits: newDebits,
        accountBalance: parseFloat(this.state.accountBalance) - parseFloat(amount),
    })
  }



  render() {
      return(
          <div>
              <Link to="/">Homepage</Link> <br/>
              <Link to="/userProfile">Back</Link>
              <hr/>
              
              <h1> Debits </h1>
              <h3><AccountBalance accountBalance={this.state.accountBalance}/></h3>
              <> 
                <label htmlFor="description">Enter Debit: </label>
                <input type="text" id="description" name="description" placeholder="Uber"></input><br/>
                <label htmlFor="amount">Amount: </label>
                <input type="text" id="amount" name="amount" placeholder="$14.93"></input><br/>
                <button onClick={this.handleNewDebit}>Submit</button>
              </>

              {this.state.debits.map((transaction, index) => (
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