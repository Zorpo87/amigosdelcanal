import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">Amigos del Canal</p>
          <p className="footer__tag">
            Club de Atletismo Pontanés · Puente Genil
          </p>
        </div>
        <p className="footer__copy">
          © {year} amigosdelcanal.com · Felices kilómetros
        </p>
      </div>
    </footer>
  );
}
