from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import os
import urllib.request

out = "public/carteles"
os.makedirs(out, exist_ok=True)

# Tighter crop of Cordobilla 28 poster only
im = Image.open(f"{out}/cordobilla-28-a.jpg")
w, h = im.size
box = (int(w * 0.355), int(h * 0.06), int(w * 0.645), int(h * 0.78))
poster = im.crop(box)
poster = ImageEnhance.Contrast(poster).enhance(1.12)
poster = ImageEnhance.Sharpness(poster).enhance(1.15)
poster.save(f"{out}/cordobilla-28-cartel.jpg", quality=95)
print("28 cartel", poster.size)

W, H = 720, 1020
GREEN = (124, 252, 0)
GREEN_SOFT = (155, 239, 79)
BG = (10, 10, 10)
MUTED = (184, 184, 184)
WHITE = (245, 245, 245)


def font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def load_bg(url, path):
    if not os.path.exists(path):
        urllib.request.urlretrieve(url, path)
    img = Image.open(path).convert("RGB")
    src_w, src_h = img.size
    scale = max(W / src_w, H / src_h)
    nw, nh = int(src_w * scale), int(src_h * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - W) // 2
    top = (nh - H) // 2
    return img.crop((left, top, left + W, top + H))


logo = Image.open("public/logo.png").convert("RGBA")
logo = logo.resize((140, 140), Image.Resampling.LANCZOS)

races = [
    {
        "file": "cartel-cordobilla.jpg",
        "edition": "XXVIII",
        "title": "SUBIDA A\nCORDOBILLA",
        "date": "20 SEP 2026 · 10:00",
        "place": "Plaza del Ancla → Cordobilla",
        "dist": "8+ KM",
        "bg": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
        "bgfile": f"{out}/_bg1.jpg",
    },
    {
        "file": "cartel-duatlon.jpg",
        "edition": "XXVII",
        "title": "DUATLÓN VILLA\nDE PUENTE-GENIL",
        "date": "JUNIO · PUENTE GENIL",
        "place": "Polígono Huerto del Francés",
        "dist": "5.5 + 20 + 2.75",
        "bg": "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=1200&q=80",
        "bgfile": f"{out}/_bg2.jpg",
    },
    {
        "file": "cartel-ribera.jpg",
        "edition": "XVIII",
        "title": "NOCTURNA\nRIBERA DEL GENIL",
        "date": "ÉCIJA · 8 KM",
        "place": "Carrera nocturna monumental",
        "dist": "8 KM",
        "bg": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
        "bgfile": f"{out}/_bg3.jpg",
    },
    {
        "file": "cartel-trotacalles.jpg",
        "edition": "XXI",
        "title": "NOCTURNA\nTROTACALLES",
        "date": "CÓRDOBA",
        "place": "Clásico del calendario andaluz",
        "dist": "POPULAR",
        "bg": "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
        "bgfile": f"{out}/_bg4.jpg",
    },
]

for r in races:
    bg = load_bg(r["bg"], r["bgfile"])
    overlay = Image.new("RGB", (W, H), BG)
    bg = Image.blend(bg, overlay, 0.55)

    draw = ImageDraw.Draw(bg, "RGBA")
    for y in range(0, 160):
        a = int(180 * (1 - y / 160))
        draw.line([(0, y), (W, y)], fill=(10, 10, 10, a))
    for i, y in enumerate(range(H - 220, H)):
        a = int(220 * (i / 220))
        draw.line([(0, y), (W, y)], fill=(10, 10, 10, min(230, a)))

    draw.rectangle([40, 48, 120, 54], fill=GREEN)
    draw.text((40, 70), r["edition"], font=font(42, True), fill=GREEN)
    draw.text((40, 120), "AMIGOS DEL CANAL", font=font(18, True), fill=GREEN_SOFT)

    y = 200
    for line in r["title"].split("\n"):
        draw.text((40, y), line, font=font(58, True), fill=WHITE)
        y += 70

    draw.text((40, y + 20), r["date"], font=font(26, True), fill=GREEN)
    draw.text((40, y + 60), r["place"], font=font(22), fill=MUTED)

    badge = r["dist"]
    tw = draw.textlength(badge, font=font(28, True))
    bx, by = 40, H - 160
    draw.rectangle([bx, by, bx + tw + 36, by + 52], fill=GREEN)
    draw.text((bx + 18, by + 10), badge, font=font(28, True), fill=BG)

    bg_rgba = bg.convert("RGBA")
    bg_rgba.alpha_composite(logo, (W - 170, H - 190))
    final = bg_rgba.convert("RGB")
    final.save(f"{out}/{r['file']}", quality=93)
    print("wrote", r["file"])

# Prefer real cropped poster for Cordobilla if crop looks poster-like (portrait)
real = Image.open(f"{out}/cordobilla-28-cartel.jpg")
rw, rh = real.size
if rh > rw * 1.1:
    # Upscale/pad to consistent portrait size for lightbox
    target = Image.new("RGB", (W, H), BG)
    scale = min(W / rw, H / rh)
    nw, nh = int(rw * scale), int(rh * scale)
    real_r = real.resize((nw, nh), Image.Resampling.LANCZOS)
    target.paste(real_r, ((W - nw) // 2, (H - nh) // 2))
    # Also keep designed as fallback; use real as primary cartel-cordobilla-foto
    target.save(f"{out}/cartel-cordobilla-foto.jpg", quality=93)
    print("wrote cartel-cordobilla-foto.jpg")

print("done")
