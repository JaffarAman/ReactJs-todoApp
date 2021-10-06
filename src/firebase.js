// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import  "firebase/compat/firestore";
import  "firebase/compat/database";
import config from "./config";

firebase.initializeApp(config);

const db = firebase.firestore();
// const database = firebase.database();

// export  default 
export {db} 
