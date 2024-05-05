import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQZmPV3xFKi38ciqMUhtFK0HmaJIQDW64",
  authDomain: "fullstack-dev-challenge-td.firebaseapp.com",
  projectId: "fullstack-dev-challenge-td",
  storageBucket: "fullstack-dev-challenge-td.appspot.com",
  messagingSenderId: "1452637159",
  appId: "1:1452637159:web:f94f4a16d4d6887abf1b42",
  measurementId: "G-W052DN9PRN"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)