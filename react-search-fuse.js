import React from 'react'
import PropTypes from 'prop-types'

import Fuse from 'fuse.js'

class ReactSearchFuse extends React.Component {
  constructor(props) {
    super(props)
    const options = {
      keys: props.fields
    }
    const fuse = new Fuse(props.documents, options)
    this.state = { fuse }
  }

  getResults(filter) {
    if (!filter) return []
    const results = this.state.fuse.search(filter)
    return results
  }

  render() {
    const results = this.getResults(this.props.filter)
    return this.props.children(results)
  }
}

ReactSearchFuse.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  children: PropTypes.func
}

export default ReactSearchFuse
