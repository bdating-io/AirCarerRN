import { useEffect, useRef } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';

export const useAxios = () => {
  // const baseUrl = Constants.expoConfig.extra.apiBaseUrl;
  const baseUrl = 'https://dev.bdating.io/api';
  // const baseUrl = 'http://localhost:8000';
  const { access_token } = useSelector((state: RootState) => state.aircarer);

  const http = useRef<AxiosInstance>(
    axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        // 'X-API-KEY': apiKey,
        Authorization: `Bearer ${access_token}`,
        Accept: '*/*',
      },
    }),
  );

  useEffect(() => {
    http.current.defaults.headers.Authorization = `Bearer ${access_token}`;
  }, [access_token]);

  useEffect(() => {
    const requestInterceptor = http.current.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        return request;
      },
      (error) => {
        console.error('Axios error:', JSON.stringify(error, null, 2));
        return Promise.reject(error);
      },
    );

    const responseInterceptor = http.current.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          console.log('Unauthorized');
          // dispatch(aircarerSlice.actions.logout());
        }
        console.error('Axios error:', JSON.stringify(error, null, 2));
        return Promise.reject(error);
      },
    );

    return () => {
      http.current.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return http.current
      .get<T>(url, config)
      .then((response: AxiosResponse<T>) => response.data);
  };

  const post = async <T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const finalConfig = {
      ...config,
      headers: {
        ...config?.headers,
      },
    };

    return http.current
      .post<T, AxiosResponse<R>>(url, data, finalConfig)
      .then((response: AxiosResponse<R>) => response.data);
  };

  const put = async <T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const finalConfig = {
      ...config,
      headers: {
        ...config?.headers,
      },
    };

    return http.current
      .put<T, AxiosResponse<R>>(url, data, finalConfig)
      .then((response: AxiosResponse<R>) => response.data);
  };

  const patch = async <T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const finalConfig = {
      ...config,
      headers: {
        ...config?.headers,
      },
    };

    return http.current
      .patch<T, AxiosResponse<R>>(url, data, finalConfig)
      .then((response: AxiosResponse<R>) => response.data);
  };

  return { get, post, put, patch };
};
