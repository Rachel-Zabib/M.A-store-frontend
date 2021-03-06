import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

export const config={
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId:process.env.REACT_APP_PROJECTID,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
  databaseURL:process.env.REACT_APP_DATABASE_URL

}
const app = firebase.initializeApp(config);

export const auth =  app.auth();
export const db = app.database();
export default firebase;





// import firebase from "firebase/app"
// import "firebase/auth"
// import "firebase/database"

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId:process.env.REACT_APP_PROJECTID,
//     storageBucket:process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID,
//     databaseURL:process.env.REACT_APP_DATABASE_URL
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   export const auth=firebase.auth();
//   export const db = firebase.database();