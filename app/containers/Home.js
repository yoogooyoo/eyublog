import React from 'react'
import { Link } from 'react-router'

const Home = () => (
  <div>
    <div className="block-link">
      <Link to="/article">See All Articles</Link>
    </div>
  </div>
)

export {
  Home
}