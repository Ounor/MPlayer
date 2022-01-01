import { View } from "react-native"
import React from "react"

const CustomMarker = () => {
  return (
    <View
      style={{
        borderRadius: 30,
        width: 24,
        height: 24,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -10,
      }}
    >
      <View style={{ borderRadius: 30, width: 12, height: 12, backgroundColor: "#F1037D" }} />
    </View>
  )
}
export default CustomMarker
