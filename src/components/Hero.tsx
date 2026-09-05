import "./Hero.css";

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-label="Inicio">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__track" />
        <div className="hero__grain" />
      </div>

      <div className="container hero__content">
        <p className="hero__brand">Amigos del Canal</p>
        <h1 className="hero__title">Corremos juntos desde Puente Genil</h1>
        <p className="hero__lead">
          Club de Atletismo Pontanés. Más de 140 corredores y corredoras
          representando a nuestra tierra en cada kilómetro.
        </p>
        <div className="hero__actions">
          <a className="btn btn-primary" href="#carreras">
            Ver carreras
          </a>
          <a className="btn btn-ghost" href="#club">
            Conoce el club
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}
