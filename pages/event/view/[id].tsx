import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {  getEventView, IEventView } from "../../../api/event";
import ViewEventForm from "../../../components/ViewEvent";


const ViewEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [event, setEvent] = useState<IEventView>();
 
  useEffect(() => {
    const fetchEvent = async (id: string) => {
      try {
        const res = await getEventView(id);
        console.log(res);
        setEvent(res);
      } catch {}
    };
    
    id && typeof id === "string" && void fetchEvent(id);
  }, [id]);

  return (
    <div className="">
     
     {event && (
    <ViewEventForm event={event} />
    )}</div>
  );
};

export default ViewEvent;
