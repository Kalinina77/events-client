// import React from 'react'

// const Layout = () => {
//     const provider = new GoogleAuthProvider();

//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
  
//     // Initialize Firebase Authentication and get a reference to the service
//     const auth = getAuth(app);
  
//     const onSignOut = () => signOut(auth);
  
//     const onGoogleSignIn = () => {
//       signInWithPopup(auth, provider)
//         .then((result) => {
//           // This gives you a Google Access Token. You can use it to access the Google API.
//           const credential = GoogleAuthProvider.credentialFromResult(result);
//           const token = credential?.accessToken;
//           // The signed-in user info.
//           const user = result.user;
//           // ...
//         })
//         .catch((error) => {
//           // Handle Errors here.
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           // The email of the user's account used.
//           const email = error.email;
//           // The AuthCredential type that was used.
//           const credential = GoogleAuthProvider.credentialFromError(error);
//           // ...
//         });
//     };
//   return (
//     <div>{!auth?.currentUser ? (
//         <Landing onSignIn={onGoogleSignIn} />
//       ) : (
//         <>
//           <Header signOut={onSignOut} />
//           <div className="py-3 px-5">
//             <Component {...pageProps} />
//           </div>
//         {/* </> */}
//       )}</div>
//   )
// }

// export default Layout