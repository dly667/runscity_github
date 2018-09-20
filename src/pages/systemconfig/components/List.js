import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)
  console.log(location.query,9090,tableProps)
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk() {
          onDeleteItem(record.ID)
        },
      })
    }
  }

  const columns = [{
    title: '健身房名称',
    dataIndex: 'ChainName',
    key: 'ChainName'
  },
  {
    title: '城市',
    dataIndex: 'City',
    key: 'City',
  },
  {
    title: '地址',
    dataIndex: 'Address',
    key: 'Address',
  },
  {
    title: '负责人姓名',
    dataIndex: 'Principal',
    key: 'Principal',
  },
  {
    title: '联系方式',
    dataIndex: 'Phone',
    key: 'Phone',
  },
  {
    title: '经度',
    dataIndex: 'Lat',
    key: 'Lat',
  },
  {
    title: '纬度',
    dataIndex: 'Lng',
    key: 'Lng',
  },
  {
    title: "加盟时间",
    dataIndex: 'AddTime',
    key: 'AddTime'
  },
  {
    title: '操作',
    key: 'operation',
    width: 100,
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
    },
  },
  ];


  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }
  
  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.key}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
      
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
