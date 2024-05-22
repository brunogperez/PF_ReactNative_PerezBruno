import { Image, StyleSheet } from 'react-native'
import React from 'react'
import LayoutCustom from '../components/LayoutCustom'
import { googleMapsApiKey } from '../database/googleMaps'

const MapPreview = ({ location }) => {

    //const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${googleMapsApiKey}` 

  //API URL DE GEOAPIFY
 const mapPreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=400&height=400&center=lonlat%3A${location.longitude}%2C${location.latitude}&zoom=16&marker=lonlat%3A${location.longitude}%2C${location.latitude}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw&apiKey=${googleMapsApiKey}`

  return (
    <LayoutCustom style={styles.mapPreview}>
      <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
    </LayoutCustom>
  )
}

export default MapPreview
const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: 300,
    height: 300,
  },
})