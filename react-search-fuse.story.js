import React from 'react'
import { storiesOf } from '@storybook/react'
import { create } from 'reworm'

import ReactSearchFuse from './react-search-fuse'

const documents = [
  { id: 'a', character: 'Wolverine', name: 'Logan', team: 'X-Men' },
  { id: 'b', character: 'Hulk', name: 'Bruce Banner', team: 'Avengers' },
  {
    id: 'c',
    character: 'Black Widow',
    name: 'Natasha Romanoff',
    team: 'Avengers'
  },
  { id: 'd', character: 'Rogue', name: 'Anna Marie', team: 'X-Men' }
]

const { get, set } = create({ filter: '' })

const renderResults = results =>
  results.map(result => (
    <p key={result.id}>
      <strong>{result.name}</strong> - {result.character} - {result.team}
    </p>
  ))

const options = { keys: ['name', 'character', 'team'] }

storiesOf('ReactSearchFuse', module)
  .add('interactive', () =>
    get(s => (
      <div>
        <input
          onChange={e => set({ filter: e.target.value })}
          value={s.filter}
        />
        <ReactSearchFuse
          options={options}
          filter={s.filter}
          documents={documents}>
          {renderResults}
        </ReactSearchFuse>
      </div>
    ))
  )
  .add('initial filter', () => (
    <div>
      Initial Filter: Wolverine
      <ReactSearchFuse
        options={options}
        filter="Wolverine"
        documents={documents}>
        {renderResults}
      </ReactSearchFuse>
    </div>
  ))
