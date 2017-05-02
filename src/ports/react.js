import React, { Component } from 'react'
import { msg, speak, windowHasSpeechSynthesis, isPaused, isSpeaking, hasUtterancesPending, pause, playlist, isInPlaylist, nextItem } from '../core'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHasSpeechSynthesis: windowHasSpeechSynthesis(),
      speaking: isSpeaking(),
      paused: isPaused(),
      pending: hasUtterancesPending(),
      inPlaylist: isInPlaylist(props.id)
    }
  }

  speak() {
    const { heading,  text, config } = this.props

    speak(heading, config)
    this.setState({ speaking: isSpeaking() })
  }

  addToPlaylist() {
    playlist({ add: this.state.inPlaylist ? false : true, identifier: this.props.id, data: { heading: this.props.heading, text: this.props.text }})
    this.setState({ inPlaylist: isInPlaylist(this.props.id)})
  }

  render() {
    const { speaking, paused, pending } = this.state
    return (
      <div>
        <div>
          {!speaking && <button onClick={() => this.speak()}>Lyssna</button>}
          {speaking && <button onClick={() => this.pause()}>Pause</button>}
          <button onClick={() => this.addToPlaylist()}>{this.state.inPlaylist ? 'Ta bort från' : 'Lägg till i'} spellista</button>
          {!this.state.windowHasSpeechSynthesis && <p style={{ color: 'red' }}>Din webbläsare stödjer inte text till tal</p>}
        </div>
        {this.props.children}
      </div>
    )
  }
}
