import React, { useState } from 'react'
import { Image, View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setCameraImage } from '../features/auth/authSlice'
import { colors } from '../constants/colors'
import { usePostProfileImageMutation } from '../services/shopService'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import ButtonCustom from '../components/ButtonCustom'
import GoBackCustom from '../components/GoBackCustom'
import TextCustom from '../components/TextCustom'
import LayoutCustom from '../components/LayoutCustom'


const ImageSelector = ({ navigation }) => {

  const { localId } = useSelector(state => state.authReducer.value)

  const [image, setImage] = useState(null)

  const [imageFromCamera, setImageFromCamera] = useState(false)
  const [imageURI, setImageURI] = useState('')

  const [triggerPostImage, result] = usePostProfileImageMutation()

  const dispatch = useDispatch()

  //Función para consultar si se se le otorgan permisos a la cámara para realizar fotos
  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    return granted
  }

  //Función para consultar si se otorgan permisos para abrir la galeria
  const verifyGalleryPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    return granted
  }

  //Función para inicializar la cámara y realizar la captura de la foto
  const pickImage = async () => {
    try {

      setImageFromCamera(true)

      const permission = await verifyCameraPermissions()

      //Si se conceden los permisos se inicializa la cámara
      if (permission) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2
        })

        //Si no se cancela la toma de foto se setea la imagen capturada
        if (!result.canceled) {
          setImageURI(result.assets[0].uri)
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`
          setImage(image)
        }
      }
    } catch (error) {
      
    }
  }

  //Función para abrir la galeria y realizar la selección de la foto
  const chooseGalleyImage = async () => {
    try {

      setImageFromCamera(false)

      const permissionGallery = await verifyGalleryPermissions()

      if (permissionGallery) {
        const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2
        })
        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`
          setImage(image)
        }
      }
    } catch (error) {
      
    }
  }

  const confirmImage = async () => {
    try {

      dispatch(setCameraImage(image))
      triggerPostImage({ image, localId })
      if (imageFromCamera) {
        const result = await MediaLibrary.createAssetAsync(imageURI)
      }
      navigation.goBack()

    } catch (error) {
      
    }

  }

  return (
    <LayoutCustom style={styles.container}>
      {image ? (
        <>
          <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack} ></GoBackCustom>
          <Image source={{ uri: image }} style={styles.image} />
          <ButtonCustom onPress={pickImage}>
            <TextCustom>
              Take another photo
            </TextCustom>
          </ButtonCustom>
          <ButtonCustom onPress={confirmImage}>
            <TextCustom>
              Confirm
            </TextCustom>
          </ButtonCustom>
        </>
      ) : (
        <>
          <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack} ></GoBackCustom>
          <View style={styles.noPhotoContainer}>
            <TextCustom>No photo</TextCustom>
          </View>
          <ButtonCustom onPress={pickImage}>
            <TextCustom>
              Take a photo
            </TextCustom>
          </ButtonCustom>
          <ButtonCustom onPress={chooseGalleyImage}>
            <TextCustom>
              Choose a photo from gallery
            </TextCustom>
          </ButtonCustom>
        </>
      )}
    </LayoutCustom>
  )
}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 60,
  },
  image: {
    width: 200,
    height: 200,
  },
  noPhotoContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: colors.platinum,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    position: 'absolute',
    alignItems: 'center',
    left: '5%',
    top: '2%',
    zIndex: 1
  },
})