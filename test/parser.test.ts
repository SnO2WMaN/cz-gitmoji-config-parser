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
          description: 'About Github Action'
        }
      ]
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
