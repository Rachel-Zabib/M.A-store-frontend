import React, { Component } from 'react';
import './productPage.css';
// import {arrayAllProduct} from '../../dataBase.js'
//import axios  from 'axios'
import {db} from '../../fireBase.config'
import Loading from '../Loading/Loading';

class ProductPage extends Component{
   
   constructor(props){
      super(props);
      this.state={
         span1:"lessDiv",
         span2:"lessDiv",
         span3:"lessDiv",
         imgUrlDisplay:"",
         amountInput:1,
         theProduct:null
         // theProduct:arrayAllProduct.find((v)=>v.headerProduct.replace(" ","-")===props.match.params.productName)
      }

      this.changeUrlDisplay=this.changeUrlDisplay.bind(this);
      this.amountChanged=this.amountChanged.bind(this);
      this.addProductToCart= this.addProductToCart.bind(this);

   }
   componentDidMount(){
      //json server
      // axios.get('http://localhost:3000/arrayAllProduct')
      //     .then((response)=> {
      //       this.setState({theProduct:response.data.find((v)=>v.headerProduct.replace(" ","-")===this.props.match.params.productName)})
      //     })
      //     .catch((error)=> {
      //       console.log(error);
      //     })

      //firebase
      var arrProductRef = db.ref(`Products`);
      arrProductRef.on('value', (snapshot) => {
         let data = snapshot.val();
      if(!Array.isArray(data)){
        let arr=[];
        for (const property in data) {
          arr.push(data[property])
        }
        data=arr;
      }
      this.setState({theProduct:data.find((v)=>v.headerProduct.replace(" ","-")===this.props.match.params.productName)}
                  ,()=>{if(this.state.theProduct===null)this.props.history.push("/NotFound")})//we dont have this product in database
    });
    }
    
   changeUrlDisplay(srcD){
      this.setState({imgUrlDisplay:srcD})
   }

   amountChanged(value){
      this.setState({amountInput:value})
   }

   toggleMoreDiv(e){
      let spanName=e.target.id;
      let classToggle=(this.state[spanName]==="lessDiv")?"moreDiv":"lessDiv";
      this.setState({[spanName]:classToggle})
   }

   addProductToCart(){
      let productToAdd={
         headerProduct:this.state.theProduct.headerProduct,
         brandProduct:this.state.theProduct.brandProduct,
         amountProduct:this.state.amountInput,
         priceProduct:this.state.theProduct.priceProduct.replace("₪",""),
         discountProduct:this.state.theProduct.discountProduct.replace("₪",""),
         imgProduct:this.state.theProduct.imgSrc[0]
      }
      let cartArr=JSON.parse(localStorage.getItem("cartArray"));
      if(cartArr===null)
      {
         cartArr=[];
      }
      let axistsProsuct=cartArr.filter((v)=>v.headerProduct===productToAdd.headerProduct)
      if(axistsProsuct.length!==0){
         axistsProsuct[0].amountProduct=Number(axistsProsuct[0].amountProduct)+Number(productToAdd.amountProduct);
         axistsProsuct[0].discountProduct=productToAdd.discountProduct;
      }
      else{
         cartArr.push(productToAdd);
      }
      localStorage.setItem("cartArray",JSON.stringify(cartArr))
      this.props.localStorageChange(true);
   }
   

   render(){
      if(this.state.theProduct===null){
         return (<Loading/>)
      }
      return(
         <div className="ProductDiv">
            <div className="detailsProduct">
               <h2>{this.state.theProduct.headerProduct}</h2>
               <div id="macatDiv">Catalog number: {this.state.theProduct.macatProduct}</div>
               <div>{this.state.theProduct.brandProduct}</div>
               <br/>
               <div>{this.state.theProduct.explanationproduct}</div><br/>
               <div id="categoryProduct">{this.state.theProduct.categoryProduct}</div>
               <br/>
               <div className={this.state.theProduct.stockProduct==="in stock"?"grin":"red"}>{this.state.theProduct.stockProduct}</div>
               <div><p className={`priceProduct ${this.state.theProduct.discountProduct==="none"?"":"decoration"}`}>{this.state.theProduct.priceProduct}</p><p className={`discountProduct ${this.state.theProduct.discountProduct!=="none"?"":"discNoDisplay"}`}> {this.state.theProduct.discountProduct}</p></div>
               <input onChange={(e)=>this.amountChanged(e.target.value)} id="amountProduct" type="number" name="amount" value={this.state.amountInput} min="0"/>
               <button /*type="button" data-bs-toggle="modal"  data-bs-target={`#idShoppingCart`}*/ id="addToShoppingBtn" onClick={this.addProductToCart}>add to shopping cart</button>
               <span onClick="changeLove(e)"><i className="far fa-heart loveIconn"></i></span>
               <hr/>
               <div><b>more information</b><span id="span1" onClick={this.toggleMoreDiv.bind(this)} className="moreSpan">+</span><br/>
                  <div className={this.state.span1}>
                  {this.state.theProduct.moreInfoProduct}
                  </div>
               </div>
               <hr/>
               <div><b>Shipments and returns</b><span id="span2" onClick={this.toggleMoreDiv.bind(this)} className="moreSpan">+</span><br/>
                  <div className={this.state.span2}>
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. A omnis vitae eos possimus delectus tempore. Quas veniam, distinctio facere modi culpa recusandae aliquid consequatur? Atque recusandae perferendis ipsum facere hic.
                  </div>
               </div>
               <hr/>
               <div><b>similar product</b><span id="span3" onClick={this.toggleMoreDiv.bind(this)} className="moreSpan">+</span><br/>
                  <div className={this.state.span3}>
                  {this.state.theProduct.similarProducts}
                  </div>
               </div>
            </div>
            <div className="imagesProduct">
               <div className="imageProductDisplay">
                  <img src={this.state.imgUrlDisplay||this.state.theProduct.imgSrc[0]} alt=""></img>
               </div>
               <ul className="galleryProduct">
                  {(this.state.theProduct.imgSrc).map((v,k)=>{
                     return  <li key={k} onClick={(e)=>this.changeUrlDisplay(e.target.src)}><img src={v} alt=""/></li>
                  })}  
               </ul>
             
               
            </div>
         </div>
            
      );
   }
}
export default ProductPage;

//  <i class="fas fa-heart"></i>   /*love full icon*/