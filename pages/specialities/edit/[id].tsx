import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getQualifications, IQualification } from "../../../api/qualifications";
import {
  getSpeciality,
  ISpecialityGet,
  ISpecialityPut,
  putSpecialities,
} from "../../../api/speciality";
import EditFormSpecialities from "../../../components/EditFormSpecialities";

const EditSpecialities = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [specialitie, setSpecialities] = useState<ISpecialityGet>();
  const [qualification, setQualifications] = useState<IQualification[]>([]);

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const res = await getQualifications({});
        setQualifications(res);
      } catch {}
    };
    void fetchQualifications();
  }, []);

  useEffect(() => {
    const fetchSpecialities = async (id: string) => {
      try {
        const res = await getSpeciality(id);
        console.log(res);
        setSpecialities(res);
      } catch {}
    };
    console.log(typeof id === "string");
    id && typeof id === "string" && void fetchSpecialities(id);
  }, [id]);

  const onSubmit = async (data: unknown) => {
    if (!id || typeof id !== "string") {
      return;
    }
    try {
      setLoading(true);
      await putSpecialities(id, data as ISpecialityPut);
      router.push("/speciality");
    } catch {
      console.error("error creating specialities");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Специальность</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {specialitie && (
        <EditFormSpecialities
          specialitie={specialitie}
          qulification={qualification}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default EditSpecialities;
