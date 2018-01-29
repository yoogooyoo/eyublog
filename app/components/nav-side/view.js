import { Icon } from 'antd'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import ICloud from '../icloud'
import { getNavInfo } from './actions'

import './index.scss'

export const stateKey = 'nav-side'

class NavSide extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getNavInfo();
  }

  render() {
    const {portrait = {}, articles, categories, tags, links} = this.props

    return (
      <div className="nav-side">
        <div className="panel user-introduction">
          <img src="/image/portrait_bg.jpg" alt="" />
          <div className="panel-body">
            <div className="user-portrait">
              <img src="/image/me.jpg" alt="" />
              <h3>YooGoo</h3>
              <p>{portrait.intro}</p>
            </div>
            <div className="statistics">
              <span className="statistics-item">Articles - {portrait.articleCount}</span>
              <span className="spliter"></span>
              <span className="statistics-item">
                Visits - {portrait.viewCount > 10000 ? (portrait.viewCount / 1000).toFixed(1) + "k" : portrait.viewCount}
              </span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">FOLLOW ME</div>
          <div className="panel-body text-center">
            <p className="follow-link">
              <a href="#" target="_blank"><Icon type="github"/></a>
            </p>
            <p className="follow-link">
              <a href="#" target="_blank"><Icon type="github"/></a>
            </p>
            <p className="follow-link">
              <a href="#" target="_blank"><Icon type="github"/></a>
            </p>
            <p className="follow-link">
              <a href="#" target="_blank"><Icon type="github"/></a>
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">Article List</div>
          <div className="panel-body">
            <ol>
              {
                articles
                ? articles.map(article => (
                    <li key={article.id}>
                      <Link to={`/article-detail/${article.id}`}>{article.title}</Link>
                    </li>
                  ))
                : ''
              }
            </ol>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">Article Category</div>
          <div className="panel-body">
            <ul>
              {
                categories
                ? categories.map(category => (
                  <li key={category.id}>
                    <Link to={`/category/${category.id}`}>{category.theme}</Link>
                  </li>
                  ))
                : ''
              }
            </ul>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">Cloud Tags</div>
          <div className="panel-body">
            <ICloud tags={tags} />
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">Links</div>
          <div className="panel-body">
            <ul>
              {
                links
                ? links.map(link => (
                    <li key={link.id}>
                      <a href={link.url} target="_blank">{link.text}</a>
                    </li>
                  ))
                : ''
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...(state[stateKey] || {})
  }
}

const mapDispatchToProps = (dispatch) => ({
  getNavInfo: () => dispatch(getNavInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavSide)