import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AccountBalance from './AccountBalance';

export default class UserProfile extends Component {
  render() {
    return (
        <div>
          <Link to="/debit">Debit</Link> <br/>
          <Link to="/credit">Credit</Link>
          <hr/>

          <h1>User Profile</h1>
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          <AccountBalance accountBalance={this.props.accountBalance} />
          
        </div>
    );
  }
}