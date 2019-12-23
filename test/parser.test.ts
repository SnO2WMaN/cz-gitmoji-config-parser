import test from 'ava'

import parser from '~/index'

const json = {
  version: 2,
  options: {
    emojiFormat: 'emoji',
    autoAdd: false,
    signedCommit: false
  },
  gitmojis: [
    {
      emoji: '✨',
      description: 'Introduce new features.',
      name: 'sparkles',
      tags: ['feat']
    },
    {
      emoji: '👍',
      description: 'Improve features.',
      name: 'thumbsup',
      tags: ['improve', 'update']
    },
    {
      emoji: '🐛',
      description: 'Fix bugs.',
      name: 'bug',
      tags: ['bug', 'fix']
    },
    {
      emoji: '🚑',
      description: 'Create a hotfix.',
      name: 'ambulance',
      tags: ['bug', 'fix', 'hotfix']
    },
    {
      emoji: '🔧',
      description: 'Update configurations.',
      name: 'wrench',
      tags: ['config', 'setting'],
      scopes: [
        {
          name: 'eslint',
          description: 'About ESLint'
        }
      ]
    },
    {
      emoji: '🚨',
      description: 'Add/Update tests.',
      name: 'warning',
      tags: ['test'],
      scopes: [
        {
          name: 'snapshot',
          description: 'About snapshot'
        }
      ]
    },
    {
      emoji: '📖',
      description: 'Write docs.',
      name: 'open_book',
      tags: ['docs', 'readme']
    },
    {
      emoji: '📄',
      description: 'Attach a license.',
      name: 'page_facing_up',
      tags: ['license']
    },
    {
      emoji: '🔖',
      description: 'Release.',
      name: 'bookmark',
      tags: ['release', 'version']
    },
    {
      emoji: '👷',
      description: 'Maintain infrastructure.',
      name: 'construction_worker',
      tags: ['infra', 'ci'],
      scopes: [
        {
          name: 'renovate',
          description: 'About Renovate Bot'
        },
        {
          name: 'github actions',
          description: 'About Github Actions'
        }
      ]
    },
    {
      emoji: '👥',
      description: 'Add a contributor.',
      name: 'busts_in_silhouette',
      tags: ['contributor']
    },
    {
      emoji: '🎉',
      description: 'Init.',
      name: 'tada',
      tags: ['init']
    }
  ]
}

test('test options.emojiFormat', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.emojiFormat)
  t.throws(() =>
    parser({
      version: 2,
      options: { emojiFormat: 'error' }
    })
  )
})

test('test options.signedCommit', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.signedCommit)
  t.throws(() =>
    parser({
      version: 2,
      options: { signedCommit: 1 }
    })
  )
})

test('test options.autoAdd', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.autoAdd)
  t.throws(() =>
    parser({
      version: 2,
      options: { autoAdd: 1 }
    })
  )
})

test('test list', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.list())
})

test('test search', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.search('feat'))
  t.snapshot(config.search('nothing'))
})

test('test getByName', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.getByName('construction_worker'))
  t.throws(() => config.getByName('nothing'))
})
