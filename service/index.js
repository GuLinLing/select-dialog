import axios from 'axios' // 导入axios
import { getUserId, getToken } from './../utils'

const service = axios.create({ // 创建实例
  // baseURL: '/api/', // url 前缀
  // timeout: 10000 // 请求超时时间
})

service.interceptors.request.use( // 请求拦截器
  config => {
    config.headers['X-Emp-No'] = getUserId() // 让每个请求携带工号
    config.headers['X-Auth-Value'] = getToken() // 让每个请求携带token
    return config
  },
  error => {
    Promise.reject(error) // 请求错误处理
  }
)

service.interceptors.response.use( // 响应拦截器
  response => { // 统一处理状态
    const res = response.data
    if (res.code.code !== '0000' || response.status !== 200) { // 需自定义
      return Promise.reject(res) // 返回异常
    } else {
      return res.bo
    }
  },
  error => { // 处理处理
    return Promise.reject(error)
  }
)

function get (url, params = {}) { // get请求
  return new Promise((resolve, reject) => {
    service({
      url,
      params,
      method: 'get'
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

function post (url, data = {}) { // post请求
  return new Promise((resolve, reject) => {
    service({
      url,
      data,
      method: 'post'
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

function loop (url, params = {}, method = 'get') { // 循环请求(get post)
  return new Promise((resolve, reject) => {
    serviceLoop({url, params, method, resolve, reject})
  })
}

function serviceLoop ({url, params, method, resolve, reject}) {
  let option = {
    url,
    method
  }
  method = method.toLocaleLowerCase()
  if (method === 'get') {
    option.params = params
  } else if (method === 'post') {
    option.data = params
  } else {
    throw new Error('目前只支持get和post')
  }
  service(option)
  .then(res => {
    resolve(res)
  })
  .catch(err => {
    setTimeout(() => {
      serviceLoop({url, params, method, resolve, reject})
    }, 10000)
  })
}

function fileUpload(url, data = {}) { // 文件上传
  return new Promise((resolve, reject) => {
    service({
      url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export default {
  get,
  post,
  loop,
  fileUpload
}
