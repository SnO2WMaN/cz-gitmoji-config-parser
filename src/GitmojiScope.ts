export default class GitmojiScope {
  public readonly name: string

  public readonly description?: string

  public constructor(
    payload:
      | string
      | {
          name: string
          description?: string
        }
  ) {
    if (typeof payload === 'string') {
      this.name = payload
    } else {
      this.name = payload.name
      this.description = payload?.description
    }
  }
}
