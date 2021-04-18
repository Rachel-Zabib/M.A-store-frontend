import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProductDropDown from '../ProductDropDown/ProductDropDown';
import './header.css';
import {auth} from "../../fireBase.config"
import { connect } from 'react-redux';
import {saveUser,removeUser} from '../../actions/userAction'

class Header extends Component{
   constructor(props){
      super(props)

      this.calcSubtotal=this.calcSubtotal.bind(this);
      this.totalItems=this.totalItems.bind(this);
      this.deleteItem=this.deleteItem.bind(this);
   }
   

   deleteItem(headerOfProduct){
      let arrCart=[...this.props.localStorageArr];
      let existsProductIndex=arrCart.findIndex((v)=>v.headerProduct==headerOfProduct);
      arrCart.splice(existsProductIndex,1);
      localStorage.setItem("cartArray",JSON.stringify(arrCart));
      this.props.localStorageChange();
  }
   
   calcSubtotal(){
      let sum=0;
      if(this.props.localStorageArr!=null)
      { for(let item of this.props.localStorageArr) {
          sum+=Number(item.discountProduct!="none"?item.discountProduct:item.priceProduct)*Number(item.amountProduct)
           }
      }
      return sum;
  }
  totalItems(){
   let sumItems=0;
   if(this.props.localStorageArr!=null)
   { for(let item of this.props.localStorageArr) {
       sumItems+=Number(item.amountProduct)
        }
   }
   return sumItems;
}
   signOutBtnClicked=()=>{
      auth.signOut().then(() => {
         this.props.removeUser();//call action to remove user from global state
         // this.props.history.push("/")***
       }).catch((error) => {
             alert(error," try again");
       });
   }

