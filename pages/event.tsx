import { format } from "date-fns";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { deleteEvent, getEvent, IEvent } from "../api/event";
import Select, { MultiValue } from "react-select";
import { SelectValueType } from "../constants/types";
import { EventTypeOptions } from "../constants/eventType";
import { GetServerSidePropsContext, PreviewData } from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

interface IFilter {
  type: string[];
  searchTerm: string;
}

const Event = () => {
  const [event, setEvent] = useState<IEvent[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<MultiValue<SelectValueType>>(
    []
  );
  const [searchValue, setSearchValue] = useState("");

  const [filter, setFilter] = useState<IFilter>({
    type: [],
    searchTerm: "",
  });
  console.log(selectedIds);
  const fetchEvent = useCallback(async () => {
    try {
      const res = await getEvent(filter);
      setEvent(res);
    } catch {}
  }, [filter]);
  useEffect(() => {
    void fetchEvent();
  }, [fetchEvent]);

  const toggleCheckbox = (id: string) => {
    if (selectedIds.some((z) => z === id)) {
      setSelectedIds(selectedIds.filter((z) => z !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteRequest = async () => {
    try {
      const res = await deleteEvent(selectedIds);
      fetchEvent();
    } catch {}
  };
  const FilterEvents = () => {
    setFilter({
      type: selectValue.map((s) => s.value),
      searchTerm: searchValue,
    });
  };
  return (
    <div>
      <div className="">
        <h1 className="d-flex justify-content-center">Мероприятия</h1>
        <div className="d-flex justify-content-start flex-gap pt-3">
          <input
            className="form-control col-4 mr-sm-2 w-25"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
            onChange={(s) => setSearchValue(s.target.value)}
          />
          <Select
            className="input-group-prepend  "
            closeMenuOnSelect={false}
            options={EventTypeOptions}
            classNamePrefix="select"
            value={selectValue}
            onChange={(v) => setSelectValue(v)}
            isMulti
            placeholder="Выберите тип мероприятия"
          />{" "}
          <button
            className="btn btn-outline-success ml-3 w-15 h-5"
            onClick={FilterEvents}
          >
            Поиск
          </button>
        </div>

        <table className="table table-hover m-3">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Дата начала</th>
              <th scope="col">Дата конца</th>
            </tr>
          </thead>
          <tbody>
            {event.map((x) => (
              <tr key={x.id}>
                <Link href={`/event/view/${x.id}`} passHref>
                  <td>{x.name}</td>
                </Link>
                <td>{format(new Date(x.dateStart), "dd.MM.yyyy")}</td>
                <td>{format(new Date(x.dateEnd), "dd.MM.yyyy")}</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedIds.some((z) => z === x.id)}
                      onChange={() => toggleCheckbox(x.id)}
                    />
                  </div>
                </td>
                <td>
                  <Link href={`/event/edit/${x.id}`} passHref>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-pencil-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex flex-gap">
          <a
            href="unloadingEvent"
            className="btn btn-outline-success "
            type="submit"
          >
            Выгрузка
          </a>
          <a href="addEvent" className="btn btn-outline-success " type="submit">
            Добавить
          </a>

          <button className="btn btn-outline-danger" onClick={deleteRequest}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
// ) => {
//   const session = await getSession(context);
//   if (!session) {
//     context.res.writeHead(302, { Location: "/" });
//     context.res.end();
//     return {};
//   }
//   return {
//     props: {
//       user: session.user,
//     },
//   };
// };