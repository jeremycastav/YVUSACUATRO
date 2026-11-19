# Cambios v2 — 16 nov 2026

## Qué cambia
- **Fichas de producto (6 páginas: 3 ES + 3 EN):** selector con 11 colores. Las miniaturas salen de la carpeta `Colores`; al elegir un color, la imagen principal muestra la extensión completa de la carpeta `EXTENSIONES`, sin recortar.
- **Vista a tamaño real:** al tocar la imagen (o el botón «Ver tamaño real») se abre la extensión a su resolución original (1024 × 1536 px), con la opción «Ajustar a pantalla», flechas ‹ › y teclado ← → para pasar de un color a otro, y Esc para cerrar.
- **Miniaturas de la galería:** Extensión completa · Detalle del tono · Detalle de unión (por colocar) · Puesta (por colocar). Se retira «Carta de color».
- **Tienda (ES/EN):** filtro de color y mini-swatches con los 11 colores.
- **Catálogo:** 8 → 11 colores. Nuevos: 1, 6, 6/22, 18 Mate (sustituye a 18) y Ombré. Se retira Balayage de las fichas y la tienda.
- Los enlaces antiguos `?color=18` se redirigen a `18-mate` (main.js).

## Archivos nuevos y modificados
- `assets/img/swatches/*.webp` (160 px, sustituyen a los recortes provisionales) y `assets/img/swatches/detalle/*-540.webp`
- `assets/img/extensions/*-640.webp` (galería) y `*-1024.webp` (tamaño real)
- `assets/css/woocommerce.css`: bloque «v2» al final
- `assets/js/main.js`: módulos `G` (galería) y `LBR` (lightbox de tamaño real). Sustituyen al antiguo bloque de miniaturas.

## Pendiente (no tocado en v2)
- **Home** (`index.html` ES/EN): el selector de colores y los textos siguen con 8 colores e incluyen Balayage.
- **Guía de colores** (ES/EN): carta de 8 colores; faltan tono y descripción de los 5 nuevos.
- **Estados** (`estados.html` / `states.html`): demo de swatches con los colores antiguos.
- **Tono muestra ≠ extensión:** en el 8/22 la muestra es gris ceniza y la extensión rubio dorado; en el 6/22 la muestra es cálida y la extensión beige ceniza. Las extensiones 8/22 y 18 Mate se ven casi iguales.
- **Origen de las fotos:** confirmar si son fotos reales. Por la composición idéntica (misma percha, fondo y encuadre) parecen generadas, y la decisión del 29/09 fue no usar imágenes de producto hechas con IA.
- **«Tamaño real»** se refiere a la resolución de la imagen, no a las 20 pulgadas físicas; el tamaño en pantalla depende del dispositivo.

## En WordPress
El plugin de swatches debe permitir una imagen por término. La foto grande de cada variación va en el campo «Imagen» de la variación (WooCommerce la cambia solo al elegir el color). La vista a 100 % la da el lightbox de la galería (`wc-product-gallery-lightbox`); el módulo `LBR` de la maqueta no se lleva al tema.
