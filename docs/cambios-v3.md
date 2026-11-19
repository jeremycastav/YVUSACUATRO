# Cambios v3 — 16 nov 2026 · Catálogo según la ficha técnica

Fuente: `Fichas_Tecnicas.docx` (3 productos). Todo lo que la ficha no indica va como marcador amarillo.

## Catálogo nuevo (todo a 22 pulgadas / 55,88 cm)

| Producto (ES / EN) | SKU base | Presentación | Peso | Archivos |
| --- | --- | --- | --- | --- |
| Ponytail / Ponytail | `YVH-PNY` | 1 extensión | 100 g por pieza | `es/producto-ponytail.html`, `en/product-ponytail.html` |
| Extensiones adhesivas Tape In / Tape-In Extensions | `YVH-ADH` | Paquete de 20 unidades (2,5 g c/u) | 50 g por paquete | `es/producto-extensiones-adhesivas.html`, `en/product-tape-in-extensions.html` |
| Cortina armada / Clip-in Weft Set | `YVH-CRT` | Set de 3 cortinas (grande 5, mediana 4, pequeña 3 clips) | 100 g el set | `es/producto-cortina-armada.html`, `en/product-clip-in-weft-set.html` |

SKU de variación: `{base}-{código de color}-22`, p. ej. `YVH-ADH-422-22`.
Se eliminan las fichas de I-Tip y de la cortina cosida (weft): `producto-extensiones-i-tip.html`, `producto-extensiones-cortina.html`, `product-i-tip-extensions.html`, `product-weft-extensions.html`. Todos los enlaces apuntan ya a las nuevas.

## Qué cambia en cada página
- **Fichas de producto (6):** descripción, especificaciones completas de la ficha, diagrama (colocación / presentación / capas), colocación y cuidados de la ficha. Se retiran los CLAIM «hasta 3 años» y «se pueden teñir, planchar y rizar», que la ficha no respalda; el Ponytail muestra lo que sí declara (plancha y rizadora hasta 450 °F, decoloración con prueba de mechón).
- **Cantidad = paquetes / piezas / sets:** debajo del botón se ve lo que se lleva (p. ej. «2 paquetes · 40 unidades · 100 g»).
- **Home:** una sola sección «Elige tu color y tu producto» con los 11 colores, la lista de los 3 productos (sin imágenes) y la foto de la modelo. Los enlaces de cada producto abren la ficha con el color elegido. Se elimina la sección «Elige tu técnica» con tarjetas.
- **Tienda:** filtro «Producto», tarjetas con presentación y peso, largo 22".
- **Carrito y finalizar compra:** cada línea muestra color, largo y presentación según la cantidad. Las líneas se guardan al añadir desde la ficha (en la maqueta, en el navegador); sin datos guardados se ve una fila de ejemplo.
- **Guía:** carta de 11 colores y «Comparativa de productos» con uso y peso de la ficha.
- **FAQ:** productos, largo, colores, composición, estilizado y duración según la ficha; el JSON-LD FAQPage se regenera.
- **Estados, menús y pie de página:** nombres y enlaces nuevos.

## Supuestos (sin respuesta del cliente)
- Los 11 colores valen para los 3 productos → marcador «confirmar colores disponibles por producto».
- Colores sin foto de modelo (1, 6, 6/22, Ombré) → la home y la guía muestran la foto de la extensión con el aviso «Foto de modelo por colocar».
- Color 18 Mate usa la foto de modelo del antiguo Color 18.
- Tape In se vende por paquete; la cantidad elige el número de paquetes.
- Precio $135.00 provisional e igual para todo: la ficha no trae precios.

## Pendiente
- Precio real de cada producto (por pieza, paquete y set).
- Tape In: confirmar composición por lote, compatibilidad térmica y decoloración.
- Cortina armada: compatibilidad térmica y decoloración.
- Las fotos de `EXTENSIONES` muestran una cortina colgada en percha: no representan el Ponytail ni el Tape In. Hacen falta fotos propias de cada producto (y las vistas «Peineta y fijación», «Banda adhesiva», «Clips y capas», «Puesta»).
- La galería «Resultados reales» de la home sigue etiquetando una foto como Balayage, color que ya no está en el catálogo.
- La guía de cuidados (consejos de prensa) dice «mantenimiento cada dos o tres meses»; para Tape In la ficha indica 45 días. Se añadió la nota en la guía.

## En WordPress
- Atributo global `pa_color` con los 11 términos; productos variables `YVH-PNY`, `YVH-ADH`, `YVH-CRT`.
- Largo 22" como atributo visible, no de variación.
- Peso por producto en el campo de envío de WooCommerce (100 g / 50 g / 100 g).
- El texto «Llevas: …» y la presentación en carrito son personalización del tema (filtro `woocommerce_get_item_data`).
