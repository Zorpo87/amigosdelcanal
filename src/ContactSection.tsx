import { useState, type FormEvent } from 'react'
import { club } from './data'

type ContactSectionProps = {
  idPrefix?: string
  className?: string
}

export default function ContactSection({
  idPrefix = '',
  className = '',
}: ContactSectionProps) {
  const [status, setStatus] = useState('')
  const pid = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)

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

  return (
    <section className={`section ${className}`.trim()} id={idPrefix ? undefined : 'contacto'}>
      <div className="container">
        <div>
          <p className="section-label">Escríbenos</p>
          <h2 className="section-title">Contacto</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <img
              className="contact-logo"
              src="/logo.png"
              alt="Amigos del Canal"
              width={120}
              height={120}
            />
            <p>
              ¿Quieres unirte al club, participar en la Subida a Cordobilla o colaborar
              como voluntario? Estamos en {club.location}.
            </p>
            <div className="contact-detail">
              <span>Email</span>
              <a href={`mailto:${club.email}`}>{club.email}</a>
            </div>
            <div className="contact-detail">
              <span>Redes</span>
              <strong>{club.twitter}</strong>
            </div>
            <div className="contact-detail">
              <span>Presidencia</span>
              <strong>{club.president}</strong>
            </div>
          </div>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor={pid('name')}>Nombre</label>
                <input
                  id={pid('name')}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor={pid('email')}>Email</label>
                <input
                  id={pid('email')}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor={pid('phone')}>Teléfono</label>
              <input
                id={pid('phone')}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            <div className="field">
              <label htmlFor={pid('subject')}>Asunto</label>
              <input id={pid('subject')} name="subject" type="text" required />
            </div>
            <div className="field">
              <label htmlFor={pid('message')}>Mensaje</label>
              <textarea id={pid('message')} name="message" required />
            </div>
            <button className="btn btn-primary" type="submit">
              Enviar mensaje
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
