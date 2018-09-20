import { request, config } from 'utils'

const { api } = config
const { dashboard ,zbTotal} = api

export function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}

// export function getZbTotal (params) {
//   return request({
//     url: zbTotal,
//     method: 'post',
//     data: params,
//   })
// }
