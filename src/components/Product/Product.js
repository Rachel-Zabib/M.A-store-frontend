import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import QuickView from '../QuickView/QuickView';
import './product.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';




//let raandom=(Math.floor(Math.random()*100))+""
class Product extends Component{
   
    constructor(props){
       super(props);
       this.state={
        quickviewBtn:"hideBtn",
         imgSrc:props.data.imgSrc,
        headerProduct:props.data.headerProduct,
        brandProduct:props.data.brandProduct,
        priceProduct:props.data.priceProduct,
        discountProduct:props.data.discountProduct
       }
       this.modalQuickViewRef=React.createRef();
       this.showQuickView=this.showQuickView.bind(this);
       this.clearModal= this.clearModal.bind(this);
      
    }

    showQuickView(classBtn){
        this.setState({quickviewBtn:classBtn})
    }

    clearModal(){
        let myModalEl = this.modalQuickViewRef.current
        console.log("p",myModalEl)
        // console.log("p",bootstrap.Modal.getInstance(myModalEl))
        let modal =bootstrap.Modal.getInstance(myModalEl)
        modal.hide()
    }
   
    render(){
      
       return(
         <div onMouseEnter={()=>this.showQuickView("showBtn")} onMouseLeave={()=>this.showQuickView("hideBtn")} className="divMainProduct col-3">
             <i onClick={(e)=>{console.log("love");}} className="far fa-heart loveIcon"></i>
            <NavLink  className="linkStyle " to={`/product/${this.props.data.headerProduct.replace(" ","-")}`}>
                <div  className="divProduct">
                    <img  src={this.props.data.imgSrc[0]} alt=""/>
                    <br/>
                    <div id="headerProduct">{this.props.data.headerProduct}</div>
                    <div id="brandDiv">{this.props.data.brandProduct}</div>
                    <div className="divPrice"><span className={`priceOfProduct ${this.props.data.discountProduct==="none"?"":"decoration"}`}>{this.props.data.priceProduct}</span><span className={`discountOfProduct ${this.props.data.discountProduct!=="none"?"":"discNoDisplay"}`}>  {this.props.data.discountProduct}</span></div>      
                   
                </div>
                </NavLink>
                <button type="button" className={`quickBtn ${this.state.quickviewBtn}`} data-bs-toggle="modal"  data-bs-target={`#id${this.props.data.macatProduct}`}>Quick view</button>
                <div ref={this.modalQuickViewRef} class="modal fade" id={`id${this.props.data.macatProduct}`} tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" style={{maxWidth: "700px"}}>
                        <div class="modal-content" style={{padding:"50px"}}>
                            <div class="modal-body">
                                <QuickView data={this.props.data} clearModal={this.clearModal}  localStorageChange={this.props.localStorageChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
       );
    }
}
 export default Product;