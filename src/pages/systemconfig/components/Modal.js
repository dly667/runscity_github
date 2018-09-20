import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, InputNumber, Radio, Modal, Cascader ,Button} from 'antd'
import LalModal from './LalModal'
import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  LalonClick,
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
        id:item.ID
      }
      
      // data.address = data.address.join(' ')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
 
  const { LatitudeLongitude, selectedAddr } = modalProps
   //处理数据以匹配form表单
   
    let Obj 
    try {
      Obj = JSON.parse(item.Intro)
    } catch (e) {
    
      
    }
    //时间戳
    item =  {
      ...item,
      ...Obj,
      AddTime:moment.unix(item.AddTime).format("YYYY-MM-DD HH:mm")
    }
 
    

  return (
    <div>
     
    <Modal {...modalOpts}>
    
      <Form layout="horizontal">
        <FormItem label="健身房名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('chain_name', {
            initialValue: item.ChainName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="城市" hasFeedback {...formItemLayout}>
          {getFieldDecorator('city', {
            initialValue: item.City,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('Address', {
            initialValue: item.Address,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="负责人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('Principal', {
            initialValue: item.Principal,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="联系方式" hasFeedback {...formItemLayout}>
          {getFieldDecorator('Phone', {
            initialValue: item.Phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="经纬度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('LatitudeLongitude', {
            initialValue: item.nickName,

          })(<div><p>{'('+LatitudeLongitude.lng+','+LatitudeLongitude.lat+')'}</p><p>{selectedAddr}</p><Button onClick={LalonClick}>选择</Button></div>)}
        </FormItem>
        {/*        
        <FormItem label="Address" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            style={{ width: '100%' }}
            options={city}
            placeholder="Pick an address"
          />)}
        </FormItem> */}
      </Form>
      
    </Modal>
    </div>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
