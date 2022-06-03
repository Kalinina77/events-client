import Link from "next/link";
import React from "react";
import Image from "next/image";

interface IHeader {
  signOut: () => void;
  visible?: boolean;
}
const Header = (props: IHeader) => {
  const { visible, signOut } = props;
  return (
    <>
      {visible && (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a>h</a>
            <a className="navbar-brand">
              <Image
                src="/icons8-event.png"
                alt="Landscape picture"
                width={30}
                height={30}
              />
            </a>

            <a className="navbar-brand">Event traker</a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link href="/students">
                    <a className="nav-link">Студенты</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/employee">
                    <a className="nav-link">Сотрудники</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/group">
                    <a className="nav-link">Группы</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/event">
                    <a className="nav-link">Мероприятия</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/speciality">
                    <a className="nav-link">Специальность</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/qualification">
                    <a className="nav-link">Квалификация</a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/diagramEvent">
                    <a className="nav-link">Диаграмма</a>
                  </Link>
                </li>
                <li className="nav-item  ">
                  {/* <a className="nav-link">Выйти</a> */}
                  <button className="nav-link" onClick={signOut}>
                    Выйти
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
