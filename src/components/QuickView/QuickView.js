import React, { Component } from 'react'
import './quickView.css'

export default class QuickView extends Component {
   
     addProductToCart(){
      let productToAdd={
         headerProduct:this.props.data.headerProduct,
         brandProduct:this.props.data.brandProduct,
         amountProduct:1,
         priceProduct:this.props.data.priceProduct.replace("₪",""),
         discountProduct:this.props.data.discountProduct.replace("₪",""),
         imgProduct:this.props.data.imgSrc[0]
      }
      let cartArr=JSON.parse(localStorage.getItem("cartArray"));
      if(cartArr===null)
      {
         cartArr=[];
      }
      let axistsProsuct=cartArr.filter((v)=>v.headerProduct===productToAdd.headerProduct)
      if(axistsProsuct.length!==0){
         axistsProsuct[0].amountProduct=Number(axistsProsuct[0].amountProduct)+Number(productToAdd.amountProduct)
         axistsProsuct[0].discountProduct=productToAdd.discountProduct;
      }
      else{
         cartArr.push(productToAdd);

      }
      localStorage.setItem("cartArray",JSON.stringify(cartArr))
      this.props.localStorageChange(true);
   }
  
     render(){
        return(
             <div className={`divQuickView row`}>
                 <img className="col-5 " src={this.props.data.imgSrc[0]} alt=""/>
                 <div className="col-5">
                    <p id="headerQuickProduct">{this.props.data.headerProduct}</p>
                    <div id="brandQuickDiv">{this.props.data.brandProduct}</div>
                    <div className="divPrice"><span className={`priceOfProduct ${this.props.data.discountProduct==="none"?"":"decoration"}`}>{this.props.data.priceProduct}</span><span className={`discountOfProduct ${this.props.data.discountProduct!=="none"?"":"discNoDisplay"}`}>  {this.props.data.discountProduct}</span></div> 
                    <div id="shortExplanationDiv">{this.props.data.shortExplanation}</div>
                    {/* <button type="button" data-bs-toggle="modal" data-bs-target={`#idShoppingCart`} id="addToShoppingBtnQuick" onClick={()=>{this.addProductToCart.call(this);this.props.clearModal()}}> add to shopping cart </button> */}
                    <button id="addToShoppingBtnQuick" onClick={()=>{this.addProductToCart.call(this);this.props.clearModal()}}> add to shopping cart </button>
                    <i className="far fa-heart loveIcon"></i>
              
                 </div>
            </div>
        
        );
     }
}
