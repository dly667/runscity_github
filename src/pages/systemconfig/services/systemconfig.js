import { request, config } from 'utils'

const { api } = config
const { gymList ,gymAdd,gymDel,gymUpdate} = api

export function query (params) {
  return request({
    url: gymList,
    method: 'post',
    data: params,
  })
}

export function create(params){
  return request({
    url: gymAdd,
    method: 'post',
    data: params,
  })
}

export function remove(params){
  return request({
    url: gymDel,
    method: 'post',
    data: params,
  })
}

export function update(params){
  return request({
    url: gymUpdate,
    method: 'post',
    data: params,
  })
}