   render(){
      return(  
         <header>
            <a className=" aLogo" ><NavLink className="linkLogo" exact to="/"><img id="logoImg" src='/images/logo3.jpg'/></NavLink></a>
            <nav className="navbar navbar-expand-lg navbar-dark "> 
               <div className="container-fluid">
                 
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="navBarMargin displaySmall">
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0 navBarRighet">
                        <li className="nav-item">
                           <div id="dropdownCartDiv" class="dropdown">
                              <NavLink to="/cart" className="nav-link active navLinkStyle" id="dropdownMenuButton" aria-expanded="false"/* onMouseOver={this.dropdownCartOver}*/>
                                 <span className="numItemsSpan">{this.totalItems()}</span><i className="fas fa-shopping-cart" ></i>
                              </NavLink>
                              <div class={`dropdown-menu dropdownContent ${this.props.toggleDisplayDropdown}`} aria-labelledby="dropdownMenuButton">
                                 <div className="productsDiv">
                                    {this.props.localStorageArr.map((v,index)=>{
                                    return <div><ProductDropDown data={v} key={index} deleteItem={this.deleteItem}/>  <hr/></div>
                                    })}
                                 </div>
                                 <div className="SubtotalDiv"><span className="spanSubtotal">Subtotal: </span><span> {this.calcSubtotal()}₪</span></div>
                                 <NavLink className="navlink" exact to="/checkout/payment"><button className="paymentDropdownBtn">payment</button></NavLink>
                              </div>
                           </div>
                        </li>
                        <li className="nav-item">
                           {/* <NavLink to="/wish" className="nav-link active"><i className="fas fa-heart"></i></NavLink> */}
                           <a className="nav-link active" ><i className="fas fa-heart"></i></a>
                        </li>
                        <li className="nav-item">
                           {this.props.user==null
                              ?
                             <NavLink exact to="/login" className="nav-link active"><i className="fas fa-user"></i></NavLink>
                             :
                             <div class="dropdown dropdownUserDiv">
                                 <div id="dropdownUserSmall" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                 </div>
                                 <ul class="dropdown-menu dropdownContentUser" aria-labelledby="dropdownUserSmall">
                                    <li><Link class="dropdown-item" exact to="/account/profile">My Account</Link></li>
                                    <li><a class="dropdown-item" onClick={this.signOutBtnClicked}>Sign Out</a></li>
                                 </ul>
                              </div>}
                        </li> 
                     </ul>
                  </div>
                  <div className="collapse navbar-collapse navBarMargin" id="navbarSupportedContent">
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           <NavLink exact to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink exact to="/store" className="nav-link active" >Shop</NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink to="/about" className="nav-link active">About</NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink to="/contact" className="nav-link active">Contact</NavLink>
                        </li>
                     </ul>
                    
                     <form className="d-flex" action="/shop">
                        <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" name="q" required/>
                        <button className="btn btn-outline-success searchBtn" type="submit"><i className="fas fa-search"></i></button>
                     </form>
                  </div>
                  <div className="navBarMargin displayBig">
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0 navBarRighet">
                        <li className="nav-item">
                           <div id="dropdownCartDiv" class="dropdown">
                              <NavLink to="/cart" className="nav-link active navLinkStyle" id="dropdownMenuButton" aria-expanded="false"/* onMouseOver={this.dropdownCartOver}*/>
                                 <span className="numItemsSpan">{this.totalItems()}</span><i className="fas fa-shopping-cart" ></i>
                              </NavLink>
                              <div class={`dropdown-menu dropdownContent ${this.props.toggleDisplayDropdown}`} aria-labelledby="dropdownMenuButton">
                                 <div className="productsDiv">
                                    {this.props.localStorageArr.map((v,index)=>{
                                      return <div><ProductDropDown data={v} key={index} deleteItem={this.deleteItem}/>  <hr/></div>
                                    })}
                                 </div>
                                 <div className="SubtotalDiv"><span className="spanSubtotal">Subtotal: </span><span> {this.calcSubtotal()}₪</span></div>
                                 <NavLink exact className="navlink" to="/checkout/payment"><button className="paymentDropdownBtn">payment</button></NavLink>
                              </div>
                           </div>
                        </li>
                        <li className="nav-item"> 
                           {/* <NavLink to="/wish" className="nav-link active"><i className="fas fa-heart"></i></NavLink> */}
                           <a className="nav-link active" ><i className="fas fa-heart heartIcon"></i></a>
                        </li>
                        <li className="nav-item">
                           {this.props.user==null
                              ?
                             <NavLink exact to="/login" className="nav-link active"><i className="fas fa-user"></i></NavLink>
                             :
                             <div class="dropdown dropdownUserDiv">
                                 <div id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                 </div>
                                 <ul class="dropdown-menu dropdownContentUser" aria-labelledby="dropdownUser">
                                    <li><Link class="dropdown-item" exact to="/account/profile">My Account</Link></li>
                                    <li><a class="dropdown-item" onClick={this.signOutBtnClicked}>Sign Out</a></li>
                                 </ul>
                              </div>}
                        </li> 
                     </ul>
                  </div> 
               </div>
            </nav>
         </header>
      
      );
   }
}

const mapStateToProps = store => ({
   user: store.userReducer.user
});

export default connect(mapStateToProps,{saveUser,removeUser})(Header);



//  <header>
         
//             <nav className="navbar navbar-expand-lg navbar-dark"> 
//                <div className="container-fluid">
//                   <a className="navbar-brand" ><img id="logoImg" src='images/logo3.jpg'/></a>
//                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                      <span className="navbar-toggler-icon"></span>
//                   </button>
//                   <div className="collapse navbar-collapse navBarMargin" id="navbarSupportedContent">
//                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                            <a className="nav-link active" aria-current="page" >Home</a>
//                         </li>
//                         <li className="nav-item">
//                            <a className="nav-link active" >Link</a>
//                         </li>
//                         <li className="nav-item">
//                            <a className="nav-link active" >Link</a>
//                         </li>
//                         <li className="nav-item">
//                            <a className="nav-link active" ><i className="fas fa-shopping-cart"></i></a>
//                         </li>
//                         <li className="nav-item">
//                            <a className="nav-link active" ><i className="fas fa-heart"></i></a>
//                         </li>
//                         <li className="nav-item">
//                            <a className="nav-link active" ><i className="fas fa-user"></i></a>
//                         </li>
                        
//                      </ul>
                    
//                      <form className="d-flex">
//                         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//                         <button className="btn btn-outline-success searchBtn" type="submit"><i className="fas fa-search"></i></button>
//                      </form>
//                   </div>
//                </div>
//             </nav>
//          </header>
      