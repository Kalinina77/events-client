import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ISpecialityPost, postSpecialitys } from '../api/speciality';
import { getQualifications, IQualification } from '../api/qualifications';



const AddSpeciality = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [qualification, setQualification] = useState<IQualification[]>([]);
    const router = useRouter()
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  
  
      useEffect(() => {
        const fetchGroup = async () => {
          try {
            const res = await getQualifications({});
            setQualification(res);
          } catch {}
        };
        void fetchGroup();
      }, []);

      
    const onSubmit = async (data: unknown) => {
      try {
        setLoading(true);
        await postSpecialitys(data as ISpecialityPost);
        router.push("/speciality")
      } catch {
        console.error("error creating Specialitys");
      } finally {
        setLoading(false);
      }
  
      console.log(data);
    };
  

  return (
    <div className="">
     <h2 className="d-flex justify-content-center mb-3">Специальность</h2>
     {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3 ">
          <input
            {...register("Name",{
              required: true,
              maxLength: 50,
              pattern: /^\s*[А-Я а-я «» 0-9.]+$/i,
            })}
            className="form-control"
            placeholder="Название"
          />
        </div>
        {errors?.Name?.type === "required" && (
          <p>Поле Название обязательно для заполнения</p>
        )}
        {errors?.Name?.type === "maxLength" && (
          <p>Название не может быть больше 50 символов</p>
        )}
        {errors?.Name?.type === "pattern" && <p>Поле заполненно некорректно</p>}
        
        

        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
        </form>
    </div>
  )
}
  
export default AddSpeciality