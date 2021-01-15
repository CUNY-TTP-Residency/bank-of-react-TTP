import AccountBalance from "./AccountBalance";
import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom"

class Debit extends Component{
    constructor(props){
        super(props);
        this.state ={
            debit:{
                id: "",
                description: "",
                date: "",
                amount: ""
            },
            redirect: false
            


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleChange(event){
        const updatedDebit = {...this.state.debit}
        const inputField = event.target.name
        const inputValue = event.target.value
        updatedDebit[inputField] = inputValue

        this.setState({
            debit: updatedDebit
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.setState({
            
        })
    }

    

      

    
    render(){
        return(
            <div>
                <h1>Debit</h1>
                <Link to="/">Home</Link>

                <div>
                    Account balance: <AccountBalance accountBalance ={this.props.accountBalance}/>
                    <br/>
                     
                </div>
                
                <div>
                    <form onSubmit="{this.handleSubmit}">
                        <div>
                            <label htmlFor="description">description</label>
                            <input type="text" name="desription" onChange={this.handleChange} value={this.state.debit.description}/>
                        </div>
                        <div>
                            <label htmlFor="amount">amount</label>
                            <input type="number" name="debit ammount" onChange={this.handleChange} value={this.state.debit.amount}/>
                        </div>
                        <button>submit</button>





                    </form>
                </div>
                
        


            
            
            
            </div>
            

        )
    }
}

export default Debit;
