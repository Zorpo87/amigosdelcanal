import { races } from "../data/content";
import "./Races.css";

const statusLabel = {
  abierta: "Inscripción abierta",
  proxima: "Próxima edición",
  cerrada: "Cerrada",
} as const;

export default function Races() {
  return (
    <section id="carreras" className="section races">
      <div className="container">
        <p className="section-label">Calendario</p>
        <h2 className="section-title">Carreras</h2>
        <p className="section-lead">
          Nuestra prueba estrella, la Subida a Cordobilla, y el resto de citas
          donde el verde del canal se deja ver.
        </p>

        <div className="races__grid">
          {races.map((race) => (
            <article
              key={race.id}
              className={`race ${race.highlight ? "race--highlight" : ""}`}
            >
              <div className="race__top">
                <span className={`race__status race__status--${race.status}`}>
                  {statusLabel[race.status]}
                </span>
                <span className="race__distance">{race.distance}</span>
              </div>
              <h3>{race.name}</h3>
              <dl className="race__facts">
                <div>
                  <dt>Cuándo</dt>
                  <dd>{race.date}</dd>
                </div>
                <div>
                  <dt>Dónde</dt>
                  <dd>{race.place}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
