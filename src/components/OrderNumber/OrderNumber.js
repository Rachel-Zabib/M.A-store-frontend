import React, { Component } from 'react'
import './orderNumber.css'

export default class OrderNumber extends Component {
    constructor(props){
        super(props);
        this.objOrder=JSON.parse(localStorage.getItem("objOrder"));
        // this.randomOrderNumber=Math.floor(Math.random()*1000000)
    }
    backHome(){
        localStorage.removeItem("objOrder");
       // this.props.history.push("/");
    }
    componentWillUnmount(){
        localStorage.removeItem("objOrder");
    }
    render() {
        return (
            <div className="OrderNumberDiv">
                <h3>success!</h3>
                <p className="p1">We have recived your order</p>
                <p>Your transaction number: <span><b>{this.objOrder.id}</b></span></p>
                <p>You will receive a email to <b>{this.objOrder.email}</b> with your transaction number</p>
                <a href="/" onClick={this.backHome.bind(this)}>Back to home</a>
            </div>
        )
    }
}
