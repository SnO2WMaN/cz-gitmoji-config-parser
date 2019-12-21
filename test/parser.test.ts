import test from 'ava'

import parser from '~/index'

const json = {
  version: 2,
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

test('test list', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.list())
})

test('test search', t => {
  const config = parser(JSON.stringify(json))
  t.snapshot(config.search('feat'))
  t.snapshot(config.search('nothing'))
})
