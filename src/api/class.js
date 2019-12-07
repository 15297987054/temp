import { axios } from '@/utils/request'

const api = {
    class: '/product',
    
  }
  
  export default api
  
  export function getClassList (parameter) {
    return axios({
      url: api.class + '/class/list',
      method: 'post',
      params: parameter
    })
  }

  export function getAllClassList (parameter) {
    return axios({
      url: api.class + '/timetable/all',
      method: 'post',
      params: parameter
    })
  }
 
  export function getClassListByClass (parameter) {
    return axios({
      url: api.class + '/timetable/class',
      method: 'post',
      params: parameter
    })
  }
  export function getClassListByClassroom (parameter) {
    return axios({
      url: api.class + '/timetable/classroom',
      method: 'post',
      params: parameter
    })
  }

  export function getClassListByTeacher (parameter) {
    return axios({
      url: api.class + '/timetable/teacher',
      method: 'post',
      params: parameter
    })
  }
//订单页班级列表接口（下单页使用）
  export function getClassListForOrder (parameter) {
    return axios({
      url: api.class + '/class/buy/list',
      method: 'post',
      params: parameter
    })
  }
 
  /**
   * /product/timetable/class
   */
  /**
   * 查看全部课表接口
   * /product/timetable/all
   */
/**
 * 修改班级信息接口
请求URL：

/product/class/update
请求方式：

POST
 */  
/**
 * 新增班级接口
请求URL：

/product/class/add
请求方式：

POST
 */
/**
 * 班级列表接口（下单页使用）
请求URL：

/product/class/buy/list
请求方式：

POST
 */
/**
 * 班级列表接口
请求URL：

/product/class/list
请求方式：

POST
 */