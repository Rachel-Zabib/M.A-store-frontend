import React, { Component } from 'react';
import './header.css';
class Header extends Component{
   render(){
      return(
         <header>
            <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
               <div className="container-fluid">
                  <a className="navbar-brand" href="#">MakeUp</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse navBarMargin" id="navbarSupportedContent">
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link active" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link active" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link active" href="#"><i className="fas fa-shopping-cart"></i></a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link active" href="#"><i className="fas fa-heart"></i></a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link active" href="#"><i className="fas fa-user"></i></a>
                        </li>
                        
                     </ul>
                    
                     <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success searchBtn" type="submit"><i className="fas fa-search"></i></button>
                     </form>
                  </div>
               </div>
            </nav>
         </header>
      );
   }
}
export default Header;