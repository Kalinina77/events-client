import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getGroups, IGroup } from "../../../api/group";
import {
  IStudentGet,
  getStudent,
  putStudents,
  IStudentPut,
} from "../../../api/students";

import { useRouter } from "next/router";
import StudentEditForm from "../../../components/EditForm";

const StudentEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroup[]>([]);
  const [student, setStudent] = useState<IStudentGet>();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const _groups = await getGroups({});
        setGroup(_groups);
      } catch {}
    };
    void fetchGroups();
  }, []);

  useEffect(() => {
    const fetchStudent = async (id: string) => {
      try {
        const res = await getStudent(id);
        console.log("in fetch student",res);
        setStudent(res);
      } catch {}
    };
    console.log(typeof id === "string");
    id && typeof id === "string" && void fetchStudent(id);
  }, [id]);

  const onSubmit = async (data: unknown) => {
    if (!id || typeof id !== "string") {
      return;
    }
    try {
      setLoading(true);
      await putStudents(id, data as IStudentPut);
      router.push("/students")
    } catch {
      console.error("error creating student");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Студенты</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {student && (
        <StudentEditForm groups={group} student={student} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default StudentEdit;
