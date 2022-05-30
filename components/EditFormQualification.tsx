import React from "react";
import { useForm } from "react-hook-form";
import { IQualificationGet } from "../api/qualifications";
import { ISpeciality } from "../api/speciality";

interface IEditForm {
  qualification: IQualificationGet;
  speciality: ISpeciality[];
  onSubmit: (data: unknown) => void;
}
const EditQualificationForm = (props: IEditForm) => {
  const { qualification, speciality, onSubmit } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: qualification });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-3 ">
        <input
          {...register("name", {
            required: true,
            maxLength: 100,
            pattern: /^\s*[А-Яа-я  .]+$/i,
          })}
          className="form-control"
          placeholder="Название"
        />
      </div>
      {errors?.name?.type === "required" && (
        <p>Поле Название обязательно для заполнения</p>
      )}
      {errors?.name?.type === "maxLength" && (
        <p>Название не может быть больше 100 символов</p>
      )}
      {errors?.name?.type === "pattern" && <p>Поле заполненно некорректно</p>}

      <div className="input-group mb-3">
        <select
          className="form-control"
          placeholder="Выберите..."
          {...register("specialityId")}
        >
          {speciality.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <div className="input-group-append">
          <label className="input-group-text">Специальность</label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Изменить
      </button>
    </form>
  );
};

export default EditQualificationForm;
