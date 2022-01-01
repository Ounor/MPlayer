import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlayerStoreModel } from "../player-store/player-store"

const playStoreInitial = {
  isSluts: false,
  isAvailableBook: false,
  currentTrack: {},
  progress: {
    id:'',
    duration: 0
  }
}
export const RootStoreModel = types.model("RootStore").props({
  playerStore: types.optional(PlayerStoreModel, playStoreInitial as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

