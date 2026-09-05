import { founders } from "../data/content";
import "./Club.css";

export default function Club() {
  return (
    <section id="club" className="section club">
      <div className="container club__layout">
        <div className="club__intro">
          <p className="section-label">Quiénes somos</p>
          <h2 className="section-title">El club</h2>
          <p className="section-lead">
            Un grupo de corredores de Puente Genil (Córdoba) que amaban este
            deporte y decidieron unirse bajo un mismo color. En la temporada
            93/94 nacieron los primeros destellos; en la Media Maratón del 94
            más de 30 atletas tomaron la salida juntos.
          </p>
          <p className="club__story">
            Rafael Manzano, primer presidente, fue uno de los pilares de la
            formación. Hoy somos más de 140 corredores y corredoras que llevan
            el nombre de Amigos del Canal —y el de Puente Genil— por todo el
            mundo. Preside el club Sandra Martínez.
          </p>
          <a className="btn btn-primary" href="#contacto">
            Quiero formar parte
          </a>
        </div>

        <aside className="club__aside" aria-label="Orígenes del club">
          <h3>Nombres que empezaron el camino</h3>
          <ul>
            {founders.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="club__aside-note">
            Y tantos más que se fueron sumando temporada tras temporada.
          </p>
        </aside>
      </div>
    </section>
  );
}
