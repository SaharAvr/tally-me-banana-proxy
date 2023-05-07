import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ProxyResponse {
    status?: number;
    headers?: Record<string, string | unknown>;
    body?: string | object;
}

const handleProxy = async (axiosRequest: AxiosRequestConfig): Promise<ProxyResponse> => {
    let response: AxiosResponse | undefined;

    try {
        response = await axios(axiosRequest);
    } catch (err: any) {
        response = err.response;
    }

    if (!response?.status) {
        return {
            body: {
                continue: true,
            },
        };
    }

    return {
        status: response.status,
        headers: response.headers,
        body: (() => {
            if (typeof response.data === 'string') {
                return response.data;
            }
            if (typeof response.data === 'object') {
                return JSON.stringify(response.data);
            }
            return response.data;
        })(),
    };
};

export default handleProxy;
