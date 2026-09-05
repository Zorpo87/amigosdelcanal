import { useEffect, useState } from "react";
import "./Header.css";

const links = [
  { href: "#noticias", label: "Noticias" },
  { href: "#carreras", label: "Carreras" },
  { href: "#club", label: "El club" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header__inner">
        <a href="#inicio" className="header__brand" onClick={() => setOpen(false)}>
          <span className="header__mark" aria-hidden="true" />
          <span className="header__name">Amigos del Canal</span>
        </a>

        <button
          className={`header__toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav
          id="nav-menu"
          className={`header__nav ${open ? "is-open" : ""}`}
          aria-label="Principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="btn btn-primary header__cta"
            href="#contacto"
            onClick={() => setOpen(false)}
          >
            Únete
          </a>
        </nav>
      </div>
    </header>
  );
}
