import "./App.css"

import React, {Component} from 'react';
import {BrowserRouter as Router, Switch as router, Link, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debit from './components/Debit'
import Credit from './components/Credit'
    
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99'
      }
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance}/>)
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const DebitComponent = () => (<Debit accountBalance={this.state.accountBalance}/>)
    const CreditComponent = () => (<Credit accountBalance={this.state.accountBalance}/>)


    return (
      <div>
      <Router>     
        <router>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/debit" render={DebitComponent}/>
          <Route exact path="/credit" render={CreditComponent}/>
        </router>
      </Router>
      </div>
    );
  }
}   