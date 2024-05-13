import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutCustom from '../components/LayoutCustom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import ButtonCustom from '../components/ButtonCustom'
import { clearUser } from '../features/auth/authSlice'
import { clearCart } from '../features/cart/cartSlice'
import TextCustom from '../components/TextCustom'

const Profile = ({ navigation }) => {

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.authReducer.value)

  const { imageCamera, localId } = useSelector(state => state.authReducer.value) //El localId es el uuid que asigna la base de datos al user

  //Llamado a DB mediante RTK Query para obtener la imagen de perfil del usuario
  const { data: imageFromDB } = useGetProfileImageQuery(localId)

  const launchCamera = async () => {
    navigation.navigate('ImageSelector')
  }

  const handleLogin = async () => {
    navigation.navigate('Login')
  }

  const handleSignOut = () => {
    dispatch(clearUser())
    dispatch(clearCart())
    navigation.navigate('Home')
  }

  const imageDefault = '../../assets/images/profileDefault.png'

  return (
    <>
      {user ? (
        <LayoutCustom style={styles.container}>

          <ButtonCustom style={styles.btnLogout} onPress={handleSignOut}>
            <TextCustom>
              Logout
            </TextCustom>
          </ButtonCustom>

          {(imageFromDB || imageCamera) ? (
            <Image
              source={{ uri: imageFromDB?.image || imageCamera }}
              style={styles.image}
              resizeMode='cover'
            />
          ) : (
            <Image
              source={require(imageDefault)}
              style={styles.image}
              resizeMode='cover'
            />
          )}
          <ButtonCustom onPress={launchCamera}>
            <TextCustom>
              {(imageCamera || imageFromDB) ? 'Change picture' : 'Add picture'}
            </TextCustom>
          </ButtonCustom>
        </LayoutCustom>
      ) : (
        <LayoutCustom style={styles.container}>
          <Image
            source={require(imageDefault)}
            style={styles.image}
            resizeMode='cover'
          />
          <ButtonCustom onPress={handleLogin}>
            <TextCustom>
              Go to Login or Register
            </TextCustom>
          </ButtonCustom>
        </LayoutCustom>
      )}
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    gap: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center'
  },
  btnLogout: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})