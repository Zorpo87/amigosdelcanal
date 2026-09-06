import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { club, gallery, getLatestNews, heroSlides, races, sponsors } from './data'
import ContactSection from './ContactSection'
import NewsArticle from './NewsArticle'
import NewsList from './NewsList'
import GalleryHub from './GalleryHub'
import GalleryAlbum from './GalleryAlbum'
import RacesPage from './RacesPage'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav-inner">
        <a href="/#inicio" className="nav-brand" onClick={close}>
          <img
            className="nav-logo"
            src="/logo.png"
            alt="Club Atletismo Pontanés Amigos del Canal"
            width={48}
            height={48}
          />
          <span className="nav-brand-text">Amigos del Canal</span>
        </a>
        <button
          className="nav-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="nav-menu">
          <ul className="nav-links">
            <li>
              <a href="/noticias" onClick={close}>
                Noticias
              </a>
            </li>
            <li>
              <a href="/carreras" onClick={close}>
                Carreras
              </a>
            </li>
            <li>
              <a href="/#club" onClick={close}>
                El club
              </a>
            </li>
            <li>
              <a href="/galeria" onClick={close}>
                Galería
              </a>
            </li>
          </ul>
          <a className="nav-cta" href="/#contacto" onClick={close}>
            Contacto
          </a>
        </div>
      </div>
      {open && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Cerrar menú"
          onClick={close}
        />
      )}
    </header>
  )
}

function Hero() {
  const [active, setActive] = useState(0)
  const slide = heroSlides[active]

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length)
    }, 6000)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="hero" id="inicio" aria-roledescription="carrusel">
      <div className="hero-media" aria-hidden>
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`hero-slide${index === active ? ' is-active' : ''}`}
          >
            <img
              className="hero-photo"
              src={item.image}
              alt=""
              width={2400}
              height={1600}
              fetchPriority={index === 0 ? 'high' : 'low'}
            />
          </div>
        ))}
        <div className="hero-shade" />
      </div>

      <div className="hero-content">
        <p className="hero-kicker">
          <img
            className="hero-logo-mark"
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            aria-hidden
          />
          Desde Puente Genil, con ganas
        </p>
        <h1 className="hero-brand">
          Amigos
          <span>del Canal</span>
        </h1>
        <div key={slide.id} className="hero-copy">
          <p className="hero-headline">{slide.headline}</p>
          <p className="hero-sub">{slide.text}</p>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#carreras">
            Ver carreras
          </a>
          <a className="btn btn-ghost" href="#club">
            Conócenos
          </a>
        </div>
      </div>

      <div className="hero-chrome">
        <div className="hero-dots" role="tablist" aria-label="Imágenes del hero">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Mostrar imagen ${index + 1}`}
              className={`hero-dot${index === active ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <p className="hero-meta">
          Más de {club.members.replace('+', '')} socios · desde {club.founded}
        </p>
      </div>
    </section>
  )
}

