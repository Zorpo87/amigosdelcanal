import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGalleryAlbum } from './data'

export default function GalleryAlbum() {
  const { slug } = useParams<{ slug: string }>()
  const album = slug ? getGalleryAlbum(slug) : undefined
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActive(null)
  }, [slug])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (!album) return
      if (e.key === 'ArrowRight') {
        setActive((i) => (i === null ? 0 : (i + 1) % album.photos.length))
      }
      if (e.key === 'ArrowLeft') {
        setActive((i) =>
          i === null ? 0 : (i - 1 + album.photos.length) % album.photos.length,
        )
      }
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [active, album])

  if (!album) {
    return (
      <section className="section article-page">
        <div className="container article-wrap">
          <h1 className="article-title">Galería no encontrada</h1>
          <Link className="btn btn-primary" to="/galeria">
            Volver a galería
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section article-page gallery-album-page">
      <div className="container">
        <Link className="article-back" to="/galeria">
          ← Todas las galerías
        </Link>
        <p className="section-label">
          {album.edition} · {album.year}
        </p>
        <h1 className="section-title">{album.name}</h1>
        <p className="section-lead">
          {album.place} · {album.photos.length} fotos
        </p>

        <div className="gallery-full-grid">
          {album.photos.map((photo, i) => (
            <button
              key={`${album.slug}-full-${i}`}
              type="button"
              className="gallery-full-item"
              onClick={() => setActive(i)}
              aria-label={`Ampliar: ${photo.caption}`}
            >
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <span>{photo.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="poster-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={album.photos[active].caption}
          onClick={() => setActive(null)}
        >
          <div className="poster-lightbox-panel gallery-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="poster-lightbox-close"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <img
              className="poster-lightbox-img"
              src={album.photos[active].src}
              alt={album.photos[active].caption}
            />
            <div className="poster-lightbox-meta">
              <span>
                {active + 1} / {album.photos.length}
              </span>
              <strong>{album.photos[active].caption}</strong>
              <p>
                {album.edition} {album.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
