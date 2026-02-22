import { useState } from 'react'
import './App.css'
import AudioPlayer from './components/AudioPlayer'

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Tobax</h1>
        <p className="subtitle">Music Artist & Producer</p>
        
        {/* Audio Player */}
        <div className="player-wrapper">
          <AudioPlayer
            audioSrc="/src/assets/heidelore.mp3"
            coverSrc="/src/assets/heidelore.jpg"
            artist="Tobax"
            title="Heidelore"
          />
        </div>

        {/* Content Section */}
        <div className="content-section">
          <h2>About</h2>
          <p>
            Welcome to Tobax's music portfolio. Discover original tracks and compositions across various genres. 
            Stream, listen, and connect with the music.
          </p>
        </div>

        {/* Links Section */}
        <div className="links-section">
          <a href="https://soundcloud.com/alex-tobax" target="_blank" rel="noreferrer" className="link-btn">
            SoundCloud
          </a>
          <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="link-btn">
            Spotify
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
