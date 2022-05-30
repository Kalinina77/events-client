import React from 'react'
import { useForm } from 'react-hook-form';
import { IQualification } from '../api/qualifications';
import { ISpecialityGet } from '../api/speciality';

interface IEditForm {
  specialitie: ISpecialityGet;
  qulification: IQualification[];
  onSubmit: (data: unknown) => void;
}
const EditFormSpecialities = (props: IEditForm) => {
  const { specialitie, qulification, onSubmit } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: specialitie });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="input-group mb-3 ">
      <input
        {...register("name",{
          required: true,
          maxLength: 100,
          pattern: /^\s*[А-Яа-я "" 0-9  .]+$/i,
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
        {...register("qualificationId")}
      >
        {qulification.map((x) => (
          <option value={x.id}>{x.name}</option>
        ))}
      </select>
      <div className="input-group-append">
        <label className="input-group-text">Квалификация</label>
      </div>
    </div>

   
    <button type="submit" className="btn btn-primary">
      Изменить
    </button>
  </form>
);
};

export default EditFormSpecialities