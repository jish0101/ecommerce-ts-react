import { CreateResponse } from "@/types/api";
import { AxiosResponse } from "axios";
import axiosInstance from "../axios";

export const createUser = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosInstance.post('/api/users/create', payload);
}