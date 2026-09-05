from PIL import Image
import os

GREEN = (124, 252, 0)  # #7CFC00
assets = r"C:\Users\anton\.cursor\projects\c-Users-anton-Projects-amigosdelcanal\assets"
out = r"C:\Users\anton\Projects\amigosdelcanal\public\patrocinadores"
os.makedirs(out, exist_ok=True)

files = {
    "esmonsur.png": "c__Users_anton_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-6c28f0ca-d959-426d-8b2e-6722b67f19bf.png",
    "petromarkt.png": "c__Users_anton_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-a3cac01c-15a8-4187-98f1-886aa58a4542.png",
    "petrosol.png": "c__Users_anton_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-77b1a36f-8a70-4d49-92e0-236bb096c727.png",
}


def to_green_logo(src_path: str, dest_path: str, mode: str) -> None:
    im = Image.open(src_path).convert("RGBA")
    px = im.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b

            if mode == "esmonsur":
                # yellow/orange logo on black -> green, black transparent
                if lum < 40:
                    px[x, y] = (0, 0, 0, 0)
                else:
                    # keep soft edges via luminance
                    alpha = min(255, int((lum / 255) * 280))
                    px[x, y] = (*GREEN, alpha if a > 0 else 0)

            elif mode == "petrosol":
                # white bg, red icon, black text -> green shapes, white transparent
                if r > 240 and g > 240 and b > 240:
                    px[x, y] = (0, 0, 0, 0)
                elif lum < 50:
                    # black text
                    px[x, y] = (*GREEN, a if a < 255 else 255)
                else:
                    # colored emblem / anti-alias -> green with alpha from darkness from white
                    dist = abs(255 - r) + abs(255 - g) + abs(255 - b)
                    if dist < 30:
                        px[x, y] = (0, 0, 0, 0)
                    else:
                        alpha = min(255, int(dist / 3 * 1.2))
                        px[x, y] = (*GREEN, max(alpha, 80))

            elif mode == "petromarkt":
                # complex logo: convert non-near-black to green silhouette OR
                # keep structure but map greens/whites to brand green on transparent
                # Approach: anything that's not "background edge" becomes green
                # The logo has dark green, bright green, white diagonal, white text
                # For sponsors strip on black: make a green monochrome version
                # Near-black corners stay transparent if any; otherwise use alpha from saturation
                sat = max(r, g, b) - min(r, g, b)
                # treat very dark as transparent only if almost black
                if lum < 25 and sat < 20:
                    px[x, y] = (0, 0, 0, 0)
                else:
                    # map all visible ink to green; alpha from luminance contrast
                    alpha = min(255, max(40, int(lum * 0.9 + sat * 0.4)))
                    # white text should be strong
                    if lum > 180:
                        alpha = 255
                    px[x, y] = (*GREEN, alpha)

    # trim transparent borders
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)

    # normalize height for consistent display
    max_h = 160
    if im.height > max_h:
        ratio = max_h / im.height
        im = im.resize((int(im.width * ratio), max_h), Image.Resampling.LANCZOS)

    im.save(dest_path, "PNG")
    print("saved", dest_path, im.size)


to_green_logo(os.path.join(assets, files["esmonsur.png"]), os.path.join(out, "esmonsur.png"), "esmonsur")
to_green_logo(os.path.join(assets, files["petromarkt.png"]), os.path.join(out, "petromarkt.png"), "petromarkt")
to_green_logo(os.path.join(assets, files["petrosol.png"]), os.path.join(out, "petrosol.png"), "petrosol")
print("done")
