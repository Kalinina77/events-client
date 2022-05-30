import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { IEventGet, IEventView } from "../api/event";

interface IViewForm {
  event: IEventView;
}
const ViewEventForm = (props: IViewForm) => {
  const { event } = props;

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
              {format(new Date(event.dateEnd), "dd.MM.yyyy")}
            </dd>
            <dt className="col-sm-3">Группы:</dt>
            <dd className="col-sm-9">{event.groupNames.join(", ")}</dd>
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

      <h3>фото и файл</h3>
    </div>
  );
};

export default ViewEventForm;
