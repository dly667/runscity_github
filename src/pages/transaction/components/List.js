import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Icon,Button} from 'antd'
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

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [{
    title: '用户名',
    dataIndex: 'MemberName',
    key: 'MemberName'
  }, 
  {
    title: '跑步获得',
    dataIndex: 'RunGet',
    key: 'RunGet',
  },
  {
    title: '注册获得',
    dataIndex: 'RegisterGet',
    key: 'RegisterGet',
  },
  {
    title: '开店获得',
    dataIndex: 'ShopGet',
    key: 'ShopGet',
  },
  {
    title: '充值获得',
    dataIndex: 'RechargeGet',
    key: 'RechargeGet',
  },
  {
    title: '转入',
    dataIndex: 'Into',
    key: 'Into',
  },
  {
    title: '转出',
    dataIndex: 'TransferOut',
    key: 'TransferOut',
  },
  {
    title: '备注',
    dataIndex: 'Remark',
    key: 'ZType',
  },
 {
    title: '操作时间',
    dataIndex: 'OpTime',
    key: 'OpTime',
  }];




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
