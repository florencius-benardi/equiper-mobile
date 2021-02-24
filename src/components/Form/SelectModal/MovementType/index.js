import React from 'react';
import { Icon } from 'antd';
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width:80,
    className: 'col-number'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width:370,
  },
  {
    title: 'Debit/Credit',
    dataIndex: 'dc_ind',
    render: (dc_ind) => {
      if (dc_ind === "d") { 
        return <span>Debit</span>
      }else{
        return <span>Credit</span> 
      }
    },
    sorter: true,
    width:150
  },
  {
    title: 'Reversal Movement',
    dataIndex: 'rev_code',
    render:(rev_code) => {
      if(rev_code){ return rev_code.code }
    },
    sorter: true,
    className: 'col-number',
    width:150
  },
  {
    title: 'Batch Creation',
    dataIndex: 'batch_ind',
    render: (batch_ind) => {
      if (batch_ind == true) { 
        return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: '20px'}}/>
      }else{
        return <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" style={{ fontSize: '20px'}}/>
      }
    },
    sorter: true,
    className: 'col-center',
    width: 150
  },
  {
    title: 'Reason Indicator',
    dataIndex: 'reason_ind',
    render: (reason_ind) => {
      if (reason_ind == true) { 
        return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
      }else{
        return <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" />
      }
    },
    sorter: true,
    className: 'col-center'
  },
]

const config = {
  //api to get select options
  api: api.getMovementTypeSpesific,
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
  //table width
  scrollX: 1200,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}