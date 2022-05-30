import Script from "next/script";
import React from "react";
import { GoogleApiProvider, useGoogleApi } from "react-gapi";
const CLIENT_ID = "<YOUR_CLIENT_ID>";
const API_KEY = "<YOUR_API_KEY>";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

let tokenClient;
let gapiInited = false;
let gisInited = false;

const Drive = () => {
  const gapiAuth = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapiAuth?.auth2?.getAuthInstance();

  const gapi = useGoogleApi({
    discoveryDocs: [DISCOVERY_DOC],
    scopes: [SCOPES],
  });

//   if (!gapi) {
//     return <div>Some loading screen</div>;
//   }

  console.log(gapi?.client?.drive);

  return (
    <div>
      <GoogleApiProvider clientId={"AIzaSyBojq28TLplE1Tc0kS0Q4jlI7kjyIJbh_M"}>
        <h1>drive page</h1>

        <div>
          {!auth ? (
            <span>Loading...</span>
          ) : auth?.isSignedIn.get() ? (
            `Logged in as "${auth.currentUser
              .get()
              .getBasicProfile()
              .getName()}"`
          ) : (
            <button onClick={() => auth.signIn()}>Login</button>
          )}
        </div>

        {gapi && gapi.client?.drive}
        {/* <Script
        async
        defer
        src="https://apis.google.com/js/api.js"
        onLoad={gapiLoaded()}
      ></Script>
      <Script
        async
        defer
        src="https://accounts.google.com/gsi/client"
        onLoad={gisLoaded()}
      ></Script> */}
      </GoogleApiProvider>
    </div>
  );
};

export default Drive;
