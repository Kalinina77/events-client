import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { IGroupGet } from "../api/group";
import { IQualification } from "../api/qualifications";

interface IEditForm {
  qualification: IQualification[];
  group: IGroupGet;
  onSubmit: (data: unknown) => void;
}
const EditGroupForm = (props: IEditForm) => {
  const { qualification, group, onSubmit } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...group,
      date: format(new Date(group.date), "yyyy-MM-dd"),
    },
  });
  console.log(group.date);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-3 ">
        <input
          {...register("name", {
            required: true,
            maxLength: 50,
            pattern: /^[А-Яа-я 0-9 -]+$/i,
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
      <div className="input-group mb-3">
        <select
          className="form-control"
          placeholder="Выберите..."
          {...register("qualificationId")}
        >
          {qualification.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <div className="input-group-append">
          <label className="input-group-text">Квалификация</label>
        </div>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label>Дата создания</label>
          <input
            {...register("date", {
              required: true,
            })}
            type="date"
            className="form-control"
            placeholder="Дата создания"
          />
        </div>
      </div>{" "}
      {errors?.date?.type === "required" && (
        <p>Поле Дата создания обязательно для заполнения</p>
      )}
      <button type="submit" className="btn btn-primary">
        Изменить
      </button>
    </form>
  );
};

export default EditGroupForm;
