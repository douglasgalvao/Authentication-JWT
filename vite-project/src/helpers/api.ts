import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { setCookie } from 'nookies';
class ApiHelper {
    get(endpoint: string) {
        return axios.get(endpoint);
    };
    put(endpoint: string, body: any) {
        return axios.put(endpoint, body);
    };
    post(endpoint: string, body: any) {
        return axios.post(endpoint, body);
    };
    delete(endpoint: string, id: string) {
        return axios.delete(endpoint.concat('/' + id));
    };

}
export function getCookie(name: string): string | null {
    const nameLenPlus = (name.length + 1);
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null;
}

let isRefreshing = false;
let requestQeues: Array<any> = [];

function setAxios(axios: Axios) {

    axios.defaults.baseURL = "http://localhost:3000/"
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = getCookie("token");
        if (token) {
            config.headers = {
                "Authorization": "Bearer " + token
            }
        }
        return config;
    });

    axios.interceptors.response.use((value: AxiosResponse) => value, (e: AxiosError) => {
        if (e?.response?.status == 401) {
            if (e.response.data.error === "ERROR , TOKEN EXPIRADO!") {
                const requestConfig = e.config;
                if (!isRefreshing) {
                    isRefreshing = true;
                    let token = getCookie("refreshToken");
                    axios.post('/refreshAuth', {
                        token: token
                    }).then(e => {
                        setCookie(null, "token", e.data.firstToken);
                        setCookie(null, "refreshToken", e.data.refreshToken);
                        requestQeues.forEach(request => {
                            request.onSuccess(e.data.firstToken);
                        });
                        requestQeues = [];
                    }).catch(e => {
                        requestQeues.forEach((request) =>
                            request.onFailure(e),
                        );
                        requestQeues = [];

                        if (process.browser) {
                            setCookie(null, "refreshToken", "");
                            setCookie(null, "token", "");
                        }
                    }).finally(() => {
                        isRefreshing = false;
                    });
                    return new Promise((resolve, reject) => {
                        requestQeues.push({
                            onFailure: (err: AxiosError) => reject(err),
                            onSuccess: ((token: string) => {
                                requestConfig.headers!["authorization"] = "Bearer " + token;
                                resolve(requestConfig);
                            })
                        })
                    })
                }else{
                    return Promise.reject("Error , user not authenticated to get this route!");
                }
            }
        }
    });
}
setAxios(axios);


export default new ApiHelper();