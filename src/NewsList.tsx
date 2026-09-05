import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContactSection from './ContactSection'
import { getNewsSorted } from './data'

export default function NewsList() {
  const items = getNewsSorted()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="section article-page news-list-page">
        <div className="container">
          <Link className="article-back" to="/#noticias">
            ← Volver al inicio
          </Link>
          <p className="section-label">Blog del club</p>
          <h1 className="section-title">Noticias Amigos del Canal</h1>
          <p className="section-lead">
            Todas las crónicas, convocatorias y momentos del Club de Atletismo
            Pontanés Amigos del Canal.
          </p>

          <div className="news-grid news-list-grid">
            {items.map((item) => (
              <Link
                to={`/noticias/${item.slug}`}
                className="news-item"
                key={item.id}
              >
                <div className="news-cover">
                  <img
                    src={item.cover}
                    alt=""
                    loading="lazy"
                    width={640}
                    height={400}
                  />
                </div>
                <div className="news-meta">
                  <span className="news-tag">{item.tag}</span>
                  <span>{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="news-author">Por {item.author}</p>
                <p>{item.excerpt}</p>
                <span className="news-read">Leer más →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection idPrefix="blog" />
    </>
  )
}
