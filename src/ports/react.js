import React, { Component } from 'react'
import { msg, speak, windowHasSpeechSynthesis, isPaused, isSpeaking, hasUtterancesPending, pause } from '../core'

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
    const { heading,  text, config } = this.props

    speak(heading, config)
      .then(() => new Promise((resolve, reject) => { setTimeout(()=>{ resolve() }, 1500) }))
      .then(() => new Promise((resolve,reject) => { speak(text, config).then(resolve) }))
      .then(() => this.setState({ speaking: isSpeaking() }))
    
    this.setState({ speaking: isSpeaking() })
  }

  render() {
    const { speaking, paused, pending } = this.state
    return (
      <div>
        <div>
          {!speaking && <button onClick={() => this.speak()}>Lyssna</button>}
          {speaking && <button onClick={() => this.pause()}>Pause</button>}
          {!this.state.windowHasSpeechSynthesis && <p style={{ color: 'red' }}>Din webbläsare stödjer inte text till tal</p>}
        </div>
        {this.props.children}
      </div>
    )
  }
}
