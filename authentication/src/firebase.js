import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore,collection , getDocs} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCTVI-PnfwBk53GKGLEV1lalaAtt-AKum0",
  authDomain: "fir-authentication-cb112.firebaseapp.com",
  databaseURL: "https://fir-authentication-cb112-default-rtdb.firebaseio.com",
  projectId: "fir-authentication-cb112",
  storageBucket: "fir-authentication-cb112.appspot.com",
  messagingSenderId: "969110428036",
  appId: "1:969110428036:web:8cf82119d4ae5ae641a5d1",
  measurementId: "G-0YMNRX6VC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init service 
const db = getFirestore();

//collection ref
const colRef =  collection(db,'users')

//get collection data
getDocs(colRef)
.then((snapshot)=>{
  let Users =[]
  snapshot.docs.forEach((doc)=>{
    Users.push({...doc.data(),id:doc.id})
  })
  console.log(Users)
})
.catch(err => {
  console.log(err.message)
})

export const auth = getAuth(app);
export default app;

