export default function Navbar() {
  const scrollToForm = () => {
    document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M1 10 L5 10 L7 4 L10 16 L12 7 L14 13 L16 10 L19 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="navbar__name">Signal</span>
        </div>

        <nav className="navbar__links">
          <a href="#how-it-works">How it works</a>
          <a href="#predict">Assessment</a>
          <a href="#result">Results</a>
        </nav>

        <button className="btn btn--ghost navbar__cta" onClick={scrollToForm}>
          Check my signal
        </button>
      </div>
    </header>
  )
}
