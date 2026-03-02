import { useEffect, useRef, useState } from 'react'
import '../App.css'

export default function AudioPlayer({ audioSrc, coverSrc, artist, title }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [seekDragging, setSeekDragging] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onLoaded = () => setDuration(audio.duration || 0)
    const onTime = () => {
      if (!seekDragging) setCurrentTime(audio.currentTime)
    }
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
    }
  }, [seekDragging])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  useEffect(() => {
    const onMouseUp = () => setSeekDragging(false)
    const onTouchEnd = () => setSeekDragging(false)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  const onSeek = (e) => {
    const audio = audioRef.current
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audio) audio.currentTime = time
  }

  const onVolume = (e) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
  }

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className={`audio-player ${seekDragging ? 'dragging' : ''}`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <div className="player-row">
        <div className="player-meta-inline">{artist} - {title}</div>
        {coverSrc ? (
          <img src={coverSrc} alt={`${artist} - ${title}`} className="player-cover-image" />
        ) : (
          <div className="player-cover-placeholder" />
        )}
        <button
          className={`play-btn ${playing ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          <svg viewBox="0 0 24 24" className="play-icon" width="18" height="18" fill="currentColor">
            {playing ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
        <input
          className="progress"
          type="range"
          min={0}
          max={duration || 0}
          step="0.01"
          value={currentTime}
          onChange={onSeek}
          onMouseDown={() => setSeekDragging(true)}
          onTouchStart={() => setSeekDragging(true)}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolume}
          className="volume-slider"
        />
        <span className="player-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </div>
  )
}
