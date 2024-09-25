import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCakWWeTpJarJotveoi-3fAufFy6Oam8R8",
  authDomain: "netflixclone1729.firebaseapp.com",
  projectId: "netflixclone1729",
  storageBucket: "netflixclone1729.appspot.com",
  messagingSenderId: "56547675945",
  appId: "1:56547675945:web:5bb8f3746f1244655fb138"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
   try {
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvidera:"local",
        email,
    })
   } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('_').join(" "));
   }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('_').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}