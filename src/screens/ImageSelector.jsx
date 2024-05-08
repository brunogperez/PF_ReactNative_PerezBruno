import React, { useState } from "react";
import { Image, View, StyleSheet, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/auth/authSlice"
import { colors } from "../constants/colors";
import { usePostProfileImageMutation } from "../services/shopService";
import ButtonCustom from "../components/ButtonCustom";
import { MaterialIcons } from '@expo/vector-icons'
import GoBackCustom from "../components/GoBackCustom";
// import { usePostProfileImageMutation } from "../Services/shopServices";
// import { saveImage } from "../Features/User/userSlice";

const ImageSelector = ({ navigation }) => {

  const [image, setImage] = useState(null)

  const [triggerPostImage, result] = usePostProfileImageMutation()

  const { localId } = useSelector(state => state.authReducer.value)

  

  const dispatch = useDispatch()

  //Función para consultar si se se le otorgan permisos a la cámara para realizar fotos
  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    return granted
  }

  //Función para inicializar la cámara y realizar la captura de la foto
  const pickImage = async () => {

    try {

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
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`
          setImage(image)
        }
      }

    } catch (error) {
      console.log(error)
    }

  }

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image))
      triggerPostImage({ image, localId })
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack} ></GoBackCustom>
          <Image source={{ uri: image }} style={styles.image} />
          <ButtonCustom onPress={pickImage}>
            <Text>
              Take another photo
            </Text>
          </ButtonCustom>
          <ButtonCustom onPress={confirmImage}>
            <Text>
              Confirm
            </Text>
          </ButtonCustom>
        </>
      ) : (
        <>
          <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack} ></GoBackCustom>
          <View style={styles.noPhotoContainer}>
            <Text>No photo</Text>
          </View>
          <ButtonCustom onPress={pickImage}>
            <Text>
              Take a photo
            </Text>
          </ButtonCustom>
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
    justifyContent: "center",
    alignItems: "center",
  },
  goBack: {
    position: 'absolute',
    alignItems: 'center',
    left: '5%',
    top: '2%',
    zIndex: 1
  },
})