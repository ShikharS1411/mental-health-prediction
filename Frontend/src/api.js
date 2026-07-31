const API_BASE_URL = 'https://mental-health-prediction-msd4.onrender.com'

/**
 * Custom error so the UI can tell network failures apart from
 * server-side validation/processing errors.
 */
export class ApiError extends Error {
  constructor(message, { status = null, isNetworkError = false } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.isNetworkError = isNetworkError
  }
}

/**
 * Confirms the backend is reachable. Used for an optional health check
 * but not required for the predict flow to work.
 */
export async function pingApi() {
  const response = await fetch(`${API_BASE_URL}/`, { method: 'GET' })
  if (!response.ok) {
    throw new ApiError('The server did not respond as expected.', { status: response.status })
  }
  return response.json()
}

/**
 * Sends student lifestyle data to the /predict endpoint and returns
 * the predicted mental health score.
 *
 * @param {object} payload - matches the FastAPI StudentData schema
 * @returns {Promise<{predicted_mental_health_score: number}>}
 */
export async function predictMentalHealth(payload) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    throw new ApiError(
      'Could not reach the prediction server. Please try again in a few moments.',
      { isNetworkError: true }
    )
  }

  if (!response.ok) {
    let detail = 'The server could not process this request.'
    try {
      const errorBody = await response.json()
      if (errorBody?.detail) {
        detail = Array.isArray(errorBody.detail)
          ? errorBody.detail.map((d) => d.msg || JSON.stringify(d)).join(' ')
          : String(errorBody.detail)
      }
    } catch {
      // response body wasn't JSON — fall back to the generic message
    }
    throw new ApiError(detail, { status: response.status })
  }

  return response.json()
}
