import { Instance, types } from "mobx-state-tree"
import { CharacterApi } from "../../services/api/character-api"
import { withEnvironment } from "../extensions/with-environment"

const Track = types.model({
  artist: types.optional(types.string, ""),
  artwork: types.optional(types.number, 0),
  duration: types.optional(types.number, 0),
  id: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  url: types.optional(types.string, ""),
  position: types.optional(types.number, 0),
})

const Bookmark = types.model({
  id: types.identifier,
  description: types.string,
  position: types.number,
  chapter: types.string,
})

export const PlayerStoreModel = types
  .model("PlayerStore")
  .props({
    currentTrack: types.optional(Track, {} as any),
    isSluts: types.boolean,
    currentPlayList: types.optional(types.array(Track), []),
    bookmarks: types.array(Bookmark),
    playingId: types.optional(types.string, ""),
    isAvailableBook: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions((self) => ({
    saveBookStatus: (isValid: boolean) => {
      self.isAvailableBook = isValid
    },
  }))
  .actions((self) => ({
    setAvailableBook: async (code: string) => {
      const characterApi = new CharacterApi(self.environment.api)
      const result = await characterApi.getCharacters(code)
      console.log(result)
      self.saveBookStatus(result.isValid)
    },
    setCurrentId: (id: string) => {
      self.playingId = id || ""
    },
    setCurrentTrack: (track) => {
      self.currentTrack = { ...track }
    },
    setPlayList: (playList) => {
      self.currentPlayList = playList
    },
    setProgress: (position) => {
      self.currentTrack = {
        ...self.currentTrack,
        position,
      }
    },
    setSluts: (isSluts) => {
      self.isSluts = isSluts
    },

    removeBookmark: (id) => {
      const item = self.bookmarks.find((todo) => todo.id === id)
      self.bookmarks.remove(item)
    },

    setBookmark: (chapter, position, bookmarkText) => {
      self.bookmarks.push({
        id: (self.bookmarks.length + 1).toString(),
        description: bookmarkText,
        position: position,
        chapter: chapter.toString() || "0",
      })

    },
  }))
type PlayerStoreType = Instance<typeof PlayerStoreModel>
export interface PlayerStore extends PlayerStoreType {}
