import React from 'react'
import { Link } from 'react-router'

import Articles from '../components/articles'

const Home = () => (
  <div>
    <Articles carousel={true} pagination={false} type={1} />
    <div className="block-link">
      <Link to="/article">See All Articles</Link>
    </div>
  </div>
)

export {
  Home
}