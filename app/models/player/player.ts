import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const PlayerModel = types.model("Player").props({
  isPlaying: types.maybe(types.boolean),
  playingId: types.maybe(types.string),
  isAvailableBook: types.maybe(types.boolean),
})

type PlayerType = Instance<typeof PlayerModel>
export interface Player extends PlayerType {}
type PlayerSnapshotType = SnapshotOut<typeof PlayerModel>
export interface PlayerSnapshot extends PlayerSnapshotType {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
