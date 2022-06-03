import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getGroups, IGroup } from "../../api/group";
import { IStudentPost, postStudents } from "../../api/students";
import { useRouter, Router } from "next/router";

const AddStudents: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup[]>([]);
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
        const res = await getGroups({});
        setGroup(res);
      } catch {}
    };
    void fetchGroup();
  }, []);

  const onSubmit = async (data: unknown) => {
    try {
      setLoading(true);
      await postStudents(data as IStudentPost);
      router.push("/students");
    } catch {
      console.error("error creating student");
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  
  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Студенты</h2>
      {loading && (
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
              
              maxLength: 50,
              pattern: /^[А-Яа-я]+$/i,
            })}
            className="form-control"
            placeholder="Отчество"
          />
        </div>
        
        {errors?.middleName?.type === "maxLength" && (
          <p>Отчество не может быть больше 50 символов</p>
        )}
        {errors?.middleName?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}
        <div className="input-group mb-3">
          <input
            {...register("email", {
              required: true,
              maxLength: 50,
              pattern: /^[A-Za-z@._-]+$/i,
            })}
            type="text"
            className="form-control"
            placeholder="Email"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              @mpt.ru
            </span>
          </div>
        </div>
        {errors?.email?.type === "required" && (
          <p>Поле Email обязательно для заполнения</p>
        )}
        {errors?.email?.type === "maxLength" && (
          <p>Имя Email может быть больше 50 символов</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}
        <div className="input-group mb-3">
          <select
            className="form-control"
            placeholder="Выберите..."
            {...register("groupId", {
              required: true,
            })}
          >
            {group.map((x) => (
              <option key={x.id} value={x.id}>{x.name}</option>
            ))}
          </select>
          <div className="input-group-append">
            <label className="input-group-text">Группа</label>
          </div>
        </div>
        {errors?.groupId?.type === "required" && (
          <p>Поле Группа обязательно для заполнения</p>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend"></div>
          <input
            {...register("nationality", {
             
              maxLength: 50,
              pattern: /^[А-Яа-я]+$/i,
            })}
            className="form-control"
            placeholder="Гражданство"
          />
        </div>
        
        {errors?.nationality?.type === "maxLength" && (
          <p>Гражданство не может быть больше 50 символов</p>
        )}
        {errors?.nationality?.type === "pattern" && (
          <p>Поле заполненно некорректно</p>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend"></div>
          <input 
            {...register("phone", {
              minLength: 11,
              maxLength: 16,
              pattern: /^[0-9+()-]+$/i,
            })}
            className="form-control"
            placeholder="Телефон"
          />
        </div>{" "}
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
        <div className="input-group mb-3">
          <div className="input-group-prepend"></div>
          <input
            {...register("birthdate", {
              required: true,
            })}
            type="date"
            className="form-control"
            placeholder="Дата рождения"
          />
        </div>
        {errors?.birthdate?.type === "required" && (
          <p>Поле День рождения обязательно для заполнения</p>
        )} 
        <div className="d-flex flex-gap">
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
        <a
            href="../../students"
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

export default AddStudents;
