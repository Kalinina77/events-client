import React, { useCallback, useEffect, useState } from "react";
import { deleteStudent, searchStudents, IStudent } from "../api/students";
import Link from "next/link";
import Select, { MultiValue } from "react-select";
import { getGroups, IGroup } from "../api/group";
import { SelectValueType } from "../constants/types";

interface IFilter {
  GroupIds: string[];
  searchTerm: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [group, setGroup] = useState<IGroup[]>([]);
  console.log(selectedIds);
  const [filter, setFilter] = useState<IFilter>({
    GroupIds: [],
    searchTerm: "",
  });
  const [selectValue, setSelectValue] = useState<MultiValue<SelectValueType>>([]);
  const [searchValue, setSearchValue] = useState("");
  
  const fetchGroup = useCallback(async () => {
    try {
      const _group = await getGroups({
        QualificationIds:[],
        searchTerm:""
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

  const deleteRequest = async () => {
    try {
      const res = await deleteStudent(selectedIds);
      fetchStudents();
    } catch {}
  };
  const ApplyFilter = ()=> {
    
    setFilter({GroupIds: selectValue.map((s) =>  s.value), searchTerm: searchValue });

  }
  const optionsGroup = group.map((g) => ({
    value: g.id,
    label: g.name,
  }));

  return (
    <div>
      <div>
        <h1 className="d-flex justify-content-center">Студенты</h1>
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

        <table className="table table-hover m-3">
          <thead>
            <tr>
              <th scope="col">ФИО</th>
              <th scope="col">Группа</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((x) => (
              <tr key={x.id}>
                <td>{x.fullName}</td>
                <td>{x.groupName}</td>
                <td>{x.email}</td>
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
                <td>
                  <Link href={`/student/edit/${x.id}`}>
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
          <Link href="/studentsImport">
            <a className="btn btn-outline-primary ">
              Загрузить студентов
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-download m-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"
                />
                <path
                  fillRule="evenodd"
                  d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"
                />
              </svg>
            </a>
          </Link>

        
        
              <Link href="/student/add"> 
                <a  className="btn btn-outline-success " >
                Добавить
                </a>
                </Link>

          <button className="btn btn-outline-danger " onClick={deleteRequest}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
