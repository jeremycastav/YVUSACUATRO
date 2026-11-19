# Justificación de las decisiones de diseño

## 1. Frente a la web actual (yeseniavargasextensions.com)

| Problema en la web actual | Decisión en la maqueta | Motivo |
| --- | --- | --- |
| Ningún producto en la home; 8 enlaces de CTA con `href="#"` | Hero con "Comprar" → tienda; colecciones y selector de color que enlazan a la ficha con el color ya elegido (`?color=`) | Cada CTA lleva a un paso de compra |
| Tres CTAs compitiendo (comprar, consulta, salón) | Un CTA principal por sección; mayoristas en una banda propia con "Más info" | Jerarquía clara: primero clienta final, después profesional |
| Solo en inglés para un público hispanohablante | Español por defecto (`/es/`), inglés completo (`/en/`), hreflang y selector visible | Idioma del público objetivo |
| Identidad antigua (dorado #D8A31C sobre negro, Trebuchet/Montserrat) | Cromática oficial (Soft Blonde, Copper Comb, Mocha Maroon, Brunette Pro) y tipografías del manual | Coherencia con la nueva marca |
| Claims sin fuente ("N°1 from Colombia") y origen contradictorio | "Elaboradas a mano en Ecuador" (confirmado); el "N°1" se elimina; los claims aceptados por el cliente se marcan como CLAIM | Veracidad y riesgo publicitario en EE. UU. |
| Cero pruebas de confianza | Prensa real con fecha y medio; trayectoria con fuente; dirección física en Doral | Confianza verificable, no genérica |
| Etiqueta de color errónea (negro rotulado "4/22") | La foto de cabello negro se retira; cada swatch se asocia a un solo código | Evitar errores de compra |
| 28 de 30 imágenes sin `alt`; formularios sin `<label>` | `alt` en ES y EN, `<label>` en todos los campos, errores con `aria-invalid` y resumen enlazado | Accesibilidad AA |
| 84 scripts (Elementor, React, Backbone…) | 1 JS propio sin dependencias, 4 CSS, WebP con `srcset` y lazy load | Rendimiento en móvil |
| `<title>` = dominio; sin meta, OG ni schema | Title y description por página e idioma, OG, schema Organization, Product, BreadcrumbList y FAQPage | SEO |

## 2. Frente a la página académica (referencia obligatoria)

Se mantiene:
- La paleta, incluido el dorado derivado `#c79a6a` / `#e2bd8e` para los CTAs: es el único color de acción con contraste suficiente sobre marrón.
- El hero oscuro con degradado radial y la foto con radio de 18 px y sombra cálida.
- Los botones en píldora con degradado, las tarjetas blancas con borde fino, el acordeón de FAQ, la tira de confianza sobre Mocha Maroon y el lightbox de prensa.
- La barra fija inferior en móvil con el CTA, que aquí se convierte en "Añadir" en la ficha de producto.

Desviaciones justificadas:

| Desviación | Motivo |
| --- | --- |
| Tipografías GC Amelie Promised + Barlow en lugar de Playfair Display + Jost | Son las del manual de marca (decisión del cliente, 29/09). La académica se había desviado del manual |
| Sin contador de urgencia ni "50% OFF solo por hoy" | El contador de la académica se reinicia cada medianoche. En EE. UU. es una práctica comercial engañosa y resta credibilidad a una marca premium |
| Sin valoraciones "4,9 · +200 calificaciones" ni testimonios | Son del curso, no del producto, y el cliente decidió no usar testimonios. Las reseñas nativas de WooCommerce empiezan vacías |
| Prensa en tarjetas con recorte (cabecera + titular + foto principal), no la página completa | El brief excluye reproducir artículos enteros. También se evitan menores y otras noticias de la misma página. La publinota (pagada) queda fuera de "Como se vio en" |
| Sin bloque de Academia | Decisión del cliente (29/09) |
| Texto secundario del footer a `#cbb3a2` en lugar de `#8a6f5e` | El original da 3,8:1 sobre Brunette Pro y no llega a AA |
| Colores de estado (error, éxito, aviso) añadidos | La académica no los tiene y WooCommerce los necesita. Están calculados para AA |
| Animación `pulse` infinita eliminada; aparición al hacer scroll desactivada con `prefers-reduced-motion` | Accesibilidad |

## 3. Decisiones propias de e-commerce

- **Imagen de producto pendiente**: se usa un placeholder de marca (degradado con el símbolo YV) en lugar de fotos generadas por IA. Una muestra generada no garantiza el tono real del cabello (decisión del cliente).
- **Largo único (20")**: aparece como dato fijo, no como variación. El cliente solo elige el color.
- **Swatches con foto, no con color plano**: el cabello tiene reflejos y degradados (balayage) que un color plano no representa.
- **Selector de color en la home**: muestra una clienta real con ese color y enlaza a las tres técnicas con el color ya elegido. Así se acorta el recorrido para quien llega sabiendo su tono.
- **Mayoristas sin plugin B2B**: botón "Más info" hacia el formulario y WhatsApp, según la decisión del cliente.
- **WhatsApp siempre visible** (barra superior, botón flotante y ficha): es el canal de contacto confirmado y el habitual del público hispanohablante.
- **Estados diseñados**: agotado, oferta, variación sin elegir, carrito vacío y errores de formulario están en `estados.html`. El carrito vacío y los errores también se pueden provocar en las páginas reales.
