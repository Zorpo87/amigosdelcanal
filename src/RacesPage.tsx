import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContactSection from './ContactSection'
import { races } from './data'

export default function RacesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="section article-page">
        <div className="container">
          <Link className="article-back" to="/#carreras">
            ← Volver al inicio
          </Link>
          <p className="section-label">Calendario</p>
          <h1 className="section-title">
            Carreras oficiales del club temporada 26/27
          </h1>
          <p className="section-lead">
            Diez citas oficiales para correr juntos de septiembre a junio.
          </p>

          <div className="races-wrap">
            {races.map((race) => (
              <article
                className={`race-row${race.highlight ? ' is-highlight' : ''}`}
                key={race.id}
              >
                <div className="race-date">
                  <strong>{race.date}</strong>
                </div>
                <div className="race-body">
                  <div className="race-edition">{race.edition}</div>
                  <h2>{race.name}</h2>
                  <p>{race.place}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactSection idPrefix="carreras" />
    </>
  )
}
