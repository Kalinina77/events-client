import axios from "axios";

const baseUrl = "https://localhost:5000/api";

export interface IPositions{
    id: string;
    name: string;
    employeeName: string;
  
}

export const GetPositions = async () => {
    const response = await axios.get<IPositions[]>(`${baseUrl}/positions/search`);
    return response.data;
  };
  