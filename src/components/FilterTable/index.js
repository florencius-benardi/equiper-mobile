import React, { Component } from 'react'
import {
  Form, Row, Col, Input, Button, Select, DatePicker, Icon, Tooltip
} from 'antd';
import moment from 'moment'
import './index.css'


const Option = Select.Option;

class AdvancedSearchForm extends Component {
  constructor() {
    super()
    this.state = {
      columns: []
    };

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    const { initialFilters, columns } = this.props
    if (initialFilters) {
      this.mapColumns(columns).forEach(item => {
        console.log(item)
      })
    }
  }

  mapColumns(columns) {
    const cols = columns.filter(item => {
      return item.search || item.filter || item.datePicker || item.dateRangePicker
    })

    // console.log(cols)
    return cols
  }

  // To generate mock Form.Item
  getFields() {
    const { columns } = this.props
    const { getFieldDecorator } = this.props.form;
    const colSize = {
      md: { span: 6 },
      sm: { span: 8 },
    }

    const children = this.mapColumns(columns).map((item, i) => {
      const fieldName = item.fieldName || item.dataIndex
      const label = item.filterLabel || item.title

      if (item.search) {
        return (
          <Col {...colSize} key={i} style={{ display: 'block' }}>
            <Form.Item label={label}>
              {getFieldDecorator(fieldName, {
                rules: [],
              })(
                <Input placeholder={`Search ${label}`} />
              )}
            </Form.Item>
          </Col>
        )
      }

      if (item.filter) {
        return (
          <Col {...colSize} key={i} style={{ display: 'block' }}>
            <Form.Item label={label}>
              {getFieldDecorator(fieldName, {
                rules: [],
              })(
                <Select mode="multiple" placeholder={`Select ${label}`} filterOption={false}
                  onSearch={(value) => {
                    if (item.onFilterSearch) {
                      item.onFilterSearch(value)
                    }
                  }}
                  optionLabelProp="label"
                >
                  {item.filter.map((option) => (
                    <Option key={option.value} value={option.value} label={option.shortText ? option.shortText : option.text}>{option.text}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        )
      }

      if (item.datePicker) {
        return (
          <Col {...colSize} key={i} style={{ display: 'block' }}>
            <Form.Item label={label}>
              {getFieldDecorator(fieldName, {
                rules: [],
                initialValue: [moment(new Date()), moment(new Date())]
              })(
                <DatePicker
                  format={'DD/MM/YYYY'}
                />
              )}
            </Form.Item>
          </Col>
        )
      }

      if (item.dateRangePicker) {
        return (
          <Col {...colSize} key={i} style={{ display: 'block' }}>
            <Form.Item label={label}>
              {getFieldDecorator(fieldName, {
                rules: [],
                initialValue: [moment(new Date()), moment(new Date())]
              })(
                <DatePicker.RangePicker
                  format={'DD/MM/YYYY'}
                />
              )}
            </Form.Item>
          </Col>
        )
      }

      return null
    })

    return children
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log('Received values of form: ', values);
      // remove undefined
      Object.keys(values).forEach(item => {
        if (values[item] === undefined) {
          delete values[item]
        }
      })
      // send to parent component
      this.props.onChange(values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.onChange({});
  }

  render() {
    return (
      <Form
        className="advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={20}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ marginTop: 10, textAlign: 'left' }}>
            <Tooltip title="Search">
              <Button type="primary" htmlType="submit"><Icon type="search" /></Button>
            </Tooltip>
            <Tooltip title="Clear Filter">
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}><Icon type="close-circle" /></Button>
            </Tooltip>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(AdvancedSearchForm);
