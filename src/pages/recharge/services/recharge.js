import { request, config } from 'utils'

const { api } = config
const { recharge } = api

export function query (params) {
  return request({
    url: recharge,
    method: 'post',
    data: params,
  })
}


