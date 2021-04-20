import React, { Component } from 'react'
//import { NavLink } from 'react-router-dom';
import './contactUs.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios';


export default class ContactUs extends Component {
    constructor(props){
        super(props);
        this.state={
            num:props.num
        }
        this.nameInputRef=React.createRef();
        this.nameLabelRef=React.createRef();
        this.emailInputRef=React.createRef();
        this.emailLabelRef=React.createRef();
        this.phoneInputRef=React.createRef();
        this.phoneLabelRef=React.createRef();
        this.messageRef=React.createRef();
        this.modalContactRef=React.createRef();
        this.modalFailureRef=React.createRef();
    }

    contactBtnClicked(){
        let flag=true;
        if(this.nameInputRef.current.value==="")
        {
            this.nameLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.nameLabelRef.current.className="hideLabel"

        if(this.emailInputRef.current.value===""||!emailValidation(this.emailInputRef.current.value))
        {
            this.emailLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.emailLabelRef.current.className="hideLabel"

        if(this.phoneInputRef.current.value===""||isNaN(Number(this.phoneInputRef.current.value))||!/^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(this.phoneInputRef.current.value))//or empty or not numbers or not in form of phone
        {
            this.phoneLabelRef.current.className="showLabel"
            flag=false;
        }
        else this.phoneLabelRef.current.className="hideLabel"
  
        if(flag)
        {
            let objContact={
                name:this.nameInputRef.current.value,
                email:this.emailInputRef.current.value,
                phone:this.phoneInputRef.current.value,
                message: this.messageRef.current.value  
            }
            //send the ticket to the server(the server save in db and send a email)
            axios.post("http://localhost:4000/api/tickets",objContact).then((res)=>{
                 //show the modal of sucsses
                let MyModalEl = this.modalContactRef.current
                var myModal = new bootstrap.Modal(MyModalEl, {
                    keyboard: false
                })
                myModal.show()
            }).catch((err)=>{
                    //show the modal of failed
                    let MyModalEl = this.modalFailureRef.current
                    var myModal = new bootstrap.Modal(MyModalEl, {
                        keyboard: false
                    })
                    myModal.show()
            })

           
        }
        else
            window.scrollTo(0, 0);

    }
    render() {
        return (
            <div className="contactUsDiv">
                <h2>Contact Us</h2>
                <p><span>tel:</span><span>1-800-5021-44</span></p>
                <hr/>

               <div className="formDiv">
                    <label className="labelContact">*Full Name</label><br/>
                    <input ref={this.nameInputRef} className="inputContact" type="text" id="nameInputt" /><br/>
                    <div className="hideLabel" ref={this.nameLabelRef}><label>*Name is missing</label></div>
                    <label className="labelContact">*Email Address</label><br/>
                    <input ref={this.emailInputRef} className="inputContact" type="email" id="emailInputt"/><br/>
                    <div ref={this.emailLabelRef} className="hideLabel"><label  for="email">*Your email must be a valid email</label></div>
                    <label className="labelContact">*Phone number</label><br/>
                    <input ref={this.phoneInputRef} className="inputContact" type="tel" id="phoneInputt" /><br/>
                    <div ref={this.phoneLabelRef} className="hideLabel"><label className="redLabel" >*The phone number is incorrect</label></div>
                    <textarea ref={this.messageRef} id="message" rows="5" cols="20" placeholder="Message Content..."></textarea>
                    <button id="contactBtn" onClick={this.contactBtnClicked.bind(this)}>Contact Us</button>
                  
               </div>
                {/* modal success */}
                <div ref={this.modalContactRef} class="modal fade" id={`modalContactId`} tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" style={{maxWidth: "400px"}}>
                        <div class="modal-content" style={{padding:"50px"}}>
                            <div class="modal-body">
                                <div className="modalstyle">
                                    <h3>your message send</h3>
                                    <p>Customer service will get back to you within 48 hours</p>
                                    <a href="/">Back to home</a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                 {/* modal failed */}
                 <div ref={this.modalFailureRef} class="modal fade" id={`modalFailureId`} tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" style={{maxWidth: "400px"}}>
                        <div class="modal-content" style={{padding:"50px"}}>
                            <div class="modal-body">
                                <div className="modalstyle">
                                    <h3>Your message failed</h3>
                                    <p>Please try sending again</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                        
                {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                </MapContainer> */}
               
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