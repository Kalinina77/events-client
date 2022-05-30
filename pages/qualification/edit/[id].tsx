import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getQualification, IQualification, IQualificationGet, IQualificationPut, putQualification } from '../../../api/qualifications';
import { getSpeciality, getSpecialitys, ISpeciality, ISpecialityGet } from '../../../api/speciality';
import EditQualificationForm from '../../../components/EditFormQualification';

const EditQualification = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [qualification, setQualification] = useState<IQualificationGet>();
  const [speciality, setSpeciality] = useState<ISpeciality[]>([]);

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const res = await getSpecialitys({});
        setSpeciality(res);
      } catch {}
    };
    void fetchSpeciality();
  }, []);

  useEffect(() => {
    const fetchQualification = async (id: string) => {
      try {
        const res = await getQualification(id);
        console.log(res);
        setQualification(res);
      } catch {}
    };
    console.log(typeof id === "string");
    id && typeof id === "string" && void fetchQualification(id);
  }, []);

  const onSubmit = async (data: unknown) => {
    if (!id || typeof id !== "string") {
      return;
    }
    try {
      setLoading(true);
      await putQualification(id, data as IQualificationPut);
      router.push("/qualification")
    } catch {
      console.error("error creating qualifications");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
    <h2 className="d-flex justify-content-center mb-3">Квалификация</h2>
    {loading && (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )}
    {qualification && (
      <EditQualificationForm qualification={qualification} speciality={speciality} onSubmit={onSubmit} />
    )}
  </div>
);
};

export default EditQualification