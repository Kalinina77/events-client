import axios from "axios";

const baseUrl = "https://localhost:5000/api";

export interface ISpeciality{
    id: string;
    name: string;
  qualification: string;
  
}

export interface ISpecialityPost {
 name: string;
 
}

export interface ISpecialityGet{
  id: string;
  name: string;
  qualificationId: string;
  

}
export interface ISpecialityPut extends ISpecialityPost {
  id: string;
}

export const getSpecialitys = async (payload: {
  searchTerm?: string;
}) => {
  const response = await axios.post<ISpeciality[]>(`${baseUrl}/specialities/search`, payload);
  return response.data;
};

export const postSpecialitys = async (payload: ISpecialityPost) => {
  const response = await axios.post<string>(
    `${baseUrl}/specialities`,
    payload
  );
  return response.data;
};

export const deleteSpeciality = async (payload: string[]) => {
  const response = await axios.post<boolean>(
    `${baseUrl}/specialities/delete`,
    payload
  );
  return response.data;
};

export const putSpecialities = async (id: string, payload: ISpecialityPut) => {
  const response = await axios.put<string>(`${baseUrl}/specialities/${id}`, {
    ...payload,
    id: id,
  });
  return response.data;
};
export const getSpeciality = async (id: string) => {
  const response = await axios.get<ISpecialityGet>(`${baseUrl}/specialities/${id}`);
  return response.data;
};
