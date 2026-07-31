export default function Loader({ size = 18 }) {
  return (
    <span
      className="loader"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  )
}
