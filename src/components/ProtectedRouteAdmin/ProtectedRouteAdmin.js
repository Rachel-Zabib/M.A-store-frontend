import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {db} from '../../fireBase.config'
import Loading from '../Loading/Loading';

class ProtectedRouteAdmin extends Component{
    constructor(props){
        super(props);
        this.state={
            userDetails:null
        }
        
    }
    componentDidMount(){
        if(this.props.user){
            var userDetails = db.ref(`users/${this.props.user.uid}`);
            userDetails.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({userDetails:data});})
        }
   
    }
   
    render(){
        let {component: Component,...rest}=this.props;
        return(
            <Route {...rest}  render={(props) => {
                if (this.props.user) {
                    if(this.state.userDetails==null)//before get the user details fron firebase
                        return <Loading/>//loading***
                    else
                    {
                        if(this.state.userDetails.role==='user')
                            return (
                                <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {
                                    from: props.location,
                                    },
                                }}/>)
                        else
                             return <Component {...props} />
                    }
                        
                }
                 else {
                    return (
                      <Redirect
                        to={{
                          pathname: "/login",
                          state: {
                            from: props.location,
                          },
                        }}/>)
                    }
                }}/>
          
        );
    }
}

const mapStateToProps = store => ({
    user: store.userReducer.user
});


export default connect(mapStateToProps)(ProtectedRouteAdmin);
