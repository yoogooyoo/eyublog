import { Link } from 'react-router'
import React, { Component } from 'react'
import { Row, Col, Input, Icon, Popover } from 'antd'

import logoImg from '../../../public/image/logo.png'

import './index.scss'
import { showMessage } from '../common/show'

class NavTop extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      keyword: '',
      link: '',
      visible: false
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSearch = (keyword) => {
    if(keyword.trim() == '') {
      return;
    }

    this.setState({ visible: false })
    keyword = keyword.substr(0, 15);
    this.context.router.push(`/search/${keyword}`);
  }

  handleChange = (event) => {
    this.setState({keyword: event.target.value});
  }

  onClick = (event) => {
    this.setState({
      link: event.target.getAttribute('data-key')
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible: !this.state.visible });
  }

  handleMouseOver = () => {
    if (loadlive2d) {
      showMessage(document.querySelector('.live2d-message'), 'Need Help?', 3000)
    }
  }

  render() {
    const links = [
      {key: "home", text: "Home"},
      {key: "article", text: "Blog"},
      {key: "timeline", text: "Archive"},
      {key: "gather", text: "Notes"},
      {key: "gossip", text: "Life"}
    ];

    let Search = Input.Search;
    let currLink = this.state.link;
    const content = (
      <Col sm={0}>
        <div onClick={this.onClick}>
          {
            links.map((item) => (
              item.key === currLink
                ? <p className="navbar-item active" key={item.key} onClick={this.handleVisibleChange}>
                    <Link to={"/" + item.key} data-key={item.key}>{item.text}</Link>
                  </p>
                : <p className="navbar-item" key={item.key}>
                    <Link to={"/" + item.key} data-key={item.key} onClick={this.handleVisibleChange}>{item.text}</Link>
                  </p>
            ))
          }
          <div style={{padding: "10px"}}>
            <Search
              size="large"
              placeholder="Search"
              value={this.state.keyword}
              onSearch={this.onSearch}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </Col>
    )

    return (
      <div className="nav-top-wrap">
        <div className="container">
          <div className="site-logo">
            <h2>
              <span>Yoo</span><span>Goo</span>
            </h2>
            <p>Still water run deep</p>
          </div>
          <div className="navbar-collapse">
            <Col xs={24} sm={0}>
              <div className="navbar-collapse-button">
                <Icon type={this.state.visible ? "menu-unfold" : "menu-fold"} onClick={this.handleVisibleChange} />
              </div>
              <div className="navbar-collapse-body" style={{height: this.state.visible ? 280 : 0}}>
                {content}
              </div>
            </Col>
          </div>
        </div>
        <Row>
          <Col xs={0} sm={24}>
            <div className="nav-top">
              <div className="container">
                <ul onClick={this.onClick}>
                  {
                    links.map((item) => (
                      <li className="nav-top-item" key={item.key}>
                        <Link to={`/${item.key}`} data-key={item.key}>{item.text}</Link>
                      </li>
                    ))
                  }
                  <div className="nav-top-search" onMouseOver={this.handleMouseOver}>
                    <Search
                      size="large"
                      placeholder="Search"
                      value={this.state.keyword}
                      onSearch={this.onSearch}
                      onChange={this.handleChange}
                    />
                  </div>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NavTop
