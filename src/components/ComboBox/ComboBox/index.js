import React, { Component } from 'react'
import { Select } from 'antd';
import debounce from 'lodash/debounce'
import _ from 'lodash';

import handleApiError from '@/helpers/handleApiError';

import '@/assets/styles/global.css'
import '@/assets/styles/form.css'

import ComboBoxModal from '../ComboBoxModal'

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
    const { selectedKeys, grid, fieldName } = this.props

    if (_.has(grid, fieldName) && selectedKeys != grid[fieldName].id) {
      this.fetchDataListSelect()
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedKeys } = this.props
    if (selectedKeys !== prevProps.selectedKeys) {
      this.onChangeSelectedDataHandler(selectedKeys)
    }
  }

  fetchDataListSelect(value, pagination) {
    const { parameterId, routeName, parameterMandatory, addOnParameters } = this.props
    if (!parameterId && parameterMandatory) {
      return false
    } else if (parameterId && parameterMandatory) {
      routeName({ ...addOnParameters, q: this.state.searchValue })
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

  onFocusSelectHandler = () => {
    const { selectedKeys } = this.props
    const { selectOptionsDefault } = this.state
    // console.log('default length', selectOptionsDefault.length)

    // fetch on focus if parent not provide selected keys
    if (!selectedKeys) {
      if (selectOptionsDefault.length === 0) {
        this.fetchDataListSelect()
      }
    }
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
      disabled,
      selectedKeys,
      mode,
      parameterId,
      routeName,
      parameterMandatory,
      addOnParameters,
      columns,
      fieldDataName,
      scrollX,
      grid
    } = this.props

    const { label } = this.props
    // const { getFieldDecorator } = form || {} =form
    const { selectOptions, pagination, searchValue } = this.state

    const config = {
      routeName, parameterMandatory, parameterId, addOnParameters, columns, scrollX,
      selectOptions, pagination, searchValue, fieldName, grid
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

    const renderField = () => {
      if (_.has(grid, fieldName) && fieldName) {
        return (
          <div>
            <Select
              showSearch
              style={{ width: '100%' }}
              // allowClear={allowClear}
              onSearch={this.onSearchDataHandler}
              filterOption={false}
              mode={mode}
              showArrow={true}
              onChange={this.onChangeSelectHandler}
              disabled={disabled}
              onBlur={this.onBlurSelectHandler}
              onFocus={this.onFocusSelectHandler}
              value={this.props.grid[fieldName].code}
            // dropdownRender={this.renderDropdown}
            >
              <Select.Option
                key={this.props.grid[fieldName].id}
                value={this.props.grid[fieldName].id}
                data={{ ...this.props.grid[fieldName] }}>
                {this.props.grid[fieldName].code}
              </Select.Option>
            </Select>
            <ComboBoxModal {...config}
              label={label}
              mode={mode}
              visible={this.state.showModal}
              selectedKeys={arrSelectedKeys}
              onClick={() => this.setState({ showModal: true })}
              onChange={this.onChangeModalHandler}
              onCancel={this.onCancelModalHandler}
            />
          </div>
        )
      } else {
        return (
          <div>
            <Select
              showSearch
              style={{ width: '100%' }}
              allowClear={allowClear}
              onSearch={this.onSearchDataHandler}
              filterOption={false}
              mode={mode}
              showArrow={true}
              onChange={this.onChangeSelectHandler}
              disabled={disabled}
              onBlur={this.onBlurSelectHandler}
              onFocus={this.onFocusSelectHandler}
              value={arrSelectedKeys}
            >
              {selectOptions.map((r) => (
                <Select.Option key={r.id} value={r.id} data={{ ...r }}>{r[fieldDataName]}</Select.Option>
              ))}
            </Select>
            <ComboBoxModal {...config}
              label={label}
              mode={mode}
              visible={this.state.showModal}
              selectedKeys={arrSelectedKeys}
              onClick={() => this.setState({ showModal: true })}
              onChange={this.onChangeModalHandler}
              onCancel={this.onCancelModalHandler}
            />
          </div>
        )
      }
    }
    return (
      <div className="select-datasheet" >
        {renderField()}
      </div>
    )


  }
}
