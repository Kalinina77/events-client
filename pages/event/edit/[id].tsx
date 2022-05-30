import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEmployee, IEmployee } from "../../../api/employee";
import { getEvents, IEventGet, IEventPostArrays, IEventPut, putEvent } from "../../../api/event";
import { getGroups, IGroup } from "../../../api/group";
import { getStudent, searchStudents, IStudent } from "../../../api/students";
import EditFormEvent from "../../../components/EditEvent";

const EventEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [event, setEvent] = useState<IEventGet>();

  useEffect(() => {
    const fetchDicts = async () => {
      try {
        setLoading(true);
        const _groups = await getGroups({});
        const _students = await searchStudents({});
        const _employees = await getEmployee({});
        setGroups(_groups);
        setStudents(_students);
        setEmployees(_employees);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    void fetchDicts();
  }, []);

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      try {
        const res = await getEvents(id);
        console.log("in fetch event", res);
        setEvent(res);
      } catch {}
    };
    console.log(typeof id === "string");
    id && typeof id === "string" && void fetchEvent(id);
  }, [id]);

  const onSubmit = async (data: IEventPut, arrays:IEventPostArrays) => {
    if (!id || typeof id !== "string") {
      return;
    }
    try {
      setLoading(true);
      await putEvent(id, data, arrays);
      router.push("/event");
    } catch {
      console.error("error creating event");
    } finally {
      setLoading(false);
    }
  };
  console.log("Event ", event);
  return (
    <div className="">
      <h2 className="d-flex justify-content-center mb-3">Мероприятиe</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {event && (
        <EditFormEvent
          groups={groups}
          students={students}
          event={event}
          employees={employees}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default EventEdit;
