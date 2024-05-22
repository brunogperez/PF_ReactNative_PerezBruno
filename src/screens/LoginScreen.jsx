import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants/colors'
import InputForm from '../components/InputForm'
import ButtonCustom from '../components/ButtonCustom'
import TextCustom from '../components/TextCustom'
import { useSignInMutation } from '../services/authService'
import { setUser } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { onCart } from '../features/cart/cartSlice'
import { useGetCartbyIdQuery } from '../services/shopService'
import LayoutCustom from '../components/LayoutCustom'
import Card from '../components/Card'
import { insertSession } from '../persistence'

const LoginScreen = ({ navigation }) => {

  //Instanciamos el dispatch
  const dispatch = useDispatch()

  //Instanciamos la función para disparar el login del user
  const [triggerSignIn, result] = useSignInMutation()

  //Estados para manejar los datos ingresados por el user
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  //Estados para manejar los errores al ingresar datos en los inputs
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const { localId } = useSelector((state) => state.authReducer.value)

  //Hook para traer el cart desde la DB 
  const { data: cartFromDB, isLoading: isLoadingCart, isSuccess } = useGetCartbyIdQuery(localId)

  //Función effect para despachar los datos a redux si el resultado es success
  useEffect(() => {
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
        .then((response) => {
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          )
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [result])

  //useEffect para setear el cart desde la DB
  useEffect(() => {
    if (localId && isSuccess) {
      dispatch(onCart(cartFromDB))
      navigation.push('MyProfile')
      navigation.navigate('Home')
    }
  }, [localId, isSuccess])


  //Función para manejar el submit del form
  const onSubmit = () => {

    triggerSignIn({ email, password })

    /* try {

      setErrorEmail('')
      setErrorPassword('')

      //Validación de datos por medio de la librería YUP
      const validation = signupSchema.validateSync({ email, password })

      //Función para enviar los datos a firebase auth
      triggerSignIn({ email, password })

    } catch (error) {

      switch (error.path) {
        case 'email':
          setErrorEmail(error.message)
          break
        case 'password':
          setErrorPassword(error.message)

        default:
          break
      }
    } */
  }

  return (
    <LayoutCustom style={styles.main}>
      <Card style={styles.container}>
        <View style={styles.containerForm}>
          <TextCustom style={styles.title}>
            LOGIN
          </TextCustom>
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
      </Card>
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
    backgroundColor: colors.WaterGreen,
    paddingVertical: 20,
    borderRadius: 20,
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
  submitbtn: {
    fontSize: 14,
  },
  subLink: {
    fontSize: 17,
    color: 'blue',
    textDecorationLine: 'underline'
  },
})