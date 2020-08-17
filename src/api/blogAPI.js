import request from '@/utils/request'

export function sendBlogListApi(data, signMsg) {
  return request({
    url: '/doLoan-websit/newsInformation/query',
    // headers:{
    //   signMsg,
    //   mobileType: data.mobileType
    // },
    method: 'post',
    data
  })
}
