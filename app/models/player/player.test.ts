import { PlayerModel } from "./player"

test("can be created", () => {
  const instance = PlayerModel.create({})

  expect(instance).toBeTruthy()
})
