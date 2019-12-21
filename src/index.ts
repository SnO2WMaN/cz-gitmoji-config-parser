import Gitmoji from './Gitmoji'
import GitmojiScope from './GitmojiScope'

class GitmojiConfig {
  public readonly gitmojis: Array<Gitmoji>

  public constructor({
    gitmojis,
    common
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
  }) {
    const commonScopes =
      common?.scopes?.map(scope => new GitmojiScope(scope)) ?? []
    this.gitmojis =
      gitmojis?.map(
        gitmoji => new Gitmoji(gitmoji, { scopes: commonScopes })
      ) ?? []
  }

  public list(
    gitmojis?: Array<Gitmoji>
  ): Array<{
    emoji: string
    name: string
    description: string
    tags: Array<string>
    scopes: Array<{
      name: string
      description: string
    }>
  }> {
    return (gitmojis ?? this.gitmojis)
      .sort(({ order: A }, { order: B }) => A - B)
      .map(gitmoji => gitmoji.details())
  }

  public search(query: string): ReturnType<GitmojiConfig['list']> {
    return this.list(this.gitmojis.filter(gitmoji => gitmoji.search(query)))
  }
}

export default function(json: string) {
  const config = JSON.parse(json)
  if (config.version !== 2) throw new Error('Config file version must be 2')
  return new GitmojiConfig(config)
}
