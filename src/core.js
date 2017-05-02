//core

const speak = (header, text, config = {}) => {
    console.log('speak', header, text)
    s(header, config)
        .then(() => new Promise((resolve, reject) => { setTimeout(()=>{ resolve() }, 1500) }))
        .then(() => new Promise((resolve, reject) => { s(text, config).then(resolve) }))
        .then(() => {
            var data = nextItem()
            if(data){
                setTimeout(()=>{ speak(data.heading, data.text, config) }, 2000)
                
            }
            
        })
}

const s = (text, config) => {
    const msg = new SpeechSynthesisUtterance()
    return new Promise((resolve, reject) => {
        msg.text   = text
        msg.lang   = config.lang    || 'sv-SE'
        msg.volume = config.volume  || 1
        msg.rate   = config.rate    || 1
        
        speechSynthesis.cancel()
        console.log('speaking', text)
        speechSynthesis.speak(msg)
        
        //onend resolve..
        msg.onend = event => {
            console.log('event ended')
            resolve('end')
        }
    })
}

export const pause = () => {
    speechSynthesis.pause()
}

const windowHasSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
        return true
    } else {
        return false
    }
}

export const isSpeaking           = () => (speechSynthesis.speaking)
export const isPaused             = () => (speechSynthesis.paused)
export const hasUtterancesPending = () => (speechSynthesis.pending) 

const queue = {}

const playlist = ({add, identifier, data}) => {
    
    if (add) {
        queue[identifier.toString()] = data 
    } else {
        Object.assign(queue, delete queue[identifier.toString()])
    }

    console.log(queue)
}

const isInPlaylist = identifier => {
    if (Object.keys(queue).indexOf(identifier.toString()) !== -1) {
        return true 
    } else {
        return false
    }
}

const nextItem = () => {
  const id = Object.keys(queue)[0]
  const data = queue[id]
  Object.assign(queue, delete queue[id])
  return data
}

export {speak, windowHasSpeechSynthesis, playlist, isInPlaylist, nextItem}