import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import DiagramEvent from "./diagramEvent";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
     {/* {!session ? (
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

            <div className="m-3">
              Разработка информационно-справочной системы формирования
              статистических отчетов мероприятий учебного заведения
              <br />
              (на примере ФГБОУ ВО «Российский экономический университет им.
              Г.В. Плеханова»)
            </div>

            <div>
              <button
                className="btn btn-outline-light"
                onClick={() => signIn()}
              >
                Войти GOOGLE
              </button>
            </div>
          </div>
        </div>
              ) : (*/}
        <DiagramEvent />
    {/*  )}*/}
    </>
  );
};

export default Home;
