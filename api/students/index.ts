import axios from "axios";
import { IEventExport } from "./types";

const baseUrl = "https://dotnet-api-1.herokuapp.com/api";

export interface IStudent {
  id: string;
  fullName: string;
  groupName: string;
  email: string;
}

export interface IStudentPost {
  lastName: string;
  firstName: string;
  middleName: string;
  birthdate: Date;
  email: string;
  phone: string;
  nationality: string;
  groupId: string;
}
export interface IStudentPut extends IStudentPost {
  id: string;
}

export interface IStudentGet {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthdate: Date;
  email: string;
  phone: string;
  nationality: string;
  groupId: string;
}

export const searchStudents = async (payload: {
  GroupIds?: string[];
  searchTerm?: string;
}) => {
  const response = await axios.post<IStudent[]>(
    `${baseUrl}/students/search`,
    payload
  );
  return response.data;
};
export const postStudents = async (payload: IStudentPost) => {
  const response = await axios.post<string>(`${baseUrl}/students`, payload);
  return response.data;
};
export const putStudents = async (id: string, payload: IStudentPut) => {
  const response = await axios.put<string>(`${baseUrl}/students/${id}`, {
    ...payload,
    id: id,
  });
  return response.data;
};

export const deleteStudent = async (payload: string[]) => {
  const response = await axios.post<boolean>(
    `${baseUrl}/students/delete`,
    payload
  );
  return response.data;
};

export const importStudents = async (payload: unknown) => {
  const response = await axios.post<string>(
    `${baseUrl}/students/import`,
    payload
  );
  return response.data;
};
export const getStudent = async (id: string) => {
  const response = await axios.get<IStudentGet>(`${baseUrl}/students/${id}`);
  return response.data;
};
export const exportStudents = async (payload: unknown) => {
  const response = await axios.post<Array<string[]>>(
    `${baseUrl}/students/exportStudents`,
    payload
  );
  return response.data;
};
