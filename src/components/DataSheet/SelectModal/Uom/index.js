import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width: 150
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: 200
  },
]

const config = {
  //api to get select options
  api: api.getMasterUom,
  //api to get select options with string
  apiName: null,
  //param api for apiName
  apiParam: null,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'code',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
  // default params
  defaultParams: null,
  // grid data
  grid: null
}

export default class Select extends React.Component {
  // componentWillUnmount(){
  //   console.log('component will unmount')
  //   return false
  // }
  // console.log(props)
  render() {
    return <DefaultSelect {...config} {...this.props} />
  }
}