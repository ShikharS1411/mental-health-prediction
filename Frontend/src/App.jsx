import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import PredictionForm from './components/PredictionForm.jsx'
import PredictionResult from './components/PredictionResult.jsx'
import Footer from './components/Footer.jsx'
import { predictMentalHealth, ApiError } from './api.js'
import './App.css'

export default function App() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async (payload) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await predictMentalHealth(payload)
      setResult(data)
      requestAnimationFrame(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      setError(message)
      requestAnimationFrame(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
        <PredictionResult result={result} error={error} onRetry={handleRetry} />
      </main>
      <Footer />
    </div>
  )
}
