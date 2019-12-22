import GitmojiScope from './GitmojiScope'

export default class Gitmoji {
  public readonly emoji: string

  public readonly name: string

  public readonly description: string

  public readonly tags: Array<string>

  public readonly scopes: Array<GitmojiScope>

  public readonly order: number

  public constructor(
    {
      emoji,
      name,
      description,
      tags,
      scopes,
      order
    }: {
      emoji: string
      name: string
      description: string
      tags?: Array<string>
      scopes?: Array<string | { name: string; description?: string }>
      order?: number
    },
    common: { scopes: Array<GitmojiScope> }
  ) {
    this.emoji = emoji
    this.name = name
    this.description = description
    this.tags = tags ?? []
    this.order = order ?? 0
    this.scopes = common.scopes.concat(
      scopes?.map(scope => {
        if (typeof scope === 'string') return new GitmojiScope({ name: scope })
        return new GitmojiScope(scope)
      }) ?? []
    )
  }

  public search(query: string): boolean {
    return (
      this.tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
        .length > 0
    )
  }

  public details(): {
    emoji: string
    name: string
    description: string
    tags: Array<string>
    scopes: Array<{
      name: string
      description: string
    }>
  } {
    return {
      emoji: this.emoji,
      name: this.name,
      description: this.description,
      tags: this.tags.sort((A, B) => A.localeCompare(B)),
      scopes: this.scopes
        .sort(({ name: A, name: B }) => A.localeCompare(B))
        .map(({ name, description }) => ({
          name,
          description: description ?? ''
        }))
    }
  }
}
