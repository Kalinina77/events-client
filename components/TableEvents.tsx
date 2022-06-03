import { format } from "date-fns";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { exportEvents, getEvent, IEvent } from "../api/event";
import * as XLSX from "xlsx";
import { EventTypeOptions, PlaceOptions } from "../constants/eventType";
import Select, { MultiValue } from "react-select";
import { SelectValueType } from "../constants/types";

interface IFilter {
  type: string[];
  searchTerm: string;
  places: string[];
  dateStart: Date;
  dateEnd: Date;
}

const TableEvents = () => {
  const [event, setEvent] = useState<IEvent[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tableRef = useRef(null);
  const [filter, setFilter] = useState<IFilter>({
    type: [],
    searchTerm: "",
    dateStart: new Date(),
    dateEnd: new Date(),
    places: [],
  });
  const [selectValue, setSelectValue] = useState<MultiValue<SelectValueType>>(
    []
  );
  const [placeValue, setPlaceValue] = useState<MultiValue<SelectValueType>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectDateStart, setSelectDateStart] = useState(new Date());
  const [selectDateEnd, setSelectDateEnd] = useState(new Date());
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

  const onConfirmExportClick = async () => {
    try {
      const res = await exportEvents(selectedIds);

      var workbook = XLSX.utils.book_new();

      var worksheet = XLSX.utils.aoa_to_sheet(res, {});
      XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
      XLSX.writeFileXLSX(workbook, ".xlsx");
    } catch {
      console.error("sheet");
    }
  };

  const FilterEvents = () => {
    setFilter({
      type: selectValue.map((s) => s.value),
      places: placeValue.map((s) => s.value),
      searchTerm: searchValue,
      dateStart: selectDateStart,
      dateEnd: selectDateEnd,
    });
  };
  return (
    <div>
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
          value={selectValue}
          onChange={(v) => setSelectValue(v)}
          classNamePrefix="select"
          isMulti
          placeholder="Выберите тип мероприятия"
        />
        <Select
          className="input-group-prepend  "
          closeMenuOnSelect={false}
          options={PlaceOptions}
          value={placeValue}
          onChange={(v) => setPlaceValue(v)}
          classNamePrefix="select"
          isMulti
          placeholder="Выберите призовые места"
        />
      </div>
      <div className="d-flex justify-content-start flex-gap pt-3">
        <label>c</label>
        <input
          type="date"
          className="form-control"
          onChange={(v) => setSelectDateStart(new Date(v.target.value))}
        />

        <label>по</label>
        <input
          type="date"
          className="form-control"
          onChange={(v) => setSelectDateEnd(new Date(v.target.value))}
        />

        <button
          className="btn btn-outline-success ml-3 "
          onClick={FilterEvents}
        >
          Поиск
        </button>
      </div>
      <h3 className="d-flex justify-content-center pt-3">Мероприятия</h3>
      <table className="table table-hover m-2">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Дата начала</th>
            <th scope="col">Дата конца</th>
            <th>
             
            </th>
          </tr>
        </thead>
        <tbody>
          {event.map((x) => (
            <tr key={x.id}>
             
                <td>{x.name}</td>
              
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex flex-gap">
        <button
          className="btn btn-outline-success "
          onClick={onConfirmExportClick}
        >
          Выгрузка
        </button>
      </div>
    </div>
  );
};

export default TableEvents;
