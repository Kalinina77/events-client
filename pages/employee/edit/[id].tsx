import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getEmployee, getEmployees, IEmployeeGet, IEmployeePut, putEmployee } from '../../../api/employee';
import { getPosition, IPosition } from '../../../api/position';
import EditEmployeeForm from '../../../components/EditFormEmployee';

const EmployyeEdit = () => {

    const router = useRouter();
    const { id } = router.query;
    console.log(id);
  
    const [loading, setLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<IPosition[]>([]);
    const [employee, setEmployee] = useState<IEmployeeGet>();
  
    useEffect(() => {
      const fetchPosition = async () => {
        try {
          const res = await getPosition();
          setPosition(res);
        } catch {}
      };
      void fetchPosition();
    }, []);
  
    useEffect(() => {
      const fetchEmployee = async (id: string) => {
        try {
          const res = await getEmployees(id);
          console.log(res);
          setEmployee(res);
        } catch {}
      };
      console.log(typeof id === "string");
      id && typeof id === "string" && void fetchEmployee(id);
    }, []);
  
    const onSubmit = async (data: unknown) => {
      if (!id || typeof id !== "string") {
        return;
      }
      try {
        setLoading(true);
        await putEmployee(id, data as IEmployeePut);
        router.push("/employee")
      } catch {
        console.error("error creating employee");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Сотрудники</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
     {employee && (
         <EditEmployeeForm employee={employee} position={position} onSubmit={onSubmit} />
        )}
    </div>
  );
};


export default EmployyeEdit