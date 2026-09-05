import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { club, getNewsBySlug, news } from './data'

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getNewsBySlug(slug) : undefined
  const [status, setStatus] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    setStatus('')
  }, [slug])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    setStatus(
      `Gracias, ${name || 'amiga/o'}. Tu mensaje queda registrado — escríbenos también a ${club.email}.`,
    )
    form.reset()
  }

  if (!article) {
    return (
      <section className="section article-page">
        <div className="container article-wrap">
          <p className="section-label">Noticias</p>
          <h1 className="article-title">Noticia no encontrada</h1>
          <p className="article-body">Esta entrada no existe o ha sido movida.</p>
          <Link className="btn btn-primary" to="/noticias">
            Volver a noticias
          </Link>
        </div>
      </section>
    )
  }

  const related = news.filter((item) => item.id !== article.id).slice(0, 2)
  const galleryHref = article.galleryUrl || '/galeria'
  const galleryReady = Boolean(article.galleryUrl)

  return (
    <article className="section article-page">
      <div className="container article-wrap">
        <Link className="article-back" to="/noticias">
          ← Volver a noticias
        </Link>

        <div className="news-meta article-meta">
          <span className="news-tag">{article.tag}</span>
          <span>{article.date}</span>
        </div>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-author">
          Publicado por <strong>{article.author}</strong>
        </p>

        <figure className="article-cover">
          <img src={article.cover} alt="" width={1400} height={800} />
        </figure>

        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-body">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <section className="article-photos" aria-label="Fotos de la noticia">
          <div className="article-photos-head">
            <h2>Fotos</h2>
            {galleryReady ? (
              <Link className="article-gallery-link" to={galleryHref}>
                Ver galería completa →
              </Link>
            ) : (
              <span className="article-gallery-soon">
                Galería completa · próximamente
              </span>
            )}
          </div>
          <div className="article-photos-grid">
            {article.photos.map((src, i) => (
              <figure key={src} className="article-photo">
                <img src={src} alt={`Foto ${i + 1} — ${article.title}`} loading="lazy" />
              </figure>
            ))}
          </div>
          {!galleryReady && (
            <p className="article-gallery-note">
              Cuando la galería de esta prueba esté disponible, el enlace aparecerá
              aquí. Mientras tanto puedes ver la{' '}
              <Link to="/galeria">galería del club</Link>.
            </p>
          )}
        </section>

        {related.length > 0 && (
          <aside className="article-related">
            <h2>Más noticias</h2>
            <ul>
              {related.map((item) => (
                <li key={item.id}>
                  <Link to={`/noticias/${item.slug}`}>
                    <span className="news-tag">{item.tag}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <section className="article-contact" aria-labelledby="article-contact-title">
          <p className="section-label">Escríbenos</p>
          <h2 id="article-contact-title" className="article-contact-title">
            Contacto
          </h2>
          <p className="article-contact-lead">
            ¿Dudas sobre esta noticia, inscripciones o el club? Déjanos un mensaje.
          </p>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="article-name">Nombre</label>
                <input
                  id="article-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="article-email">Email</label>
                <input
                  id="article-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="article-phone">Teléfono</label>
              <input
                id="article-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            <div className="field">
              <label htmlFor="article-subject">Asunto</label>
              <input
                id="article-subject"
                name="subject"
                type="text"
                defaultValue={`Consulta: ${article.title}`}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="article-message">Mensaje</label>
              <textarea id="article-message" name="message" required />
            </div>
            <button className="btn btn-primary" type="submit">
              Enviar mensaje
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </section>
      </div>
    </article>
  )
}
