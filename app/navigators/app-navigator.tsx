/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { navigationRef } from "./navigation-utilities"
import { PlayerScreen } from "../screens/player/player-screen"
import { FilesScreen } from "../screens/files/files-screen"
import { SettingsScreen } from "../screens/settings/settings-screen"
import { NoSlutsScreen } from "../screens"
import TabBarComponent from "./TabBarComponent"
import { useStores } from "../models"
import { observer } from "mobx-react-lite"

export type NavigatorParamList = {
  files: undefined
  player: undefined
  settings: undefined
  noslutls: undefined
}

const Tab = createBottomTabNavigator<NavigatorParamList>()

const AppTabs = observer(() => {
  const { playerStore } = useStores()
  return (

    <Tab.Navigator screenOptions={{
      headerShown: false,
    }} tabBar={props => <TabBarComponent {...props} />}>
      <Tab.Screen name="files" component={FilesScreen} />
      <Tab.Screen name="player" component={PlayerScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
      {playerStore.isAvailableBook && <Tab.Screen name="noslutls" component={NoSlutsScreen} />}
    </Tab.Navigator>

  )
})



export const AppNavigator = (props) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppTabs />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
// const exitRoutes = ["noSluts"]

// export const canExit = (routeName: string) => exitRoutes.includes(routeName)
