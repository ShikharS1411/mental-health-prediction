import SignalWave from './SignalWave.jsx'

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="how-it-works">
      <div className="hero__glow hero__glow--teal" aria-hidden="true" />
      <div className="hero__glow hero__glow--violet" aria-hidden="true" />

      <div className="hero__content">
        <span className="eyebrow">Behavioral wellness intelligence</span>
        <h1 className="hero__title">
          Every scroll, unlock, and
          <br />
          late night leaves a <span className="hero__title-accent">signal.</span>
        </h1>
        <p className="hero__subtitle">
          Signal reads the digital habits behind student life, screen time, sleep,
          study, and stress, and turns them into a single, clear mental health
          score. Built on a model trained across thousands of student profiles.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={scrollToForm}>
            Run my assessment
          </button>
          <div className="hero__hint">Takes about a minute · No data stored</div>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">12</span>
            <span className="hero__stat-label">lifestyle inputs analyzed</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">0–10</span>
            <span className="hero__stat-label">score scale, plainly explained</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">3</span>
            <span className="hero__stat-label">risk bands to act on</span>
          </div>
        </div>
      </div>

      <SignalWave ambient height={140} className="hero__wave" />
    </section>
  )
}
