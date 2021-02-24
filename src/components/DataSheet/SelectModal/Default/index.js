import React, { Component } from 'react'
import { Select, Table } from 'antd';
import debounce from 'lodash/debounce'

import handleApiError from '@/helpers/handleApiError';
import ButtonModal from './ButtonModal';
import '@/assets/styles/global.css'
import '@/assets/styles/form.css'
import '../index.css';
import _ from 'lodash';

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
      pagination: {}, // pagination
    }

    this.fetchSelectList = debounce(this.fetchSelectList, 300)
  }

  componentDidMount() {
    console.log(this.props)
    const { selectedKeys, label, grid } = this.props

    if (label == 'Plant' && _.has(grid, 'inout_plant') && selectedKeys != grid.inout_plant.id) {
      this.fetchSelectList()
    }

    if (label == 'Storage' && _.has(grid, 'inout_storage') && selectedKeys != grid.inout_storage.id) {
      this.fetchSelectList()
    }

    if (label == 'UOM' && _.has(grid, 'uom') && (selectedKeys != (grid.uom ? grid.uom.id : null))) {
      this.fetchSelectList()
    }

    if (label == 'Material' && _.has(grid, 'material') && (selectedKeys != (grid.material ? grid.material.id : null))) {
      this.fetchSelectList()
    }
  }

  componentWillUpdate() { }


  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    const { selectedKeys } = this.props

    // // check if refId changed
    // if (refId !== prevProps.refId) {
    //     this.fetchSelectList();
    // }

    //compare if selectedKeys changed
    if (selectedKeys !== prevProps.selectedKeys) {
      this.updateSelectedData(selectedKeys)
    }
  }

  handleSearch = (value) => { this.fetchSelectList(value) }

  fetchSelectList(value) {
    const { refId, api, apiWithRef, requireRefId, defaultParams, label } = this.props;
    const { pagination } = this.state;

    // console.log('refId', refId)
    // get all cost center master
    if (!refId) {
      // console.log('api', api)
      if (requireRefId) { return false } //break function

      //this is for uom
      if (label == 'UOM') {

        api(defaultParams.materialId)
          .then(response => {
            // console.log('fetchselectlist',response.data);
            if (response.status === 200) { //OK
              const { data } = response.data
              this.setState({ selectOptions: data })
              //save the default data to restore after search
              if (!value && this.state.selectOptionsDefault.length == 0) {
                // console.log('save default')
                this.setState({ selectOptionsDefault: data })
              }
              // this.updateSelectedData(this.props.selectedKeys)
            }
          })
          .catch(error => {
            handleApiError(error, this.props)
          })

      } else {
        api({ ...defaultParams, q: value, per_page: pagination.pageSize, page: pagination.current })
          .then(response => {
            // console.log('fetchselectlist',response.data);
            if (response.status === 200) { //OK
              const { data } = response.data
              this.setState({ selectOptions: data })
              //save the default data to restore after search
              if (!value && this.state.selectOptionsDefault.length == 0) {
                // console.log('save default')
                this.setState({ selectOptionsDefault: data })
              }
              // this.updateSelectedData(this.props.selectedKeys)

              pagination.current = data.current_page
              pagination.total = data.total;
              pagination.pageSize = parseInt(data.per_page);

              this.setState({ pagination: pagination })
            }
          })
          .catch(error => {
            console.log(error);
            handleApiError(error, this.props)
          })
      }

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
            // this.updateSelectedData(this.props.selectedKeys)
          }
          // this.updateSelectedData(this.props.selectedKeys)
        })
        .catch(error => {
          handleApiError(error, this.props)
        })
    }
  }

  onChange = (selectedKeys) => {
    const { selectOptions, selectOptionsDefault } = this.state
    // if (selectedKeys == null) {
    //   /** Nothing to do if selected key removed */
    //   console.log('select on change')
    // } else {
    let data = [...selectOptions, ...selectOptionsDefault].find(item => item.id === selectedKeys)
    this.props.onChange(selectedKeys, data)
    // }

    //let data = [...selectOptions, ...selectOptionsDefault].find(item => item.id === selectedKeys)
    // console.log('select on change', selectedKeys)
    /*
    const { selectOptions, selectOptionsDefault } = this.state
    let data = [...selectOptions, ...selectOptionsDefault].find(item=>item.id===selectedKeys)
    this.props.onChange(selectedKeys, data)
    */
  }

  onModalCancel = () => {
    // console.log(e);
    this.setState({
      showModal: false,
    });
  }

  handleModalChange = (selectedKeys, data) => {
    const { mode } = this.props
    //purify selectedKeys
    let selectedKeysPure
    if (mode == "multiple") {
      selectedKeysPure = selectedKeys
    } else {
      selectedKeysPure = selectedKeys[0]
    }

    this.props.onChange(selectedKeysPure, data)
    // console.log(selectedKeysPure)
    // this.updateSelectedData(selectedKeysPure)
  }

  // renderDropdown = (menu) => {
  //   const { menuItems } = menu.props
  //   const data = menuItems.map(item => item.props.data)
  //   // console.log(menu)
  //   const columns = [

  //   ]

  //   return (
  //     <div style={{ width: '800px', backgroundColor: '#fff', top: 100 }}>
  //       <Table
  //         columns={columns}
  //         rowKey={record => record.id}
  //         dataSource={data}
  //         pagination={true}
  //         onChange={() => { }}
  //         size="small"
  //       />
  //     </div>
  //   )
  // }

  updateSelectedData = (selectedKeys) => {
    const { selectOptions, selectOptionsDefault } = this.state
    let data = [...selectOptions, ...selectOptionsDefault].find(item => item.id === selectedKeys)
    // console.log('updateSelectedData',data)
    // this.setState({selectedData:data})
  }

  onBlur = () => {
    const { selectOptionsDefault } = this.state
    //restore selectOptions to default data
    if (selectOptionsDefault.length > 0) {
      this.setState({ selectOptions: selectOptionsDefault })
    }
  }

  onFocus = () => {
    const { selectedKeys } = this.props
    const { selectOptionsDefault } = this.state
    // console.log('default length', selectOptionsDefault.length)

    // fetch on focus if parent not provide selected keys
    if (!selectedKeys) {
      if (selectOptionsDefault.length === 0) {
        this.fetchSelectList()
      }
    }
  }

  render() {
    const { disabled, selectedKeys, mode, refId,
      api, apiName, apiParam, apiWithRef, requireRefId, columns, dataName, scrollX, defaultParams, grid, label, gridData } = this.props

    const config = { api, apiName, apiParam, apiWithRef, requireRefId, columns, scrollX, defaultParams, grid }

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
      if (selectedKeys) {
        arrSelectedKeys = [selectedKeys]
      }

      const { selectOptions } = this.state

      const plantField = _.has(grid, 'inout_plant') || _.has(grid, 'plant');
      const storageField = _.has(grid, 'inout_storage') || _.has(grid, 'storage');
      const uomField = _.has(grid, 'uom');
      const materialField = _.has(grid, 'material');

      const renderField = () => {
        if (label == 'Plant' && plantField) {
          if (gridData == 'plant') {
            return (
              <div>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  allowClear={allowClear}
                  onSearch={this.handleSearch}
                  filterOption={false}
                  mode={mode}
                  showArrow={true}
                  onChange={this.onChange}
                  // onSelect={()=>console.log('onSelect')}
                  // onInputKeyDown={()=>console.log('onInputKeyDown')}
                  disabled={disabled}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  value={grid.plant ? grid.plant.code : null}
                // dropdownRender={this.renderDropdown}
                >
                  <Option
                    key={grid.plant ? grid.plant.id : null}
                    value={grid.plant ? grid.plant.id : null}
                    data={{ ...grid.plant }}
                  >
                    {grid.plant ? grid.plant.code : null}
                  </Option>
                </Select>
                <ButtonModal {...config}
                  label={label}
                  mode={mode}
                  visible={this.state.showModal}
                  refId={refId}
                  apiName={apiName}
                  apiParam={apiParam}
                  selectedKeys={arrSelectedKeys}
                  onClick={() => this.setState({ showModal: true })}
                  onChange={this.handleModalChange}
                  onCancel={this.onModalCancel}
                />
              </div >
            )
          } else
            return (
              <div>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  allowClear={allowClear}
                  onSearch={this.handleSearch}
                  filterOption={false}
                  mode={mode}
                  showArrow={true}
                  onChange={this.onChange}
                  // onSelect={()=>console.log('onSelect')}
                  // onInputKeyDown={()=>console.log('onInputKeyDown')}
                  disabled={disabled}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  value={grid.inout_plant ? grid.inout_plant.code : null}
                // dropdownRender={this.renderDropdown}
                >
                  <Option
                    key={grid.inout_plant ? grid.inout_plant.id : null}
                    value={grid.inout_plant ? grid.inout_plant.id : null}
                    data={{ ...grid.inout_plant }}
                  >
                    {grid.inout_plant ? grid.inout_plant.code : null}
                  </Option>
                </Select>
                <ButtonModal {...config}
                  label={label}
                  mode={mode}
                  visible={this.state.showModal}
                  refId={refId}
                  apiName={apiName}
                  apiParam={apiParam}
                  selectedKeys={arrSelectedKeys}
                  onClick={() => this.setState({ showModal: true })}
                  onChange={this.handleModalChange}
                  onCancel={this.onModalCancel}
                />
              </div >
            )
        } else if (label == 'Storage' && storageField) {
          if (gridData == 'storage')
            return (
              <div>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  allowClear={allowClear}
                  onSearch={this.handleSearch}
                  filterOption={false}
                  mode={mode}
                  showArrow={true}
                  onChange={this.onChange}
                  // onSelect={()=>console.log('onSelect')}
                  // onInputKeyDown={()=>console.log('onInputKeyDown')}
                  disabled={disabled}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  value={grid.storage ? grid.storage.code : null}
                // dropdownRender={this.renderDropdown}
                >
                  <Option
                    key={grid.storage ? grid.storage.id : null}
                    value={grid.storage ? grid.storage.id : null}
                    data={{ ...grid.storage }}
                  >
                    {grid.storage ? grid.storage.code : null}
                  </Option>
                </Select>
                <ButtonModal {...config}
                  label={label}
                  mode={mode}
                  visible={this.state.showModal}
                  refId={refId}
                  apiName={apiName}
                  apiParam={apiParam}
                  selectedKeys={arrSelectedKeys}
                  onClick={() => this.setState({ showModal: true })}
                  onChange={this.handleModalChange}
                  onCancel={this.onModalCancel}
                />
              </div >
            )
          else
            return (
              <div>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  allowClear={allowClear}
                  onSearch={this.handleSearch}
                  filterOption={false}
                  mode={mode}
                  showArrow={true}
                  onChange={this.onChange}
                  // onSelect={()=>console.log('onSelect')}
                  // onInputKeyDown={()=>console.log('onInputKeyDown')}
                  disabled={disabled}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  value={grid.inout_storage ? grid.inout_storage.code : null}
                // dropdownRender={this.renderDropdown}
                >
                  <Option
                    key={grid.inout_storage ? grid.inout_storage.id : null}
                    value={grid.inout_storage ? grid.inout_storage.id : null}
                    data={{ ...grid.inout_storage }}
                  >
                    {grid.inout_storage ? grid.inout_storage.code : null}
                  </Option>
                </Select>
                <ButtonModal {...config}
                  label={label}
                  mode={mode}
                  visible={this.state.showModal}
                  refId={refId}
                  apiName={apiName}
                  apiParam={apiParam}
                  selectedKeys={arrSelectedKeys}
                  onClick={() => this.setState({ showModal: true })}
                  onChange={this.handleModalChange}
                  onCancel={this.onModalCancel}
                />
              </div >
            )
        } else if (label == 'UOM' && uomField) {
          return (
            <div>
              <Select
                showSearch
                style={{ width: '100%' }}
                allowClear={allowClear}
                onSearch={this.handleSearch}
                filterOption={false}
                mode={mode}
                showArrow={true}
                onChange={this.onChange}
                // onSelect={()=>console.log('onSelect')}
                // onInputKeyDown={()=>console.log('onInputKeyDown')}
                disabled={disabled}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                value={grid.uom ? grid.uom.code : null}
              >
                <Option key={grid.uom ? grid.uom.id : null} value={grid.uom ? grid.uom.id : null} data={{ ...grid.uom }}>{grid.uom ? grid.uom.code : null}</Option>
              </Select>
              <ButtonModal {...config}
                label={label}
                mode={mode}
                visible={this.state.showModal}
                refId={refId}
                apiName={apiName}
                apiParam={apiParam}
                selectedKeys={arrSelectedKeys}
                onClick={() => this.setState({ showModal: true })}
                onChange={this.handleModalChange}
                onCancel={this.onModalCancel}
              />
            </div>
          )
        } else if (label == 'Material' && materialField) {
          return (
            <div>
              <Select
                showSearch
                style={{ width: '100%' }}
                allowClear={allowClear}
                onSearch={this.handleSearch}
                filterOption={false}
                mode={mode}
                showArrow={true}
                onChange={this.onChange}
                // onSelect={()=>console.log('onSelect')}
                // onInputKeyDown={()=>console.log('onInputKeyDown')}
                disabled={disabled}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                value={grid.material.code}
              // dropdownRender={this.renderDropdown}
              >
                <Option
                  key={grid.material.id}
                  value={grid.material.id}
                  data={{ ...grid.material }}>
                  {grid.material.code}
                </Option>
              </Select>
              <ButtonModal {...config}
                label={label}
                mode={mode}
                visible={this.state.showModal}
                refId={refId}
                apiName={apiName}
                apiParam={apiParam}
                selectedKeys={arrSelectedKeys}
                onClick={() => this.setState({ showModal: true })}
                onChange={this.handleModalChange}
                onCancel={this.onModalCancel}
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
                onSearch={this.handleSearch}
                filterOption={false}
                mode={mode}
                showArrow={true}
                onChange={this.onChange}
                // onSelect={()=>console.log('onSelect')}
                // onInputKeyDown={()=>console.log('onInputKeyDown')}
                disabled={disabled}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                value={arrSelectedKeys}
              // dropdownRender={this.renderDropdown}
              >
                {selectOptions.map((r) => (
                  <Option key={r.id} value={r.id} data={{ ...r }}>{r[dataName]}</Option>
                ))}
              </Select>
              <ButtonModal {...config}
                label={label}
                mode={mode}
                visible={this.state.showModal}
                refId={refId}
                apiName={apiName}
                apiParam={apiParam}
                selectedKeys={arrSelectedKeys}
                onClick={() => this.setState({ showModal: true })}
                onChange={this.handleModalChange}
                onCancel={this.onModalCancel}
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
}
