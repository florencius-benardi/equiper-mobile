import React from 'react'
import { Modal, Button, Table, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';

import '../index.css';

class ButtonModal extends React.Component {
  constructor() {
    super()
    this.state = {
      q: '',
      pagination: {},
    }
  }

  componentDidMount() {
    this.fetch()
  }

  componentWillUnmount() {
    this.setState({ loading: true });
  }

  componentDidUpdate(prevProps) {
    // check if refId changed
    if (this.props.refId !== prevProps.refId) {
      this.fetch();
    }
  }

  fetch = (params = {}) => {
    const { refId, api, apiWithRef, requireRefId } = this.props

    const { q } = this.state
    // console.log('params:', params);
    this.setState({ loading: true });

    // get all cost center master
    if (!refId) {
      if (requireRefId) { return false } //break function
      api({ ...params, q })
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

    //send data to parent
    if (this.props.onChange) {
      this.props.onChange(selectedKeys)
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
          onClick={this.props.onClick} style={{ position: 'absolute', marginTop: -17, marginLeft: -35 }} />

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