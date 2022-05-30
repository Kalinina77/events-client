import axios from "axios";

const baseUrl = "https://localhost:5000/api";

export interface IEmployee {
  id: string;
  fullName: string;
  positionName: string;
}

export interface IEmployeePost {
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  positionId: string;
}

export interface IEmployeeGet {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  positionId: string;
}
export interface IEmployeePut extends IEmployeePost {
  id: string;
}


export const getEmployee = async (payload: {
  PositionIds?: string[];
  searchTerm?: string;
}) => {
  const response = await axios.post<IEmployee[]>(
    `${baseUrl}/employees/search`,
    payload
    );
  return response.data;
};


export const postEmployee = async (payload: IEmployeePost) => {
  const response = await axios.post<string>(`${baseUrl}/employees`, payload);
  return response.data;
};

export const deleteEmployee = async (payload: string[]) => {
  const response = await axios.post<boolean>(
    `${baseUrl}/employees/delete`,
    payload
  );
  return response.data;
};

export const putEmployee = async (id: string, payload: IEmployeePut) => {
  const response = await axios.put<string>(`${baseUrl}/employees/${id}`, {
    ...payload,
    id: id,
  });
  return response.data;
};
export const getEmployees = async (id: string) => {
  const response = await axios.get<IEmployeeGet>(`${baseUrl}/employees/${id}`);
  return response.data;
};
