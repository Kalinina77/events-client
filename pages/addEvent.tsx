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
import { Dropzone, IFileObject } from "../components/DropZone";

interface IFilter {
  GroupIds: string[];
}
const AddEvent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);

  const [employee, setEmployee] = useState<IEmployee[]>([]);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    GroupIds: [],
  });
  const [selectValue, setSelectValue] = useState<MultiValue<SelectValueType>>(
    []
  );

  const [images, setImages] = useState<IFileObject[]>([]);
  const [documents, setDocumetns] = useState<IFileObject[]>([]);
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
        const res = await searchStudents(filter);
        setStudents(res);
      } catch {}
    };
    void fetchStudent();
  }, [filter]);

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
        groupIds: selectValue.map((x) => x.value),
        studentIds: selectedStudents,
        photos: images,
        documents: documents,
      });
      router.push("/event");
    } catch {
      console.error("error creating event");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckboxStudents = (id: string) => {
    if (selectedStudents.some((z) => z === id)) {
      setSelectedStudents((state) => state.filter((z) => z !== id));
    } else {
      setSelectedStudents((state) => [...state, id]);
    }
  };

  const toggleCheckboxEmployees = (id: string) => {
    if (selectedEmployees.some((z) => z === id)) {
      setSelectedEmployees((state) => state.filter((z) => z !== id));
    } else {
      setSelectedEmployees((state) => [...state, id]);
    }
  };

  const optionsGroup = group.map((g) => ({
    value: g.id,
    label: g.name,
  }));

  const ApplyFilter = () => {
    setFilter({ GroupIds: selectValue.map((s) => s.value) });
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

        <div className="input-group mb-3 ">
          <select
            className="form-control"
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

        <div className="d-flex justify-content-start flex-gap pt-3">
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
          <button
            className="btn btn-outline-success ml-4  "
            onClick={(e) => {
              e.preventDefault();
              ApplyFilter()}}
          >
            Поиск
          </button>
        </div>
        <div className="d-flex flex-ct ">
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
          <Dropzone
            files={images}
            setFiles={setImages}
            buttonText="Добавить фото"
          />
          <Dropzone files={documents} setFiles={setDocumetns} />
          </div>
          <div className="d-flex flex-gap">
          <button type="submit" className="btn btn-primary">
            Добавить
          </button>
          <a href="event" className="btn btn-outline-danger">
            Отмена
          </a>
         </div>

          {/* <input
          type="file"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
         {postImage && <img src={postImage.myFile} />} */}
       
        {/* {images.length > 0 && (
          <>
            <div>IMAGES</div>
            <div>
              {images.map((x, index) => (
                <img key={index} src={x.data} />
              ))}
            </div>
          </>
        )} */}
      </form>
    </div>
  );
};

export default AddEvent;
