import { useState } from 'react'
import Loader from './Loader.jsx'

const PLATFORMS = [
  'Facebook',
  'LinkedIn',
  'Instagram',
  'Snapchat',
  'Twitter',
  'YouTube',
  'TikTok',
  'LINE',
  'KakaoTalk',
  'VKontakte',
  'WhatsApp',
  'WeChat',
]

const PURPOSES = ['Networking', 'Education', 'Entertainment', 'News']
const ACADEMIC_LEVELS = ['High School', 'Undergraduate', 'Graduate']
const STRESS_LEVELS = ['Low', 'Medium', 'High', 'Very High']

const INITIAL_FORM = {
  age: '',
  gender: 'Male',
  country: '',
  academic_level: 'Undergraduate',
  most_used_platform: 'Instagram',
  purpose_of_use: 'Education',
  avg_daily_usage_hours: '',
  daily_unlocks: '',
  study_hours: '',
  physical_activity_hours: '',
  sleep_hours_per_night: '',
  stress_level: 'Medium',
}

function validate(form) {
  const errors = {}

  if (form.age === '' || Number.isNaN(Number(form.age))) {
    errors.age = 'Enter an age.'
  } else if (Number(form.age) < 10 || Number(form.age) > 100) {
    errors.age = 'Age must be between 10 and 100.'
  }

  if (!form.country.trim()) {
    errors.country = 'Enter a country.'
  } else if (form.country.trim().length > 56) {
    errors.country = 'That country name looks too long.'
  }

  const hourFields = [
    ['avg_daily_usage_hours', 'Average daily usage'],
    ['study_hours', 'Study hours'],
    ['physical_activity_hours', 'Physical activity hours'],
    ['sleep_hours_per_night', 'Sleep hours'],
  ]
  for (const [key, label] of hourFields) {
    const value = form[key]
    if (value === '' || Number.isNaN(Number(value))) {
      errors[key] = `Enter ${label.toLowerCase()}.`
    } else if (Number(value) < 0 || Number(value) > 24) {
      errors[key] = `${label} must be between 0 and 24.`
    }
  }

  if (form.daily_unlocks === '' || Number.isNaN(Number(form.daily_unlocks))) {
    errors.daily_unlocks = 'Enter a number of daily unlocks.'
  } else if (Number(form.daily_unlocks) < 0) {
    errors.daily_unlocks = 'Daily unlocks cannot be negative.'
  } else if (!Number.isInteger(Number(form.daily_unlocks))) {
    errors.daily_unlocks = 'Daily unlocks must be a whole number.'
  }

  const totalDailyHours =
    Number(form.avg_daily_usage_hours || 0) +
    Number(form.study_hours || 0) +
    Number(form.physical_activity_hours || 0) +
    Number(form.sleep_hours_per_night || 0)

  if (totalDailyHours > 24 && !errors.avg_daily_usage_hours && !errors.study_hours && !errors.physical_activity_hours && !errors.sleep_hours_per_night) {
    errors.avg_daily_usage_hours = 'Usage, study, activity, and sleep hours add up to more than 24 in a day.'
  }

  return errors
}

