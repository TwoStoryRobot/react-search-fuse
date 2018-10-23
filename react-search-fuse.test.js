import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import ReactSearchFuse from './react-search-fuse'

afterEach(cleanup)

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

const mapResults = results =>
  results.map(result => (
    <div key={result.id}>
      <h1>{result.character}</h1>
      <p>{result.name}</p>
    </div>
  ))

test('should render only results matching initial filter', async () => {
  const { container, queryByText } = render(
    <ReactSearchFuse
      documents={documents}
      fields={['name', 'character', 'team']}
      filter="Avengers">
      {mapResults}
    </ReactSearchFuse>
  )

  expect(queryByText('Hulk')).toBeInTheDocument()
  expect(queryByText('Black Widow')).toBeInTheDocument()
  expect(queryByText('Wolverine')).not.toBeInTheDocument()

  expect(container.firstChild).toMatchSnapshot()
})

test('should only index specified fields', async () => {
  const { queryByText } = render(
    <ReactSearchFuse documents={documents} fields={['name']} filter="Avengers">
      {mapResults}
    </ReactSearchFuse>
  )

  expect(queryByText('Wolverine')).not.toBeInTheDocument()
  expect(queryByText('Black Widow')).not.toBeInTheDocument()
})

test('updating filter will rerender with new results', async () => {
  const { queryByText, rerender } = render(
    <ReactSearchFuse
      documents={documents}
      fields={['name', 'character', 'team']}
      filter="Avengers">
      {mapResults}
    </ReactSearchFuse>
  )

  expect(queryByText('Hulk')).toBeInTheDocument()
  expect(queryByText('Rogue')).not.toBeInTheDocument()

  // change the filter, rerender
  rerender(
    <ReactSearchFuse
      documents={documents}
      fields={['name', 'character', 'team']}
      filter="X">
      {mapResults}
    </ReactSearchFuse>
  )

  expect(queryByText('Hulk')).not.toBeInTheDocument()
  expect(queryByText('Rogue')).toBeInTheDocument()
})
