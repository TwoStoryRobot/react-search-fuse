import React from 'react'
import PropTypes from 'prop-types'

import Fuse from 'fuse.js'

class ReactSearchFuse extends React.Component {
  getResults(filter) {
    const { documents, options } = this.props
    const fuse = new Fuse(documents, options)

    if (!filter) return []
    const results = fuse.search(filter)
    return results
  }

  render() {
    const results = this.getResults(this.props.filter)
    return this.props.children(results)
  }
}

ReactSearchFuse.propTypes = {
  options: PropTypes.object,
  documents: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  children: PropTypes.func
}

export default ReactSearchFuse
