/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import DocumentPicker from "react-native-document-picker"

import { observer } from "mobx-react-lite"
import { GradientBackground, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import TrackPlayer from "react-native-track-player"
import { useStores } from "../../models"
import C1Image from '../player/placeholder.png';

const FULL: ViewStyle = { flex: 1 }

export const FilesScreen: FC<StackScreenProps<NavigatorParamList, "files">> = observer(
  ({ navigation }) => {

    const [audioList, setAudioList] = useState([])

    const pickFiles = async () => {
      try {
        const res = await DocumentPicker.pick({
          mode: 'open',
          type: [DocumentPicker.types.audio],
        })
        const newTrack = {
          id: audioList.length.toString() + 1,
          url: res[0].uri,
          title: res[0].name.replace('.mp3', ''),
          artwork: C1Image,
          artist: "",
          duration: 900
        }



        setAudioList([...audioList, newTrack])
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err
        }
      }

    }


    const { playerStore } = useStores()

    const prepareToPlayer = () => {
      playerStore.setSluts(false)
      TrackPlayer.reset()
      TrackPlayer.add(audioList)
      playerStore.setPlayList(audioList)
      navigation.navigate("player")
    }


    const sendToPlayer = () => {
      prepareToPlayer()
      playerStore.setCurrentTrack(audioList[0])
      TrackPlayer.play()

    }

    const addToPlayQueue = (index) => {      
      prepareToPlayer()
      playerStore.setCurrentTrack(audioList[index])
      TrackPlayer.skip(index)
      TrackPlayer.play()
    }

    const renderAudio = ({ item , index} ) => {

      console.log(index);
      
      return (
        <View key={item.uri}>
          <TouchableOpacity onPress={() => addToPlayQueue(index)} style={{ marginVertical: 16 }}>
            <Text>
              {item.title}
            </Text>
          </TouchableOpacity>

        </View>
      )
    }

    // function sendToPlayer() {
    // }

    return (
      <View testID="FilesScreen" style={FULL}>
        <GradientBackground colors={["#0467CD", "#04182E"]} />
        <FlatList style={{ marginTop: 80, marginHorizontal: 32 }} data={audioList} renderItem={renderAudio} />
        <TouchableOpacity style={{
          backgroundColor: "#F9027E",
          marginBottom: 22,
          paddingHorizontal: 16,
          paddingVertical: 12,
          width: "80%",
          marginHorizontal: "10%",
          padding: 16,
          borderRadius: 32,
        }} onPress={pickFiles}>
          <Text style={{
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
          }}>
            Добавить аудио
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
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
