import request from '@/utils/request'


// 用户登录
export function getVideoInfo(data) {
  return request({
    url: '/openschool/text',
    // /api/openschool/getVideoInfo'
    method: 'get',
    params:data
  })
}
export function chatLogin(data){
  // /api/openschool/chatLogin
  return request({
    url: '/openschool/chatLogin',
    method: 'post',
    data
  })
}
export function getChatInfo(data){
  return request({
    url: '/openschool/getChatInfo',
    method: 'get',
    params:data
  })
}