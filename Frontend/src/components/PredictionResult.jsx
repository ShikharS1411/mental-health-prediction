import SignalWave from './SignalWave.jsx'

function getRiskBand(score) {
  if (score <= 3) {
    return {
      label: 'Low risk',
      note: 'Habits look well balanced. Keep an eye on things during busy weeks.',
      color: 'var(--risk-low)',
      key: 'low',
    }
  }
  if (score <= 6) {
    return {
      label: 'Moderate risk',
      note: 'A few habits, likely screen time, sleep, or stress, are pulling the score up.',
      color: 'var(--risk-moderate)',
      key: 'moderate',
    }
  }
  return {
    label: 'High risk',
    note: 'Several factors are compounding. Consider talking to a counselor or trusted adult.',
    color: 'var(--risk-high)',
    key: 'high',
  }
}

export default function PredictionResult({ result, error, onRetry }) {
  if (error) {
    return (
      <section className="result" id="result">
        <div className="result-card glass result-card--error">
          <span className="eyebrow eyebrow--danger">Something went wrong</span>
          <h3>The prediction didn't go through</h3>
          <p className="result-card__error-message">{error}</p>
          <button className="btn btn--primary" onClick={onRetry}>
            Try again
          </button>
        </div>
      </section>
    )
  }

  if (!result) {
    return null
  }

  const score = Math.max(0, Math.min(10, result.predicted_mental_health_score))
  const percent = (score / 10) * 100
  const band = getRiskBand(score)

  return (
    <section className="result" id="result">
      <div className="result-card glass" style={{ '--risk-color': band.color }}>
        <span className="eyebrow">Your reading</span>
        <h3>Mental wellness signal</h3>

        <div className="result-card__score-row">
          <span className="result-card__score">{score.toFixed(2)}</span>
          <span className="result-card__scale">/ 10</span>
        </div>

        <div className="result-card__bar-track">
          <div
            className="result-card__bar-fill"
            style={{ width: `${percent}%`, background: band.color }}
          />
        </div>

        <div className="result-card__band" data-band={band.key}>
          <span className="result-card__band-dot" style={{ background: band.color }} />
          {band.label}
        </div>

        <p className="result-card__note">{band.note}</p>

        <SignalWave score={score} height={90} className="result-card__wave" />

        <p className="result-card__disclaimer">
          This score is a statistical estimate from lifestyle patterns, not a
          clinical diagnosis. If you're struggling, please reach out to a
          mental health professional.
        </p>
      </div>
    </section>
  )
}
