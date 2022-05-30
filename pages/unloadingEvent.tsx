import React from "react";

import TableEvents from "../components/TableEvents";
import TableStudents from "../components/TableStudents";


const UnloadingEvent = () => {
  return (
    <div>
      <h3 className="d-flex justify-content-center">Выгрузка отчета</h3>
      <ul className="nav nav-tabs" id="myTab" role="tablist" pb-3>
        <li className="nav-item">
          <a
            className="nav-link active"
            id="groups-tab"
            data-toggle="tab"
            href="#groups"
            role="tab"
            aria-controls="groups"
            aria-selected="true"
          >
            Фильтр по группам
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            id="events-tab"
            data-toggle="tab"
            href="#events"
            role="tab"
            aria-controls="events"
            aria-selected="false"
          >
            Фильтр по мероприятиям{" "}
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="groups"
          role="tabpanel"
          aria-labelledby="groups-tab"
        >
          {" "}
          <div className="d-flex flex-exp ">
            {" "}
           
           
          </div>
          <TableStudents />
         
        </div>

        <div
          className="tab-pane fade"
          id="events"
          role="tabpanel"
          aria-labelledby="events-tab"
        >
          <TableEvents />
        </div>
      </div>
    </div>
  );
};

export default UnloadingEvent;
