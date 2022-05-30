import axios from "axios";
import { IEventRanks } from "./types";

const baseUrl = "https://localhost:5000/api";

export interface IEvent {
  id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
}

export interface IEventStudentsCount {
  id: string;
  name: string;
  dateStart: string;
  studentCount: number;
}

export interface IEventPost {
  name: string;
  place: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  type: string;
}


export interface IEventGet {
  id: string;
  name: string;
  place: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  groupIds: string[];
  studentIds: string[];
  employeeIds: string[];
  type: string;
}
type EventViewStudentType = {
  id: string;
  name: string;
  rank:string;
}
export interface IEventView {
  id: string;
  name: string;
  place: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  groupNames: string[];
  students: EventViewStudentType[];
  employeeNames: string[];
  type: string;
  
}

export interface IEventPut extends IEventPost {
  id: string;
}


export interface IEventPostArrays {
  studentIds: string[];
  groupIds: string[];
  employeeIds: string[];
  //type: string;
}

export const getEvent = async (payload: {
  type: string[];
  searchTerm: string;
  dateStart?: Date;
  dateEnd?: Date ;
}) => {
  const response = await axios.post<IEvent[]>(`${baseUrl}/events/search`, payload);
  return response.data;
};


export const getEventStudentsCount = async () => {
  const response = await axios.get<IEventStudentsCount[]>(`${baseUrl}/events`);
  return response.data;
};

export const postEvent = async (
  payload: IEventPost,
  arrays: IEventPostArrays
) => {
  const response = await axios.post<string>(`${baseUrl}/events`, {
    ...payload,
    ...arrays,
  });
  return response.data;
};

export const deleteEvent = async (payload: string[]) => {
  const response = await axios.post<boolean>(
    `${baseUrl}/events/delete`,
    payload
  );
  return response.data;
};

export const getEvents = async (id: string) => {
  const response = await axios.get<IEventGet>(`${baseUrl}/events/${id}`);
  return response.data;
};

export const getEventRanks = async (id: string) => {
  const response = await axios.get<IEventRanks[]>(`${baseUrl}/events/${id}/ranks`);
  return response.data;
};

export const getEventView = async (id: string) => {
  const response = await axios.get<IEventView>(`${baseUrl}/events/view/${id}`);
  return response.data;
};


export const putEvent = async (id: string,  payload: IEventPost,
  arrays: IEventPostArrays) => {
  const response = await axios.put<string>(`${baseUrl}/events/${id}`, {
    ...payload,
    ...arrays,
    id: id,
  });
  return response.data;
};

export const exportEvents = async (payload: unknown) => {
  const response = await axios.post<Array<string[]>>(
    `${baseUrl}/events/exportEvents`,
    payload
  );
  return response.data;
};

export const putEventRanks = async (id: string, payload: IEventRanks[]) => {
  const response = await axios.put<IEventRanks[]>(`${baseUrl}/events/ranks/${id}`, payload,);
  return response.data;
};