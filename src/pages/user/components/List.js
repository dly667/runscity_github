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

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: text => <img alt="avatar" width={24} src={(text)} />,
      // render: text => <img alt="avatar" width={24} src={text} />,
    }, {
      title: '用户名',
      dataIndex: 'TrueName',
      key: 'TrueName',
      render: (text, record) =>  <Link to={`user/${record.MemberName}?id=${record.ID}`}>{text}</Link>,
    },
    {
      title: '手机号码',
      dataIndex: 'Phone',
      key: 'phone',
    }, 
    // {
    //   title: '呢称',
    //   dataIndex: 'NickName',
    //   key: 'nickName',
    // }, 
    // {
    //   title: '跑棒',
    //   dataIndex: 'Zsb',
    //   key: 'Zsb',
    // },
    {
      title: '跑棒',
      dataIndex: 'balance',
      key: 'balance',
    },
    //  {
    //   title: 'Gender',
    //   dataIndex: 'isMale',
    //   key: 'isMale',
    //   render: text => (<span>{text
    //     ? 'Male'
    //     : 'Female'}</span>),
    // },
 
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    // }, {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
     {
      title: '加入时间',
      dataIndex: 'AddTime',
      key: 'AddTime',
    }, 
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <Button>查看详细信息</Button>
        // return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      },
    },
  ]

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
      rowKey={record => record.MemberName}
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
