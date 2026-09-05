import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GALLERY_PREVIEW_COUNT, galleryAlbums } from './data'

export default function GalleryHub() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="section article-page gallery-hub-page">
      <div className="container">
        <Link className="article-back" to="/#galeria">
          ← Volver al inicio
        </Link>
        <p className="section-label">Imágenes</p>
        <h1 className="section-title">Galería</h1>
        <p className="section-lead">
          Momentos del club por pruebas: salidas, metas y convivencia. Cada
          galería muestra 5 fotos y el enlace al álbum completo.
        </p>

        <div className="gallery-albums">
          {galleryAlbums.map((album) => {
            const preview = album.photos.slice(0, GALLERY_PREVIEW_COUNT)
            const remaining = Math.max(0, album.photos.length - GALLERY_PREVIEW_COUNT)

            return (
              <section key={album.id} className="gallery-album-block">
                <div className="gallery-album-head">
                  <div>
                    <p className="gallery-album-edition">
                      {album.edition} · {album.year}
                    </p>
                    <h2>{album.name}</h2>
                    <p className="gallery-album-place">{album.place}</p>
                  </div>
                  <Link className="btn btn-ghost" to={`/galeria/${album.slug}`}>
                    Ver galería completa
                    {remaining > 0 ? ` (+${remaining})` : ''}
                  </Link>
                </div>

                <div className="gallery-album-preview">
                  {preview.map((photo, i) => (
                    <Link
                      key={`${album.slug}-${i}`}
                      to={`/galeria/${album.slug}`}
                      className="gallery-album-thumb"
                    >
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        loading="lazy"
                        width={480}
                        height={360}
                      />
                      <span>{photo.caption}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
