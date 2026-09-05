import { FormEvent, useState } from "react";
import "./Contact.css";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    setForm(initial);
  }

  return (
    <section id="contacto" className="section contact">
      <div className="container contact__layout">
        <div>
          <p className="section-label">Escríbenos</p>
          <h2 className="section-title">Contacto</h2>
          <p className="section-lead">
            ¿Quieres entrenar con nosotros, participar en la Subida a Cordobilla
            o colaborar con el club? Déjanos tu mensaje.
          </p>

          <ul className="contact__info">
            <li>
              <span>Email</span>
              <a href="mailto:clubamigosdelcanal@gmail.com">
                clubamigosdelcanal@gmail.com
              </a>
            </li>
            <li>
              <span>Sede</span>
              <p>Puente Genil, Córdoba</p>
            </li>
            <li>
              <span>Web</span>
              <a href="https://amigosdelcanal.com">amigosdelcanal.com</a>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={onSubmit} noValidate>
          <div className="contact__field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="contact__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="contact__field">
            <label htmlFor="subject">Asunto</label>
            <input
              id="subject"
              name="subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <div className="contact__field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Enviar mensaje
          </button>
          {sent && (
            <p className="contact__success" role="status">
              Gracias. Tu mensaje queda listo para enviarse. Conecta este
              formulario a tu correo o servicio cuando publiques la web.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
