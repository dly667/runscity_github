import { request, config } from 'utils'

const { api } = config
const { users } = api

export function query (params) {
  return request({
    url: users,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
