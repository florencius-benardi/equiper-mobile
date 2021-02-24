import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Material',
    dataIndex: 'code',
    sorter: true,
    width:150,
    fieldName:'material',
    fixed:'left',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width:250,
  },
  {
    title: 'Material Type',
    dataIndex: 'material_type',
    // sorter: true,
    width:250,
    render: (material_type) => {
      if (material_type) { 
        return <span>{material_type.code} - {material_type.description}</span>
      }else{
        return "-"
      }
    },
  },
  {
    title: 'Material Group',
    dataIndex: 'group_material',
    // sorter: true,
    width:250,
    render: (group_material) => {
      if (group_material) { 
        return <span>{group_material.material_group} - {group_material.description}</span>
      }else{
        return "-"
      }
    },
  },
  {
    title: 'SKU',
    dataIndex: 'sku_code',
    sorter: true,
    width:150,
  },
  {
    title: 'Old Material',
    dataIndex: 'old_mat',
    // sorter: true,
    width:250,
    render: (old_mat) => {
      if (old_mat) { 
        return <span>{old_mat.code} - {old_mat.description}</span>
      }else{
        return "-"
      }
    },
  },
  {
    title: 'Base Material',
    dataIndex: 'base_mat',
    // sorter: true,
    width:250,
    render: (base_mat) => {
      if (base_mat) { 
        return <span>{base_mat.code} - {base_mat.description}</span>
      }else{
        return "-"
      }
    },
  },
  {
    title: 'Classification',
    dataIndex: 'classification',
    // sorter: true,
    render: (classification) => {
      // if(!display_classification){
      //   return null
      // } to hide parameter sekarang belum ada
      if (classification) { 
        return <span>{classification.name}</span>
      }else{
        return "-"
      }
    },
  },
]

const config = {
  //api to get select options
  api: api.getMaterialHaveMaterialPlant,
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

  scrollX: 1700,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}