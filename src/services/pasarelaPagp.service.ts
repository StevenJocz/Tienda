import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { services } from '../models';

const API_URL = services.PasarelaPago;


export const apiPasarela = {

    // Método genérico para realizar cualquier tipo de solicitud HTTP
    request: async <T>(
        method: string,
        path: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        const url = `${API_URL}/${path}`;
        try {
            return await axios.request<T>({ method, url, data, ...config });
        } catch (error) {
            throw error;
        }
    },

    // Métodos abreviados para los tipos de solicitud HTTP más comunes

    get: async <T>(path: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        const url = `${API_URL}/${path}`;
        let queryParams = '';
        if (params) {
            queryParams = new URLSearchParams(params).toString();
        }
        const finalUrl = queryParams ? `${url}?${queryParams}` : url;

        try {
            return await axios.get<T>(finalUrl, config);
        } catch (error) {
            throw error;
        }
    },


    post: async <T>(
        path: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => apiPasarela.request<T>('post', path, data, config),

    put: async <T>(
        path: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => apiPasarela.request<T>('put', path, data, config),

    delete: async <T>(
        path: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => apiPasarela.request<T>('delete', path, undefined, config),
};
