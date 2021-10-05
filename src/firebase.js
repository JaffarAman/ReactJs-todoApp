// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import  "firebase/compat/firestore";
import config from "./config";

firebase.initializeApp(config);

const db = firebase.firestore();

export  default db 
