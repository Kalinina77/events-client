import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IQualificationPost, postQualification } from "../api/qualifications";
import { getSpecialitys, ISpeciality } from "../api/speciality";

const AddQualification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [speciality, setSpeciality] = useState<ISpeciality[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await getSpecialitys({});
        setSpeciality(res);
      } catch {}
    };
    void fetchGroup();
  }, []);

  const onSubmit = async (data: unknown) => {
    try {
      setLoading(true);
      await postQualification(data as IQualificationPost);
      router.push("/qualification");
    } catch {
      console.error("error creating Qualification");
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Квалификация</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3 ">
          <input
            {...register("Name", {
              required: true,
              maxLength: 100,
              pattern: /^\s*[ А-Яа-я .]+$/i,
            })}
            className="form-control"
            placeholder="Название"
          />
        </div>
        {errors?.Name?.type === "required" && (
          <p>Поле Название обязательно для заполнения</p>
        )}
        {errors?.Name?.type === "maxLength" && (
          <p>Название не может быть больше 100 символов</p>
        )}
        {errors?.Name?.type === "pattern" && <p>Поле заполненно некорректно</p>}
        
        <div className="input-group mb-3">
          <select
            className="form-control"
            placeholder="Выберите..."
            {...register("specialityId")}
          >
            {speciality.map((x) => (
              <option key={x.id} value={x.id}>{x.name}</option>
            ))}
          </select>
          <div className="input-group-append">
            <label className="input-group-text">Специальность</label>
          </div>
        </div>
        <div className="d-flex flex-gap">
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
         <a
            href="qualification"
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

export default AddQualification;
