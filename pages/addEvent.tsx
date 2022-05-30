import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getEmployee, IEmployee } from "../api/employee";
import { IEventPost, postEvent } from "../api/event";
import { getGroups, IGroup } from "../api/group";
import { searchStudents, IStudent } from "../api/students";
import { useRouter, Router } from "next/router";
import Select, { MultiValue } from "react-select";
import { EventTypeOptions } from "../constants/eventType";
import { SelectValueType } from "../constants/types";

const AddEvent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);

  const [employee, setEmployee] = useState<IEmployee[]>([]);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectType, setSelectType] = useState<MultiValue<SelectValueType>>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getEmployee({});
        setEmployee(res);
      } catch {}
    };
    void fetchEmployee();
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await searchStudents({});
        setStudents(res);
      } catch {}
    };
    void fetchStudent();
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await getGroups({});
        setGroup(res);
      } catch {}
    };
    void fetchGroup();
  }, []);

  const onSubmit = async (data: unknown) => {
    try {
      setLoading(true);
      await postEvent(data as IEventPost, {
        employeeIds: selectedEmployees,
        groupIds: selectedGroups,
        studentIds: selectedStudents,
        
      });
      router.push("/event");
    } catch {
      console.error("error creating event");
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  const toggleCheckboxStudents = (id: string) => {
    if (selectedStudents.some((z) => z === id)) {
      setSelectedStudents((state) => state.filter((z) => z !== id));
    } else {
      setSelectedStudents((state) => [...state, id]);
    }
  };
  const toggleCheckboxGroups = (id: string) => {
    if (selectedGroups.some((z) => z === id)) {
      setSelectedGroups((state) => state.filter((z) => z !== id));
    } else {
      setSelectedGroups((state) => [...state, id]);
    }
  };
  const toggleCheckboxEmployees = (id: string) => {
    if (selectedEmployees.some((z) => z === id)) {
      setSelectedEmployees((state) => state.filter((z) => z !== id));
    } else {
      setSelectedEmployees((state) => [...state, id]);
    }
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Мероприятия</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3 ">
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
        <div className="input-group mb-3 ">
          <input
            {...register("place", {
              required: true,
              maxLength: 100,
             
            })}
            className="form-control"
            placeholder="Место проведения"
          />
        </div>
        {errors?.place?.type === "required" && (
          <p>Поле Место проведения обязательно для заполнения</p>
        )}
        {errors?.place?.type === "maxLength" && (
          <p>Место проведения не может быть больше 50 символов</p>
        )}
        
        <div className="form-group mb-3">
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
              {group.map((x) => (
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td>
                    {" "}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedGroups.some((z) => z === x.id)}
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
                        checked={selectedStudents.some((z) => z === x.id)}
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
              {employee.map((x) => (
                <tr key={x.id}>
                  <td>{x.fullName}</td>
                  <td>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedEmployees.some((z) => z === x.id)}
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
            Добавить
          </button>
          <button className="btn btn-primary">Добавить фото</button>
          <button className="btn btn-primary">Добавить файл</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
