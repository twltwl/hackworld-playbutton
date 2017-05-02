//core
const msg = new SpeechSynthesisUtterance()

const speak = (text, { lang, voice, volume, rate }) => {
    msg.text   = text
    msg.lang   = lang || 'sv-SE'
    msg.volume = volume || 1
    msg.rate   = rate || 1
    
    speechSynthesis.speak(msg)
}

const windowHasSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
        return true
    } else {
        return false
    }
} 

const queue = {}

const playlist = ({add, identifier, data}) => 
  add && 
    (queue[identifier.toString()] = data) 
    || ( Object.assign(queue, delete queue[identifier.toString()]) )

nextItem = () => {
  const id = Object.keys(queue)[0]
  const data = queue[id]
  Object.assign(queue, delete queue[id])
  return data
}

export {speak, windowHasSpeechSynthesis, playlist, nextItem}