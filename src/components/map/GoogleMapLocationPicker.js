import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, } from 'google-maps-react';
import { Row, Col, Select } from 'antd'
import * as axios from 'axios'

const { Option } = Select

export class MapContainer extends Component {
  constructor(){
    super()
    this.state = {
      // pos:{ lat: -4.173647, lng: 117.475284 },

      search_data:[],
    }

    this.onMapClick = this.onMapClick.bind(this)
  }

  onMapClick(mapProps, map, e){
    // console.log("on map click", e)
    // console.log(mapProps, map)
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    const pos = {lat,lng}
    if(this.props.onChange){
      this.setState({pos}, 
        ()=>{this.props.onChange({position:pos})}
      )
    }
    
    if(this.props.geoCode){
      this.getGeocode(lat,lng);
    }
  }

  getGeocode(lat,lng){
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`)
      .then(response=>{
      // console.log(response.data)
        const data = response.data
        const result = data.results[0]
        // console.log(result)
        if(result){
          const { address_components, formatted_address } = result

          let route = address_components.find(item => item.types.includes('route'))
          route = route ? route.long_name : ''

          let lv5 = address_components.find(item => item.types.includes('administrative_area_level_5'))
          lv5 = lv5 ? lv5.long_name : ''

          let lv4 = address_components.find(item => item.types.includes('administrative_area_level_4'))
          lv4 = lv4 ? lv4.long_name : ''

          let lv3 = address_components.find(item => item.types.includes('administrative_area_level_3'))
          lv3 = lv3 ? lv3.long_name : ''

          let address = `${route} ${lv5} ${lv4} ${lv3}`

          let city = address_components.find(item => item.types.includes('administrative_area_level_2'))
          city = city ? city.long_name : ''

          let province = address_components.find(item => item.types.includes('administrative_area_level_1'))
          province = province ? province.long_name : ''

          let postal_code = address_components.find(item => item.types.includes('postal_code'))
          postal_code = postal_code ? postal_code.long_name : ''

          let country = address_components.find(item => item.types.includes('country'))
          country = country ? country.long_name : ''

          const valueToReturn = { address, city, province, postal_code, country, full_address:formatted_address }
          // console.log(valueToReturn)
          this.props.geoCode(valueToReturn)
        }else{
          this.props.geoCode(null)
        }
      })
      .catch(error=>{
        console.log(error)
      })
  }

  //handle typing on search input
  handleSearch = (value) => {
    // console.log(value)
    if(value.length < 3){ 
      return false 
    }
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`)
      .then(response=>{
        const data = response.data
        const { results } = data

        const search_data = results.map((item)=>{
          return {
            address: item.formatted_address,
            location: item.geometry.location,
          }
        })

        this.setState({search_data})
      })
  
  }

  handleSelectChange = (value)=>{
    const address = this.state.search_data.find(a => a.address=value)
    
    const pos = address.location
    //send onChange signal
    if(this.props.onChange){
      this.setState({pos}, 
        ()=>{this.props.onChange({position:pos})}
      )
    }

    //get gecoding
    if(this.props.geoCode){
      this.getGeocode(address.location.lat, address.location.lng);
    }

    
  }

  render() {
    const { initialPosition, search } = this.props
    
    let mapConfig = {
      google:this.props.google,
      mapTypeControl:false,
      streetViewControl:false,
      zoom:5,
      style: { width:'100%', height: '100%' },
      initialCenter: initialPosition!=null ? initialPosition : { lat: -4.173647, lng: 117.475284  },
    }

    return (
      <div style={this.props.style}>
        {
          search ? 
            <Row>
              <Col>
                <Select
                  showSearch
                  placeholder="Search address..."
                  style={{width:'100%', marginBottom:10}}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.handleSearch}
                  onChange={this.handleSelectChange}
                  notFoundContent={null}
                >
                  {this.state.search_data.map((item,i) => <Option key={i} value={item.address}>{item.address}</Option>)}
                </Select>
              </Col>
            </Row> 
            : null
        }
            

        <Map {...mapConfig}
          onReady={this.onMapReady}
          onClick={this.onMapClick}>

          <Marker name={'Location'}
            position={this.state.pos}/>

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
})(MapContainer);