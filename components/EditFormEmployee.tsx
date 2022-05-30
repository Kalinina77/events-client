import React from "react";
import { useForm } from "react-hook-form";
import { IEmployeeGet } from "../api/employee";
import { IPosition } from "../api/position";

interface IEditForm {
  employee: IEmployeeGet;
  position: IPosition[];
  onSubmit: (data: unknown) => void;
}

const EditEmployeeForm = (props: IEditForm) => {
  const { employee, position, onSubmit } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: employee });

  return (
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
      </div>{" "}
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
            required: true,
            maxLength: 50,
            pattern: /^[А-Яа-я]+$/i,
          })}
          className="form-control"
          placeholder="Отчество"
        />
      </div>
      {errors?.middleName?.type === "required" && (
        <p>Поле Имя обязательно для заполнения</p>
      )}
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
          {...register("positionId", {
            required: true,
          })}
        >
          {position.map((x) => (
            <option key={x.id} value={x.id}>{x.name}</option>
          ))}
        </select>
        <div className="input-group-append">
          <label className="input-group-text">Должность</label>
        </div>
      </div>
      {errors?.positionId?.type === "required" && (
        <p>Поле Имя обязательно для заполнения</p>
      )}
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
      {errors?.phone?.type === "pattern" && <p>Поле заполненно некорректно</p>}
      <button type="submit" className="btn btn-primary">
        Изменить
      </button>
    </form>
  );
};

export default EditEmployeeForm;
