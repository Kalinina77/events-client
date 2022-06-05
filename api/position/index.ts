import axios from "axios";

const baseUrl = "https://dotnet-api-1.herokuapp.com/api";

export interface IPosition {
    id: string;
    name: string;
  }

  export const getPosition = async () => {
    const response = await axios.get<IPosition[]>(`${baseUrl}/positions/search`);
    return response.data;
  };