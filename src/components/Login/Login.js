import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './login.css'
import {auth} from "../../fireBase.config"
import firebase from "firebase/app"
import "firebase/auth"
import { connect } from 'react-redux';
import {saveUser} from '../../actions/userAction'

 class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            displayLabel:false
        }

        this.emailRef=React.createRef();
        this.passwordRef=React.createRef();
    }

    signInClicked=(e)=>{
        e.preventDefault();
        let email=this.emailRef.current.value;
        let password=this.passwordRef.current.value;
   
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          this.setState({displayLabel:false})
          this.saveAndHistory(user);
        
        })
        .catch((error) => {
          this.setState({displayLabel:true})
          window.scrollTo(0, 0);
        });
      }

      signInGoogleClicked=()=>{
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'})
        auth.signInWithPopup(provider)
             .then((result) => {
                 var user = result.user;
                 this.saveAndHistory(user);
 
             }).catch((error) => {
                 var errorMessage = error.message;
                 alert(errorMessage);
             });
     }
     signInFacebookClicked=()=>{
        let provider = new firebase.auth.FacebookAuthProvider();
       auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            this.saveAndHistory(user);

        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage);
        });
     }
     saveAndHistory=(user)=>{
        this.props.saveUser(user);//call action to save in user global state

          //בדיקה האם המשתמש הזה הוא מנהל ונעביר אותו ל ***
          // this.props.history.push("/manager");
          // אחרת נעבור לעמוד הבית
          this.props.history.push("/")
     }
    render() {
        return (
            <div className="loginDiv">
                <div className="containerLogin">
                    <h2>Login</h2>
                    <form>
                        {(this.state.displayLabel===false)?null:<label className="redLabell">The username or password you entered is incorrect , Please try again</label>}
                        <input  ref={this.emailRef}  className="inputs" type="email" id="email" name="email" placeholder="Email Address" required/><br/>
                        <input ref={this.passwordRef} className="inputs" type="password" id="pass" name="password" placeholder="Password" minlength="6" required/><br/>
                        <input type="checkbox" id="checkbox" name="remember-me" value="yes"/>
                        <label id="labelRemomber" for="remember-me"> Remember me</label><br/>
                        <span id="forgatA">Forgot password?</span><br/>
                        <button id="signInBtn" onClick={this.signInClicked}>Sign in</button>
                        <p>or</p>
                        <button className="signBtnGoogle" onClick={this.signInGoogleClicked}>Sign in with google</button><br/>
                        <button className="signBtnFacebook" onClick={this.signInFacebookClicked}>Sign in with facebook</button><br/>
                    </form>
                    <hr/>
                    <p>Not registered yet?</p>
                    <NavLink id="nanLink" to="/login/signup"><button id="signUpBtn">Sign up</button></NavLink>
                
                </div>
            </div>
        )
    }
}
const mapStateToProps = store => ({
    user: store.userReducer.user
});


export default connect(mapStateToProps,{saveUser})(Login);