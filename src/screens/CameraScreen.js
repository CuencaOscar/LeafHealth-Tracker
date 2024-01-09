import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ref, getStorage, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button } from "../components/Button";
//   import * as firebase from 'firebase/app';
//   import { firebaseConfig } from '../../firebase-config';
import uuid from "react-native-uuid";
import { env } from "../env/env";
import { db, db_storage } from "../firebaseConfig";

const CameraScreen = () => {
//   firebase.initializeApp(firebaseConfig)

//   const firestore = getFirestore();

//   const storage = getStorage();
  const storageRef = ref(db_storage, uuid.v4());

  const cameraRef = useRef(null);

  const navigation = useNavigation();

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrainning, setIsTrainning] = useState(false);
  const [uri, setUri] = useState();
  const [visible, setVisible] = useState(true);
  const [visiblePicture, setVisiblePicture] = useState(true);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationData({
        latitude: Object.values(location.coords)[3],
        longitude: Object.values(location.coords)[5],
      });
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      setIsLoading(!isLoading);
      setVisible(!visible);
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        setIsLoading(!isLoading);
        setUri(data.uri);
      } catch (e) {}
    }
  };

  const uploadImage = (uri) => {
    setIsTrainning(true);
    setVisiblePicture(!visiblePicture);
    const hoy = new Date();
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
      .then((resolve) => {
        console.log('entro por aqui')
        uploadBytes(storageRef, resolve).then((snapshot) => {
          const path =
            env.firebase_env + snapshot.metadata.fullPath + "?alt=media";
          let formData = new FormData();
          formData.append("imagen", path);
          let xhr = new XMLHttpRequest();
          xhr.open("POST", env.ngrok);
          xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              const resultado = eval(this.responseText);
              addDoc(collection(db, "historical"), {
                image_path: path,
                type_one: resultado[0][0] + ":",
                type_two: resultado[1][0] + ":",
                type_three: resultado[2][0] + ":",
                prediction_one: resultado[0][1].toFixed(2) + "%",
                prediction_two: resultado[1][1].toFixed(2) + "%",
                prediction_three: resultado[2][1].toFixed(2) + "%",
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                createdAt: hoy.getTime(),
              });
              setIsTrainning(false);
              navigation.navigate("List");
            } else {
                console.log('Al final no envio nada')
            }
          };
          xhr.send(formData);
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        {!image ? (
          <Camera style={styles.camera} ref={cameraRef} zoom={0}>
            {isLoading && (
              <View style={styles.container_message_style}>
                <Text style={styles.message_style}>Capturando</Text>
              </View>
            )}
          </Camera>
        ) : (
          <Image style={styles.camera} source={{ uri: image }} />
        )}
        <View>
          {image ? (
            <>
              <View style={styles.navbar_Picture}>
                <Button
                  title={"Tomar de nuevo"}
                  icon="retweet"
                  color={"green"}
                  disabled={!visiblePicture}
                  onPress={() => {
                    setImage(null);
                    setIsLoading(!isLoading);
                    setVisible(true);
                  }}
                />
                <Button
                  title={"Guardar"}
                  icon="check"
                  color={"green"}
                  disabled={!visiblePicture}
                  onPress={() => {
                    uploadImage(uri);
                  }}
                />
              </View>
              {isTrainning && (
                <View
                  style={[
                    styles.container_message_style,
                    styles.loading_indicator,
                  ]}
                >
                  <ActivityIndicator size="large" color="#7bc4db" />
                </View>
              )}
            </>
          ) : (
            <View style={styles.navbar_Picture}>
              <Button
                title={"Principal"}
                icon="home"
                color={"green"}
                disabled={!visible}
                onPress={() => navigation.navigate("Home")}
              />
              <Button
                title={"Tomar Fotografía"}
                icon="camera"
                color={"green"}
                disabled={!visible}
                onPress={takePicture}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  container_message_style: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message_style: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  navbar_Picture: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "flex-end",
    backgroundColor: "rgba(204, 236, 92, 1)",
  },
  loading_indicator: {
    bottom: "300%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default CameraScreen;
