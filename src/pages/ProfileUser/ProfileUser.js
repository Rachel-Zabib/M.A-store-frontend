import React, { Component } from 'react'
import './profileUser.css'
import { connect } from 'react-redux';
import {saveUser,removeUser} from '../../actions/userAction'
import {db} from '../../fireBase.config'

class ProfileUser extends Component {
    constructor(props){
        super(props);
        this.state={
            displaySaved:false,
            firstName:"",
            lastName:"",
            email:this.props.user?this.props.user.email:"",
            phone:"",
            city:"",
            street:"",
            building:"",
            apartment:"",
            post:""
        }
        this.checkCorrectDetails=this.checkCorrectDetails.bind(this)
          //refs
          this.nameLabelRef=React.createRef();
          this.lastNameLabelRef=React.createRef();
          this.emailLabelRef=React.createRef();
          this.phoneLabelRef=React.createRef();
          this.cityLabelRef=React.createRef(); 
          this.streetLabelRef=React.createRef();
          this.buildingLabelRef=React.createRef();
          this.apartmentLabelRef=React.createRef();
          this.postLabelRef=React.createRef();  
    }
    componentDidMount(){
        var userDetails = db.ref(`users/${this.props.user.uid}`);
        userDetails.on('value', (snapshot) => {
        const data = snapshot.val();
        this.setState({
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            phone:data.phone,
            city:data.city,
            street:data.street,
            building:data.building,
            apartment:data.apartment,
            post:data.post
        })
      });
    }

    saveDetailsBtnClicked(){
        let flag=this.checkCorrectDetails();
        if(flag){
            db.ref(`users/${this.props.user.uid}`).update(this.state);
            window.scrollTo(0, 0);
           this.setState({displaySaved:true});
           setTimeout(()=>{
            this.setState({displaySaved:false}); 
           },5000)
        }
        else{
            window.scrollTo(0, 0);
        }
    }
    checkCorrectDetails(){
        let flag=true;

        if(this.state.firstName==="")
        {  this.nameLabelRef.current.className="showLabel"
           flag=false;}
        else{
            this.nameLabelRef.current.className="hideLabelprof";
        }
        if(this.state.lastName==="")
        {  this.lastNameLabelRef.current.className="showLabel"
            flag=false;}
        else{
            this.lastNameLabelRef.current.className="hideLabelprof";
        }
        // if(this.state.email==""||!emailValidation(this.state.email))
        // {   this.emailLabelRef.current.className="showLabel"
        //     flag=false;}
        // else this.emailLabelRef.current.className="hideLabelprof"
    return flag;     
    }
   
