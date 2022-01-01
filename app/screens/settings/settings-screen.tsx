import React, { FC, useEffect, useState } from "react"
import {
  Keyboard,
  KeyboardAvoidingView, Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { AutoImage as Image, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { LinearGradient } from "expo-linear-gradient"
import { useStores } from "../../models"
import TrackPlayer from "react-native-track-player"



const FULL: ViewStyle = { flex: 1 }


const styles = StyleSheet.create({
  basicText: { color: "#fff", fontSize: 18, lineHeight: 32, marginBottom: 24, marginLeft: 16 },
  bottomLinear: { flex: 1, justifyContent: "space-between", paddingBottom: 120, paddingTop: 100 },
  buttonStyle: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 42,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonTextStyle: { color: "#fff", fontSize: 16, textAlign: "center" },
  codeInput: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 36,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 24 },
  iconsStyle: { height: 130, position: "absolute", top: 30, width: "100%" },
  topLinear: { height: 100 },
  withIcon: { flexDirection: "row", alignItems: "flex-start" },
  actionImg: { width: 42, height: 42, marginTop: -4 },
  inner: {flex: 1}

})

export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "noSluts">> = observer(
({ navigation, store }) => {

  const [isRelease, setRelease] = useState(false)
  const [countClick, setCountClick] = useState(0)
  const { playerStore } = useStores()
useEffect(()=>{
  if(countClick > 4) {
    setRelease(true)
  }
},[countClick])
  const click = () => {
    setCountClick(countClick+1)
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     await characterStore.getCharacters()
  //   }
  //
  //   fetchData()
  // }, [])

    const [codeValue, setCodeValue] = useState(null)

    const onChangeNumber = (code) => {
      setCodeValue(code)
    }

    const handleSubmit = () => {
      playerStore.setAvailableBook(!playerStore.isAvailableBook)
      // playerStore.setAvailableBook(123)
    }
    const isDisabled = codeValue?.length < 6

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        testID="SettingsScreen" style={FULL}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
          <LinearGradient style={styles.topLinear} colors={["#660636", "#30051A"]} />
          <LinearGradient
            style={styles.bottomLinear}
            colors={["#0467CD", "#004fa6", "rgb(1,19,42)"]}
          >
            <Image source={require("./lines.png")} resizeMode={"cover"}
                   style={{ position: "absolute", width: "100%", height: "100%" }} />
            <View style={{ paddingHorizontal: 32 }}>
              <Text style={styles.headerText}>Настройки профиля</Text>
              <TouchableOpacity onPress={() => {
                click()
                    playerStore.setCurrentTrack(
                      {})
                    TrackPlayer.reset()
              } }>
                <View style={styles.withIcon}>
                  <Image
                    resizeMode="contain"
                    style={styles.actionImg}
                    source={require("./recycle_ic.png")} />
                  <Text style={styles.basicText}>Очистить плейлист</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <View style={styles.withIcon}>
                  <Image
                    resizeMode="contain"
                    style={styles.actionImg}
                    source={require("./logout_ic.png")} />
                  <Text style={styles.basicText}>Смена пользователя</Text>
                </View>
              </TouchableOpacity> */}
            </View>
            
            {isRelease && <View style={{ paddingHorizontal: 32 }}>
              <Text style={styles.headerText}>Промокод</Text>
              <TextInput
                style={styles.codeInput}
                onChangeText={onChangeNumber}
                value={codeValue}
                placeholder="Введите промокод"
                keyboardType="numeric"
              />
              <TouchableOpacity disabled={isDisabled}
                                style={[styles.buttonStyle, isDisabled ? { backgroundColor: "#c2c2c2" } : { backgroundColor: "#F9027E" }]}
                                onPress={handleSubmit}>
                <Text style={styles.buttonTextStyle}>Применить</Text>
              </TouchableOpacity>

            </View>}

          </LinearGradient>
          <Image
            resizeMode="contain"
            style={styles.iconsStyle}
            source={require("./iconsG.png")} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )


  },
)
