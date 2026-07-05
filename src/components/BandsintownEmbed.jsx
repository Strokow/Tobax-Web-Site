import { useEffect, useState } from 'react'

/**
 * Click-to-load ("2-Klick" / Click-to-Load) Bandsintown events widget.
 *
 * The Bandsintown script is injected ONLY after the visitor explicitly opts in,
 * so on page load no request is made to Bandsintown (a US provider), no data is
 * transferred and no third-party cookies are set. This keeps the privacy-first,
 * no-consent-banner stance (see CLAUDE.md → "Embeds vs. privacy" and the
 * Datenschutzerklärung → "Bandsintown" / Art. 6 Abs. 1 lit. a DSGVO).
 *
 * Widget colours are mapped to the site design tokens (App.css :root): dark
 * surface (#0e1016), light text (#eaecf2), white-alpha borders, and the cyan
 * accent (#21e6c1) reserved for the primary TICKETS action only.
 */
export default function BandsintownEmbed() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const script = document.createElement('script')
    script.src = 'https://widgetv3.bandsintown.com/main.min.js'
    script.charset = 'utf-8'
    script.async = true
    document.body.appendChild(script)
    return () => {
      script.remove()
    }
  }, [loaded])

  if (!loaded) {
    return (
      <button
        type="button"
        className="embed-consent embed-consent--plain"
        onClick={() => setLoaded(true)}
      >
        <span className="embed-consent-head">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" className="embed-consent-logo">
            <rect x="3" y="4.5" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 9.5h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="embed-consent-title">Load live dates</span>
        </span>
        <span className="embed-consent-note">
          Loads the Bandsintown tour widget. On click, a connection to Bandsintown (a US provider) is
          established — this may set cookies and transfer data (incl. to servers in the USA). No data is
          sent before you click.
        </span>
        <span className="embed-consent-cta">Show dates</span>
      </button>
    )
  }

  return (
    <div className="bit-embed">
      <a
        className="bit-widget-initializer"
        data-artist-name="id_2390335"
        data-background-color="rgba(14,16,22,1)"
        data-separator-color="rgba(255,255,255,0.09)"
        data-text-color="rgba(234,236,242,1)"
        data-font="Exo 2"
        data-auto-style="true"
        data-button-label-capitalization="uppercase"
        data-header-capitalization="uppercase"
        data-location-capitalization="uppercase"
        data-venue-capitalization="uppercase"
        data-local-dates-position="tab"
        data-display-past-dates="true"
        data-display-lineup="false"
        data-display-start-time="false"
        data-social-share-icon="false"
        data-display-limit="all"
        data-date-format="MMM. D, YYYY"
        data-date-orientation="horizontal"
        data-date-border-color="rgba(255,255,255,0.16)"
        data-date-border-width="1px"
        data-date-capitalization="capitalize"
        data-date-border-radius="10px"
        data-event-ticket-cta-size="medium"
        data-event-ticket-text="TICKETS"
        data-event-ticket-icon="false"
        data-event-ticket-cta-text-color="rgba(4,20,15,1)"
        data-event-ticket-cta-bg-color="rgba(33,230,193,1)"
        data-event-ticket-cta-border-color="rgba(33,230,193,1)"
        data-event-ticket-cta-border-width="0px"
        data-event-ticket-cta-border-radius="8px"
        data-sold-out-button-text-color="rgba(153,161,178,1)"
        data-sold-out-button-background-color="rgba(25,28,38,1)"
        data-sold-out-button-border-color="rgba(255,255,255,0.16)"
        data-sold-out-button-clickable="true"
        data-event-rsvp-position="left"
        data-event-rsvp-cta-size="medium"
        data-event-rsvp-only-show-icon="false"
        data-event-rsvp-text="RSVP"
        data-event-rsvp-icon="false"
        data-event-rsvp-cta-text-color="rgba(234,236,242,1)"
        data-event-rsvp-cta-bg-color="rgba(255,255,255,0.05)"
        data-event-rsvp-cta-border-color="rgba(255,255,255,0.16)"
        data-event-rsvp-cta-border-width="1px"
        data-event-rsvp-cta-border-radius="8px"
        data-follow-section-position="top"
        data-follow-section-alignment="center"
        data-follow-section-header-text="Get updates on new shows, new music, and more"
        data-follow-section-cta-size="medium"
        data-follow-section-cta-text="FOLLOW"
        data-follow-section-cta-icon="false"
        data-follow-section-cta-text-color="rgba(234,236,242,1)"
        data-follow-section-cta-bg-color="rgba(255,255,255,0.05)"
        data-follow-section-cta-border-color="rgba(255,255,255,0.16)"
        data-follow-section-cta-border-width="1px"
        data-follow-section-cta-border-radius="8px"
        data-play-my-city-position="bottom"
        data-play-my-city-alignment="center"
        data-play-my-city-header-text="Don’t see a show near you?"
        data-play-my-city-cta-size="medium"
        data-play-my-city-cta-text="REQUEST A SHOW"
        data-play-my-city-cta-icon="false"
        data-play-my-city-cta-text-color="rgba(234,236,242,1)"
        data-play-my-city-cta-bg-color="rgba(255,255,255,0.05)"
        data-play-my-city-cta-border-color="rgba(255,255,255,0.16)"
        data-play-my-city-cta-border-width="1px"
        data-play-my-city-cta-border-radius="8px"
        data-language="en"
        data-layout-breakpoint="900"
        data-app-id="bab9f634239c120b8811f2155316b164"
        data-bit-logo-position="bottomRight"
        data-bit-logo-color="rgba(153,161,178,1)"
      />
    </div>
  )
}