    onSubmitForm(e){
        e.preventDefault();
    }
    render() {
        
        return (
            <div className="profileUserDiv">
                <div className="row justify-content-center">
                    <div className="sumDiv col-3">
                        <img src="https://react-material-dashboard.devias.io/static/images/avatars/avatar_6.png" alt=""/>
                        <h3>header name</h3>
                        <p>UPLOAD PICTURE</p>
                    </div>
                    <div className="profileDiv col-7">
                        <h3>Profile</h3>
                        <hr/>
                        {(this.state.displaySaved)? 
                        <p className={`greenP`}>The changes have been saved</p>:null}
                        <form className="row justify-content-center" onSubmit={this.onSubmitForm.bind(this)}>
                            <div className="inputDiv col-5">
                                <label className="Labels">*First name</label>
                                <input  className="inputProf" type="text" id="nameprof" value={this.state.firstName} onChange={(e)=>this.setState({firstName:e.target.value})}/><br/>
                                <div className="hideLabelprof" ref={this.nameLabelRef}><label className="redLabel">*Name is missing</label></div>
                            </div>
                            <div className="inputDiv col-5"> 
                                <label className="Labels">*Last name</label>
                                <input  className="inputProf" type="text" id="lastNameprof" value={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})}/><br/>
                                <div ref={this.lastNameLabelRef} className="hideLabelprof"><label className="redLabel">*Last name is missing</label></div>
                            </div>
                            <div className="inputDiv col-5">
                            <label className="Labels">*Email Address</label>
                                <input  className="inputProf" type="email" id="emailprof" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} disabled/><br/>
                                <div ref={this.emailLabelRef} className="hideLabelprof"><label className="redLabel">*Your email must be a valid email</label></div>
                            </div>
                            <div className="inputDiv col-5">
                                <label className="Labels">*Phone number</label>
                                <input  className="inputProf" type="tel" id="phoneProf"  value={this.state.phone} onChange={(e)=>this.setState({phone:e.target.value})}/><br/>
                                <div ref={this.phoneLabelRef} className="hideLabelprof"><label className="redLabel">*The phone number is incorrect</label></div>
                            </div>

                            <div className="inputDiv col-5">
                                <label className="Labels">*City</label>
                                <input  className="inputProf" type="text" id="cityProf"  value={this.state.city} onChange={(e)=>this.setState({city:e.target.value})}/><br/>
                                <div ref={this.cityLabelRef} className="hideLabelprof"><label className="redLabel">*City is missing</label></div>
                            </div>
                            <div className="inputDiv col-5">
                                <label className="Labels">*Street</label>
                                <input  className="inputProf" type="text" id="streetProf" value={this.state.street} onChange={(e)=>this.setState({street:e.target.value})}/><br/>
                                <div ref={this.streetLabelRef} className="hideLabelprof"><label className="redLabel" >*Street is missing</label></div>
                            </div>
                            <div className="inputDiv col-3">
                                <label className="Labels">*Building</label>
                                <input  className="inputProf" type="text" id="buildingProf" value={this.state.building} onChange={(e)=>this.setState({building:e.target.value})}/><br/>
                                <div ref={this.buildingLabelRef} className="hideLabelprof"><label className="redLabel">*Building is missing</label></div>
                            </div>
                            <div className="inputDiv col-3">
                                <label className="Labels">*Apartment</label>
                                <input  className="inputProf" type="text" id="apartmentProf" value={this.state.apartment} onChange={(e)=>this.setState({apartment:e.target.value})}/><br/>
                                <div ref={this.apartmentLabelRef} className="hideLabelprof"><label className="redLabel">*Apartment is missing</label></div>
                            </div>
                            <div className="inputDiv col-3">
                                <label className="Labels">*Post/Zip Code</label>
                                <input  className="inputProf" type="text" id="postProf" maxlength="7" value={this.state.post} onChange={(e)=>this.setState({post:e.target.value})}/><br/>
                                <div ref={this.postLabelRef} className="hideLabelprof"><label className="redLabel">*ZIP/Postal Code should be a 7-digit number, e.g. 1234567</label></div>
                            </div>
                            <button className="saveBtn col-4" onClick={this.saveDetailsBtnClicked.bind(this)}>SAVE DETAILES</button>
                        </form>

                    </div>

                </div>
                
            </div>
        )
    }
}
const mapStateToProps = store => ({
    user: store.userReducer.user
 });
 
 export default connect(mapStateToProps,{saveUser,removeUser})(ProfileUser);
 
//  function emailValidation(email)
//  {
//     if (!email.match(/^[\w\d]+@\w+[.]\w+([.]\w+){0,1}$/))//null
//          return false;
//      return true;
//  }




//לשנות מייל וסיסמא*** קטע קוד של גלעד
//  function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     // auth.currentUser
//     //   .updateEmail(emailRef.current.value)
//     //   .then(function () {
//     //     console.log("Update successful");
//     //     setLoading(false);
//     //   })
//     //   .catch(function (error) {
//     //     // An error happened.
//     //     setError("Failed to update account");
//     //   });

//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Passwords do not match");
//     }

//     const promises = [];
//     setLoading(true);
//     setError("");

//     if (emailRef.current.value !== currentUser.email) {
//       promises.push(auth.currentUser.updateEmail(emailRef.current.value));
//     }
//     if (passwordRef.current.value) {
//       promises.push(auth.currentUser.updatePassword(passwordRef.current.value));
//     }

//     Promise.all(promises)
//       .then(() => {
//         history.push("/");
//       })
//       .catch(() => {
//         setError("Failed to update account");
//       })
//       .finally(
    // .finally(() => {
    //     setLoading(false);
    //   });
