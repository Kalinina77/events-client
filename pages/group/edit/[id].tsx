import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getGroup,  IGroupGet, IGroupPut, putGroup } from '../../../api/group';
import { getQualifications, IQualification } from '../../../api/qualifications';
import EditGroupForm from '../../../components/EditFormGroup';

const EditGroup = () => {

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [group, setGroup] = useState<IGroupGet>();
  const [qualification, setQualification] = useState<IQualification[]>([]);

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        const _qualifications = await getQualifications({});
        setQualification(_qualifications);
      } catch {}
    };
    void fetchQualification();
  }, []);

  useEffect(() => {
    const fetchGroup = async (id: string) => {
      try {
        const res = await getGroup(id);
        console.log("in fetch Group",res);
        setGroup(res);
      } catch {}
    };
    console.log(typeof id === "string");
    id && typeof id === "string" && void fetchGroup(id);
  }, [id]);

  const onSubmit = async (data: unknown) => {
    if (!id || typeof id !== "string") {
      return;
    }
    try {
      setLoading(true);
      await putGroup(id, data as IGroupPut);
      router.push("/group")
    } catch {
      console.error("error creating group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Группа</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
     {group && (
          <EditGroupForm  group={group} qualification={qualification} onSubmit={onSubmit} />
      )}
    </div>
   
  );
};
export default EditGroup