import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants/colors'
import InputForm from '../components/InputForm'
import { useSignInMutation } from '../services/authService'
import { setUser } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import ButtonCustom from '../components/ButtonCustom'

const LoginScreen = ({ navigation }) => {

  const { user } = useSelector(state => state.authReducer.value)

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

  //Función effect para despachar los datos a redux si el resultado es success
  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      )
      navigation.navigate('Home')
    }
  }, [result])

  useEffect(() => {
    if (user) 
      navigation.navigate('Home')
  }, [])

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
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>LOGIN</Text>
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
            <Text style={styles.submitbtn}>
              Submit
            </Text>
          </ButtonCustom>
        </View>
        <View style={styles.containerRedirect}>
          <Text style={styles.sub}>Not have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.subLink}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MintGreen,
  },
  container: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.Turquoise,
    gap: 15,
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
    color: 'black',
  },
  submitbtn: {
    fontSize: 14,
    color: colors.textLight,
  },
  subLink: {
    fontSize: 17,
    color: 'blue',
    textDecorationLine: 'underline'
  },
})