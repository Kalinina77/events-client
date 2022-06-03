import React from 'react'
import { useForm } from 'react-hook-form';
import { IQualification } from '../api/qualifications';
import { ISpecialityGet } from '../api/speciality';

interface IEditForm {
  specialitie: ISpecialityGet;
 
  onSubmit: (data: unknown) => void;
}
const EditFormSpecialities = (props: IEditForm) => {
  const { specialitie, onSubmit } = props;

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
        

   

   
    <button type="submit" className="btn btn-primary">
      Изменить
    </button>
  </form>
);
};

export default EditFormSpecialities