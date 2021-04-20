
import React, { Component } from 'react';
import './App.css';
// import {arrayAllProduct} from './dataBase'
//import axios  from 'axios'


import Home from './components/Home/Home';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom';
//import {NavLink, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs'
import Policy from './components/Policy/Policy'
import ShippingPolicy from './components/ShippingPolicy/ShippingPolicy'
import NotFound from './components/NotFound/NotFound'
import Login from "./components/Login/Login";
import ProductPage from './components/ProductPage/ProductPage'
import StorePage from './components/StorePage/StorePage';
import SignUp from './components/SignUp/SignUp'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import PaymentPage from './components/PaymentPage/PaymentPage';
import OrderNumber from './components/OrderNumber/OrderNumber';
import ProfileUser from './pages/ProfileUser/ProfileUser';
import { connect } from 'react-redux';
import {saveUser,removeUser} from './actions/userAction'
import {auth,db} from "./fireBase.config"
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import AdminPage from './admin/AdminPage/AdminPage';
import ProtectedRouteCheckout from './components/ProtectedRouteCheckout/ProtectedRouteCheckout';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin/ProtectedRouteAdmin';
import Loading from './components/Loading/Loading'

 class App extends Component {
  constructor(props){
    super(props);
    this.state={
      localStorageArray:JSON.parse(localStorage.getItem("cartArray")),
      toggleDisplayDropdown:"DisplayNoneDropdown",
      arrayAllProduct:[],
      didGlobalUserUpdate:false
    }
    this.localStorageChange=this.localStorageChange.bind(this);
    this.bestSellersStore=this.bestSellersStore.bind(this);
    this.categoryStore=this.categoryStore.bind(this);
    this.salesStore=this.salesStore.bind(this);
    
    this.state.localStorageArray=JSON.parse(localStorage.getItem("cartArray"))===null?[]:JSON.parse(localStorage.getItem("cartArray"));
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     var uid = user.uid;
    //     this.props.saveUser(user)
    //   } 
    //   else {
    //     this.props.saveUser(null)
    //   }
    // });

    // useLayoutEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     var uid = user.uid;
    //     this.props.saveUser(user)
    //   } 
    //   else {
    //     this.props.saveUser(null)
    //   }
    // });
    // }, []);
  
  }

  localStorageChange(boolDropdown){
    this.setState({localStorageArray:JSON.parse(localStorage.getItem("cartArray"))===null?[]:JSON.parse(localStorage.getItem("cartArray"))});
   if(boolDropdown===true)
   {
     this.setState({toggleDisplayDropdown:"DisplayBlockDropdown"})
     setTimeout(()=>this.setState({toggleDisplayDropdown:"DisplayNoneDropdown"}),5000)
    }
  }

  componentDidMount(){
    // axios.get('http://localhost:3000/arrayAllProduct')
    //     .then((response)=> {
    //       // console.log(response.data);
    //       this.setState({arrayAllProduct:response.data})
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
      this.setState({arrayAllProduct:data});
    });

      auth.onAuthStateChanged((user) => {
        if (user) {
          //var uid = user.uid;
          this.props.saveUser(user)
     
        } else {
          this.props.saveUser(null)
        }
        this.setState({didGlobalUserUpdate:true})
      });
  }
  
  bestSellersStore(){

    // let bestSellersArr=[...arrayAllProduct];
    let bestSellersArr=[...this.state.arrayAllProduct];
    bestSellersArr.sort((a,b)=>a.buyNum-b.buyNum);
    bestSellersArr=bestSellersArr.slice(0,4);//the 4 besr seller product
    return <StorePage arrProduct={bestSellersArr} categoryFilter={"Makeup"} categoryHeader={"Best Sellers"} localStorageChange={this.localStorageChange}/>

  }

  categoryStore(category) { 
    
    // let categoryArr=[...arrayAllProduct];
    let categoryArr=[...this.state.arrayAllProduct];
    categoryArr=categoryArr.filter((v)=>v.categoryProduct===category);
    return <StorePage arrProduct={categoryArr} categoryFilter={category} categoryHeader={category} localStorageChange={this.localStorageChange}/>

  }

  salesStore() { 
    
    // let salesArr=[...arrayAllProduct];
    let salesArr=[...this.state.arrayAllProduct];
    salesArr=salesArr.filter((v)=>v.discountProduct!=="none");
    return <StorePage arrProduct={salesArr} categoryHeader={"Sales"} localStorageChange={this.localStorageChange}/>

  }
 

  
  render() {
    if(this.state.didGlobalUserUpdate)
    return (
      <Router>
        <div>
            <Header localStorageArr={this.state.localStorageArray} localStorageChange={this.localStorageChange} toggleDisplayDropdown={this.state.toggleDisplayDropdown}/>
          
            <div id="d">
                <div id="inDiv">
                    <Switch>
                        <Route exact path="/" component={()=><Home localStorageChange={this.localStorageChange}/>}/>
                        <Route  path="/contact" component={ContactUs}/>
                        <Route  path="/about" component={AboutUs}/>
                        <Route  path="/policy" component={Policy}/>
                        <Route  path="/shipping-Policy" component={ShippingPolicy}/>
                        <Route  exact path="/store" component={() => <StorePage categoryFilter={"Makeup"} localStorageChange={this.localStorageChange}/>}/>
                        <Route  exact path="/store/best_Sellers" component={this.bestSellersStore}/>
                        <Route  exact path="/store/category_face" component={()=>this.categoryStore("Face")}/>
                        <Route  exact path="/store/category_lips" component={()=>this.categoryStore("Lips")}/>
                        <Route  exact path="/store/category_eyes" component={()=>this.categoryStore("Eyes")}/>
                        <Route  exact path="/store/sales" component={this.salesStore}/>
                        <Route exact path="/shop" render={(props) => <StorePage localStorageChange={this.localStorageChange} {...props} />}/> {/*for serch */}
                        <Route exact path="/login" component={Login}/>
                        <Route  path="/login/signup" component={SignUp}/>
                        <Route  path="/cart" component={()=><ShoppingCart localStorageChange={this.localStorageChange}/>}/>
                        <Route  path="/product/:productName"  render={(props) => <ProductPage localStorageChange={this.localStorageChange} {...props} />}/>
                        {/* <Route exact  path="/checkout" component={CheckoutPage}/> */}
                        <ProtectedRouteCheckout exact  path="/checkout/payment" component={PaymentPage} localStorageArr={this.state.localStorageArray} localStorageChange={this.localStorageChange} /*render={(props) => <PaymentPage localStorageArr={this.state.localStorageArray} localStorageChange={this.localStorageChange} {...props}/>}*//>
                        <Route exact  path="/checkout/payment/order_number" component={OrderNumber}/>
                        {(this.state.didGlobalUserUpdate)
                          ?
                        <ProtectedRoutes exact  path="/account/profile" component={ProfileUser}/>
                          :<Route exact  path="/account/profile" component={()=>null}/> 
                        }

                        <ProtectedRouteAdmin  path="/admin" component={AdminPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </div>
        <ScrollToTop />
    </Router>
    )
    //loading***
    else return <Loading/>
  
  }
}
const mapStateToProps = store => ({
  user: store.userReducer.user
});

export default connect(mapStateToProps,{saveUser,removeUser})(App);




  