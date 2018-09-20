import { request, config } from 'utils'

const { api } = config
const { fundsDetail } = api

export function fundsDetails (params) {

  return request({
    url: fundsDetail,
    method: 'post',
    data: params,
  })
}
