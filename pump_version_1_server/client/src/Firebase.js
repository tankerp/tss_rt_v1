import firebase from "firebase/app"
import "firebase/auth"
/*
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})
*/

const app = firebase.initializeApp({
  apiKey: "AIzaSyAWFlD9mU2pEfqEAY8vwoTp1P18ADYv__0",
  authDomain: "app3-development.firebaseapp.com",
  projectId: "app3-development",
  storageBucket: "app3-development.appspot.com",
  messagingSenderId: "1051394915902",
  appId: "1:1051394915902:web:4bae874736afdbab135b6f"
})

export const auth = app.auth()
export default app
