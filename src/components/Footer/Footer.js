import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';

class Footer extends Component{
   render(){
      return(
         <footer>
            <div className="row containerFooter">
               <div className="col-12 col-sm-6 col-lg-4 ma">
                  <p><NavLink to="/about">About Us</NavLink></p>
                  <p><NavLink to="/contact">Contact Us</NavLink></p>
               </div>
               <div className="col-12  col-sm-6 col-lg-4 ma">
               <p><NavLink to="/policy">Policy</NavLink></p>
               <p><NavLink to="/shipping-Policy">Shipping Policy</NavLink></p>
               </div>
                <div className="col-12 col-sm-6 col-lg-4 ma"> 
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i id="instagramI" className="fab fa-instagram footerI"></i></a>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer"> <i id="facebookI" className="fab fa-facebook-f footerI"></i></a>
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><i id="youtubeI" className="fab fa-youtube footerI"></i></a>
                </div>
                <p id="pRights">M.A© Makeup Art all rights reserved</p>
            </div>
           
         </footer>
      );
   }
}
export default Footer;