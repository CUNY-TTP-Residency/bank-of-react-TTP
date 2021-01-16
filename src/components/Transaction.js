import React, {Component} from 'react'

export default class Transaction extends Component {
    render() {
        return(
            <div>
                <>
                <h4 key={this.props.index}> {this.props.description} </h4>
                Amount: ${this.props.amount} <br/>
                Date: {this.props.date} <br/>
                Transaction ID: {this.props.id} <br/>
                </>
            </div>
        )
    }
}