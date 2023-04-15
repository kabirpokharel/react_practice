import axios, { AxiosError, AxiosResponse } from 'axios';
import { Books } from './type';

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error('unauthorised');
        break;

      case 404:
        console.error('/not-found');
        break;

      case 500:
        console.error('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string, body: {}) =>
    axios.get<T>(url, body).then(responseBody),
};

const BooksApi = {
  GetBooks: (url:string,params:object):Promise<Books> => request.get<Books>(`${url}`,{params})
};

export default BooksApi;