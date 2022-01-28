import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetCharactersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class CharacterApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getCharacters(code): Promise<GetCharactersResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://slutshaming.ru/codeManager/",
        { CODE: code },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return response.data
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
