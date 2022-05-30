import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IGroupPost, postGroup } from "../api/group";
import { useRouter, Router } from "next/router";
import Qualification from "./qualification";
import { getQualifications, IQualification } from "../api/qualifications";

const AddGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [qualification, setQualification] = useState<IQualification[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        const _qualifications = await getQualifications({ });
        setQualification(_qualifications);
      } catch {}
    };
    void fetchQualification();
  }, []);

  const onSubmit = async (data: unknown) => {
    try {
      setLoading(true);
      await postGroup(data as IGroupPost);
      router.push("/group");
    } catch {
      console.error("error creating group");
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Группа</h2>
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
              maxLength: 50,
              pattern: /^[А-Яа-я 0-9 -]+$/i,
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

        <div className="input-group mb-3">
          <div className="input-group-prepend"></div>
          <input
            {...register("date", {
              required: true,
            })}
            type="date"
            className="form-control"
            placeholder="Дата создания"
          />
        </div>
        {errors?.date?.type === "required" && (
          <p>Поле Дата создания обязательно для заполнения</p>
        )}

        <div className="input-group mb-3">
          <select
            className="form-control"
            placeholder="Выберите..."
            {...register("qualificationId")}
          >
            {qualification.map((x) => (
              <option key={x.id} value={x.id}>{x.name}</option>
            ))}
          </select>
          <div className="input-group-append">
            <label className="input-group-text">Квалификация</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddGroup;
