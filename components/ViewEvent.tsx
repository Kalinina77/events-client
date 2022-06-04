import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { IEventGet, IEventView } from "../api/event";

interface IViewForm {
  event: IEventView;
}
const ViewEventForm = (props: IViewForm) => {
  const { event } = props;
const [activImage, setActivImage] = useState(0);
  return (
    <div>
      <h2 className="d-flex justify-content-center mb-3">
        Мероприятие: {event.name}{" "}
      </h2>
      <div className="d-flex f-dir">
        <div className="w-50 px-4">
          <Link href={`/event/ranks/${event.id}`}>
            <a className="btn btn-outline-success ">
              Редактирование призовых мест
            </a>
          </Link>
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Студенты</th>
                <th scope="col">Место</th>
              </tr>
            </thead>
            <tbody>
              {event.students.map((x) => (
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td className="text-center">{x.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 w-50">
          <dl className="row">
            <dt className="col-sm-3">Тип мероприятия: </dt>
            <dd className="col-sm-9">{event.type}</dd>
            <dt className="col-sm-3">Место проведения: </dt>
            <dd className="col-sm-9">{event.place}</dd>

            <dt className="col-sm-3">Описание:</dt>
            <dd className="col-sm-9">{event.description}</dd>

            <dt className="col-sm-3 text-truncate">Дата начала:</dt>
            <dd className="col-sm-9">
              {format(new Date(event.dateStart), "dd.MM.yyyy")}.
            </dd>

            <dt className="col-sm-3 text-truncate">Дата конца:</dt>
            <dd className="col-sm-9">
              {format(new Date(event.dateEnd), "dd.MM.yyyy")}.
            </dd>
          {/*  <dt className="col-sm-3">Группы:</dt>
            <dd className="col-sm-9">{event.groupNames.join(", ")}</dd>}*/}
          </dl>
          <table className="table table-hover  px-1">
            <thead>
              <tr>
                <th scope="col">Сотрудники</th>
              </tr>
            </thead>
            <tbody>
              {event.employeeNames.map((x, index) => (
                <tr key={index}>
                  <td>{x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
     
      
    <h5 className="d-flex justify-content-center mb-3">Фото и файлы мероприятия: </h5>
    
      <div className="d-flex flex-ct">
        {/* {event.photos.map(x=> <img key={x.id} src={x.data} alt={x.name}></img>)} */}

        <div id="carouselExampleIndicators " className="carousel slide w-50 " data-ride="carousel">
  <ol className="carousel-indicators">
  {event.photos.map((x, index)=>  <li key={x.id} data-target="#carouselExampleIndicators" 
  data-slide-to={index.toString()} className={index === activImage ? "active": "" }></li>)}
    
  </ol>
  <div className="carousel-inner">

    {event.photos.map((x, index)=>  <div key={x.id} className={`carousel-item ${index === activImage ? "active": ""} ` }
     ><img className="d-block w-100"  src={x.data} alt={x.name}></img></div>)}
  
  </div>
  <button onClick={()=> setActivImage(state=> state <= 0? event.photos.length - 1: state-1 )} className="carousel-control-prev" >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only"></span>
  </button>
  <button onClick={()=> setActivImage(state=> state >= event.photos.length - 1 ? 0: state+1 )} className="carousel-control-next" >
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only"></span>
  </button>
 
</div>
<div className="w-25 d-none d-md-block">
{event.documents.map(x=>  <div className="" key={x.id} > {x.name}</div>)}</div>
      </div>
    </div>
  );
};

export default ViewEventForm;
