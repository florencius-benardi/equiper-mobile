import React, { Component, useState } from 'react'
import { Form, Select, Table } from 'antd';
import debounce from 'lodash/debounce'

import handleApiError from '@/helpers/handleApiError';

import '@/assets/styles/global.css'
import '@/assets/styles/form.css'

import ButtonModal from './ButtonModal'

const FormItem = Form.Item;
const Option = Select.Option;

export default class SelectModal extends Component {
  _isMounted = false;
  constructor() {
    super()
    this.state = {
      errors: {},
      selectOptions: [], //options 
      selectOptionsDefault: [], //options default data
      showSelectModal: false,
      selectedKeys: [], //selected id
      selectedData: {}, //selected data object
    }

    this.fetchSelectList = debounce(this.fetchSelectList, 300)
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.fetchSelectList()
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    const { selectedKeys, refId, api } = this.props

    // check if refId changed
    if (refId !== prevProps.refId) {
      this.fetchSelectList();
    }

    // check if api changed
    if (api !== prevProps.api) {
      this.fetchSelectList();
    }

    //compare if selectedKeys changed
    if (selectedKeys !== prevProps.selectedKeys) {
      this.updateSelectedData(selectedKeys)
    }
  }

  handleSearch = (value) => { this.fetchSelectList(value) }
  fetchSelectList(value) {
    const { refId, api, apiWithRef, requireRefId } = this.props
    // console.log('refId', refId)
    // get all cost center master
    if (!refId) {
      if (requireRefId) { return false } //break function
      api({ q: value })
        .then(response => {
          // console.log('fetchselectlist',response.data);
          if (response.status === 200) { //OK
            const { data } = response.data
            this.setState({ selectOptions: data })
            //save the default data to restore after search
            if (value != null) {
              this.setState({ selectOptionsDefault: data })
            }
            this.updateSelectedData(this.props.selectedKeys)
          }
        })
        .catch(error => {
          handleApiError(error, this.props)
        })
    } else {
      apiWithRef(refId, { q: value })
        .then(response => {
          // console.log('fetchselectlist',response.data);
          if (response.status === 200) { //OK
            const { data } = response.data
            this.setState({ selectOptions: data })
            //save the default data to restore after search
            if (value != null) {
              this.setState({ selectOptionsDefault: data })
            }
            this.updateSelectedData(this.props.selectedKeys)
          }
        })
        .catch(error => {
          handleApiError(error, this.props)
        })
    }
  }

  onChange = async (selectedKeys) => {
    // console.log(selectedKeys)
    await this.updateSelectedData(selectedKeys)
    this.props.onChange(selectedKeys, this.state.selectedData)
  }

  onModalCancel = (e) => {
    // console.log(e);
    this.setState({
      showModal: false,
    });
  }

  handleModalChange = async (selectedKeys) => {
    const { mode } = this.props
    // console.log(selectedKeys)
    //purify selectedKeys
    let selectedKeysPure
    if (mode === "multiple") {
      selectedKeysPure = selectedKeys
    } else {
      selectedKeysPure = selectedKeys[0]
    }

    // console.log(selectedKeysPure)
    await this.updateSelectedData(selectedKeysPure)
    this.props.onChange(selectedKeysPure, this.state.selectedData)
  }

  renderDropdown = (menu) => {
    const { menuItems } = menu.props
    const data = menuItems.map(item => item.props.data)
    // console.log(menu)
    const columns = [

    ]

    return (
      <div style={{ width: '800px', backgroundColor: '#fff', top: 100 }}>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={false}
          onChange={() => { }}
          size="small"
        />
      </div>
    )
  }

  updateSelectedData = async (selectedKeys) => {
    const { selectOptions, selectOptionsDefault } = this.state
    let data = [...selectOptions, ...selectOptionsDefault].find(item => item.id === selectedKeys)
    // console.log('updateSelectedData',data)
    return this.setState({ selectedData: data }, () => true)
  }

  onBlur = () => {
    const { selectOptionsDefault } = this.state
    //restore selectOptions to default data
    if (selectOptionsDefault.length > 0) {
      this.setState({ selectOptions: selectOptionsDefault })
    }
  }

  render() {
    const { fieldName, form, options, disabled, selectedKeys, mode, refId,
      api, apiWithRef, requireRefId, columns, dataName, dataDescription, scrollX,
      ...props } = this.props
    const { label } = this.props

    const config = { api, apiWithRef, requireRefId, columns, scrollX }

    let allowClear
    if (mode === 'multiple') {
      allowClear = false
    } else {
      allowClear = true
    }

    //auto convert selected key to array
    let arrSelectedKeys
    if (Array.isArray(selectedKeys)) {
      arrSelectedKeys = selectedKeys
    } else {
      arrSelectedKeys = [selectedKeys]
    }

    const { getFieldDecorator } = form
    const { selectOptions, selectedData } = this.state

    return (
      <FormItem {...props}>
        {getFieldDecorator(fieldName, {
          ...options
        })(
          <Select
            showSearch
            allowClear={allowClear}
            onSearch={this.handleSearch}
            filterOption={false}
            placeholder={`Select ${label}`}
            mode={mode}
            showArrow={true}
            onChange={this.onChange}
            disabled={disabled}
            onBlur={this.onBlur}
          // dropdownRender={this.renderDropdown}
          >
            {selectOptions.map((r) => (
              <Option key={r.id} value={r.id} data={{ ...r }}>{r[dataName]}</Option>
            ))}
          </Select>
        )}
        {!disabled ?
          <ButtonModal {...config}
            label={label}
            mode={mode}
            visible={this.state.showModal}
            refId={refId}
            selectedKeys={arrSelectedKeys}
            onClick={() => this.setState({ showModal: true })}
            onChange={this.handleModalChange}
            onCancel={this.onModalCancel}
          />
          : null}
        {selectedData ? <p className="select-desc">{selectedData[dataDescription]}</p> : null}
      </FormItem>
    )
  }
}
