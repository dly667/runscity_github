const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const { apiPrefix } = config
let systemconfig = Mock.mock({
    'data|80-100': [
      {
        id: '@id',
        GymName: '@name',
        Address: '@last',
        Principal:'@name',
        Phone: /^1[34578]\d{9}$/,
    
        LatitudeAndLongitude: '@float(60, 100, 3, 5)'+','+'@float(60, 100, 3, 5)',
       
        AddTime: '@datetime',
        OpTime: '@datetime',
        avatar () {
          return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png')
        },
      },
    ],
  })
  
  
  let database = systemconfig.data
  
  const EnumRoleType = {
    ADMIN: 'admin',
    DEFAULT: 'guest',
    DEVELOPER: 'developer',
  }
  
 
  
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
  
  const NOTFOUND = {
    message: 'Not Found',
    documentation_url: 'http://localhost:8000/request',
  }
  
  module.exports = {
  
    [`POST ${apiPrefix}/systemconfig/gymManage`] (req, res) {
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
  
    [`GET ${apiPrefix}/users`] (req, res) {
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
  
    [`DELETE ${apiPrefix}/users`] (req, res) {
      const { ids } = req.body
      database = database.filter(item => !ids.some(_ => _ === item.id))
      res.status(204).end()
    },
  
  

  
    [`GET ${apiPrefix}/user/:id`] (req, res) {
      const { id } = req.params
      const data = queryArray(database, id, 'id')
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json(NOTFOUND)
      }
    },
  
    [`DELETE ${apiPrefix}/user/:id`] (req, res) {
      const { id } = req.params
      const data = queryArray(database, id, 'id')
      if (data) {
        database = database.filter(item => item.id !== id)
        res.status(204).end()
      } else {
        res.status(404).json(NOTFOUND)
      }
    },
  
    [`PATCH ${apiPrefix}/user/:id`] (req, res) {
      const { id } = req.params
      const editItem = req.body
      let isExist = false
  
      database = database.map((item) => {
        if (item.id === id) {
          isExist = true
          return Object.assign({}, item, editItem)
        }
        return item
      })
  
      if (isExist) {
        res.status(201).end()
      } else {
        res.status(404).json(NOTFOUND)
      }
    },
  }
  