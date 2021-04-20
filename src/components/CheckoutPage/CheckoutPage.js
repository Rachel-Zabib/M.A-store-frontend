import React, { Component } from 'react'
//import { NavLink } from 'react-router-dom'
import SignUp from '../SignUp/SignUp'
import './checkoutPage.css'

export default class CheckoutPage extends Component {
    
    onSubmitFormSignUp(){
        //להוסיף לבסיס נתונים את המשתמש החדש הזה
        
    //    let usersArr=JSON.parse(localStorage.getItem("usersArray"));
    //    if(usersArr===null){
    //         usersArr=[];
    //    }
    //    usersArr.push()
      
    // localStorage.setItem("")
    }

    render() {
        return (
            <div className="checkoutPageDiv">
                <ul class="nav nav-tabs ulTabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="guest-tab" data-bs-toggle="tab" data-bs-target="#guest" type="button" role="tab" aria-controls="guest" aria-selected="true">Guest</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="signIn-tab" data-bs-toggle="tab" data-bs-target="#signIn" type="button" role="tab" aria-controls="signIn" aria-selected="false">Sign in</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="signUp-tab" data-bs-toggle="tab" data-bs-target="#signUp" type="button" role="tab" aria-controls="signUp" aria-selected="false">Sign up</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="guest" role="tabpanel" aria-labelledby="guest-tab">
                        <form action="/checkout/payment">
                            <input className="Inputs" type="email" id="EmailGuest" /*name="email"*/ placeholder="Email Address" required/><br/>
                            <button className="checkoutBtn">Proceed to checkout</button>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="signIn" role="tabpanel" aria-labelledby="signIn-tab">
                        {/*צריך קודם להעביר את המייל השמור בלוקל סטוראג אם קיים ואז בלחיצה לבדוק אם קיים בלוקל והסיסמא תקינה אם לא לרשום שגיאה ואם כן לעבור לדף התשלום*/}
                        <form action="/checkout/payment">
                            <input className="Inputs" type="email" id="Email" /*name="email"*/ placeholder="Email Address" required/><br/>
                            <input className="Inputs" type="password" id="Pass" placeholder="Password" minlength="6" required/><br/>
                            <input type="checkbox" id="checkbox" name="remember-me" value="yes"/>
                            <label id="LabelRemomber" for="remember-me"> Remember me</label><br/>
                            {/* <p id="ForgatA" >Forgot password?</p><br/> */}
                            <button className="checkoutBtn">Proceed to checkout</button>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="signUp" role="tabpanel" aria-labelledby="signUp-tab">
                         <SignUp actionForm="/checkout/payment" onSubmitForm={this.onSubmitFormSignUp.bind(this)} header2="" btnText="Sign and checkout"/>
                    </div>
                </div>
            </div>
        )
    }
}
