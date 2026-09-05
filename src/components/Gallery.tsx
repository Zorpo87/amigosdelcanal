import { useCallback, useEffect, useState } from "react";
import { gallery } from "../data/content";
import "./Gallery.css";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = gallery.length;

  const go = useCallback(
    (next: number) => {
      setIndex((current) => (current + next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 4500);
    return () => window.clearInterval(id);
  }, [go, paused]);

  const slide = gallery[index];

  return (
    <section id="galeria" className="section gallery">
      <div className="container">
        <p className="section-label">Momentos</p>
        <h2 className="section-title">Galería</h2>
        <p className="section-lead">
          Un recorrido visual por salidas, metas y la energía del grupo.
        </p>
      </div>

      <div
        className="gallery__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="gallery__slide"
          style={{ background: slide.gradient }}
          key={slide.id}
        >
          <div className="gallery__overlay">
            <p className="gallery__count">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
            <h3>{slide.title}</h3>
            <p>{slide.caption}</p>
          </div>
          <div className="gallery__silhouette" aria-hidden="true" />
        </div>

        <div className="gallery__controls container">
          <button
            type="button"
            className="gallery__nav"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
          >
            ←
          </button>
          <div className="gallery__dots" role="tablist" aria-label="Diapositivas">
            {gallery.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir a ${item.title}`}
                className={i === index ? "is-active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="gallery__nav"
            onClick={() => go(1)}
            aria-label="Foto siguiente"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
