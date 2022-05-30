import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getGroups, IGroup } from "../api/group";
import { exportStudents, searchStudents, IStudent } from "../api/students";
import * as XLSX from "xlsx";
import Select, { MultiValue } from "react-select";
import { SelectValueType } from "../constants/types";

interface IFilter {
  GroupIds: string[];
  searchTerm: string;
}

const TableStudents = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [group, setGroup] = useState<IGroup[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    GroupIds: [],
    searchTerm: "",
  });
  // const [selectValue, setSelectValue] = useState<SelectValueType[]>([]);
  const [selectValue, setSelectValue] = useState<MultiValue<SelectValueType>>([]);
  const [searchValue, setSearchValue] = useState("");
  console.log(selectedIds);

  const tableRef = useRef(null);

  const fetchGroup = useCallback(async () => {
    try {
      const _group = await getGroups({
        QualificationIds: [],
        searchTerm: ""
      });
      setGroup(_group);
    } catch {}
  }, []);
  useEffect(() => {
    void fetchGroup();
  }, [fetchGroup]);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await searchStudents(filter);
      setStudents(res);
    } catch {}
  }, [filter]);

  useEffect(() => {
    void fetchStudents();
  }, [fetchStudents]);

  const toggleCheckbox = (id: string) => {
    if (selectedIds.some((z) => z === id)) {
      setSelectedIds(selectedIds.filter((z) => z !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const ApplyFilter = ()=> {
    
    setFilter({GroupIds: selectValue.map((s) =>  s.value), searchTerm: searchValue  });

  }

  const onConfirmExportClick = async () => {
    try {
      const res = await exportStudents(selectedIds);

      var workbook = XLSX.utils.book_new();

      var worksheet = XLSX.utils.aoa_to_sheet(res, {});
      XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
      XLSX.writeFileXLSX(workbook, ".xlsx");
    } catch {
      console.error("sheet");
    }
  };

  const optionsGroup = group.map((g) => ({
    value: g.id,
    label: g.name,
  }));
  return (
    <div>
       <div className="d-flex justify-content-start flex-gap pt-3">
      <input
        className="form-control col-4 mr-sm-2 w-25"
        type="search"
        placeholder="Поиск"
        aria-label="Search"
        onChange={(s)=>setSearchValue(s.target.value)}
      />

    
    
        <Select
          className="input-group-prepend  "
          closeMenuOnSelect={false}
          options={optionsGroup}
          classNamePrefix="select"
          value={selectValue}
          onChange={(v) => setSelectValue(v)}
          isMulti
          placeholder="Выберите группы"
        />{" "}
        <button className="btn btn-outline-success ml-3 w-15 h-5" onClick={ApplyFilter}>
          Поиск
        </button>
      </div>
      <h3 className="d-flex justify-content-center pt-2">Студенты</h3>
      <table className="table table-hover m-2">
        <thead>
          <tr>
            <th scope="col">ФИО</th>
            <th scope="col">Группа</th>
            <th>
              {" "}
              <div className="form-check">
                <input type="checkbox" className="form-check-input" />{" "}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((x) => (
            <tr key={x.id}>
              <td>{x.fullName}</td>
              <td>{x.groupName}</td>

              <td>
                {" "}
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedIds.some((z) => z === x.id)}
                    onChange={() => toggleCheckbox(x.id)}
                  />{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
      <div  className="d-flex flex-gap">
        <button className="btn btn-outline-success " onClick={onConfirmExportClick}>Выгрузка</button>
      </div>
    </div>
  );
};

export default TableStudents;
