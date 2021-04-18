import * as React from "react";
import jsonServerProvider from 'ra-data-json-server';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import {fetchUtils, Admin, Resource, EditGuesser, ListGuesser, ShowGuesser } from 'react-admin';
import createAdminStore from '../../createAdminStore';
import { UserList,UserCreateReactAdmin, UserEditReactAdmin ,UserListReactAdmin, UserEdit,UserCreate} from "./UsersAdmin";
import {FirebaseAuthProvider} from 'react-admin-firebase';
import firebase,{config} from '../../fireBase.config';
import firebaseDataProvider from 'ra-data-firebase-client'
import { ProductsCreate, ProductsEdit, ProductsList } from "./ProductsAdmin";
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './dashboard/Dashboard';
import { OrderEdit, OrderList, OrderShow } from "./OrderAdmin";
import { TicketEdit, TicketList,TicketShow } from "./TicketAdmin";

//connect with restApi(our server)
import simpleRestProvider from 'ra-data-simple-rest';


const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmVhZDY5ZWRjOWY1NGRhNDY2NjgxZSIsImVtYWlsIjoicmFjaGVsMTYxODhAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoi16jXl9ecINeW15HXmdeRIiwibGFzdE5hbWUiOiIiLCJjaXR5IjoiIiwic3RyZWV0IjoiIiwiYXBhcnRtZW50IjoiIiwiYnVpbGRpbmciOiIiLCJwb3N0IjoiIiwicGhvbmUiOiIiLCJyb2xlIjoidXNlciIsImFjdGl2ZSI6InRydWUiLCJpYXQiOjE2MTgxMzg3NDksImV4cCI6MTYxODMxMTU0OX0.9MfhkrTeH7zP7JseaCGnmewv4zb-ZA7Tr7TsTwRI-pM`
        //token: `Bearer ${localStorage.getItem("token")}`
    
    };
    return fetchUtils.fetchJson(url, options);
};


const dataProvider=simpleRestProvider('http://localhost:4000/api', httpClient);
const history = createHashHistory();

function AdminPage(){
    return(
    <Provider store={createAdminStore({dataProvider,history})}>

        <Admin dataProvider={dataProvider} history={history} dashboard={Dashboard}>
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
            <Resource name="Products" list={ProductsList} edit={ProductsEdit} create={ProductsCreate}/>
            <Resource name="orders" list={OrderList} edit={OrderEdit} show={OrderShow}/>
            <Resource name="tickets" list={TicketList} edit={TicketEdit} show={TicketShow}/>
        </Admin>
    </Provider>
);
}




// // const dataProvider = jsonServerProvider('http://localhost:3000');//connect to json server
//connect to firebase
// const dataProvider=firebaseDataProvider(firebase, {})
// const options = {
//     logging: true,
//     // rootRef: "bamba/hummos",
//   };
// const authProvider = FirebaseAuthProvider(config,options);
// const history = createHashHistory();

// function AdminPage(){
//     // const dataProvider=firebaseDataProvider(firebase, {})
//     return(
//     <Provider store={createAdminStore({authProvider,dataProvider,history})}
// >
//         <Admin
//             authProvider={authProvider}
//             dataProvider={dataProvider}
//             history={history}
//             dashboard={Dashboard}
//         >
//             {/* <Resource name="usersReactAdmin" list={UserListReactAdmin} edit={UserEditReactAdmin} create={UserCreateReactAdmin}/> */}
//             <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
//             <Resource name="Products" list={ProductsList} edit={ProductsEdit} create={ProductsCreate}/>
//             <Resource name="orders" list={OrderList} edit={OrderEdit} show={OrderShow}/>
//         </Admin>
//     </Provider>
// );
// }
   

export default AdminPage;