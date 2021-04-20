import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


class ProtectedRouteCheckout extends Component{
    render(){
        let {component: Component,localStorageArr:arr,localStorageChange:func,...rest}=this.props;
        return(
            <Route {...rest}  render={(props) => {
                if (this.props.user) {
                  return <Component localStorageArr={arr} localStorageChange={func} {...props} />
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


export default connect(mapStateToProps)(ProtectedRouteCheckout);
