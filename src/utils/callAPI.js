import axios from "axios";
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Config from "../contants/config";
import storageService from "./storageService";

// type response = {
//   result: {
//     data: any,
//     status: number
//   }
//   error: any
// }

// axios.interceptors.response.use(res => {
//   return res;
// }, e => {
//   if (e.)
// })
// @ts-ignore
// const refreshAuthLogic = failedRequest => axios.post(Constants.API_URL + '/v1/auth/refreshToken', {'refreshToken': StorageService.getRefreshToken()}).then(tokenRefreshResponse => {
//   storageService.setToken(tokenRefreshResponse.data.refreshToken);
//   failedRequest.response.config.headers["Authorization"] = tokenRefreshResponse.data.refreshToken;
//   return Promise.resolve();

// }).catch(function (error) {
//   storageService.removeToken();
//   storageService.removeRefreshToken()
//   window.location.href = "/"
//   return Promise.reject();
// });

export const callApi = async (endpoint, method, body, isNeedAuth = true) => {
  const source = axios.CancelToken.source();
  var response = {
    result: {
      data: null,
      status: 500,
    },
    error: null
  }
  var newHeaders = {'Content-Type': 'application/json'};
  if (isNeedAuth && storageService.isTokenExits()) { 
    newHeaders["token"] = storageService.getToken();
    // newHeaders["Authorization"] = 'Bearer ' + storageService.getToken();
    // createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    //     pauseInstanceWhileRefreshing: true
    // });
  }
  try {
    // console.log("api : ", Config.API_URL + endpoint);
    const result = await axios({
      method: method,
      url: Config.API_URL + endpoint,
      // url: `${Config.API_URL}${endpoint}`,
      headers: newHeaders,
      data: body,
      cancelToken: source.token
    })
    response.result.data = result?.data;
    response.result.status = result?.status;
    // console.log("rs : " , result);  
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("request cancelled!"); //neu request bi huy thi log ra
      response.result.data = {};
    }
    // console.log("error : ", error); 
    response.error = error.response?.data.message;
    response.result.status = error.response?.status;
  }
  // console.log("status out if: " , response.result.status);
  if(response.result.status === 401 || response.result.status === undefined){
    // notify.show("Hết phiên đăng nhập", "warning");
    console.log("Hết phiên đăng nhập")
    // logOut();
    storageService.removeToken();
    window.location.href = "/";
  }
  return response;
}
