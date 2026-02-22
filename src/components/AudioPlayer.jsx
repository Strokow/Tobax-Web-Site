import { useEffect, useRef, useState } from 'react'
import '../App.css'

export default function AudioPlayer({ audioSrc, coverSrc, artist, title }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onLoaded = () => setDuration(audio.duration || 0)
    const onTime = () => setCurrentTime(audio.currentTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const up = () => setDragging(false)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
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
    if (audio) audio.currentTime = time
    setCurrentTime(time)
  }

  const onVolume = (e) => setVolume(Number(e.target.value))

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className={`audio-player ${dragging ? 'dragging' : ''}`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <div className="player-left">
        {coverSrc ? (
          <img src={coverSrc} alt={`${artist} - ${title}`} className="cover" />
        ) : (
          <div className="cover placeholder" />
        )}
      </div>

      <div className="player-right">
        <div className="track-info">{artist} - {title}</div>

        <div className="controls">
          <button
            className={`play-btn ${playing ? 'playing' : ''}`}
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '⏸' : '▶'}
          </button>
          <div className="time">{formatTime(currentTime)} / {formatTime(duration)}</div>
        </div>

        <input
          className="progress"
          type="range"
          min={0}
          max={duration || 0}
          step="0.01"
          value={currentTime}
          onChange={onSeek}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
        />

        <div className="bottom-row">
          <div className="volume-control">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolume}
              className="volume-slider"
              onPointerDown={() => setDragging(true)}
              onPointerUp={() => setDragging(false)}
              onTouchStart={() => setDragging(true)}
              onTouchEnd={() => setDragging(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
