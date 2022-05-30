import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getEventRanks, putEventRanks } from '../../../api/event';
import { IEventRanks } from '../../../api/event/types';
import { PlaceOptionsSimple } from '../../../constants/eventType'

const EventRanks = () => {
  const router = useRouter();
  const { id } = router.query;
  
    const [eventRanks, setEventRanks] = useState<IEventRanks[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      const fetchEventRanks = async (id: string) => {
        try {
          const res = await getEventRanks(id);
          console.log("in fetch event", res);
          setEventRanks(res);
        } catch {}
      };
      id && typeof id === "string" && void fetchEventRanks(id);
    }, [id]);

    const onSubmit = async (data: IEventRanks[]) => {
      if (!id || typeof id !== "string") {
        return;
      }
      try {
        setLoading(true);
        await putEventRanks(id, data );
        router.push(`/event/view/${id}`);
      } catch {
        console.error("error creating eventRanks");
      } finally {
        setLoading(false);
      }
    };
  return (
      <div>
       <table className="table table-hover w-25">
          <thead>
            <tr>
              <th scope="col">Студенты</th>
            </tr>
          </thead>
          <tbody>
            {eventRanks.map((x) => (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>
                <select
          className="form-control"
          placeholder="Выберите..."
          value={x.rank}
          onChange={e => setEventRanks(state => [...state.filter( r => r.id!==x.id), {...x,rank:e.target.value} ])}
        >
          {PlaceOptionsSimple.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-gap">
        <button className="btn btn-primary" onClick={() => onSubmit(eventRanks)}>
        Сохранить
      </button>
      <Link href={`/event/view/${id}`}>
      <a className="btn btn-outline-success ">
             Отмена
            </a>
        </Link>
      </div>
        </div>
  )
}

export default EventRanks