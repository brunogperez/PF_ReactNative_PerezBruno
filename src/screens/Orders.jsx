import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { backgroundColors } from '../constants/colors'
import OrderItem from '../components/OrderItem'
import LayoutCustom from '../components/LayoutCustom'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../services/shopService'
import TextCustom from '../components/TextCustom'
import ButtonCustom from '../components/ButtonCustom'

const Orders = ({ navigation }) => {

  const { localId } = useSelector((state) => state.authReducer.value)
  const { data: ordersData, isLoading, isSuccess } = useGetOrdersQuery()
  const [ordersFiltered, setOrdersFiltered] = useState()

  useEffect(() => {
    if (isSuccess && ordersData != null) {
      const response = Object.values(ordersData)
      const ordersFiltered = response.filter(item => item.user === localId)
      setOrdersFiltered(ordersFiltered)
    }
  }, [ordersData, isSuccess, localId])

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light

  if (localId == null) return (
    <LayoutCustom style={{ backgroundColor: bgColor, ...styles.container }}>
      <TextCustom>
        Debes iniciar sesión para ver tus compras
      </TextCustom>
      <ButtonCustom style={styles.subLink} onPress={() => navigation.navigate('MyProfile', { screen: 'Login' })}>
        <TextCustom >Sign up</TextCustom>
      </ButtonCustom>
    </LayoutCustom>
  )

  return (
    <LayoutCustom style={{ backgroundColor: bgColor, ...styles.container }}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          data={ordersFiltered}
          keyExtractor={orderItem => orderItem.date}
          style={styles.flatList}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => {
            return (
              <OrderItem
                order={item}
              />
            )
          }}
        />
      )}
    </LayoutCustom>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  subLink: {
    fontSize: 17,
    marginVertical: 20
  },
  flatList: {

    paddingBottom: 200
  }
})