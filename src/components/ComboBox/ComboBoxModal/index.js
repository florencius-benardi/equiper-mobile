import React from 'react'
import { Modal, Button, Table, Col, Input, Row, Form } from 'antd';
import PropTypes from 'prop-types';
import connectionApiErrorHandler from '@/helpers/handleApiError';
import _ from 'lodash';

import './ComboBoxModal.css';

class ButtonModal extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      q: null,
      pagination: {},
      dataSource: [],
    }
  }

  componentDidMount() {
    const { selectedKeys, grid, fieldName } = this.props
    if (_.has(grid, fieldName) && selectedKeys != grid[fieldName].id) {
      this.fetchDataListModal()
    }
  }

  componentWillUnmount() {
    this.setState({
      loading: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedData !== prevProps.selectedData) {
      this.fetchDataListModal();
    }
  }

  fetchDataListModal = (params = {}) => {
    const { routeName, parameterMandatory, parameterId, addOnParameters } = this.props

    const { q } = this.state

    if (parameterMandatory && !parameterId) {
      if (!parameterId) {
        this.setState({ loading: false });
        return false
      } else {
        routeName({ ...addOnParameters, q })
          .then(response => {
            const data = response.data;
            const pagination = { ...this.state.pagination };

            pagination.current = data.current_page
            pagination.total = data.total;
            pagination.pageSize = parseInt(data.per_page);

            this.setState({
              loading: false,
              dataSource: data.data,
              pagination,
            })
          })
          .catch(error => {
            connectionApiErrorHandler(error, this.props)
          })
      }

    } else {
      routeName({ ...params, ...addOnParameters, q })
        .then(response => {
          const data = response.data;
          const pagination = { ...this.state.pagination };
          pagination.current = data.current_page
          pagination.total = data.total;
          pagination.pageSize = parseInt(data.per_page);
          this.setState({
            loading: false,
            dataSource: data.data,
            pagination,
          })
        })
        .catch(error => {
          this.setState({ loading: false });
          connectionApiErrorHandler(error, this.props)
        })

    }
  }

  onChangeTableHandler = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };

    pager.current = pagination.current;

    this.setState({
      pagination: pager,
    });

    this.fetchDataListModal({
      per_page: pagination.pageSize,
      page: pagination.current,
      sort_field: sorter.field,
      sort_order: sorter.order === 'ascend' ? 'asc' : 'desc',
      ...filters,
    });
  }

  onSelectedChangeHandler = (selectedKeys) => {
    if (this.props.onChange) {
      this.props.onChange(selectedKeys);
      this.props.onCancel();
    }
    // this.props.onSearch(this.state.dataSource);
    this.setState({ q: null });
  }

  onSearchDataHandler = (value) => {
    this.setState({ loading: true });
    this.setState({ q: value },
      () => { this.fetchDataListModal() })

  }

  onCancelModalHandler = () => {
    this.setState({ syncDataOptions: true });
    this.props.onCancel();
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
      onChange: this.onSelectedChangeHandler,
    };

    return (
      <div className="container">
        <Button icon="switcher" className="button"
          onClick={this.props.onClick} style={{ position: 'absolute', marginTop: -17, marginLeft: -35 }} />

        <Modal width={800}
          title={`Select ${label}`}
          visible={this.props.visible}
          footer={null}
          onOk={this.props.onOk}
          onCancel={this.onCancelModalHandler}
        >
          <div>
            <Row>
              <Col span={4} push={20}>
                <Form.Item>
                  <Input.Search
                    style={{ marginBottom: 10 }}
                    placeholder="Search"
                    onSearch={this.onSearchDataHandler}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={this.state.dataSource}
              pagination={{
                pageSizeOptions: ['20', '50', '100', '200'],
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                ...this.state.pagination
              }}
              loading={this.state.loading}
              scroll={{ y: 400, x: scrollX }}
              onChange={this.onChangeTableHandler}
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