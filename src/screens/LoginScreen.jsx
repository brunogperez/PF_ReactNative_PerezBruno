import { Platform, Pressable, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { signInSchema } from '../validations/authSchema'
import { useSignInMutation } from '../services/authService'
import { setUser } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCartbyIdQuery } from '../services/shopService'
import { insertSession } from '../persistence'
import LayoutCustom from '../components/LayoutCustom'
import InputForm from '../components/InputForm'
import ButtonCustom from '../components/ButtonCustom'
import TextCustom from '../components/TextCustom'

import { backgroundColors } from '../constants/colors'
import CustomShapeDivider from '../components/CustomShapeDivider'
import { BlurView } from 'expo-blur'

const LoginScreen = ({ navigation }) => {

  //Instanciamos el dispatch
  const dispatch = useDispatch()

  //Instanciamos la función para disparar el login del user
  const [triggerSignIn, result] = useSignInMutation()

  //Estados para manejar los datos ingresados por el user
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Estados para manejar los errores al ingresar datos en los inputs
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const { localId } = useSelector((state) => state.authReducer.value)

  //Hook para traer el cart desde la DB 
  const { data: cartFromDB, isLoading: isLoadingCart, isSuccess } = useGetCartbyIdQuery(localId)

  //Función effect para despachar los datos a redux si el resultado es success
  useEffect(() => {
    if (result?.data && result.isSuccess) {
      //Funcion IIFE para gatillar la persistencia si la plataforma no es WEB
      (async () => {
        try {
          if (Platform.OS != 'web') {
            const resInsertSession = await insertSession({
              email: result.data.email,
              localId: result.data.localId,
              token: result.data.idToken,
            })
          }
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          )
        } catch (error) {
        }
      })()
    }
  }, [result])

  //useEffect para setear el cart desde la DB
  useEffect(() => {
    if (localId && isSuccess) {
      //dispatch(onCart(cartFromDB))
      navigation.push('MyProfile')
      navigation.navigate('Home')
    }
  }, [localId, isSuccess, isLoadingCart])

  //Función para manejar el submit del form
  const onSubmit = () => {
    try {
      setErrorEmail('')
      setErrorPassword('')
      //Validación de datos por medio de la librería YUP
      const validation = signInSchema.validateSync({ email, password })
      //Función para enviar los datos a firebase auth
      triggerSignIn({ email, password })
    } catch (error) {
      switch (error.path) {
        case 'email':
          setErrorEmail(error.message)
          break
        case 'password':
          setErrorPassword(error.message)
          break
        default:
          break
      }
    }
  }

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light

  return (
    <LayoutCustom style={{ backgroundColor: bgColor, ...styles.main }}>
      <CustomShapeDivider style={styles.shape} height={350} />
      <BlurView style={styles.container} intensity={100} tint={isDark ? 'dark' : 'light'} > 
        <View style={styles.containerForm}>
          <TextCustom style={styles.title}>LOGIN</TextCustom>
          <InputForm
            label={'Email'}
            onChange={setEmail}
            error={errorEmail}
          />
          <InputForm
            label={'Password'}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />
          <ButtonCustom onPress={onSubmit} >
            <TextCustom style={styles.submitbtn}>
              Submit
            </TextCustom>
          </ButtonCustom>
        </View>
        <View style={styles.containerRedirect}>
          <TextCustom style={styles.sub}>Not have an account?</TextCustom>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <TextCustom style={styles.subLink}>Sign up</TextCustom>
          </Pressable>
        </View>
      </BlurView>
      <CustomShapeDivider style={styles.invertedShape} height={380} />
    </LayoutCustom>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    zIndex: 2, 
    overflow: 'hidden'
  },
  containerForm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 15
  },
  containerRedirect: {
    gap: 4,
    alignItems: 'flex-end',
    marginHorizontal: 25
  },
  title: {
    fontSize: 22,
  },
  sub: {
    fontSize: 14,
  },
  subLink: {
    fontSize: 17,
    color: 'black',
    textDecorationLine: 'underline'
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex:1
  },
  invertedShape: {
    position: 'absolute',
    transform: [{ rotateX: '180deg', }],
    bottom: 0,
    left: 0,
    right: 0,
  },
})