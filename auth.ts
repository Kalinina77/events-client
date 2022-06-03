import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBojq28TLplE1Tc0kS0Q4jlI7kjyIJbh_M",
  authDomain: "mazdashop-aa1a0.firebaseapp.com",
  projectId: "mazdashop-aa1a0",
  storageBucket: "mazdashop-aa1a0.appspot.com",
  messagingSenderId: "100795691723",
  appId: "1:100795691723:web:2e5ba0a3d728ddf24b214e",
  measurementId: "G-D3JD7RQ3WS",
};

export const provider = new GoogleAuthProvider();

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const onSignOut = () => {
  console.log("signOut");
  signOut(auth);
};

export const onGoogleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
