import axios from "axios";

const baseUrl = "https://dotnet-api-1.herokuapp.com/api";

export interface IQualification {
  id: string;
  name: string;
  specialityName: string;
}

export interface IQualificationPost {
  name: string;
  specialityId: string;
}

export interface IQualificationGet {
  id: string;
  name: string;
  specialityId: string;
}

export interface IQualificationPut extends IQualificationPost {
  id: string;
}

export const getQualifications = async (payload: {
  SpecialityIds?: string[];
  searchTerm?: string;
}) => {
  const response = await axios.post<IQualification[]>(
    `${baseUrl}/qualifications/search`, payload
  );
  return response.data;
};

export const postQualification = async (payload: IQualificationPost) => {
  const response = await axios.post<string>(
    `${baseUrl}/qualifications`,
    payload
  );
  return response.data;
};

export const deleteQualification = async (payload: string[]) => {
  const response = await axios.post<boolean>(
    `${baseUrl}/qualifications/delete`,
    payload
  );
  return response.data;
};
export const getQualification = async (id: string) => {
  const response = await axios.get<IQualificationGet>(
    `${baseUrl}/qualifications/${id}`
  );
  return response.data;
};

export const putQualification = async (
  id: string,
  payload: IQualificationPut
) => {
  const response = await axios.put<string>(`${baseUrl}/qualifications/${id}`, {
    ...payload,
    id: id,
  });
  return response.data;
};
