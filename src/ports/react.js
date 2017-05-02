import React, { Component } from 'react'
import { speak, windowHasSpeechSynthesis } from '../core'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHasSpeechSynthesis: windowHasSpeechSynthesis()
    }
  }

  render() {
    const { text, config } = this.props
    return (
      <div>
        <div>
          <button 
            onClick={() => speak(text, config)}
          >
            Lyssna
          </button>
          {!this.state.windowHasSpeechSynthesis && <p style={{ color: 'red' }}>Din webbläsare stödjer inte text till tal</p>}
        </div>
        {this.props.children}
      </div>
    )
  }
}
