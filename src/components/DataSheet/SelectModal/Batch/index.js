import React from 'react'
import DefaultSelect from '../Default'
import dateFormatShort from '@/helpers/dateFormatShort';

const columns = [
  {
    title: 'Batch',
    dataIndex: 'batch_number',
    sorter: true,
    width: 150
  },
  {
    title: 'GR Date',
    dataIndex: 'gr_date',
    render: (text) => { return dateFormatShort(text) },
    sorter: true,
    width: 150
  },
  {
    title: 'Manufacture',
    dataIndex: 'manuf_date',
    render: (text) => { return dateFormatShort(text) },
    sorter: true,
    width: 150,
    // render: (manuf_date)=>{
    //   return dateFormatShort(manuf_date)
    // },
  },
  {
    title: 'Expiry',
    dataIndex: 'sled_date',
    render: (text) => { return dateFormatShort(text) },
    sorter: true,
    width: 200
  },
  {
    title: 'Stock',
    dataIndex: 'qty_unrestricted',
    render: (text)=>{
      return text.toLocaleString(undefined, {maximumFractionDigits:2})
    },
    sorter: true,
    width: 100
  },
]

const config = {
  //api to get select options
  api: null,
  //api to get select options with string
  apiName: null,
  //param api for apiName
  apiParam: null,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'batch_number',
  //field to show description in bottom of dropdown
  dataDescription: 'batch_number',
  //columns to show in table modal
  columns: columns,
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