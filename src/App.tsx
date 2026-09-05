import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { club, gallery, getLatestNews, races, sponsors } from './data'
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
    </header>
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const media = mediaRef.current
    if (!hero || !media) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      targetX = nx * 18
      targetY = ny * 12
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      media.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`)
      media.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`)
      raf = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" id="inicio" ref={heroRef}>
      <div className="hero-media" ref={mediaRef} aria-hidden>
        <img
          className="hero-photo"
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=2400&q=85"
          alt=""
          width={2400}
          height={1600}
          fetchPriority="high"
        />
        <div className="hero-photo-blur" />
        <div className="hero-shade" />
        <div className="hero-speed" />
        <div className="hero-glow" />
      </div>
      <div className="hero-track" aria-hidden />
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
          Club de atletismo · Puente Genil
        </p>
        <h1 className="hero-brand">
          Amigos
          <span>del Canal</span>
        </h1>
        <p className="hero-headline">Corremos juntos desde Puente Genil</p>
        <p className="hero-sub">
          Club de atletismo y running con más de tres décadas de kilómetros, amistad y
          competición. Representamos a {club.location.split(',')[0]} en cada salida.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#carreras">
            Ver carreras
          </a>
          <a className="btn btn-ghost" href="#club">
            Conoce el club
          </a>
        </div>
        <div className="hero-meta">
          <strong>{club.members}</strong>
          atletas · desde {club.founded}
        </div>
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
  const [activePoster, setActivePoster] = useState<(typeof races)[number] | null>(null)

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
    <section className="section" id="carreras">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Calendario</p>
          <h2 className="section-title">Carreras</h2>
          <p className="section-lead">
            Nuestra prueba estrella, el duatlón local y las citas donde el club suele
            estar presente. Pulsa el cartel para verlo ampliado.
          </p>
        </div>
        <div className="races-wrap">
          {races.map((race, i) => (
            <article
              className={`race-row reveal${race.highlight ? ' is-highlight' : ''}`}
              key={race.id}
              style={{ transitionDelay: `${i * 60}ms` }}
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
                <h3>{race.name}</h3>
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
        <div className="news-all reveal">
          <Link className="btn btn-ghost" to="/carreras">
            Ver todas las carreras
          </Link>
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
          <div className="poster-lightbox-panel" onClick={(e) => e.stopPropagation()}>
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
    </>
  )
}
