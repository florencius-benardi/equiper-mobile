import React from 'react'
import { Modal, Button, Table, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Api from '@/helpers/api';

class ButtonModal extends React.Component {
  constructor() {
    super()
    this.state = {
      q: '',
      pagination: {},
    }
  }

  componentDidMount() {
    const { selectedKeys, label, grid } = this.props

    if (label == 'Plant' && _.has(grid, 'inout_plant') && selectedKeys != grid.inout_plant.id) {
      this.fetch()
    }

    if (label == 'Storage' && _.has(grid, 'inout_storage') && selectedKeys != grid.inout_storage.id) {
      this.fetch()
    }

    if (label == 'UOM' && _.has(grid, 'uom') && (selectedKeys != (grid.uom ? grid.uom.id : null))) {
      this.fetch()
    }

    if (label == 'Material' && _.has(grid, 'material') && (selectedKeys != (grid.material ? grid.material.id : null))) {
      this.fetch()
    }

  }

  componentDidUpdate(prevProps) {
    const { refId, visible } = this.props

    // check if refId changed
    if (refId !== prevProps.refId) {
      this.fetch();
    }

    if (visible !== prevProps.visible) {
      this.fetch();
    }
  }

  fetch = (params = {}) => {
    const { refId, api, apiName, apiParam, apiWithRef, requireRefId, defaultParams, label } = this.props

    if (label == 'Plant') {
      params.plant_id = defaultParams ? defaultParams.plant_id : null
      params.storage_id = defaultParams ? defaultParams.storage_id : null
      params.material_id = defaultParams ? defaultParams.material_id : null
    }

    if (label == 'Storage') {
      params.plant_id = defaultParams.plant_id;
      params.storage_id = defaultParams.storage_id;
      params.supply_plant_id = defaultParams.supply_plant_id;
      params.material_id = defaultParams.material_id;
      params.plant_id_to = defaultParams.plant_id_to;
    }

    const { q, pagination } = this.state
    // console.log('params:', params);
    this.setState({ loading: true });

    // get all cost center master
    if (!refId) {
      if (requireRefId) { return false } //break function

      // this is for uom
      if (label == 'UOM') {
        api(defaultParams.materialId)
          .then(response => {
            //   console.log(response.data);
            if (response.status === 200) { //OK
              const data = response.data;
              const pagination = { ...this.state.pagination };

              pagination.current = data.current_page
              pagination.total = data.total;
              pagination.pageSize = parseInt(data.per_page);

              this.setState({
                loading: false,
                data: data.data,
                pagination,
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.setState({ loading: false });
            // handleApiError(error, this.props)
          })
      } else {
        if (typeof apiName !== 'undefined' && apiName !== '') {
          const api = new Api();
          if (typeof api[apiName] === "function") {
            api[apiName]({ ...apiParam, ...params, q })
              .then(response => {
                console.log("response_data", response);
                if (response.status === 200) { //OK
                  const data = response.data;
                  const pagination = { ...this.state.pagination };

                  pagination.current = data.current_page
                  pagination.total = data.total;
                  pagination.pageSize = parseInt(data.per_page);

                  this.setState({
                    loading: false,
                    data: data.data,
                    pagination,
                  })
                }
              })
              .catch(error => {
                console.log(error)
                this.setState({ loading: false });
                // handleApiError(error, this.props)
              })
          }
          else {
            this.setState({ loading: false })
          }
        }
        else {
          api({ ...params, per_page: pagination.pageSize, page: pagination.current, q })
            .then(response => {
              if (response.status === 200) { //OK
                const data = response.data;
                const pagination = { ...this.state.pagination };

                pagination.current = data.current_page
                pagination.total = data.total;
                pagination.pageSize = parseInt(data.per_page);

                this.setState({
                  loading: false,
                  data: data.data,
                  pagination,
                })
              }
            })
            .catch(error => {
              console.log(error)
              this.setState({ loading: false });
              // handleApiError(error, this.props)
            })
        }
      }

    } else {
      apiWithRef(refId, { ...params, q })
        .then(response => {
          //   console.log(response.data);
          if (response.status === 200) { //OK
            const data = response.data;
            const pagination = { ...this.state.pagination };

            pagination.current = data.current_page
            pagination.total = data.total;
            pagination.pageSize = parseInt(data.per_page);

            this.setState({
              loading: false,
              data: data.data,
              pagination,
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.setState({ loading: false });
          // handleApiError(error, this.props)
        })
    }

  }


  handleTableChange = (pagination, filters, sorter) => {
    // console.log(filters);
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      per_page: pagination.pageSize,
      page: pagination.current,
      sort_field: sorter.field,
      sort_order: sorter.order === 'ascend' ? 'asc' : 'desc',
      ...filters,
    });
  }

  //on check table item
  onSelectChange = (selectedKeys) => {
    // console.log('selectedKeys changed: ', selectedKeys);
    const { mode } = this.props
    //purify selectedKeys
    let selectedKeysPure
    if (mode == "multiple") {
      selectedKeysPure = selectedKeys
    } else {
      selectedKeysPure = selectedKeys[0]
    }

    let data = [...this.state.data].find(item => item.id === selectedKeysPure)

    //send data to parent
    if (this.props.onChange) {
      this.props.onChange(selectedKeys, data)
    }
  }

  searchData = (value) => {
    this.setState({ q: value }, () => { this.fetch() })
  }

  render() {
    const { selectedKeys, mode, label, columns, scrollX } = this.props
    let type
    switch (mode) {
    case "multiple":
      type = "checkbox"
      break;
    default:
      type = "radio"
      break;
    }
    const rowSelection = {
      type: type,
      selectedRowKeys: selectedKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className="container">
        <Button icon="switcher" className="button"
          onClick={this.props.onClick} />

        <Modal width={800}
          title={`Select ${label}`}
          visible={this.props.visible}
          footer={null}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
        >
          <div>
            <Row>
              <Col span={4} push={20}>
                <Input.Search style={{ marginBottom: 10 }}
                  placeholder="Search"
                  onSearch={this.searchData}
                />
              </Col>
            </Row>
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={this.state.data}
              pagination={{
                pageSizeOptions: ['20', '50', '100', '200'],
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                ...this.state.pagination
              }}
              loading={this.state.loading}
              scroll={{ y: 400, x: scrollX }}
              onChange={this.handleTableChange}
              size="middle"
              rowSelection={rowSelection}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

ButtonModal.propTypes = {
  selectedKeys: PropTypes.array,
  visible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
}

export default ButtonModal