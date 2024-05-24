import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'
import ButtonCustom from '../components/ButtonCustom'
import { useSelector } from 'react-redux'
import { useGetLocationQuery } from '../services/shopService'
import AddressItem from '../components/AddressItem'

const ListAddress = ({ navigation }) => {

  const { localId } = useSelector((state) => state.authReducer.value)

  const { data: location, isLoading, error } = useGetLocationQuery(localId)

  return (
    <>
      {!isLoading ? (
        <LayoutCustom style={styles.container}>
          {location ? (
            <AddressItem
              location={location}
              navigation={navigation}
            />
          ) : (
            <>
              <TextCustom>
                No Location set
              </TextCustom>
              <ButtonCustom onPress={() => navigation.navigate('LocationSelector')}>
                <TextCustom >
                  Add new address
                </TextCustom>
              </ButtonCustom>
            </>
          )}
        </LayoutCustom >
      ) : (
        <LayoutCustom style={styles.containerActivityIndicator}>
          <ActivityIndicator size="large" />
        </LayoutCustom>
      )
      }
    </>
  )
}

export default ListAddress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  containerActivityIndicator:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  }
})