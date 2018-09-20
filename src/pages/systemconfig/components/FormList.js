import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './FormList.less'

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



const FormList = (
    FormListProps
) => {
    //   location.query = ''//queryString.parse(location.search)
    const { form } = FormListProps
    const { getFieldDecorator } = form
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    const compareToFirstPassword = (rule, value, callback) => {

        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    const validateToNextPassword = (rule, value, callback) => {

        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    let websiteOptions
    const handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
        websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
    }

    const residences = [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
                value: 'xihu',
                label: 'West Lake',
            }],
        }],
    }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
            }],
        }],
    }];
    // const { autoCompleteResult } = this.state;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const prefixSelector = form.getFieldDecorator('prefix', {
        initialValue: '86',
    })(
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    );


    return (
        <Form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
           
            <FormItem
                {...formItemLayout}
                label={(
                    <span>
                        Nickname&nbsp;
          <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                )}
            >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                    <Input />
                )}
            </FormItem>
          
        </Form>

    )
}

FormList.propTypes = {
    onDeleteItem: PropTypes.func,
    location: PropTypes.object,
}

export default Form.create()(FormList)  
