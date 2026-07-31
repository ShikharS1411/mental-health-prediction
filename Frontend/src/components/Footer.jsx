export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="navbar__mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M1 10 L5 10 L7 4 L10 16 L12 7 L14 13 L16 10 L19 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Signal
        </div>
        <p className="footer__note">
          Built for research and self-reflection. Not a substitute for
          professional medical advice.
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} Signal. All rights reserved.</p>
      </div>
    </footer>
  )
}
