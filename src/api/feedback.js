import request from '@/utils/request'

export function sendFeedbackApi(data, signMsg) {
  return request({
    url: '/api/public/mine/opinion/submit.htm',
    headers:{
      signMsg,
      mobileType: data.mobileType
    },
    method: 'post',
    params:data
  })
}
