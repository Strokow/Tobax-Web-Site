import { useState } from 'react'

/**
 * Click-to-load ("2-Klick") Spotify embed.
 * Nothing is requested from Spotify until the visitor explicitly opts in,
 * so the page transfers no data to Spotify on load (keeps the no-banner,
 * privacy-first stance — see Datenschutzerklärung / CLAUDE.md).
 */
export default function SpotifyEmbed({ src, title = 'Spotify player' }) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="embed-frame">
        <iframe
          title={title}
          src={src}
          width="100%"
          height="352"
          style={{ border: 0, borderRadius: 12 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <button type="button" className="embed-consent" onClick={() => setLoaded(true)}>
      <span className="embed-consent-head">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" className="embed-consent-logo">
          <circle cx="12" cy="12" r="12" fill="#1DB954" />
          <path d="M6.6 10.2c3.4-1 7.6-.8 10.6 1" stroke="#000" strokeWidth="1.7" strokeLinecap="round" fill="none" />
          <path d="M7.2 13c2.8-.8 6.2-.6 8.6.8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M7.8 15.6c2.2-.6 4.8-.4 6.7.7" stroke="#000" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </svg>
        <span className="embed-consent-title">Load Spotify player</span>
      </span>
      <span className="embed-consent-note">
        Loads Spotify’s player. On click, a connection to Spotify is established — this may set cookies and
        transfer data to Spotify (incl. servers in the USA). No data is sent before you click.
      </span>
      <span className="embed-consent-cta">▶ Load &amp; play</span>
    </button>
  )
}
