import React, {Component} from 'react'

import './index.scss'
import {showMessage} from '../common/show'

class Live2d extends Component {

  componentDidMount = () => {
    if(typeof loadlive2d === 'undefined') {
      let script = document.createElement("script")

      script.setAttribute('src', '/static/live2d/js/live2d.js')
      document.getElementsByTagName('head')[0].appendChild(script)

      script.onload = script.onreadystatechange = () => {
        if(!this.readyState || this.readyState == 'complete') {
          loadlive2d("live2d", "static/live2d/model/tia/model.json")

          let text = '',
            textArr = [
              "110? don't touch me!",
              "blabla", "love you",
              "get away from me", "hey you"
            ]

          const messageBox = document.querySelector('.live2d-message')
          showMessage(messageBox, 'Welcome, (=^w^=)', 6000, 1500)

          this.ele.onclick = () => {
            text = textArr(Math.floor(Math.random() * textArr.length + 1) - 1)
            showMessage(messageBox, text)
          }

          let a = {
            "mouseover": [
              {
                "selector": ".title a",
                "text": ["wanna see {text} ?"]
              }
            ]
          }
        }
      }

    }
  }

  componentWillUnmount = () => {
    this.ele.onclick = null
  }

  render() {
    return (
      <div id="live2d-wrap">
        <div className="live2d-message"></div>
        <canvas id="live2d" ref={(ele) => {this.ele = ele}} width="260" height="240"></canvas>
      </div>
    )
  }
}

export default Live2d