import { news } from "../data/content";
import "./News.css";

export default function News() {
  return (
    <section id="noticias" className="section news">
      <div className="container">
        <p className="section-label">Actualidad</p>
        <h2 className="section-title">Noticias</h2>
        <p className="section-lead">
          Resultados, convocatorias y la vida del club: lo que se cuece entre
          entrenamientos y metas.
        </p>

        <div className="news__list">
          {news.map((item, index) => (
            <article
              key={item.id}
              className="news__item"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="news__meta">
                <span className="news__tag">{item.tag}</span>
                <time>{item.date}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
