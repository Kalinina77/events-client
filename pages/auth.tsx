import React, { useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import router from "next/router";
import Image from "next/image";

const provider = new GoogleAuthProvider();

type UserDataType = {
  email: string;
  password: string;
};

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBojq28TLplE1Tc0kS0Q4jlI7kjyIJbh_M",
  authDomain: "mazdashop-aa1a0.firebaseapp.com",
  projectId: "mazdashop-aa1a0",
  storageBucket: "mazdashop-aa1a0.appspot.com",
  messagingSenderId: "100795691723",
  appId: "1:100795691723:web:2e5ba0a3d728ddf24b214e",
  measurementId: "G-D3JD7RQ3WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: unknown) => {
    try {
      setLoading(true);
      const _data = data as UserDataType;
      const userCredential = await signInWithEmailAndPassword(
        // const userCredential = await createUserWithEmailAndPassword(
        auth,
        _data.email,
        _data.password
      );
      console.log(userCredential);
      // router.push("/students")
    } catch (error) {
      //   const errorCode = error.code;
      // const errorMessage = error.message;
      console.error(error);
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  const onGoogleSignIn = () => {
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
  return (
    <div>
      

      <video src="main.mp4" preload="auto" playsInline autoPlay loop id="myVideo"></video>

      <div className="content">
        <a>
          <Image src="/logo.svg" width="100" height="100" alt="" />
          Российский экономический университет имени Г.В. Плеханова
        </a>

        <p>
         Разработка информационно-справочной системы формирования
          статистических отчетов мероприятий учебного заведения<p>(на примере
          ФГБОУ ВО «Российский экономический университет им. Г.В. Плеханова»)</p> 
        </p>
        <button className="btn btn-outline-light" onClick={onGoogleSignIn}>
          Войти GOOGLE
        </button>
      </div>

      {/* <button className="btn btn-outline-danger" onClick={() => signOut(auth)}>
        Выйти
      </button> */}
    </div>
  );
};

export default Auth;
