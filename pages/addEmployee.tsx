import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IEmployeePost, postEmployee } from "../api/employee";
import { useRouter, Router } from "next/router";
import { getPosition, IPosition } from "../api/position";

const AddEmployee = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [positions, setPositions] = useState<IPosition[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const _positions = await getPosition();
        setPositions(_positions);
      } catch {}
    };
    void fetchPositions();
  }, []);

  const onSubmit = async (data: unknown) => {
    alert(JSON.stringify(data));
    try {
      setLoading(true);
      await postEmployee(data as IEmployeePost);
      router.push("/employee");
    } catch {
      console.error("error creating employee");
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Сотрудники</h2>
      {false && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3 ">
          <input
            {...register("lastName", {
              required: true,
              maxLength: 50,
              pattern: /^[А-Яа-я]+$/i,
            })}
            className="form-control"
            placeholder="Фамилия"
          />
        </div>
        {errors?.lastName?.type === "required" && (
          <p>Поле Фамилия обязательно для заполнения</p>
        )}
        {errors?.lastName?.type === "maxLength" && (
          <p>Фамилия не может быть больше 50 символов</p>
        )}
        {errors?.lastName?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}
        <div className="input-group mb-3 ">
          <input
            {...register("firstName", {
              required: true,
              maxLength: 50,
              pattern: /^[А-Яа-я]+$/i,
            })}
            className="form-control"
            placeholder="Имя"
          />
        </div>
        {errors?.firstName?.type === "required" && (
          <p>Поле Имя обязательно для заполнения</p>
        )}
        {errors?.firstName?.type === "maxLength" && (
          <p>Имя не может быть больше 50 символов</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}
        <div className="input-group mb-3 ">
          <input
            {...register("middleName", {
             
              maxLength: 50,
              pattern: /^[А-Яа-я]+$/i,
            })}
            className="form-control"
            placeholder="Отчество"
          />
        </div>
        {errors?.middleName?.type === "maxLength" && (
          <p>Имя не может быть больше 50 символов</p>
        )}
        {errors?.middleName?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}

        <div className="input-group mb-3">
          <select
            className="form-control"
            placeholder="Выберите..."
            {...register("positionId")}
          >
            {positions.map((x) => (
            
              <option key={x.id} value={x.id}>{x.name}</option>
            ))}
          </select>
          <div className="input-group-append">
            <label className="input-group-text">Должность</label>
          </div>
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend"></div>
          <input
            {...register("phone", {
              required: true,
              minLength: 11,
              maxLength: 16,
              pattern: /^[0-9+()-]+$/i,
            })}
            className="form-control"
            placeholder="Телефон"
          />  
        </div>
        {errors?.phone?.type === "required" && (
          <p>Поле Телефон обязательно для заполнения</p>
        )}
        {errors?.phone?.type === "maxLength" && (
          <p>Телефон не может быть больше 16 символов</p>
        )}
        {errors?.phone?.type === "minLength" && (
          <p>Телефон не может быть меньше 11 символов</p>
        )}
        {errors?.phone?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}
      
      <div className="d-flex flex-gap">
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
        <a
            href="employee"
            className="btn btn-outline-danger"
            type="submit"
          >
            Отмена
          </a>
          </div>
      </form>
    </div>
  );
};

export default AddEmployee;
