import React, { useState } from "react";

import Image from "next/image";
import { auth, onGoogleSignIn, provider } from "../auth";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

interface ILading {
  onSignIn: () => void;
}
const Landing = (props: ILading) => {
  const { onSignIn } = props;
  const router = useRouter()

  const onGoogleSignIn = async () => {
    try {

      const res = await signInWithPopup(auth, provider)
    } catch {
      console.error("auth")
    }

    router.push('')
  };
  
  return (
    <div>
      <video
        src="main.mp4"
        preload="auto"
        playsInline
        autoPlay
        loop
        id="myVideo"
      ></video>

      <div className="content">
  
        <a>
          <Image src="/logo.svg" width="100" height="100" alt="" />
          Российский экономический университет имени Г.В. Плеханова
        </a>
        <p></p>


        <div className="m-3">Разработка информационно-справочной системы формирования
          статистических отчетов мероприятий учебного заведения<br/>
          (на примере ФГБОУ ВО «Российский экономический университет им. Г.В.
            Плеханова»)</div>

        
        <button className="btn btn-outline-light" onClick={onGoogleSignIn}>
          Войти GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Landing;
