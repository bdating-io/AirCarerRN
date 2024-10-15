import { useEffect, useRef } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Constants from 'expo-constants';

export const useAxios = (jwtToken?: string) => {
  const baseUrl = Constants.expoConfig.extra.apiBaseUrl;

  const http = useRef<AxiosInstance>(
    axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        // 'X-API-KEY': apiKey,
        Authorization: `Bearer ${jwtToken}`,
      },
    }),
  );

  useEffect(() => {
    const responseInterceptor = http.current.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
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
