import router from './router'
import store from './store'
import axios from 'axios'
import Element from "element-ui";

axios.defaults.baseURL = 'http://localhost:8081'
axios.interceptors.request.use(config => {
    console.log("前置拦截")
    return config
})

axios.interceptors.response.use(response => {
    let res = response.data;
    console.log(response.data)
    if (res.code == 200) {
        return response
    } else {
        Element.Message({message: response.data.msg, type: "error", duration: 2 * 1000})
        //直接拒绝往下面返回结果
        return Promise.reject(response.data.msg)
    }
}, error => {
    console.log('err' + error);
    if (error.response.data) {
        error.message = error.response.data.msg
    }
    //根据请求并状态  是否登录或者提示其他
    if (error.response.status === 401) {
        store.commit("REMOVE_INFO")
        router.push({
            path: "/login"
        })
        error.message = "请重新登登录"
    }
    if (error.response.status === 403) {
        error.message = "权限不足，不可访问"
    }
    Element.Message({
        message: error.message,
        type: "error",
        duration: 3 * 1000
    })
    return Promise.reject(error)
})