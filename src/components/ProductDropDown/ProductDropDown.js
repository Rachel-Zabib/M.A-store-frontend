import React, { Component } from 'react'
//import propTypes from 'prop-types'
import './productDropDown.css'

export default class ProductDropDown extends Component {
   
    render() {
        return (
            <div className="productDropDownDiv row">
                <div className="imgDropDownDivDiv col-3" >
                    <img src={this.props.data.imgProduct} alt=""/>
                </div>
                <div className="detailsProductDiv  col-7">
                    <p className="headerP">{this.props.data.headerProduct}</p>
                    <p className="brandP">{this.props.data.brandProduct}</p>
                    <p className="priceP"><span>Price: </span>{(this.props.data.discountProduct)==="none"?this.props.data.priceProduct:this.props.data.discountProduct}₪</p>
                    <p className="amontP"><span>Amount: </span>{this.props.data.amountProduct}</p>

                </div>
                <div className="sumDropDownDiv  col-2">
                    <p className={`sumDropDowIcon ${this.props.displayTrash}`} onClick={()=>this.props.deleteItem(this.props.data.headerProduct)}><i class="far fa-trash-alt"></i></p>
                    <p className="sumDropDowP">{((this.props.data.discountProduct)==="none"?this.props.data.priceProduct:this.props.data.discountProduct)*this.props.data.amountProduct}₪</p>
                </div>
                
            </div>
        )}
    }

    ProductDropDown.defaultProps={
        displayTrash:""
    }




