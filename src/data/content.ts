export type NewsItem = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
};

export type Race = {
  id: string;
  name: string;
  date: string;
  distance: string;
  place: string;
  status: "abierta" | "proxima" | "cerrada";
  highlight?: boolean;
};

export type GallerySlide = {
  id: string;
  title: string;
  caption: string;
  gradient: string;
};

export const news: NewsItem[] = [
  {
    id: "1",
    date: "21 Sep 2025",
    title: "XXVII Subida a Cordobilla: tradición y esfuerzo en Puente Genil",
    excerpt:
      "Nuestra carrera más emblemática volvió a unir a corredores locales y visitantes en el trazado de más de 8 km desde la Plaza del Ancla hasta Cordobilla.",
    tag: "Carrera",
  },
  {
    id: "2",
    date: "Temporada",
    title: "Cierre de temporada con fuerte presencia en duatlón y nocturnas",
    excerpt:
      "El club fue el más numeroso en el XXVI Duatlón Villa de Puente-Genil y brilló en Antequera, Écija, Córdoba y Mallorca.",
    tag: "Resultados",
  },
  {
    id: "3",
    date: "Club",
    title: "Más de tres décadas corriendo juntos",
    excerpt:
      "Desde la temporada 93/94, Amigos del Canal representa a Puente Genil en pruebas de toda España y más allá, con más de 140 atletas.",
    tag: "Historia",
  },
];

export const races: Race[] = [
  {
    id: "cordobilla",
    name: "Subida a Cordobilla",
    date: "Septiembre",
    distance: "~8 km",
    place: "Plaza del Ancla → Cordobilla",
    status: "proxima",
    highlight: true,
  },
  {
    id: "duatlon",
    name: "Duatlón Villa de Puente-Genil",
    date: "Fin de temporada",
    distance: "Duatlón",
    place: "Puente Genil",
    status: "proxima",
  },
  {
    id: "entrenamiento",
    name: "Entrenamientos grupales",
    date: "Toda la temporada",
    distance: "Variable",
    place: "Puente Genil",
    status: "abierta",
  },
  {
    id: "calendario",
    name: "Calendario de pruebas populares",
    date: "Todo el año",
    distance: "5K · 10K · Media",
    place: "Andalucía y España",
    status: "abierta",
  },
];

export const gallery: GallerySlide[] = [
  {
    id: "g1",
    title: "Salida en grupo",
    caption: "Kilómetros compartidos en cada entrenamiento.",
    gradient:
      "linear-gradient(135deg, #245C18 0%, #0A0A0A 45%, #1a3d12 100%)",
  },
  {
    id: "g2",
    title: "Subida a Cordobilla",
    caption: "La prueba que abre la temporada pontanesa.",
    gradient:
      "linear-gradient(160deg, #0A0A0A 0%, #245C18 40%, #7CFC00 160%)",
  },
  {
    id: "g3",
    title: "Meta y abrazos",
    caption: "El mejor club del mundo… y amigas.",
    gradient:
      "linear-gradient(200deg, #12280e 0%, #0A0A0A 50%, #9BEF4F33 100%)",
  },
  {
    id: "g4",
    title: "Noche de carrera",
    caption: "Nocturnas, duatlones y retos por toda la geografía.",
    gradient:
      "linear-gradient(45deg, #0A0A0A 0%, #245C18 55%, #0A0A0A 100%)",
  },
];

export const founders = [
  "Miguel Ríos",
  "Antonio Laredo",
  "Rafa Chía",
  "Manuel Rodríguez",
  "Juanma Illanes",
  "Fernando Saavedra",
  "Miguel Baena",
  "Francisco Ríos",
  "Rufino Rivas",
  "Raquel Florido",
];
