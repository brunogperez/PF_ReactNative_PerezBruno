import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import ButtonCustom from '../components/ButtonCustom'

const Profile = ({ navigation }) => {

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

  const imageDefault = '../../assets/images/profileDefault.png'

  return (
    <>
      {user ? (
        <View style={styles.container}>

          <ButtonCustom style={styles.btnLogout}>
            <Text>
              Logout
            </Text>
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
            {imageCamera || imageFromDB ? (
              <Text>
                Change picture
              </Text>
            ) : (
              <Text>
                Add picture
              </Text>
            )}
          </ButtonCustom>

        </View>
      ) : (
        <View style={styles.container}>
          <Image
            source={require(imageDefault)}
            style={styles.image}
            resizeMode='cover'
          />
          <ButtonCustom onPress={handleLogin}>
            <Text>
              Go to Login or Register
            </Text>
          </ButtonCustom>
        </View>
      )}
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {

    paddingTop: 50,
    gap: 15,
    alignItems:'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center'
  },
  btnLogout: {
    position:'absolute',
    top:10,
    right:10
  }
})