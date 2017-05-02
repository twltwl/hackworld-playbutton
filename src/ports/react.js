import React from 'react'
import { speak, windowHasSpeechSynthesis } from '../core'

export default function Button(text, config = {}) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        windowHasSpeechSynthesis: windowHasSpeechSynthesis()
      }
    }

    render() {
      return (
        <div>
          <div>
            <button 
              onClick={() => speak(text, config)}
            >
              Lyssna
            </button>
            {this.state.windowHasSpeechSynthesis && <p>Din webbläsare stödjer inte text till tal</p>}
          </div>
          {this.props.children}
        </div>
      )
    }
  }
}