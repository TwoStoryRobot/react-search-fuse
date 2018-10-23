import React from 'react'
import PropTypes from 'prop-types'
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

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  componentDidCatch(error) {
    this.setState({ hasError: true, error: error })
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>
          {this.state.error.name} - {this.state.error.message}
        </p>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.func
}

const renderResults = results =>
  results.map(result => (
    <p key={result.id}>
      <strong>{result.name}</strong> - {result.character} - {result.team}
    </p>
  ))

storiesOf('ReactSearchFuse', module)
  .add('interactive', () =>
    get(s => (
      <div>
        <input
          onChange={e => set({ filter: e.target.value })}
          value={s.filter}
        />
        <ErrorBoundary key={s.filter}>
          <ReactSearchFuse
            id="id"
            fields={['name', 'character', 'team']}
            filter={s.filter}
            documents={documents}>
            {renderResults}
          </ReactSearchFuse>
        </ErrorBoundary>
      </div>
    ))
  )
  .add('initial filter', () => (
    <div>
      Initial Filter: Wolverine
      <ReactSearchFuse
        id="id"
        fields={['name', 'character', 'team']}
        filter="Wolverine"
        documents={documents}>
        {renderResults}
      </ReactSearchFuse>
    </div>
  ))
