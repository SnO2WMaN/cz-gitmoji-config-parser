import Gitmoji from './Gitmoji'
import GitmojiScope from './GitmojiScope'

export class GitmojiConfig {
  public readonly gitmojis: Array<Gitmoji>

  public readonly autoAdd: boolean

  public readonly signedCommit: boolean

  public readonly emojiFormat: 'emoji' | 'code'

  public constructor({
    gitmojis,
    common,
    options
  }: {
    gitmojis?: Array<{
      emoji: string
      name: string
      description: string
      scopes?: Array<string | { name: string; description?: string }>
      order?: number
    }>
    presets?: Array<string>
    common?: {
      scopes?: Array<string | { name: string; description?: string }>
    }
    options?: Partial<{
      emojiFormat: string
      autoAdd: boolean
      signedCommit: boolean
    }>
  }) {
    const commonScopes =
      common?.scopes?.map(scope => new GitmojiScope(scope)) ?? []
    this.gitmojis =
      gitmojis?.map(
        gitmoji => new Gitmoji(gitmoji, { scopes: commonScopes })
      ) ?? []

    if (options?.emojiFormat) {
      if (options.emojiFormat !== 'emoji' && options.emojiFormat !== 'code')
        throw new Error("options.emojiFormat must be 'code' or 'emoji'")
      this.emojiFormat = options.emojiFormat
    } else {
      this.emojiFormat = 'emoji'
    }

    if (options?.autoAdd !== undefined) {
      if (typeof options.autoAdd !== 'boolean')
        throw new Error('options.autoAdd must be boolean')
      this.autoAdd = options.autoAdd
    } else {
      this.autoAdd = false
    }

    if (options?.signedCommit !== undefined) {
      if (typeof options.signedCommit !== 'boolean')
        throw new Error('options.signedCommit must be boolean')
      this.signedCommit = options.signedCommit
    } else {
      this.signedCommit = false
    }
  }

  public list(
    gitmojis?: Array<Gitmoji>
  ): Array<ReturnType<Gitmoji['details']>> {
    return (gitmojis ?? this.gitmojis).map(gitmoji => gitmoji.details())
  }

  public search(query: string): ReturnType<GitmojiConfig['list']> {
    return this.list(this.gitmojis.filter(gitmoji => gitmoji.search(query)))
  }

  public getByName(name: string): ReturnType<Gitmoji['details']> {
    const detail = this.gitmojis
      .find(gitmoji => gitmoji.name === name)
      ?.details()
    if (detail) return detail
    throw new Error(`"${name}" is not included in the configuration file.`)
  }
}

export default function(json: string | object) {
  const config = typeof json === 'string' ? JSON.parse(json) : json
  if (config.version !== 2) throw new Error('Config file version must be 2')
  return new GitmojiConfig(config)
}
