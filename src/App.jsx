import './App.css'
import AudioPlayer from './components/AudioPlayer'

function App() {
  return (
    <div className="page-root">
      <header className="site-header">
        <div className="logotype-wrap">
          <img
            src="/src/assets/tobax-logotype-font.png"
            alt="Tobax Logotype"
            className="logotype-image"
          />
        </div>
      </header>
      <div className="app">
        <div className="container">
          {/* Content Section with Audio Player */}
          <div className="content-section bio-section">
          <div className="player-wrapper player-in-bio">
            <AudioPlayer
              audioSrc="/src/assets/heidelore.mp3"
              coverSrc="/src/assets/heidelore.jpg"
              artist="Tobax"
              title="Heidelore"
            />
          </div>
          <div className="bio-image-wrap">
            <img src="/src/assets/bild4.jpg" alt="Tobax" className="bio-image" />
          </div>
          <h2>BIO</h2>
          <p>
            <b>Tobax (Alexej Strokow)</b> represents the mid‑generation of drum & bass artists, primarily focused on neurofunk, though his early discography also touched Liquid and Jump Up.
          </p>
          <p>
            Long before clubs, flights and festival stages, there was a small room, a desk lamp, and a cassette recorder with worn buttons. Coming home from school, he would drop his backpack at the doorway and sit down without even changing clothes, as if afraid the sounds waiting in his head might disappear. The tape rolled, stopped, rewound, and rolled again. Imperfections mattered — noise, hum, accidental distortion — each one felt alive.
          </p>
          <p>
            A drum machine paired with a guitar processor became his first bandmate. Simple electric‑guitar riffs turned into evenings, evenings into nights. Rock music with heavy distorted guitars and a fascination with cinema shaped not only taste but imagination: tracks were never just rhythms, they were scenes, spaces, moving images without a screen.
          </p>
          <p>
            He began producing seriously in 2010 in Samara, Russia. Progress was slow and deliberate — years spent learning how power and atmosphere could coexist in the same drop. His first performance outside his hometown happened while he was still underage; he travelled there with his mother, yet promoters were already inviting him as an artist worth attention.
          </p>
          <p>
            Time and persistence eventually led to support from Noisia, Black Sun Empire, Ed Rush, Pendulum, A.M.C., Mefjus and Phace, as well as releases on Titan, Eatbrain, Neuropunk and C4C Recordings.
          </p>
          <p>
            Over the years his music carried him across Europe — from Russia to the United Kingdom — including festivals such as Let It Roll (for several consecutive seasons), Rampage, Neuropunk and Pirate Station, alongside countless club nights. Each set became an extension of the same childhood habit: building atmosphere first, impact second.
          </p>
          <p>
            Today Tobax’s sound blends cinematic sci‑fi space, extended intros and direct neurofunk energy — structured less like a DJ tool and more like a sequence of scenes.
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
    </div>
  )
}

export default App
