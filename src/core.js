//core
export const msg = new SpeechSynthesisUtterance()

export const speak = (text, config = {}) => {
    msg.text   = text
    msg.lang   = config.lang || 'sv-SE'
    msg.volume = config.volume || 1
    msg.rate   = config.rate || 1
    
    speechSynthesis.speak(msg)
}

export const pause = () => {
    speechSynthesis.pause()
}

export const windowHasSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
        return true
    } else {
        return false
    }
}

export const isSpeaking = () => (speechSynthesis.pending)
export const isPaused = () => (speechSynthesis.paused)
export const hasUtterancesPending = () => (speechSynthesis.pending) 




