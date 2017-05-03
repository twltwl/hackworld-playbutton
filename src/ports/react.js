import React, { Component } from 'react'
import { msg, speak, windowHasSpeechSynthesis, isPaused, isSpeaking, hasUtterancesPending, pause, playlist, isInPlaylist, nextItem } from '../core'

export default class extends Component {
  constructor(props) {
    super(props)
    this._id = Math.random()
    this.state = {
      windowHasSpeechSynthesis: windowHasSpeechSynthesis(),
      speaking: isSpeaking(),
      paused: isPaused(),
      pending: hasUtterancesPending(),
      inPlaylist: isInPlaylist(this._id)
    }
  }

  speak() {
    const { heading,  text, config } = this.props

    speak(heading, text, config)
    this.setState({ speaking: isSpeaking() })
  }

  addToPlaylist() {
    playlist({ add: this.state.inPlaylist ? false : true, identifier: this._id, data: { heading: this.props.heading, text: this.props.text }})
    this.setState({ inPlaylist: isInPlaylist(this._id)})
  }

  render() {
    const stylez = {margin:'10px', background:'#000', color:'#fff', padding:'5px'}
    const { speaking, paused, pending } = this.state
    return (
      <div>
        <div>
          <button style={stylez} onClick={() => this.speak()}>Lyssna</button>
          <button style={stylez} onClick={() => this.addToPlaylist()}>{this.state.inPlaylist ? 'Ta bort från' : 'Lägg till i'} spellista</button>
          {!this.state.windowHasSpeechSynthesis && <p style={{ color: 'red' }}>Din webbläsare stödjer inte text till tal</p>}
        </div>
        {this.props.children}
      </div>
    )
  }
}
