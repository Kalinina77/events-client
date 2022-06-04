import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IEmployee } from "../api/employee";
import { IEventGet, IEventPostArrays, IEventPut } from "../api/event";
import { IGroup } from "../api/group";
import { IStudent, IStudentGet } from "../api/students";
import Select, { MultiValue } from "react-select";
import { EventTypeOptions } from "../constants/eventType";
import { SelectValueType } from "../constants/types";

interface IEditFormEvent {
  students: IStudent[];
  groups: IGroup[];
  employees: IEmployee[];
  event: IEventGet;
  onSubmit: (data: IEventPut, arrays: IEventPostArrays) => void;
}

const EditFormEvent = (props: IEditFormEvent) => {
  const { event, students, groups, employees, onSubmit } = props;

  const [selectedStudentIds, setSelectedStudents] = useState<string[]>(
    event.studentIds
  );
  const [selectedGroupIds, setSelectedGroups] = useState<string[]>(
    event.groupIds
  );
  const [selectedEmployeeIds, setSelectedEmployees] = useState<string[]>(
    event.employeeIds
  );

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      ...event,
      dateStart: format(new Date(event.dateStart), "yyyy-MM-dd"),
      dateEnd: format(new Date(event.dateEnd), "yyyy-MM-dd"),
    },
  });

  const toggleCheckboxStudents = (id: string) => {
    if (selectedStudentIds.some((z) => z === id)) {
      setSelectedStudents((state) => state.filter((z) => z !== id));
    } else {
      setSelectedStudents((state) => [...state, id]);
    }
  };
  const toggleCheckboxGroups = (id: string) => {
    if (selectedGroupIds.some((z) => z === id)) {
      setSelectedGroups((state) => state.filter((z) => z !== id));
    } else {
      setSelectedGroups((state) => [...state, id]);
    }
  };
  const toggleCheckboxEmployees = (id: string) => {
    if (selectedEmployeeIds.some((z) => z === id)) {
      setSelectedEmployees((state) => state.filter((z) => z !== id));
    } else {
      setSelectedEmployees((state) => [...state, id]);
    }
  };

const prepareSubmit = (data: unknown) =>{
  onSubmit(data as IEventPut, {
    employeeIds: selectedEmployeeIds,
    groupIds: selectedGroupIds,
    studentIds: selectedStudentIds,
    
  })
}



  return (
    <form onSubmit={handleSubmit(prepareSubmit)}>
      <div className="row mb-3">
        <div className="col">
          <label>Название</label>
          <input
            {...register("name", {
              required: true,
              maxLength: 50,
              pattern: /^[А-Яа-я A-Za-z 0-9 - . ]+$/i,
            })}
            className="form-control"
            placeholder="Название"
          />
        </div>
      </div>
      {errors?.name?.type === "required" && (
        <p>Поле Название обязательно для заполнения</p>
      )}
      {errors?.name?.type === "maxLength" && (
        <p>Название не может быть больше 50 символов</p>
      )}
      {errors?.name?.type === "pattern" && <p>Поле заполненно некорректно</p>}
      <div className="input-group mb-3 ">
        <select
          className="input-group-prepend w-100 "
          {...register("type", {
            required: true,
          })}
        >
          {EventTypeOptions.map((x) => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label>Место проведения</label>
          <input
            {...register("place", {
              required: true,
              maxLength: 100,
            })}
            className="form-control"
            placeholder="Место проведения"
          />
        </div>
      </div>
      {errors?.place?.type === "required" && (
        <p>Поле Место проведения обязательно для заполнения</p>
      )}
      {errors?.place?.type === "maxLength" && (
        <p>Место проведения не может быть больше 50 символов</p>
      )}

      <div className="form-group mb-3">
        <label>Описание</label>
        <textarea
          {...register("description", {
            required: true,
            maxLength: 100,
          })}
          placeholder="Описание"
          className="form-control"
          id="exampleFormControlTextarea1"
        ></textarea>
      </div>
      {errors?.description?.type === "required" && (
        <p>Поле Описание обязательно для заполнения</p>
      )}
      {errors?.description?.type === "maxLength" && (
        <p>Описание не может быть больше 100 символов</p>
      )}

      <div className="row">
        <div className="col">
          <label>Дата начала</label>
          <input
            {...register("dateStart", {
              required: true,
            })}
            type="date"
            className="form-control"
            placeholder="Дата начала"
          />
        </div>
        {errors?.dateStart?.type === "required" && (
          <p>Поле Дата начала обязательно для заполнения</p>
        )}
        <div className="col">
          <label>Дата конца</label>
          <input
            {...register("dateEnd", {
              required: true,
            })}
            type="date"
            className="form-control"
            placeholder="Дата конца"
          />
        </div>
        {errors?.dateEnd?.type === "required" && (
          <p>Поле Дата конца обязательно для заполнения</p>
        )}
      </div>

      <div className="d-flex flex-ct ">
        <table className="table table-hover w-25">
          <thead>
            <tr>
              <th scope="col">Группы</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((x) => (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>
                  {" "}
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedGroupIds.some((z) => z === x.id)}
                      onChange={() => toggleCheckboxGroups(x.id)}
                    />{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table table-hover w-25">
          <thead>
            <tr>
              <th scope="col">Студенты</th>
            </tr>
          </thead>
          <tbody>
            {students.map((x) => (
              <tr key={x.id}>
                <td>{x.fullName}</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedStudentIds.some((z) => z === x.id)}
                      onChange={() => toggleCheckboxStudents(x.id)}
                    />{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table table-hover w-25 px-1">
          <thead>
            <tr>
              <th scope="col">Сотрудники</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((x) => (
              <tr key={x.id}>
                <td>{x.fullName}</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                     checked={selectedEmployeeIds.some((z) => z === x.id)}
                      onChange={() => toggleCheckboxEmployees(x.id)}
                    />{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-gap">
        <button type="submit" className="btn btn-primary">
          Изменить
        </button>
      </div>
    </form>
  );
};

export default EditFormEvent;
