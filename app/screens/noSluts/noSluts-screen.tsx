/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { ImageBackground, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen, Text } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { playlist } from "./tracks"
import AntDesign from "react-native-vector-icons/AntDesign"
import C1Image from './chaptesrImg/_wbg.png';
import TrackPlayer from "react-native-track-player"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }
const SCREEN: ViewStyle = { paddingBottom: 120, paddingHorizontal: 32 }

const secondsToHHMMSS = (seconds: number | string) => {
  seconds = Number(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor((seconds % 3600) % 60)

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : ""
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:"
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : "00"
  return `${hrs}${mins}${scnds}`
}

export const NoSlutsScreen: FC<StackScreenProps<NavigatorParamList, "noSluts">> = observer(
  ({ navigation }) => {
    const { playerStore } = useStores()


    const prepareToPlayer = () => {
      playerStore.setSluts(true)
      TrackPlayer.reset()
      TrackPlayer.add(playlist)
      playerStore.setPlayList(playlist)
      navigation.navigate("player")
      TrackPlayer.play()

    }

    const sendToPlayer = async () => {
      prepareToPlayer()
      playerStore.setCurrentTrack(playlist[0])

    }

    const addToPlayQueue = async (item, index) => {
      prepareToPlayer()
      playerStore.setCurrentTrack(playlist[index])

      TrackPlayer.skip(index)
      TrackPlayer.play()
    }

    const renderPlayListItem = (item, index) => {      
      return <TouchableOpacity onPress={() => addToPlayQueue(item, index)} style={{flexDirection: 'row', justifyContent: "space-between"}} key={item.artist}>
        <ImageBackground source={C1Image} style={{paddingTop: 6, paddingLeft: 6, width: 40, height: 40, borderRadius: 22}}>
          <AntDesign
            name={playerStore.playingId === item.id ? 'pause' : 'caretright'}
            size={28}
            color={"#F9027E"}
          />
        </ImageBackground>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginBottom: 26, }}>
          <View>
            <Text style={{fontSize: 14, marginBottom: 6}}>
            Глава {index + 1}
          </Text>
            <Text style={{fontSize: 16, lineHeight: 22, fontWeight: 'bold', width: 200}}>
            {item.artist}
          </Text>
          </View>
          <Text>
            {secondsToHHMMSS(item.duration)}
          </Text>
        </View>

      </TouchableOpacity>

    }
    return (
      <View testID="PlayerScreen" style={FULL}>
        <GradientBackground colors={["#0467CD", "#04182E"]} />
        <Screen style={SCREEN} preset="scroll" backgroundColor={color.transparent}>
          {
            playlist.map((item, index) => renderPlayListItem(item, index))
          }
        </Screen>

        <TouchableOpacity style={{
          bottom: -40,
          position: 'absolute',
          backgroundColor: "#F9027E",
          marginBottom: 142,
          paddingHorizontal: 16,
          paddingVertical: 12,
          width: "80%",
          marginHorizontal: "10%",
          padding: 16,
          borderRadius: 32,

        }} onPress={sendToPlayer}>
          <Text style={{
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
          }}>
            Воспроизвести плейлист
          </Text>
        </TouchableOpacity>
      </View>
    )
  },
)
