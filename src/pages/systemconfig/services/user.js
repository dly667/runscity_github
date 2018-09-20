import { request, config } from 'utils'

const { api } = config
const { user,users } = api

export function query (params) {
  return request({
    url: user,
    method: 'post',
    data: params,
  })
}

export function usersQuery (params) {
  return request({
    url: users,
    method: 'post',
    data: params,
  })
}

export function create (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
