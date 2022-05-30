import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a>h</a>
          <a className="navbar-brand" >
            <img src="\icons8-event.png" width="30" height="30" alt="" />
          </a>
         
           <a className="navbar-brand" >
            Event traker
          </a>
      
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link href="/students">
                <a className="nav-link" >
                  Студенты
                </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/employee"> 
                <a className="nav-link" >
                   Сотрудники
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link href="/group"> 
                <a className="nav-link" >
                  Группы
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link href="/event"> 
                <a className="nav-link" >
                  Мероприятия
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link href="/speciality"> 
                <a className="nav-link" >
                  Специальность
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link href="/qualification"> 
                <a className="nav-link" >
                  Квалификация
                </a>
                </Link>
              </li>
          
              <li className="nav-item">
              <Link href="/diagramEvent"> 
                <a className="nav-link" >
                  Диаграмма
                </a>
                </Link>
              </li>
              <li className="nav-item  ">
              <Link href="auth"> 
                <a className="nav-link" >
                  Выйти
                </a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
  )
}

export default Header