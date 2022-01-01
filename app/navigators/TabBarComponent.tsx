import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const images = {
  files: require('./files.png'),
  player: require('./player.png'),
  settings: require('./settings.png'),
  noslutls: require('./noslutls.png')
}

const TabBarComponent = ({ state, descriptors, navigation }) => {
  return (
    <View style={{
      flexDirection: "row",
      backgroundColor: "rgb(1,19,42)",
      height: 0,
      // borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      // position: "absolute",
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (

          <TouchableOpacity
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{marginHorizontal: 16, width: 48, height: 48, borderRadius: 50, overflow: 'hidden', marginBottom: 120, shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, }}
          >
            <LinearGradient
              colors={isFocused ? ['#700A79', '#F9027E'] : ["#0a345f", "#0a345f"]}
              style={{width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}
            >
              <Image source={images[label]} resizeMode={'contain'} style={{width: 24, height: 50}} />
            </LinearGradient>

          </TouchableOpacity>

        )
      })}
    </View>
  )
}

export default TabBarComponent
