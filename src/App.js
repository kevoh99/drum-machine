import React, { useCallback } from 'react'
import { useEffect, useState, useRef } from 'react'
import './App.css'
import { FaHeart } from 'react-icons/fa'
const firstSoundSet = [
  {
    keyCode: 81,
    id: 'Q',
    name: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    id: 'W',
    name: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    id: 'E',
    name: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    id: 'A',
    name: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    id: 'S',
    name: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    id: 'D',
    name: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    id: 'Z',
    name: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    id: 'X',
    name: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    id: 'C',
    name: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]
const secondSoundSet = [
  {
    keyCode: 81,
    id: 'Q',
    name: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    id: 'W',
    name: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    id: 'E',
    name: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    id: 'A',
    name: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    id: 'S',
    name: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    id: 'D',
    name: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    id: 'Z',
    name: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    id: 'X',
    name: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    id: 'C',
    name: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]

const App = () => {
  /* Useful links: 
  https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559 
  */
  const [toggleBank, setToggleBank] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentClip, _setCurrentClip] = useState('')
  const [currentSet, _setCurrentSet] = useState(firstSoundSet)
  const [canPlay, _setCanPlay] = useState(true)

  const currentClipRef = useRef(currentClip)
  const setCurrentClip = (data) => {
    currentClipRef.current = data
    _setCurrentClip(data)
  }

  const currentSetRef = useRef(currentSet)
  const setCurrentSet = (data) => {
    currentSetRef.current = data
    _setCurrentSet(data)
  }

  const canPlayRef = useRef(canPlay)
  const setCanPlay = (data) => {
    canPlayRef.current = data
    _setCanPlay(data)
  }

  const playTrack = useCallback(
    (id, name) => {
      if (canPlay) {
        const track = document.getElementById(id)
        track.currentTime = 0 // To ensure the track starts at the beginning
        setCurrentClip(name)
        track.play()
      }
    },
    [canPlay]
  )

  const changeDrumSet = useCallback(() => {
    setToggleBank(!toggleBank)
    if (currentSet === firstSoundSet) {
      setCurrentClip('Soft Piano Kit')
      setCurrentSet(secondSoundSet)
    } else {
      setCurrentClip('Heater Kit')
      setCurrentSet(firstSoundSet)
    }
  }, [toggleBank, currentSet])


  const playEventHandler = useCallback(
    (e) => {
      const CLIPS = {
        firstSet: {
          Q: 'Heater-1',
          W: 'Heater-2',
          E: 'Heater-3',
          A: 'Heater-4',
          S: 'Clap',
          D: 'Open-HH',
          Z: "Kick-n'-Hat",
          X: 'Kick',
          C: 'Closed-HH'
        },
        secondSet: {
          Q: 'Chord-1',
          W: 'Chord-2',
          E: 'Chord-3',
          A: 'Shaker',
          S: 'Open-HH',
          D: 'Closed-HH',
          Z: 'Punchy-Kick',
          X: 'Side-Stick',
          C: 'Snare'
        }
      }
      if (
        e.code === 'KeyQ' ||
        e.code === 'KeyW' ||
        e.code === 'KeyE' ||
        e.code === 'KeyA' ||
        e.code === 'KeyS' ||
        e.code === 'KeyD' ||
        e.code === 'KeyZ' ||
        e.code === 'KeyX' ||
        e.code === 'KeyC'
      ) {
        const soundId = e.code.slice(3) /* e.g.'Q' */
        const soundName =
          currentSet === firstSoundSet
            ? CLIPS.firstSet[soundId]
            : CLIPS.secondSet[soundId]
        playTrack(soundId, soundName)
      }
    },
    [playTrack, currentSet]
  )

  useEffect(() => {
    window.addEventListener('keydown', playEventHandler)
    return () => {
      window.removeEventListener('keydown', playEventHandler)
    }
  }, [playEventHandler])

  const controlsHandler = useCallback(
    (e) => {
      if (e.code === 'KeyP' || e.code === 'Space') {
        setCanPlay(!canPlay)
      }
      if (e.code === 'KeyL') {
        changeDrumSet()
      }
    },
    [canPlay, changeDrumSet]
  )

  useEffect(() => {
    window.addEventListener('keydown', controlsHandler)
    return () => {
      window.removeEventListener('keydown', controlsHandler)
    }
  }, [controlsHandler])

  const setPlayMode = () => {
    setCanPlay(!canPlay)
    setCurrentClip('')
  }

  // Handles changes in volume variable in state
  const handleVolume = (event) => {
    setVolume(event.target.value)
  }

  // Changes actual audio volume on the user's machine
  const setAudioVolume = () => {
    // An array of the <audio> elements inside the <button> elements
    const tracks = currentSet.map((track) => {
      return document.getElementById(track.id)
    })
    /* Sample track from the tracks array: 
    <audio class="clip" id="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" ></audio> */
    tracks.forEach((track) => {
      // Without the if condition, an error is triggered  
      if (track) {
        track.volume = volume
      }
    })
  }

  return (
    /* Structure for the buttons to be generated
    <button className='drum-pad' id='heater-1' onClick={playTrack('Q')}>
      <audio className='clip' id='Q' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'/>
      Q
    </button>
    */
    <div id='drum-machine'>
      <div id='outer-container'>
        <h1>Press buttons to play drum</h1>
        <div id='inner-container'>
          {/* Keyboard area */}
          <div id='left-col'>
            {currentSet.map((track) => (
              <button
                key={track.id}
                className='drum-pad'
                id={track.name}
                onClick={() => playTrack(track.id, track.name)}
              >
                <audio className='clip' id={track.id} src={track.url} />
                {track.id}
              </button>
            ))}
            {setAudioVolume()}
          </div>
          <div id='right-col'>
            {/* Change group button */}
            <div className='bank-wrapper'>
              <p>
                Change Sound Set <span className='phone-hide'>(L)</span>
              </p>
              <button
                className={`bank-btn ${toggleBank ? 'bank-2' : ''}`}
                onClick={changeDrumSet}
              ></button>
            </div>
            {/* Display area */}
            <h3 id='display'>{canPlay && currentClip}</h3>
            {/* The HTML audio volume DOM property takes a range btn 0.0 and 1.0 */}
            <div className='vol-bar'>
              Volume: {Math.round(volume * 100)}%<br />
              <input
                max='1'
                min='0'
                step='0.01'
                type='range'
                value={volume}
                onChange={handleVolume}
                style={{ cursor: 'pointer', width: '80%' }}
              />
            </div>

            {/* Switch sound on/off */}
            <div>
              <p>
                {!canPlay ? 'Power On' : 'Power Off '}
                <span className='phone-hide'>(P)</span>
              </p>
              <button
                className={`power-btn ${!canPlay ? 'power-off' : ''}`}
                onClick={setPlayMode}
              ></button>
            </div>
          </div>
        </div>
        <div id='footer'>
          Made with <FaHeart style={{ color: 'red' }} /> by{' '}
          <a
            href='https://twitter.com/kevinnjoroge'
            target='_blank'
            rel='noopener noreferrer'
          >
            Kevin Nganga
            <br />
          </a>{' '}
          Copyright &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}

export default App
