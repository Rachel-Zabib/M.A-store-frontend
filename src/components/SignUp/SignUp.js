import React, { Component } from 'react'
import propTypes from 'prop-types'
import './signUp.css'
import {auth,db} from "../../fireBase.config"
import firebase from "firebase/app"
import { connect } from 'react-redux';
import {saveUser} from '../../actions/userAction'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            displayLabel:false
        }

        this.nameLabelRef=React.createRef();
        this.nameInputRef=React.createRef();
        this.lastNameLabelRef=React.createRef();
        this.lastNameInputRef=React.createRef();
        this.emailLabelRef=React.createRef();
        this.emailInputRef=React.createRef();
        this.passInputRef=React.createRef();
        this.passLabelRef=React.createRef();
        this.passConfirmInputRef=React.createRef();
        this.passConfirmLabelRef=React.createRef();

        this.formRef=React.createRef();

        this.saveInRealTimeDB=this.saveInRealTimeDB.bind(this);

    }
    signInBtnClicked(e)
    {
        e.preventDefault();
        this.setState({displayLabel:false})
        let flag=true;
        if(this.nameInputRef.current.value=="")
        {
            this.nameLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.nameLabelRef.current.className="hideLabel";
        if(this.lastNameInputRef.current.value=="")
        {
            this.lastNameLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.lastNameLabelRef.current.className="hideLabel";

        if(this.emailInputRef.current.value==""||!emailValidation(this.emailInputRef.current.value))
        {
            this.emailLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.emailLabelRef.current.className="hideLabel";

        if(this.passInputRef.current.value.length<6)
        {
            this.passLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.passLabelRef.current.className="hideLabel";


        if(this.passInputRef.current.value!=this.passConfirmInputRef.current.value)
        {
            this.passConfirmLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.passConfirmLabelRef.current.className="hideLabel";

     
        if(flag)
        {
            // this.props.onSubmitForm && this.props.onSubmitForm();//&& is ?
            this.signUpClicked();
        }
        else{
            e.preventDefault();
        }
    
    }

    signUpClicked=()=>{
        let email=this.emailInputRef.current.value;
        let password=this.passInputRef.current.value;
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            this.saveAndHistory(user);
        })
        .catch((error) => {
            this.setState({displayLabel:true})
            alert(error)
            window.scrollTo(0, 0);
        }); 
    }
    signUpGoogleClicked=()=>{
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
     signUpFacebookClicked=()=>{
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
        this.saveInRealTimeDB(user);//save the details of new user in realtime  firebase
        this.props.history.push(this.props.actionForm);//default to home or payment
     }
     saveInRealTimeDB(user){
        
        let userDetails={
            id:user.uid,//*** 
            firstName:(this.nameInputRef.current.value.length!=0)?this.nameInputRef.current.value.length:user.displayName,
            lastName:this.lastNameInputRef.current.value,
            email:this.emailInputRef.current.value,
            phone:"",
            city:"",
            street:"",
            building:"",
            apartment:"",
            post:"",
            active:"true",
            role:"user",
            //password and if with google so google id***
          }
        
          db.ref('users/' + user.uid).set(userDetails);
     }

    render() {
        return (
            <div className="signUpDiv">
                <div className="containerSignUp">
                    <h2>{this.props.header2}</h2>
                    <form ref={this.formRef} /*action={this.props.actionForm} onSubmit={this.props.onSubmitForm}*/>
                    {(this.state.displayLabel===false)?null:<label className="redLabell">The email address is already in use by another account , Please try again</label>}
                        <input ref={this.nameInputRef} className="inputSignUp" type="text" id="nameInput" /*name="name"*/ placeholder="First name" /><br/>
                        <div className="hideLabel" ref={this.nameLabelRef}><label for="name">*Name is missing</label></div>
                        <input ref={this.lastNameInputRef} className="inputSignUp" type="text" id="lastNameInput" /*name="lastName"*/ placeholder="Last name" /><br/>
                        <div ref={this.lastNameLabelRef} className="hideLabel"><label  for="lastName">*Last name is missing</label></div>
                        <input ref={this.emailInputRef} className="inputSignUp" type="email" id="emailInput" /*name="email"*/ placeholder="Email Address" required/><br/>
                        <div ref={this.emailLabelRef} className="hideLabel"><label  for="email">*Your email must be a valid email</label></div>
                        <input ref={this.passInputRef} className="inputSignUp" type="password" id="passInput" placeholder="Password" minlength="6" required/><br/>
                        <div ref={this.passLabelRef} className="passwordLabel"><label  for="password">*6 characters are required in the password</label></div>
                        <input ref={this.passConfirmInputRef} className="inputSignUp" type="password" id="passInputConfirm" placeholder="Confirm password" minlength="6" required/><br/>
                        <div ref={this.passConfirmLabelRef} className="hideLabel"><label  for="emaconfirmPasswordil">*Password didn't match</label></div>
                        
                        <button id="signInBtn" onClick={this.signInBtnClicked.bind(this)}>{this.props.btnText}</button>
                        <p>or</p>
                        <button className="signBtnGoogle" onClick={this.signUpGoogleClicked}>Sign in with google</button><br/>
                        <button className="signBtnFacebook" onClick={this.signUpFacebookClicked}>Sign in with facebook</button><br/>
                    </form>
                   
                </div>
            </div>
        )
    }
}


function emailValidation(email)
{
   if (!email.match(/^[\w\d]+@\w+[.]\w+([.]\w+){0,1}$/))//null
        return false;
    return true;
}

SignUp.defaultProps={
    header2:"Sign up",
    btnText:"Sign up",
    actionForm:"/"
}
const mapStateToProps = store => ({
    user: store.userReducer.user
});

export default connect(mapStateToProps,{saveUser})(SignUp);



// export function auth (email, pw, name) {
//     return firebaseAuth.createUserWithEmailAndPassword(email, pw)
//   //   .then(localStorage.setItem('connect',JSON.stringify({})))
//       .then(saveUser)
//       .then(console.log("new user add!"))
//   }
  

// export function saveUser () {
//     let user = firebase.auth().currentUser;
//       console.log(user)
//     return ref.child(`users/${user.uid}/info`)
//       .set({
//         email: user.email,
//         name:this.state.name,
//         uid: user.uid,
//         displayName:JSON.parse(localStorage.getItem('connect')),
//       })
//       .then(() => user)
//     }
  
