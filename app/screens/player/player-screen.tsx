import React, { FC, useEffect, useRef, useState } from "react"
import { Dimensions, Image, ImageBackground, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import Gestures from "react-native-easy-gestures"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import TrackPlayer, { Capability, usePlaybackState, useProgress } from "react-native-track-player"
import Modal from "react-native-modal"

import Svg, { Defs, Ellipse, LinearGradient as SVGLinearGradient, Stop } from "react-native-svg"
import styles from "./styles"
import { useStores } from "../../models"
import { ProgressBar } from "./components/ProgressBar"

const FULL: ViewStyle = { flex: 1}

export const PlayerScreen: FC<StackScreenProps<NavigatorParamList, "player">> = observer(
  ({ navigation, route: { params } }) => {
    const playbackState = usePlaybackState()
    const progress = useProgress()

    const [isVisibleCreate, setVisibleCreate] = useState(false)
    const [bookmarkText, setBookmarkText] = useState("")
    const { playerStore } = useStores()
    const {
      currentTrack = {
        position: 0,
      },
    } = playerStore
    const gestureRef = useRef()

    const [isSluts, setIsSluts] = useState(false)

    // Переключение между плеерами
    useEffect(() => {
      console.log(isSluts)
      if (!isSluts && playerStore.isSluts) {
        setIsSluts(playerStore.isSluts)
      }
      if (!playerStore.isSluts) {
        setIsSluts(playerStore.isSluts)
      }
    }, [playerStore.isSluts])

    // инициализация плеера и восстановление состояния проигрывания
    useEffect(() => {
      initializePlayer().then()
      playerStore.isSluts &&
      gestureRef.current.setState({
        style: {
          left: 0,
          top: Dimensions.get("window").height * 0.1,
          transform: [{ rotate: "0deg" }, { scale: 1 }],
        },
      })
    }, [])

    // Сохранение прогресса в стор
    useEffect(() => {
      if (playerStore.isSluts && progress.position > playerStore.currentTrack.position) {
        TrackPlayer.getCurrentTrack().then((id) => {
          playerStore.setCurrentTrack(playerStore.currentPlayList[id])
          playerStore.setProgress(progress.position)
        })
      }
    }, [progress.position])

    const initializePlayer = async () => {
      try {
        TrackPlayer.updateOptions({
          stopWithApp: false, // false=> music continues in background even when app is closed
          // Media controls capabilities
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
          // Capabilities that will show up when the notification is in the compact form on Android
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
        })

        // Restore progress
        await TrackPlayer.setupPlayer().then(async () => {

          if (playerStore.currentPlayList) {
            TrackPlayer.add(playerStore.currentPlayList)
            TrackPlayer.skip(parseInt(playerStore.currentTrack.id) - 1)
            await TrackPlayer.seekTo(currentTrack.position)
          }

          // if (currentTrack.position) {
          //   await TrackPlayer.seekTo(currentTrack.position)
          //   await TrackPlayer.pause()
          // }
        })
      } catch (e) {
        // console.log(e)
        // to-do handle error
      }
    }

    const handleRewindForward = async () => {
      await TrackPlayer.seekTo(progress.position + 15)
    }

    const handleRewindBackward = async () => {
      await TrackPlayer.seekTo(progress.position - 15)
    }

    const handleTrackNavigate = (nav) => async () => {
      const index = await TrackPlayer.getCurrentTrack()
      playerStore.isSluts &&
      gestureRef.current.setState({
        style: {
          left: 0,
          top: Dimensions.get("window").height * 0.1,
          transform: [{ rotate: "0deg" }, { scale: 1 }],
        },
      })
      playerStore.setCurrentId((parseInt(playerStore.currentTrack.id) + 1).toString())

      if (nav === "prev") {
        if (index > 0) {
          playerStore.setCurrentTrack(playerStore.currentPlayList[index - 1])
          TrackPlayer.skipToPrevious()
        }
      } else {
        if (index < playerStore.currentPlayList.length - 1) {
          playerStore.setCurrentTrack(playerStore.currentPlayList[index + 1])
          TrackPlayer.skipToNext()
        }
      }
    }

    const togglePlaying = async () => {
      if (!playerStore.currentTrack) {
        if (playerStore.currentPlayList.length) {
          await TrackPlayer.skip(0)
          playerStore.setCurrentTrack(playerStore.currentPlayList[0])
        }
      } else {
        await TrackPlayer.seekTo(currentTrack.position)
      }

      if (playbackState !== "playing") {
        await TrackPlayer.play()
      } else {
        await TrackPlayer.pause()
      }
    }

    const saveBookmark = () => {
      playerStore.setBookmark(playerStore.currentTrack.id, currentTrack.position, bookmarkText)
      setBookmarkText("")
      setVisibleCreate(false)
    }
    return (
      <View testID="PlayerScreen" style={FULL}>
        <GradientBackground colors={["#0467CD", "#004fa6", "rgb(1,19,42)"]} />
        <Image
          source={require("./lines.png")}
          resizeMode={"cover"}
          style={{ position: "absolute", width: "100%", height: "100%", left: 0, right: 0 }}
        />
        <Svg width={700} height={400} id="sw-js-blob-svg" viewBox="150 -100 300 300">
          <Defs>
            <SVGLinearGradient
              id="gradient"
              x1="227.5"
              y1="0"
              x2="227.5"
              y2="191"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#28095A" />
              <Stop offset="1" stopColor="#F9027E" />
            </SVGLinearGradient>
          </Defs>
          <Ellipse scale={1} cx="227.5" cy="95.5" rx="673.5" ry="95.5" fill="url(#gradient)" />
        </Svg>
        <View style={styles.interface}>
          <View>
            {playerStore.isSluts ? (
              <Gestures
                ref={gestureRef}
                rotatable={false}
                scalable={true}
                onStart={() => gestureRef.current.reset(() => console.log())}
                onChange={async (event, styles) => {
                  await TrackPlayer.pause()
                }}
              >
                <Image
                  source={currentTrack?.artwork || require("./placeholder.png")}
                  resizeMode="center"
                  style={{ width: Dimensions.get('window').width - 32, height: 450, marginBottom: 0 }}
                />
              </Gestures>
            ) : (
              <Image
                source={require("./placeholder.png")}
                resizeMode="center"
                style={{ width: Dimensions.get('window').width - 32, height: 450, marginBottom: 0 }}
              />
            )}
          </View>
          <ProgressBar />

          <View style={styles.audioTitles}>
            {playerStore.isSluts ?
              <TouchableOpacity style={{position: 'absolute', right: 32, bottom: 0}}  onPress={() => setVisibleCreate(!isVisibleCreate)}>
                <Image source={require('./bookmark.png')}
                       style={{ width: 36, height: 36,tintColor: '#fff' }}
                />
              </TouchableOpacity>

              : null}
            <Text style={styles.audioTitle}>
              {currentTrack?.title} {currentTrack?.artist?.replaceAll("\"", "")}
            </Text>
            <Text style={styles.audioSubTitle}></Text>
          </View>
          <View style={styles.audioControllers}>
            <TouchableOpacity onPress={handleRewindBackward} style={styles.controlWhite}>

              <Image
                source={require("./prev.png")}
                resizeMode="contain"
                style={{ width: 26, height: 26,tintColor: '#fff' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTrackNavigate("prev")} style={styles.controlRound}>
              <AntDesign name={"stepbackward"} size={17} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlaying}>
              <ImageBackground
                style={styles.imgBgStyle}
                resizeMode="cover"
                source={require("./play_bg.png")}
              >
                <AntDesign
                  name={playbackState !== "playing" ? "caretright" : "pause"}
                  size={24}
                  color={"#fff"}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTrackNavigate("next")} style={styles.controlRound}>
              <AntDesign name={"stepforward"} size={17} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleRewindForward} style={styles.controlWhite}>
              <Image
                source={require("./next.png")}
                resizeMode="contain"
                style={{ width: 26, height: 26, tintColor: '#fff' }}
              />
            </TouchableOpacity>
          </View>
          <Modal
            avoidKeyboard
            onBackdropPress={() => setVisibleCreate(!isVisibleCreate)}
            isVisible={isVisibleCreate}
          >
            <View
              style={{
                height: 240,
                backgroundColor: "white",
                justifyContent: "space-between",
                padding: 32,
                borderRadius: 16,
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{ height: 40, borderBottomColor: "#c2c2c2" }}
                placeholder="Введите текст заметки"
                onChangeText={(text) => setBookmarkText(text)}
                defaultValue={bookmarkText}
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={saveBookmark}>
                  <Text style={{ fontSize: 16, color: "#272c35" }}>Добавить</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisibleCreate(!isVisibleCreate)}>
                  <Text style={{ fontSize: 16, color: "#272c35" }}>Отмена</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.volumeControl}></View>
        </View>
      </View>
    )
  },
)
