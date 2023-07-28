import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"

const app = initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
})



export const auth = getAuth(app)
export default app 
