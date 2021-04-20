import React, { Component } from 'react'
import './shoppingCart.css'
import ItemCart from '../ItemCart/ItemCart'
import { NavLink } from 'react-router-dom';

export default class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state={
            productInCart:JSON.parse(localStorage.getItem("cartArray")),
            subtotal:0,
            discount:"0",
            total:0,
            couponsArr:["10Percent","20Less"],
            couponLabelFailed:"notDisplay",
            couponLabelAdd:"notDisplay"
        }
        this.couponInput=React.createRef();

        this.amountChanged= this.amountChanged.bind(this);
        this.deleteItem= this.deleteItem.bind(this);
        this.updateSubtotal= this.updateSubtotal.bind(this);
        this.calcSubtotal= this.calcSubtotal.bind(this);
        this.totalItems=this.totalItems.bind(this);
        this.couponBtnClicked=this.couponBtnClicked.bind(this);
        this.calacTotal=this.calacTotal.bind(this);
        
        this.state.subtotal=this.calcSubtotal();
        this.state.total=this.calacTotal();
    }
    calcSubtotal(){
        let sum=0;
        if(this.state.productInCart!==null)
        { for(let item of this.state.productInCart) {
            sum+=Number(item.discountProduct!=="none"?item.discountProduct:item.priceProduct)*Number(item.amountProduct)
             }
        }
        return sum;
    }
    updateSubtotal(){
       let sum=this.calcSubtotal();
       console.log(sum)
       this.setState({subtotal:sum},()=>this.setState({total:this.calacTotal()}))
    }
    calacTotal(){
        let sumTotal=(Number(this.state.subtotal)+20);
        if(this.state.discount.includes("%")){
            let Percent=Number(this.state.discount.replace("%",""))
            sumTotal=sumTotal*((100-Percent)/100);
        }
        else{
            let less=Number(this.state.discount.replace("₪",""))
            sumTotal=sumTotal-less;
        }
        return sumTotal+"₪"
    
    }

    amountChanged(headerOfProduct,newAmount){
        let arrCart=[...this.state.productInCart];
        let existsProduct=arrCart.filter((v)=>v.headerProduct===headerOfProduct)[0];
        existsProduct.amountProduct=newAmount;
        this.setState({productInCart:arrCart},this.updateSubtotal,()=>this.setState({total:this.calacTotal()}));
        localStorage.setItem("cartArray",JSON.stringify(arrCart))
        this.props.localStorageChange();
    }

    deleteItem(headerOfProduct){
        let arrCart=[...this.state.productInCart];
        let existsProductIndex=arrCart.findIndex((v)=>v.headerProduct===headerOfProduct);
        arrCart.splice(existsProductIndex,1);
        this.setState({productInCart:arrCart},this.updateSubtotal,()=>this.setState({total:this.calacTotal()}));
        localStorage.setItem("cartArray",JSON.stringify(arrCart));
        this.props.localStorageChange();
    }
    totalItems(){
        let sumItems=0;
        if(this.state.productInCart!==null)
        { for(let item of this.state.productInCart) {
            sumItems+=Number(item.amountProduct)
             }
        }
        return sumItems;
    }
    couponBtnClicked(){
        let coupon=this.couponInput.current.value;
        let indexCoupon=this.state.couponsArr.indexOf(coupon);
       if(indexCoupon===-1){//wrong code coupon
            this.setState({couponLabelFailed:"Displaylabel",couponLabelAdd:"notDisplay"})
       }
       else{
        this.setState({couponLabelFailed:"notDisplay",couponLabelAdd:"Displaylabel",discount:(indexCoupon===0)?"10%":"20₪"},()=>this.setState({total:this.calacTotal()}));
       } 

    }

    render() {
        return (
            <div className="shoppingCartDiv row justify-content-center">
                <div className="productDiv col-12 col-sm-7">
                    <h3 className="H3">Items in cart</h3>
                    {(this.state.productInCart!==null&&this.state.productInCart!==[])?(this.state.productInCart.map((productV,index)=>{
                        return <ItemCart key={index} data={productV} amountChanged={this.amountChanged} deleteItem={this.deleteItem}/>
                    })):"Empty cart"}
                    
                </div>
                
                <div className="cartSummaryDiv col-10 col-sm-4">
                    <h3>Order summary</h3>
                    <div className="cartSummary">
                        <div className="spansDiv"><span className="spanLeft">Total items:</span><span className="spanrighet">{this.totalItems()}</span></div>
                        <div className="spansDiv"><span className="spanLeft">Subtotal:</span><span className="spanrighet">{this.state.subtotal}₪</span></div>   
                        <div className="spansDiv"><span className="spanLeft">Shipping:</span><span className="spanrighet">20₪</span></div>
                        <div className="spansDiv"><span className="spanLeft">Discount:</span><span className="spanrighet">{this.state.discount}</span></div>
                        <hr/>
                        <div className="spansDiv"><span className="spanLeft">Total:</span><span className="spanrighet">{this.state.total}</span></div>
                        <button className="couponBtn" onClick={this.couponBtnClicked}>Add coupon</button>
                        <input ref={this.couponInput} type="text" placeholder="Enter a coupon"/><br/>
                        <label className={`labelCouponFailed ${this.state.couponLabelFailed}`}>Coupon code does not exist</label>
                        <label className={`labelCouponAdd ${this.state.couponLabelAdd}`}>Successfully added coupon code</label>
                        <NavLink exact className="navlink" to="/checkout/payment"><button className="paymentBtn">payment</button></NavLink>
                    </div>
                </div>
                
            </div>
        )
    }
}
