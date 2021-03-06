import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { GradientBackground } from "./gradient-background"

declare let module

storiesOf("GradientBackground", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="default/stretch" usage="Full screen background gradient.">
        <GradientBackground colors={["#0467CD", "#04182E"]} />
      </UseCase>
    </Story>
  ))