export default function PredictionForm({ onPredict, isLoading }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => validate({ ...form, [field]: value }))
    }
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, ...validate(form) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    setTouched(
      Object.keys(INITIAL_FORM).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    )

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = document.querySelector('[data-error="true"]')
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    onPredict({
      age: Number(form.age),
      gender: form.gender,
      country: form.country.trim(),
      academic_level: form.academic_level,
      most_used_platform: form.most_used_platform,
      purpose_of_use: form.purpose_of_use,
      avg_daily_usage_hours: Number(form.avg_daily_usage_hours),
      daily_unlocks: Number(form.daily_unlocks),
      study_hours: Number(form.study_hours),
      physical_activity_hours: Number(form.physical_activity_hours),
      sleep_hours_per_night: Number(form.sleep_hours_per_night),
      stress_level: form.stress_level,
    })
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setTouched({})
  }

  const fieldError = (field) => (touched[field] && errors[field] ? errors[field] : null)

  return (
    <section className="predict" id="predict">
      <div className="predict__intro">
        <span className="eyebrow">Assessment</span>
        <h2>Tell us about a typical day</h2>
        <p>
          Twelve fields, all reversible, none stored. The more accurately these
          reflect an average day, the sharper the reading.
        </p>
      </div>

      <form className="form-card glass" onSubmit={handleSubmit} noValidate>
        <fieldset className="form-group">
          <legend>Profile</legend>
          <div className="form-grid">
            <Field label="Age" error={fieldError('age')}>
              <input
                type="number"
                min={10}
                max={100}
                placeholder="e.g. 21"
                value={form.age}
                onChange={handleChange('age')}
                onBlur={handleBlur('age')}
                data-error={Boolean(fieldError('age'))}
              />
            </Field>

            <Field label="Gender" error={fieldError('gender')}>
              <select value={form.gender} onChange={handleChange('gender')}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>

            <Field label="Country" error={fieldError('country')}>
              <input
                type="text"
                placeholder="e.g. India"
                value={form.country}
                onChange={handleChange('country')}
                onBlur={handleBlur('country')}
                data-error={Boolean(fieldError('country'))}
              />
            </Field>

            <Field label="Academic level" error={fieldError('academic_level')}>
              <select value={form.academic_level} onChange={handleChange('academic_level')}>
                {ACADEMIC_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <legend>Digital habits</legend>
          <div className="form-grid">
            <Field label="Most used platform" error={fieldError('most_used_platform')}>
              <select value={form.most_used_platform} onChange={handleChange('most_used_platform')}>
                {PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Purpose of use" error={fieldError('purpose_of_use')}>
              <select value={form.purpose_of_use} onChange={handleChange('purpose_of_use')}>
                {PURPOSES.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Avg. daily usage (hours)" error={fieldError('avg_daily_usage_hours')} hint="0–24">
              <input
                type="number"
                min={0}
                max={24}
                step={0.1}
                placeholder="e.g. 4.5"
                value={form.avg_daily_usage_hours}
                onChange={handleChange('avg_daily_usage_hours')}
                onBlur={handleBlur('avg_daily_usage_hours')}
                data-error={Boolean(fieldError('avg_daily_usage_hours'))}
              />
            </Field>

            <Field label="Daily unlocks" error={fieldError('daily_unlocks')}>
              <input
                type="number"
                min={0}
                step={1}
                placeholder="e.g. 55"
                value={form.daily_unlocks}
                onChange={handleChange('daily_unlocks')}
                onBlur={handleBlur('daily_unlocks')}
                data-error={Boolean(fieldError('daily_unlocks'))}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <legend>Lifestyle</legend>
          <div className="form-grid">
            <Field label="Study hours" error={fieldError('study_hours')} hint="0–24">
              <input
                type="number"
                min={0}
                max={24}
                step={0.1}
                placeholder="e.g. 6"
                value={form.study_hours}
                onChange={handleChange('study_hours')}
                onBlur={handleBlur('study_hours')}
                data-error={Boolean(fieldError('study_hours'))}
              />
            </Field>

            <Field label="Physical activity (hours)" error={fieldError('physical_activity_hours')} hint="0–24">
              <input
                type="number"
                min={0}
                max={24}
                step={0.1}
                placeholder="e.g. 1"
                value={form.physical_activity_hours}
                onChange={handleChange('physical_activity_hours')}
                onBlur={handleBlur('physical_activity_hours')}
                data-error={Boolean(fieldError('physical_activity_hours'))}
              />
            </Field>

            <Field label="Sleep per night (hours)" error={fieldError('sleep_hours_per_night')} hint="0–24">
              <input
                type="number"
                min={0}
                max={24}
                step={0.1}
                placeholder="e.g. 7"
                value={form.sleep_hours_per_night}
                onChange={handleChange('sleep_hours_per_night')}
                onBlur={handleBlur('sleep_hours_per_night')}
                data-error={Boolean(fieldError('sleep_hours_per_night'))}
              />
            </Field>

            <Field label="Stress level" error={fieldError('stress_level')}>
              <select value={form.stress_level} onChange={handleChange('stress_level')}>
                {STRESS_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={handleReset} disabled={isLoading}>
            Reset
          </button>
          <button type="submit" className="btn btn--primary btn--wide" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader size={16} />
                Analyzing...
              </>
            ) : (
              'Predict my score'
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

function Field({ label, error, hint, children }) {
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <span className="field__label">
        {label}
        {hint && <span className="field__hint">{hint}</span>}
      </span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}
