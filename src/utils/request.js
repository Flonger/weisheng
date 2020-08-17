import axios from 'axios'
import Toast from '@/components/toast'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  timeout: 8000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    // //  config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
//  response => response.data,
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 200 && res.code !== 0 && res.code !== 203) { // 评论 203 让用户登陆
      let toast = new Toast();
      toast.append(document.querySelector('#toast'),res.msg || res.message);
      toast = null;
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let toast = new Toast();
    toast.append(document.querySelector('#toast'),'error');
    toast = null;
    return Promise.reject(error)
  }
);
export default service
