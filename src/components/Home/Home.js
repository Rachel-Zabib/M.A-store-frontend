import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Product from '../Product/Product'
import './home.css'
//import axios  from 'axios'
import {db} from "../../fireBase.config"
// import {arrayAllProduct} from '../../dataBase'

// let bestSellersArr=bestSellersArray();
// let salesArr=salesArray(); 

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      bestSellersArr:[],
      salesArr:[],
      arrayAllProduct:[]
    }
    this.bestSellersArray= this.bestSellersArray.bind(this);
    this.salesArray= this.salesArray.bind(this);
  }

  componentDidMount(){
    // axios.get('http://localhost:3000/arrayAllProduct')
    //     .then((response)=> {
    //       // console.log(response.data);
    //       this.setState({arrayAllProduct:response.data},()=>{this.bestSellersArray();this.salesArray()})
    //     })
    //     .catch((error)=> {
    //       console.log(error);
    //     })
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
    console.log("data",data);
    this.setState({arrayAllProduct:data},()=>{this.bestSellersArray();this.salesArray()});
  });

  }
  bestSellersArray(){

    let bestSellersArr= [...this.state.arrayAllProduct];
    bestSellersArr.sort((a,b)=>a.buyNum-b.buyNum);
    this.setState({bestSellersArr:bestSellersArr.slice(0,4)}) ;//the 4 besr seller product
  }
  
  salesArray() { 
      
    let salesArr=[...this.state.arrayAllProduct];
    salesArr=salesArr.filter((v)=>v.discountProduct!=="none");
    this.setState({salesArr:salesArr});
  
  }

    render() {
        return (
          <div className="homeDiv">
            <div className="photoDiv">
              <NavLink to="/store"><button>SHOP</button></NavLink>
            </div>
          <div className="paddingDiv">
            <div className="bestSellersDiv">
             <NavLink className="headerA" to="/store/best_Sellers"><p className="bestSellersP">Best Sellers</p></NavLink>
                <div id="carouselExampleCaptions" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div className="itemDiv row justify-content-center">
                          {this.state.bestSellersArr.map((v,i)=>{
                            if(i<3)
                              return <Product data={v} key={i} localStorageChange={this.props.localStorageChange}/>
                            return null;
                          })}
                           {/* <Product data={this.state.bestSellersArr[0]} localStorageChange={this.props.localStorageChange}/>
                            <Product data={this.state.bestSellersArr[1] } localStorageChange={this.props.localStorageChange}/>
                            <Product data={this.state.bestSellersArr[2]} localStorageChange={this.props.localStorageChange}/> */}
                        </div>
                      </div>
                      <div class="carousel-item">
                      <div className="itemDiv row justify-content-center">
                              {/*<Product data={bestSellersArr[3]}/>
                               <Product data={bestSellersArr[4]}/>
                              <Product data={bestSellersArr[5]}/> */}
                              {/* <div className="col-3 thirdProductToggle"><Product data={bestSellersArr[2]}/></div> */}
                              {this.state.bestSellersArr.map((v,i)=>{
                                if(i===3)
                                  return <Product data={v} key={i} localStorageChange={this.props.localStorageChange}/>
                                return null;
                              })}
                            {/* <Product data={this.state.bestSellersArr[3]} localStorageChange={this.props.localStorageChange}/> */}
                             
                              {/* <div className="col-3 thirdProduct"><Product data={bestSellersArr[1]}/></div>
                              <div className="col-3 thirdProduct"><Product data={bestSellersArr[2]}/></div> */}
                        </div>
                      </div>
                     
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </a>
                </div>
            </div>
    
            <div className="CategoryProductDiv">
              <NavLink className="headerA" to="/store"><p className="CategoryProductP">Category Product</p></NavLink>
              <div className=" row justify-content-center">
                  <NavLink className="col-9 col-sm-5 col-md-4 CategoryA" to="/store/category_face"><div className=" Category CategoryFace"><p>Face</p></div></NavLink>
                  <NavLink className="col-9 col-sm-5 col-md-4 CategoryA"  to="/store/category_lips"><div className=" Category CategoryLips"><p>Lips</p></div></NavLink>
                  <NavLink className="col-9 col-sm-5 col-md-4 CategoryA" to="/store/category_eyes"><div className=" Category CategoryEyes"><p>Eyes</p></div></NavLink>
              </div>
            </div>
    
    
            <div className="salesDiv">
                <NavLink className="headerA" to="/store/sales"><p className="SalesP">Sales</p></NavLink>
                <div id="carouselSalesCaptions" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div className="itemDiv row justify-content-center">
                            {this.state.salesArr.map((v,i)=>{
                                  if(i<3)
                                    return <Product data={v} key={`${i}salesArr`} localStorageChange={this.props.localStorageChange}/>
                                  return null;
                                })}
                            {/* <Product data={this.state.salesArr[0]} localStorageChange={this.props.localStorageChange}/>
                            <Product data={this.state.salesArr[1]} localStorageChange={this.props.localStorageChange}/>
                            <Product data={this.state.salesArr[2]} localStorageChange={this.props.localStorageChange}/> */}
                        </div>
                      </div>
                      <div class="carousel-item">
                      <div className="itemDiv row justify-content-center">
                              {/*<Product data={bestSellersArr[3]}/>
                               <Product data={bestSellersArr[4]}/>
                              <Product data={bestSellersArr[5]}/> */}
                              {/* <div className="col-3 thirdProductToggle"><Product data={bestSellersArr[2]}/></div> */}
                              {this.state.salesArr.map((v,i)=>{
                                  // if(i>=3 && i<6)
                                  if(i<3)
                                    return <Product data={v} key={`${i}sale`} localStorageChange={this.props.localStorageChange}/>
                                  return null;
                                })}
                              {/* <Product data={this.state.salesArr[0]} localStorageChange={this.props.localStorageChange}/>
                              <Product data={this.state.salesArr[1]} localStorageChange={this.props.localStorageChange}/>
                              <Product data={this.state.salesArr[2]} localStorageChange={this.props.localStorageChange}/> */}
                        </div>
                      </div>
                     
                    </div>
                    <a class="carousel-control-prev" href="#carouselSalesCaptions" role="button" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselSalesCaptions" role="button" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </a>
                </div>
            </div>
            </div>
          </div>
        )
      }
}
 