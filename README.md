# react-search-fuse

A Fuse.js powered client side fuzzy search react component.

**disclaimer**: This is still a bit of a work in progress. It has some limitations, so use at your discretion

[![Build 
Status](https://semaphoreci.com/api/v1/twostoryrobot/react-search-fuse/branches/master/shields_badge.svg)](https://semaphoreci.com/twostoryrobot/react-search-fuse)

## Installation and Usage

    npm install react-search-fuse

Import `ReactSearchFuse` where you would like to use it.

```js
import ReactSearchFuse from 'react-search-fuse'
```

Supply some `documents`, specify the `options`, and a `filter` to search by.
Then just supply a `children` render function which will
receive `results`.

```jsx
<ReactSearchFuse
  options={{keys: ['name', 'character']}}
  documents=[
    {id: 1, name: 'Logan', character:'Wolverine'},
    {id: 2, name: 'Anna Marie', character: 'Rogue'}
  ]>
  {results => result.map(result => (
    <div key={result.id}>
      <h1>{result.name}</h1> - {result.character}
    </div>
  ))}
</ReactSearchFuse>
```

## Todo

This isn't quite finished. Some of the planned changes:

- the fuse index is rebuild on every rerender, it could probably be more
  performant
