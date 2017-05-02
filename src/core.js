//core
const msg = new SpeechSynthesisUtterance()

export const speak = (text, { lang, voice, volume, rate }) => {
    msg.text   = text
    msg.lang   = lang || 'sv-SE'
    msg.volume = volume || 1
    msg.rate   = rate || 1
    
    speechSynthesis.speak(msg)
}

export const windowHasSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
        return true
    } else {
        return false
    }
} 




