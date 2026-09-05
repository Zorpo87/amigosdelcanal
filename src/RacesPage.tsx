import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContactSection from './ContactSection'
import { races } from './data'

export default function RacesPage() {
  const [activePoster, setActivePoster] = useState<(typeof races)[number] | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!activePoster) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePoster(null)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [activePoster])

  return (
    <>
      <section className="section article-page">
        <div className="container">
          <Link className="article-back" to="/#carreras">
            ← Volver al inicio
          </Link>
          <p className="section-label">Calendario</p>
          <h1 className="section-title">Carreras</h1>
          <p className="section-lead">
            Pruebas del club y citas del calendario. Pulsa el cartel para verlo
            ampliado.
          </p>

          <div className="races-wrap">
            {races.map((race) => (
              <article
                className={`race-row${race.highlight ? ' is-highlight' : ''}`}
                key={race.id}
              >
                <button
                  type="button"
                  className="race-poster-btn"
                  onClick={() => setActivePoster(race)}
                  aria-label={`Ver cartel de ${race.name}`}
                >
                  <img
                    className="race-poster"
                    src={race.poster}
                    alt={race.posterAlt}
                    width={120}
                    height={170}
                    loading="lazy"
                  />
                  <span className="race-poster-zoom" aria-hidden>
                    Ampliar
                  </span>
                </button>
                <div className="race-body">
                  <div className="race-edition">{race.edition}</div>
                  <h2>{race.name}</h2>
                  <p>
                    {race.place} · {race.note}
                  </p>
                </div>
                <div className="race-stats">
                  <strong>{race.distance}</strong>
                  {race.date}
                </div>
              </article>
            ))}
          </div>
        </div>

        {activePoster && (
          <div
            className="poster-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activePoster.posterAlt}
            onClick={() => setActivePoster(null)}
          >
            <div
              className="poster-lightbox-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="poster-lightbox-close"
                onClick={() => setActivePoster(null)}
                aria-label="Cerrar cartel"
              >
                ×
              </button>
              <img
                src={activePoster.poster}
                alt={activePoster.posterAlt}
                className="poster-lightbox-img"
              />
              <div className="poster-lightbox-meta">
                <span>{activePoster.edition}</span>
                <strong>{activePoster.name}</strong>
                <p>
                  {activePoster.date} · {activePoster.place}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <ContactSection idPrefix="carreras" />
    </>
  )
}
