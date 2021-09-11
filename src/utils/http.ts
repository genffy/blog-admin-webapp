import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IResult, Params } from 'types/http';
import { auth } from './auth';
import { message } from 'antd';

// https://github.com/axios/axios/blob/master/index.d.ts#L1
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const baseData: Params = {
        _r: Math.random(),
    }
    if (auth.token) {
        baseData.auth = auth.token;
    }
    if (config.method === 'get') {
        config.params = Object.assign(baseData, config.params);
    } else {
        config.data = Object.assign(baseData, config.data);
    }
    return config;
});

axios.interceptors.response.use(
    (result: AxiosResponse<IResult<any, any>>) => {
        if (result.data.errno !== 0) {
            if (typeof result.data.errmsg === 'string') {
                message.error(result.data.errmsg);
            }
        }
        return Promise.resolve(result);
    },
    (error: AxiosError) => {
        console.error(`错误'${error}`);
        return Promise.reject(error.response);
    }
);
const axiosInst: AxiosInstance = axios.create({
    // baseURL: `${process.env.REACT_APP_BASE_URL}/admin/api`,
    baseURL: `/admin/api`,
    // withCredentials:  true,
    headers: {
        "Content-type": "application/json"
    }
})

/**
 * HttpClient
 */
class HttpClient {
    /**
     * @param url 
     * @param data
     * @param config
     */
    get(url: string, data?: any, config: AxiosRequestConfig = {}) {
        if (data) {
            config.params = data;
        }
        return axiosInst.get(url, config)
    }

    /**
     * @param url
     * @param data
     * @param config 
     */
    post(url: string, data?: any, config: AxiosRequestConfig = {}) {
        return axiosInst.post(url, data, config)
    }

    upload(data: any, url: string = '/admin/api/file'): Promise<any> {
        return new Promise(function (resolve: Function, reject: Function) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onload = function () {
                let res = JSON.parse(xhr.responseText);
                if (res.errno !== 0) {
                    resolve(res);
                } else {
                    resolve(res);
                }

            };
            xhr.onerror = function () {
                reject(xhr);
            };
            xhr.send(data);
        });
    }

    // 处理请求错误
    // handleError() {
    //     this.error$.subscribe(
    //         err => {
    //             switch (err.status) {
    //                 case 403:
    //                     // do something...
    //                     break;
    //                 default:
    //                     message.error(`${err.status}: ${err.statusText}`);
    //             }
    //         }
    //     );
    // }
}
// Export A HttpClient Instance
const http = new HttpClient();

export default http;
export const post = http.post;
export const get = http.get;