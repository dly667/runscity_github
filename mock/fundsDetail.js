const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      MemberName: '@first',
      RunGet:'@float(60, 10000,3,5)',
      RegisterGet:'@float(60, 10000,3,5)',
      ShopGet:'@float(60, 10000,3,5)',
      RechargeGet:'@float(60, 10000,3,5)',
      Into:'@float(60, 10000,3,5)',
      TransferOut:'@float(60, 10000,3,5)',
      Remark:'@cword(5,10)',
      OpTime:'@datetime',
    },
  ],
})


let database = usersListData.data


const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}


module.exports = {

  [`POST ${apiPrefix}/fundsDetail`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
}
