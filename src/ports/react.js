import React, { Component } from 'react'
import { speak, windowHasSpeechSynthesis, isPaused, isSpeaking, hasUtterancesPending } from '../core'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHasSpeechSynthesis: windowHasSpeechSynthesis(),
      speaking: isSpeaking(),
      paused: isPaused(),
      pending: hasUtterancesPending(),
    }
  }

  speak() {
    const { text, config } = this.props

    this.setState({ speaking: isSpeaking })
    speak(text, config)
  }

  render() {
    const { speaking, paused, pending } = this.state
    return (
      <div>
        <div>
          {!speaking && <button onClick={() => this.speak()}>Lyssna</button>}
          {speaking && <button onClick={() => pause()}>Pause</button>}
          {!this.state.windowHasSpeechSynthesis && <p style={{ color: 'red' }}>Din webbläsare stödjer inte text till tal</p>}
        </div>
        {this.props.children}
      </div>
    )
  }
}
