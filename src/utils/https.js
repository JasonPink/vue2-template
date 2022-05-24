import axios from 'axios'
import Vue from 'vue'
import { getToken } from './auth'

const CODE_OK = 0

const http = axios.create({
  // headers: {
  //   token: localStorage.getItem('token'),
  // },
  baseURL: '',
  timeout: 3 * 1000,
  // 表示跨域请求时是否需要使用凭证，开启后，后端服务器要设置允许开启
  withCredentials: true,
})
//请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken()
    token && (config.headers['Authorization'] = token)

    if (config.url === '/login') {
      console.log(123)
    }

    return config
  },
  (error) => {
    console.warn(error)
    return Promise.reject(error)
  },
)
//响应拦截器
http.interceptors.response.use(
  (response) => {
    const { config, data } = response

    if (data.code === CODE_OK) {
      return data
    } else {
      config._toast && Vue.prototype.$message.error(data.msg)
      return Promise.reject(data)
    }
  },
  (error) => {
    const { config } = error
    config._toast &&
      Vue.prototype.$message({
        message: error.msg || '当前服务器繁忙，稍后再试哦~',
        type: 'error',
      })
  },
)

export const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    http({
      method: 'post',
      url: url,
      data: params,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const get = (url, param = {}) => {
  let params = {
    params: param,
  }
  return new Promise((resolve, reject) => {
    http
      .get(`${url}`, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default http
