export type Pagination = {
  page?: number;
  limit?: number;
  total?: number;
}

export type GetResponse<T> = {
  status: number;
  message: string;
  data: T[];
};

export type CreateResponse<T> = {
  status: number;
  message: string;
  data: T;
  details?: any | Pagination;
};
