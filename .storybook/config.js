import { configure } from '@storybook/react'

function loadStories() {
  require('../react-search-fuse.story.js')
}

configure(loadStories, module)