function News() {
  const latest = getLatestNews(3)

  return (
    <section className="section" id="noticias">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Actualidad</p>
          <h2 className="section-title">Noticias</h2>
          <p className="section-lead">
            Resultados, convocatorias y la vida del club semana a semana.
          </p>
        </div>
        <div className="news-grid">
          {latest.map((item, i) => (
            <Link
              to={`/noticias/${item.slug}`}
              className="news-item reveal"
              key={item.id}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="news-cover">
                <img src={item.cover} alt="" loading="lazy" width={640} height={400} />
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
        <div className="news-all reveal">
          <Link className="btn btn-primary" to="/noticias">
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  )
}

function Races() {
  return (
    <section className="section" id="carreras">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Calendario</p>
          <h2 className="section-title">Carreras oficiales del club temporada 26/27</h2>
          <p className="section-lead">
            Diez citas oficiales para correr juntos de septiembre a junio.
          </p>
        </div>
        <div className="races-wrap">
          {races.map((race, i) => (
            <article
              className={`race-row reveal${race.highlight ? ' is-highlight' : ''}`}
              key={race.id}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="race-date">
                <strong>{race.date}</strong>
              </div>
              <div className="race-body">
                <div className="race-edition">{race.edition}</div>
                <h3>{race.name}</h3>
                <p>{race.place}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="news-all reveal">
          <Link className="btn btn-ghost" to="/carreras">
            Ver todas las carreras
          </Link>
        </div>
      </div>
    </section>
  )
}

function Club() {
  return (
    <section className="section" id="club">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Quiénes somos</p>
          <h2 className="section-title">El club</h2>
        </div>
        <div className="club-layout">
          <div className="club-story reveal">
            <img
              className="club-logo"
              src="/logo.png"
              alt="Logo Club Atletismo Pontanés Amigos del Canal"
              width={220}
              height={220}
            />
            <p>
              Un grupo de corredores que amaban este deporte decidió reunirse y formar el
              club. En la temporada {club.founded} nacieron los primeros destellos; el más
              importante, la Media Maratón del 94, con más de 30 atletas bajo un mismo color.
            </p>
            <p>
              Rafael Manzano, primer presidente, fue uno de los pilares de la formación. Hoy
              el club lo lidera {club.president} y lo forman más de 140 corredores y
              corredoras que llevan el nombre de Amigos del Canal — y el de Puente Genil —
              por toda España y más allá.
            </p>
            <p>
              Organizamos la Subida a Cordobilla, colaboramos en el Duatlón Villa de
              Puente-Genil y entrenamos con la misma idea de siempre: kilómetros, compañerismo
              y sonrisa.
            </p>
            <div className="club-cta">
              <p className="club-cta-text">¿Quieres unirte a esta gran familia?</p>
              <a className="btn btn-primary" href="#contacto">
                Contacto
              </a>
            </div>
          </div>
          <div className="club-stats reveal">
            <div className="club-stat">
              <strong>{club.founded}</strong>
              <span>Temporada fundación</span>
            </div>
            <div className="club-stat">
              <strong>{club.members}</strong>
              <span>Socios y socias</span>
            </div>
            <div className="club-stat">
              <strong>XXVII</strong>
              <span>Subida a Cordobilla</span>
            </div>
            <div className="club-stat">
              <strong>PG</strong>
              <span>Puente Genil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [index, setIndex] = useState(0)
  const total = gallery.length

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [total])

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Imágenes</p>
          <h2 className="section-title">Galería</h2>
          <p className="section-lead">
            Momentos del club: salidas, metas, entrenos y convivencia.
          </p>
        </div>
        <div className="gallery reveal" aria-roledescription="carrusel">
          {gallery.map((slide, i) => (
            <div
              key={slide.id}
              className={`gallery-slide${i === index ? ' is-active' : ''}`}
              aria-hidden={i !== index}
            >
              <div
                className="gallery-visual"
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={slide.title}
              />
              <div className="gallery-caption">
                <h3>{slide.title}</h3>
                <p>{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-controls">
          <div className="gallery-dots" role="tablist" aria-label="Diapositivas">
            {gallery.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={`gallery-dot${i === index ? ' is-active' : ''}`}
                aria-label={`Ir a ${slide.title}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <div className="gallery-arrows">
            <button type="button" onClick={prev} aria-label="Anterior">
              ←
            </button>
            <button type="button" onClick={next} aria-label="Siguiente">
              →
            </button>
          </div>
        </div>
        <div className="news-all reveal">
          <Link className="btn btn-primary" to="/galeria">
            Ver toda la galería
          </Link>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return <ContactSection />
}

function Sponsors() {
  return (
    <section className="section section-sponsors" id="patrocinadores">
      <div className="container sponsors-layout">
        <div className="sponsors-copy">
          <p className="section-label">Colaboran con el club</p>
          <h2 className="section-title">Nuestros patrocinadores</h2>
          <p className="section-lead">
            Empresas y firmas que hacen posibles nuestras carreras, entrenos y
            convivencia.
          </p>
        </div>
        <ul className="sponsors-grid">
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="sponsor-item">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="sponsor-logo"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="/#inicio" className="footer-brand">
          <img
            className="footer-logo"
            src="/logo.png"
            alt="Amigos del Canal"
            width={64}
            height={64}
          />
          <span>
            Amigos <em>del Canal</em>
          </span>
        </a>
        <p>
          {club.fullName} · {club.location} · amigosdelcanal.com
        </p>
      </div>
    </footer>
  )
}

function Home() {
  const pageRef = useReveal()

  return (
    <div ref={pageRef}>
      <main>
        <Hero />
        <News />
        <Races />
        <Club />
        <Gallery />
        <Contact />
        <Sponsors />
      </main>
    </div>
  )
}

function WhatsAppFloat() {
  const message = encodeURIComponent(
    'Hola, os escribo desde la web de Amigos del Canal.',
  )
  const href = `https://wa.me/${club.whatsapp}?text=${message}`

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
        />
      </svg>
    </a>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carreras" element={<RacesPage />} />
        <Route path="/noticias" element={<NewsList />} />
        <Route path="/noticias/:slug" element={<NewsArticle />} />
        <Route path="/galeria" element={<GalleryHub />} />
        <Route path="/galeria/:slug" element={<GalleryAlbum />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
