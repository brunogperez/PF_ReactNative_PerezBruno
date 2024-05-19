import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutCustom from '../components/LayoutCustom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import ButtonCustom from '../components/ButtonCustom'
import { clearUser } from '../features/auth/authSlice'
import { clearCart } from '../features/cart/cartSlice'
import TextCustom from '../components/TextCustom'
import { Octicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'


const Profile = ({ navigation }) => {

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.authReducer.value)

  const { imageCamera, localId } = useSelector(state => state.authReducer.value) //El localId es el uuid que asigna la base de datos al user

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const colorIcon = isDark ? colors.White : colors.Black

  //Llamado a DB mediante RTK Query para obtener la imagen de perfil del usuario
  const { data: imageFromDB } = useGetProfileImageQuery(localId)

  const launchCamera = async () => {
    navigation.navigate('ImageSelector')
  }
  
  const launchLocation = async () => {
    navigation.navigate('ListAddress')
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
            <Octicons name="sign-out" size={20} color={colorIcon} />
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
          <ButtonCustom onPress={launchCamera} style={styles.btnPicture}>
            {
              (imageCamera || imageFromDB) ?
                <Octicons name="pencil" size={20} color={colorIcon} />
                :
                <Octicons name="plus" size={18} color={colorIcon} />
            }
          </ButtonCustom>
          <ButtonCustom onPress={launchLocation}>
            <TextCustom>
              My Address
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
    flex: 1
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center'
  },
  btnLogout: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  btnPicture: {
    top: -50,
    alignItems: 'center'
  }
})