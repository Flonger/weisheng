import request from '@/utils/request'

export function sendNewsDetailApi(id) {
  return request({
    url: '/doLoan-websit/newsInformation/'+id,
    method: 'get'
  })
}
/**
 * 添加评论
 * */
export function sendAddCommentAPI(data) {
  return request({
    url: "/doLoan-websit/newComment/addNewComment",
    method: "post",
    data
  })
}
/**
 * 当前新闻评论
 * */
export function getCommentAPI(data) {
  return request({
    url: "/doLoan-websit/newComment/query",
    method: "post",
    data
  })
}
export function userLoginAPI(data) {
  return request({
    url: "/doLoan-websit/user/login",
    method: "post",
    data
  })
}
