import axios from "axios";

const baseUrl = "https://dotnet-api-1.herokuapp.com/api";

export interface IGroup{
    id: string;
    name: string;


  qualificationName: string;
  
}
export interface IGroupPut extends IGroupPost {
  id: string;
}
export interface IGroupPost {
 name: string;
  qualificationId: string;
  date: Date;
  
}
export interface IGroupGet {
  id: string;
  name: string;
   qualificationId: string;
   date: string;
   
 }

export const getGroups = async (payload: {
  QualificationIds?: string[];
  searchTerm?: string;
}) => {
  const response = await axios.post<IGroup[]>(
    `${baseUrl}/group/search`, payload);
  return response.data;
};

export const postGroup = async (payload: IGroupPost) => {
  const response = await axios.post<string>(
    `${baseUrl}/group`,
    payload
  );
  return response.data;
};

export const deleteGroup = async (payload: string[]) => {
  const response = await axios.post<boolean>(
    `${baseUrl}/group/delete`,
    payload
  );
  return response.data;
};

export const getGroup = async (id: string) => {
  const response = await axios.get<IGroupGet>(`${baseUrl}/group/${id}`);
  return response.data;
};

export const putGroup = async (id: string, payload: IGroupPut) => {
  const response = await axios.put<string>(`${baseUrl}/group/${id}`, {
    ...payload,
    id: id,
  });
  return response.data;
};