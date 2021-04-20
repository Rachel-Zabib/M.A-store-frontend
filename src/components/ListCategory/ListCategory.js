import React, { Component } from 'react';
import './listCategory.css';


export default class ListCategory extends Component{
   
    constructor(props){
       super(props);
       this.state={
        span1:"lessDiv"
       }
      //  this.brand1Ref=React.createRef();
      //  this.brand2Ref=React.createRef();
      //  this.brand3Ref=React.createRef();
      //  this.brand4Ref=React.createRef();
    }

    toggleMoreDiv(e){
        let classToggle=(this.state.span1==="lessDiv")?"moreDiv":"lessDiv";
        this.setState({span1:classToggle});
     }

   //   inputAllBrandsChanged(e){
   //    this.brand1Ref.current.checked=e.target.checked;
   //    this.brand2Ref.current.checked=e.target.checked; 
   //    this.brand3Ref.current.checked=e.target.checked; 
   //    this.brand4Ref.current.checked=e.target.checked; 
   //    this.props.changedBrandFilter(e.target.value,e.target.checked);
   //   }

    render()
    {
        return(
            <div className="col-2 listCategory">
               <div>
                  <ul >
                     <li onClick={()=>this.props.clickedCategory("Makeup")}><b>Makeup</b></li>
                     <li onClick={()=>this.props.clickedCategory("Face")}>Face</li>
                     <li onClick={()=>this.props.clickedCategory("Eyes")}>Eyes</li>
                     <li onClick={()=>this.props.clickedCategory("Lips")}>Lips</li>
                  </ul>
               </div>
               <hr/>
               <div className="brandList">
                  <b>brand</b><span id="span1" onClick={this.toggleMoreDiv.bind(this)} className="moreSpan">+</span><br/>
                  <div className={this.state.span1}>
                     {/* <input type="checkbox" id="allBrands" name="allBrands" value="All Brands" onChange={this.inputAllBrandsChanged.bind(this)}/>
                     <label for="brand1">All Brands</label><br/> */}
                     <input ref={this.brand1Ref} type="checkbox" id="brand1" name="brand1" value="MAC" onChange={(e)=>this.props.changedBrandFilter(e.target.value,e.target.checked)}/>
                     <label for="brand1">MAC</label><br/>
                     <input ref={this.brand2Ref} type="checkbox" id="brand2" name="brand2" value="LORIAL PARIS" onChange={(e)=>this.props.changedBrandFilter(e.target.value,e.target.checked)}/>
                     <label for="brand2">LORIAL PARIS</label><br/>
                     <input ref={this.brand3Ref} type="checkbox" id="brand3" name="brand3" value="BOBBI BROWN" onChange={(e)=>this.props.changedBrandFilter(e.target.value,e.target.checked)}/>
                     <label for="brand3">BOBBI BROWN</label><br/>
                     <input ref={this.brand4Ref} type="checkbox" id="brand4" name="brand4" value="IL MAKIAGE" onChange={(e)=>this.props.changedBrandFilter(e.target.value,e.target.checked)}/>
                     <label for="brand4">IL MAKIAGE</label><br/>

                  </div>
               </div>
           </div>);
    }
}
