import axios from "axios";

const baseUrl = "https://dotnet-api-1.herokuapp.com/api";

export interface IPositions{
    id: string;
    name: string;
    employeeName: string;
  
}

export const GetPositions = async () => {
    const response = await axios.get<IPositions[]>(`${baseUrl}/positions/search`);
    return response.data;
  };
  