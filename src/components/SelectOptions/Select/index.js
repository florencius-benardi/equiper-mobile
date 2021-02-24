import React, { Component } from 'react'
import { Form, Select, Table } from 'antd';
import debounce from 'lodash/debounce'

import handleApiError from '@/helpers/handleApiError';

import '@/assets/styles/global.css'
import '@/assets/styles/form.css'

import SelectModal from '../SelectModal'

export default class SelectOption extends Component {
  constructor() {
    super()
    this.state = {
      errors: {},
      selectOptions: [], //options 
      selectOptionsDefault: [], //options default data
      showSelectModal: false,
      selectedKeys: [], //selected id
      selectedData: {},
      pagination: {},
      searchValue: null,
    }

    this.fetchDataListSelect = debounce(this.fetchDataListSelect, 300)
  }

  componentDidMount() {
    this.fetchDataListSelect()
  }

  componentDidUpdate(prevProps) {
    const { selectedKeys, parameterId, routeName } = this.props
    if (prevProps !== null) {
      if (parameterId !== prevProps.parameterId) {
        this.fetchDataListSelect();
      }
      if (routeName !== prevProps.routeName) {
        this.fetchDataListSelect();
      }
      if (selectedKeys !== prevProps.selectedKeys) {
        this.onChangeSelectedDataHandler(selectedKeys)
      }
    }
  }

  fetchDataListSelect(value, pagination) {
    const { parameterId, routeName, parameterMandatory, addOnParameters } = this.props
    if (!parameterId && parameterMandatory) {
      return false
    } else if (parameterId && parameterMandatory) {
      routeName({ q: value, addOnParameters })
        .then(response => {
          const { data } = response.data

          const pagination = { ...this.state.pagination };

          pagination.current = response.current_page
          pagination.total = response.total;
          pagination.pageSize = parseInt(response.per_page);

          this.setState({ selectOptions: data, pagination, searchValue: value })
          if (value != null) {
            this.setState({ selectOptionsDefault: data })
          }
        })
        .catch(error => {
          handleApiError(error, this.props)
        })
    } else {
      routeName({ q: value, addOnParameters, ...this.state.pagination })
        .then(response => {
          const { data } = response.data
          const pagination = { ...this.state.pagination };

          pagination.current = response.current_page
          pagination.total = response.total;
          pagination.pageSize = parseInt(response.per_page);

          this.setState({ selectOptions: data, pagination, searchValue: value })
          if (value != null) {
            this.setState({ selectOptionsDefault: data })
          }
        })
        .catch(error => {
          handleApiError(error, this.props)
        })
    }
  }

  onChangeSelectedDataHandler = async (selectedKeys) => {
    const { selectOptions, selectOptionsDefault } = this.state
    let data = [...selectOptions, ...selectOptionsDefault].find(item => item.id === selectedKeys)
    return this.setState({ selectedData: data }, () => true)
  }

  onSearchDataHandler = (value) => {
    if (value !== this.state.searchValue) {
      this.fetchDataListSelect(value)
    } else if (value == null) {
      //
    }
  }

  onChangeSelectHandler = async (selectedKeys) => {
    await this.onChangeSelectedDataHandler(selectedKeys)
    this.props.onChange(selectedKeys, this.state.selectedData)
  }

  onBlurSelectHandler = () => {
    const { selectOptionsDefault } = this.state
    //restore selectOptions to default data
    if (selectOptionsDefault.length > 0) {
      this.setState({ selectOptions: selectOptionsDefault })
    }
  }

  onClearSelectHandler = () => {
  }

  /**
   * 
   * II. Section Modal Function 
   */

  onCancelModalHandler = (e) => {
    this.setState({
      showModal: false,
    });
  }

  onChangeModalHandler = async (selectedKeys) => {
    const { mode } = this.props
    let selectedKey
    if (mode === "multiple") {
      selectedKey = selectedKeys
    } else {
      selectedKey = selectedKeys[0]
    }
    await this.onChangeSelectedDataHandler(selectedKey)
    this.props.onChange(selectedKey, this.state.selectedData)
  }

  onSearchDataModalHandler = (value) => {
    this.setState({
      selectOptions: value,
      selectOptionsDefault: value
    });
  }

  render() {
    const {
      fieldName,
      form,
      options,
      disabled,
      selectedKeys,
      mode,
      parameterId,
      routeName,
      parameterMandatory,
      addOnParameters,
      columns,
      fieldDataName,
      fieldDataDescription,
      scrollX,
      ...props } = this.props

    const { label, } = this.props
    const { getFieldDecorator } = form
    const { selectOptions, selectedData, pagination, searchValue } = this.state

    const config = {
      routeName, parameterMandatory, parameterId, addOnParameters, columns, scrollX,
      selectOptions, pagination, searchValue
    }

    let allowClear
    if (mode === 'multiple') {
      allowClear = false
    } else {
      allowClear = true
    }

    let arrSelectedKeys
    if (Array.isArray(selectedKeys)) {
      arrSelectedKeys = selectedKeys
    } else {
      arrSelectedKeys = [selectedKeys]
    }

    return (
      <Form.Item {...props}>
        {getFieldDecorator(fieldName, {
          ...options
        })(
          <Select
            showSearch
            mode={mode}
            placeholder={`Select ${label}`}
            allowClear={allowClear}
            onSearch={this.onSearchDataHandler}
            filterOption={false}
            showArrow={true}
            onChange={this.onChangeSelectHandler}
            onBlur={this.onBlurSelectHandler}
            onClear={this.onClearSelectHandler}
            disabled={disabled}
          >
            {selectOptions.map((row) => (
              <Select.Option key={row.id} value={row.id} data={{ ...row }}>{row[fieldDataName]}</Select.Option>
            ))}
          </Select>
        )}
        {!disabled ?
          <SelectModal {...config}
            label={label}
            mode={mode}
            visible={this.state.showModal}
            selectedKeys={arrSelectedKeys}
            onClick={() => this.setState({ showModal: true })}
            onChange={this.onChangeModalHandler}
            onCancel={this.onCancelModalHandler}
            onSearch={this.onSearchDataModalHandler}
          />
          : null}
        {selectedData ? <p className="select-desc">{selectedData[fieldDataDescription]}</p> : null}
      </Form.Item>
    )
  }
}
