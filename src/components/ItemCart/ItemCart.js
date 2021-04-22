import React, { Component } from 'react'
import './itemCart.css'


export default class ItemCart extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    // headerProduct:this.props.data.headerProduct,
    //      brandProduct:this.props.data.brandProduct,
    //      amountProduct:1,
    //      priceProduct:this.props.data.priceProduct.replace("₪",""),
    //      discountProduct:this.props.data.discountProduct.replace("₪",""),
    //      imgProduct:this.state.theProduct.imgSrc[0]
    render() {
        return (
            <div className="itemCartDiv row">
                <div className="imgDiv col-3" >
                    <img src={this.props.data.imgProduct} alt=""/>
                </div>
                <div className="detailsItemDiv  col-6">
                    <h3>{this.props.data.headerProduct}</h3>
                    <p className="brandP">{this.props.data.brandProduct}</p>
                    <p>{(this.props.data.discountProduct)==="none"?this.props.data.priceProduct:this.props.data.discountProduct}₪</p>
                    amount: <input className="amountInput" type="number" min="1" value={this.props.data.amountProduct} onChange={(e)=>this.props.amountChanged(this.props.data.headerProduct,e.target.value)} />

                </div>
                <div className="sumdiv  col-3">
                    <p className="sumIcon" onClick={()=>this.props.deleteItem(this.props.data.headerProduct)}><i class="far fa-trash-alt"></i></p>
                    <p className="sumP">{((this.props.data.discountProduct)==="none"?this.props.data.priceProduct:this.props.data.discountProduct)*this.props.data.amountProduct}₪</p>
                   
                   

                </div>
                
            </div>
        )
    }
}
