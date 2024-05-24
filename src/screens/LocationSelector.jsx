import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { useSelector } from 'react-redux'
import MapPreview from '../components/MapPreview'
import ButtonCustom from '../components/ButtonCustom'
import { googleMapsApiKey } from '../database/googleMaps'
import { usePostLocationMutation } from '../services/shopService'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'
import GoBackCustom from '../components/GoBackCustom'

const LocationSelector = ({ navigation }) => {

  const [location, setLocation] = useState({ latitude: '', longitude: '' })
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [triggerPostLocation, result] = usePostLocationMutation()
  const { localId } = useSelector(state => state.authReducer.value)

  const [isLoading, setIsLoading] = useState(false)

  const onConfirmAddress = () => {

    const date = new Date()

    triggerPostLocation({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: address,
        //updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      },
      localId: localId
    })
    navigation.navigate('MyProfile')
  }

  useEffect(() => {
    //Función IIFE (Immediately Invoked Function Expression) - Se utiliza ya que dentro de un useEffect no se puede utilizar un async-await
    //Significa función autoinvocada
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status === 'granted') {

          let location = await Location.getCurrentPositionAsync({})

          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          })
        }
      } catch (error) {
      }
    })()
  }, [])



  //Reverse geocoding
  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {

          //const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
          const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${googleMapsApiKey}`

          const response = await fetch(url)
            .then(response => response.json())
            .then(result => {
              if (result.features.length) {
                setAddress(result.features[0].properties.formatted)
                setIsLoading(true)
              } else {
                console.log('No address found')
              }
            })
        }
      } catch (error) {
        setError(error.message)
      }
    })();
  }, [location])


  return (
    <LayoutCustom style={styles.container}>
      
      <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack} ></GoBackCustom>

      {(location && isLoading) ? (
        <>
          <MapPreview location={location} />
          <TextCustom style={styles.address}>
            {address}
          </TextCustom>

        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
            <ActivityIndicator size='large' />
          </View>
        </>
      )}
      <ButtonCustom onPress={onConfirmAddress}>
        <TextCustom >
          Confirm
        </TextCustom>
      </ButtonCustom>
    </LayoutCustom>
  )

}

export default LocationSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 20,
    fontSize: 18,
  },
  noLocationContainer: {
    width: 350,
    height: 350,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    padding: 10,
    fontSize: 16,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'center',
    left: '5%',
    top: '2%',
    zIndex: 1
  },
})