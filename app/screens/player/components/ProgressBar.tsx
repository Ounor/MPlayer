/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useEffect, useState } from "react"
import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import MultiSlider from "react-native-multiple-slider-gradient"
import TrackPlayer, { usePlaybackState, useProgress } from "react-native-track-player"
import styles from "../styles"
import CustomMarker from "./CustomMarker"
import { useStores } from "../../../models"
import Modal from "react-native-modal"

export const ProgressBar = () => {
  const [isVisibleEdit, setVisibleEdit] = useState(false)
  const [currentBookmark, setCurrentBookmark] = useState({})
  const sliderWidth = Dimensions.get("screen").width - 48
  const playbackState = usePlaybackState()
  const progress = useProgress()
  const { playerStore } = useStores()
  const chapterBookmark = [...playerStore.bookmarks]

  const setProgress = async (e) => {
    await TrackPlayer.seekTo((e * progress.duration) / 100)
  }

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

  return (
    <View>
      <Modal
        avoidKeyboard
        onBackdropPress={() => setVisibleEdit(!isVisibleEdit)}
        isVisible={isVisibleEdit}
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
          <Text>{currentBookmark.description}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.seekTo(currentBookmark.position)
                setVisibleEdit(!isVisibleEdit)
              }}
            >
              <Text style={{ fontSize: 16, color: "#272c35" }}>Перейти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                playerStore.removeBookmark(currentBookmark.id)
                setVisibleEdit(!isVisibleEdit)
              }}
            >
              <Text style={{ fontSize: 16, color: "#272c35" }}>Удалить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.progressFromTo}>
        {/* eslint-disable-next-line react-native/no-inline-styles,react-native/no-color-literals */}
        <Text style={{ color: "white" }}>
          {secondsToHHMMSS(
            progress.position === 0 ? playerStore.currentTrack.position : progress.position,
          )}
        </Text>
        {/* eslint-disable-next-line react-native/no-inline-styles,react-native/no-color-literals */}
        <Text style={{ color: "white" }}>{secondsToHHMMSS(progress.duration)}</Text>
      </View>
      <View style={{ backgroundColor: "blue", height: 0, marginHorizontal: 22 }}>
        {chapterBookmark.map((bookmark, index) => {
          return bookmark.chapter === playerStore.currentTrack.id &&
            (playbackState === "paused" ||
              playbackState === "playing" ||
              playbackState === "ready") ? (
            <TouchableOpacity
              key={bookmark.id.toString() + bookmark.chapter + index}
              onPress={() => {
                setCurrentBookmark(bookmark)
                setVisibleEdit(!isVisibleEdit)
              }}
              style={{
                top: -30,
                borderRadius: 40,
                width: 10,
                height: 10,
                backgroundColor: "red",
                position: "absolute",
                left: `${(bookmark.position / progress.duration) * 100}%`,
              }}
            ></TouchableOpacity>
          ) : null
        })}
      </View>
      <MultiSlider
        containerStyle={styles.slider}
        trackStyle={styles.track}
        selectedStyle={styles.selected}
        gradientColor={["#1B69B7", "#F9027E"]}
        customMarker={CustomMarker}
        onValuesChangeFinish={setProgress}
        sliderLength={sliderWidth}
        markerOffsetX={10}
        min={0}
        max={100}
        step={1}
        values={[
          Math.round(
            progress.position === 0
              ? (playerStore.currentTrack.position / progress.duration) * 100
              : (progress.position / progress.duration) * 100,
          ) || 0,
        ]}
        allowOverlap
        snapped
      />
    </View>
  )
}
