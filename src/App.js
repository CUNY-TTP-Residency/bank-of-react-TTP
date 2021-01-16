import "./App.css";
import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/LogIn";
import Debit from "./components/debit";
import Credit from "./components/credit";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
        debit: [],
        credit: [],
        totalDebit: 0,
        totalCredit: 0,
      },
    };
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        let sum1 = 0;

        for (const transaction of data) {
          sum1 += transaction.amount;
        }
        this.setState({
          debit: data,
          totalDebit: sum1,
        });
        this.setState({
          accountBalance: 
            this.state.totalCredit - this.statetotalDebit
          
        });
      })
      .catch(console.error());

    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((res) => {
        const data = res.data;
        let sum2 = 0;

        for (const transaction of data) {
          sum2 += transaction.amount;
        }
        this.setState({
          credit: data,
          totalCredit: sum2,
        });

        this.setState({
          accountBalance: 
            this.state.totalCredit - this.statetotalDebit
          
        });
      })
      .catch(console.error());
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  newDebit = (transaction) => {
    transaction.id =  ((Math.random()*99999).toString);
    let date = new Date();
    transaction.date = date.toISOString();
    let newDebitArr = { transaction, ...this.state.debit };
    this.setState({
      debit: newDebitArr,
    });
  };

  newCredit = (transaction) => {
    transaction.id = ((Math.random()*99999).toString);
    let date = new Date();
    transaction.date = date.toISOString();
    let newCreditArr = { transaction, ...this.state.credit };
    this.setState({
      credit: newCreditArr,

    });
  };

  render() {
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
        accountBalance={this.state.accountBalance}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const DebitComponent = () => (
      <Debit
        debit={this.state.debit}
        accountBalance={this.state.accountBalance}
        newDebit={this.newDebit}
      />
    );
    const CreditComponet = () => (
      <Credit
        credit={this.state.credit}
        accountBalance={this.state.accountBalance}
        newCredit={this.newCredit}
      />
    );

    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={LogInComponent} />
        <Route exact path="/debit" render={DebitComponent} />
        <Route exact path="/credit" render={CreditComponet} />
        <Route exact path="/userProfile" render={UserProfileComponent} />
      </Router>
    );
  }
}
