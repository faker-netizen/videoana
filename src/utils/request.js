import axios from 'axios'
const service = axios.create({
//   baseURL: "https://new.gather.front.onbotics.cn/api",
  baseURL:"http://open.chat.onbotics.cn/api",
  timeout: 500000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加请求头等前置处理
    config.headers['Authorization'] = 'Bearer' + ' ' + localStorage.getItem('token')
    return config
  },
  error => {
    // 请求错误处理
    console.log('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 响应后处理
    if (response.status === 200) {
      // store.commit("UPDATE_submit",false)
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
   
  },
  error => {
    console.log('Response Error:', error)
    // store.commit("UPDATE_submit",false)
    return Promise.reject(error)
  }
)

export default service
