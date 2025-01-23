import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSignUpMutation } from '../services/authService'
import { signupSchema } from '../validations/authSchema'
import { setUser } from '../features/auth/authSlice'
import ButtonCustom from '../components/ButtonCustom'
import InputForm from '../components/InputForm'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'
import { backgroundColors } from '../constants/colors'
import CustomShapeDivider from '../components/CustomShapeDivider'
import { BlurView } from 'expo-blur'


const SignupScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [errorMail, setErrorMail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken
        })
      )
    }
  }, [result])

  const onSubmit = () => {

    try {
      setErrorMail('')
      setErrorPassword('')
      setErrorConfirmPassword('')
      const validation = signupSchema.validateSync({ email, password, confirmPassword })
      triggerSignUp({ email, password, returnSecureToken: true })
      navigation.navigate('Login')
    } catch (error) {
      switch (error.path) {
        case 'email':
          setErrorMail(error.message)
          break
        case 'password':
          setErrorPassword(error.message)
          break
        case 'confirmPassword':
          setErrorConfirmPassword(error.message)
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
      <BlurView style={styles.container} experimentalBlurMethod='dimezisBlurView'>
        <View style={styles.containerForm}>
          <TextCustom style={styles.title}>SIGN UP</TextCustom>
          <InputForm
            label={'Email'}
            onChange={setEmail}
            error={errorMail}
          />
          <InputForm
            label={'Password'}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />
          <InputForm
            label={'Confirm password'}
            onChange={setconfirmPassword}
            error={errorConfirmPassword}
            isSecure={true}
          />
          <ButtonCustom onPress={onSubmit} >
            <TextCustom style={styles.submitbtn}>
              Submit
            </TextCustom>
          </ButtonCustom>
        </View>
        <View style={styles.containerRedirect}>
          <TextCustom style={styles.sub}>Already have an account?</TextCustom>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.subLink}>Login</Text>
          </Pressable>
        </View>
      </BlurView>
      <CustomShapeDivider style={styles.invertedShape} height={350} />
    </LayoutCustom>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
  container: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    zIndex: 1000,
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

  },
  invertedShape: {
    position: 'absolute',
    transform: [{ rotateX: '180deg', }],
    bottom: 0,
    left: 0,
    right: 0,
  },
})