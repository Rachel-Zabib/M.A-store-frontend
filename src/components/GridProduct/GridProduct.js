import React from 'react';
import './gridProduct.css';
import Product from '../Product/Product.js'

  function GridProduct(props){
    return(
        <div className="row justify-content-center divGridProduct">
         {props.arrProduct.map((element,key)=>{
                return <Product data={element} key={key}  localStorageChange={props.localStorageChange}/>})}
    
        </div>
    );
 
}
export default GridProduct;