import React, { Component } from 'react'
import './creditCardPage.css'

export default class CreditCardPage extends Component {
    constructor(props){
        super(props);

        this.cardInputRef=React.createRef();
        this.cardLabelRef=React.createRef();

        this.IDInputRef=React.createRef();
        this.IDLabelRef=React.createRef();

        this.securityInputRef=React.createRef();
        this.securityLabelRef=React.createRef();
        
    }
    cardBtnClicked(){
        let flag=true;
        if(this.cardInputRef.current.value.length!==16||isNaN(Number(this.cardInputRef.current.value)))
        {
            this.cardLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.cardLabelRef.current.className="hideLabelcard"

        if(this.IDInputRef.current.value.length!==9||isNaN(Number(this.IDInputRef.current.value)))
        {
            this.IDLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.IDLabelRef.current.className="hideLabelcard"
      
        if(this.securityInputRef.current.value.length!==3||isNaN(Number(this.securityInputRef.current.value)))
        {
            this.securityLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.securityLabelRef.current.className="hideLabelcard"
     
        if(flag)
        {
            this.props.history.push(`/checkout/payment/order_number`)
        }
        // else
        //     window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="CreditCardDiv">
                <h3>Credit Card Information</h3>
                <label className="labelCard">Total:</label><span></span>
                <div className="cardDiv">
                    <label className="labelCard">Card Number:</label>
                    <input ref={this.cardInputRef} className="inputCard" type="text" id="card" placeholder="0000-0000-0000-0000"/><br/>
                    <div className="hideLabelcard" ref={this.cardLabelRef}><label className="redLabel" for="card">*Card number is invalid.</label></div>
                </div>
                <div className="cardDiv">
                    <label className="labelCard">Expiration date:</label>
                   <select>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>
                       <option>6</option>
                       <option>7</option>
                       <option>8</option>
                       <option>9</option>
                       <option>10</option>
                       <option>11</option>
                       <option>12</option>
                   </select>/
                   <select>
                       <option>2020</option>
                       <option>2021</option>
                       <option>2022</option>
                       <option>2023</option>
                       <option>2024</option>
                       <option>2025</option>
                       <option>2026</option>
                       <option>2027</option>
                       <option>2028</option>
                       <option>2029</option>
                       <option>2030</option>
                       <option>2031</option>
                   </select>
                </div>
                <div className="cardDiv">
                    <label className="labelCard">ID:</label>
                    <input ref={this.IDInputRef} className="inputCard" type="text" id="ID"/><br/>
                    <div className="hideLabelcard" ref={this.IDLabelRef}><label className="redLabel" for="card">*Please enter ID.</label></div>
                </div>
                <div className="cardDiv">
                    <label className="labelCard">CVV:</label>
                    <input ref={this.securityInputRef} className="inputCard" type="text" id="Security" maxLength="3"/><br/>
                    <div className="hideLabelcard" ref={this.securityLabelRef}><label className="redLabel" for="card">*Please enter security code.</label></div>
                </div>  

                <button className="cardBtn" onClick={this.cardBtnClicked.bind(this)}>Payment</button> 
            </div>
        )
    }
}
