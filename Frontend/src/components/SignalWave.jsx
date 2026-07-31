import { useMemo } from 'react'

/**
 * SignalWave — the signature visual of the product.
 *
 * Renders a continuously scrolling waveform. In "ambient" mode (no score)
 * it's a calm, low-amplitude line used as hero atmosphere. Once a score
 * exists, the amplitude and color react to it: a steadier, smaller wave
 * for a healthy score, a taller, more erratic, warmer-colored wave as
 * the score climbs toward high risk.
 */
function buildWavePath({ width, height, amplitude, frequency, phase, jaggedness }) {
  const midY = height / 2
  const points = []
  const steps = 120
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const t = (i / steps) * Math.PI * 2 * frequency + phase
    const noise = jaggedness ? Math.sin(t * 5.3) * jaggedness * amplitude * 0.25 : 0
    const y = midY + Math.sin(t) * amplitude + noise
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return `M ${points.join(' L ')}`
}

export default function SignalWave({
  score = null,
  height = 120,
  ambient = false,
  className = '',
}) {
  const width = 1000

  const { color, amplitude, frequency, jaggedness, speed } = useMemo(() => {
    if (score === null) {
      return {
        color: 'url(#signal-gradient-ambient)',
        amplitude: height * 0.12,
        frequency: 2.2,
        jaggedness: 0.15,
        speed: 18,
      }
    }
    const t = Math.max(0, Math.min(10, score)) / 10
    return {
      color:
        score <= 3
          ? 'var(--risk-low)'
          : score <= 6
          ? 'var(--risk-moderate)'
          : 'var(--risk-high)',
      amplitude: height * (0.1 + t * 0.32),
      frequency: 1.6 + t * 2.4,
      jaggedness: t * 0.9,
      speed: Math.max(4, 16 - t * 11),
    }
  }, [score, height])

  const pathA = buildWavePath({ width, height, amplitude, frequency, phase: 0, jaggedness })
  const pathB = buildWavePath({ width, height, amplitude, frequency, phase: Math.PI * 2, jaggedness })

  return (
    <div
      className={`signal-wave ${ambient ? 'signal-wave--ambient' : ''} ${className}`}
      style={{ height, '--signal-speed': `${speed}s` }}
      aria-hidden="true"
    >
      <svg
        className="signal-wave__track"
        viewBox={`0 0 ${width * 2} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="signal-gradient-ambient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path d={pathA} stroke={color} className="signal-wave__path" />
        <path
          d={pathB}
          stroke={color}
          className="signal-wave__path"
          transform={`translate(${width}, 0)`}
        />
      </svg>
    </div>
  )
}
