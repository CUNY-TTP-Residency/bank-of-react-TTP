import "./App.css"
import axios from "axios";
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debit from "./components/debit";
    
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
        debitInfo: []
      }
    }
  }

  componentDidMount(){
    axios.get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const transaction = response.data;
      this.setState({
        debitInfo: transaction
      })

      
    }).catch(console.error())
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance}/>)
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const DebitComponent = () => (<Debit debit={this.state.debit} accountBalance={this.state.accountBalance} addDebit={this.addDebit}/>)
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debit" render={DebitComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
        </div>
      </Router>
    );
  }
}   