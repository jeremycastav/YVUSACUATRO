# Guía de implementación — WordPress + WooCommerce

Maqueta: `MAQUETA/` · Fecha: 29 sep 2026 · Tienda: Yesenia Vargas Hair (Yesenia Vargas Corp)

## 1. Estructura de la maqueta

```
MAQUETA/
├── index.html                 Índice de revisión (no forma parte de la web)
├── es/                        17 páginas en español (idioma principal)
├── en/                        17 páginas en inglés (traducción pendiente de revisión)
├── assets/
│   ├── css/tokens.css         1 · Variables de marca, @font-face
│   ├── css/base.css           2 · Reset, tipografía, layout, accesibilidad, marcadores de maqueta
│   ├── css/components.css     3 · Header, footer, botones, hero, tarjetas, swatches, prensa, formularios
│   ├── css/woocommerce.css    4 · Selectores de las plantillas clásicas de WooCommerce
│   ├── js/main.js             Interacciones (vanilla JS, sin dependencias)
│   ├── fonts/                 Barlow (OFL) + GC Amelie Promised (licencia web PENDIENTE)
│   └── img/                   brand/ (SVG), photos/ (WebP 480/960/1440), press/, gallery/, swatches/
└── docs/                      Esta guía, lista de marcadores y justificación de diseño
```

## 2. Tema recomendado

**Tema base: GeneratePress (versión gratuita) + tema hijo `yv-child`.**

Por qué:
- Usa las plantillas **clásicas** de WooCommerce (PHP). El HTML que genera coincide con el de la maqueta (`ul.products li.product`, `.single-product`, `.shop_table`, `.woocommerce-checkout`…), así que el CSS se traslada sin rehacerlo.
- Es ligero y funciona con hooks, sin maquetador visual. La web actual carga 84 scripts por Elementor + Hello; se elimina Elementor.
- Alternativa equivalente: Storefront (el tema oficial de WooCommerce). No recomiendo un tema de bloques (FSE): sus plantillas de WooCommerce generan otro marcado (`wc-block-*`) y habría que reescribir `woocommerce.css`.

Verificar en el momento de instalar que las versiones vigentes del tema y de WooCommerce son compatibles.

### Tema hijo

```
wp-content/themes/yv-child/
├── style.css                  Cabecera del tema hijo (Template: generatepress)
├── functions.php              Carga de CSS/JS, soporte WooCommerce, hooks
├── assets/                    Copia de MAQUETA/assets (sin la barra de maqueta)
└── woocommerce/               Solo las plantillas que haya que sobrescribir (ver §6)
```

`functions.php` (esqueleto):

```php
<?php
add_action('wp_enqueue_scripts', function () {
  $u = get_stylesheet_directory_uri() . '/assets/';
  wp_enqueue_style('yv-tokens', $u . 'css/tokens.css', [], '1.0');
  wp_enqueue_style('yv-base', $u . 'css/base.css', ['yv-tokens'], '1.0');
  wp_enqueue_style('yv-components', $u . 'css/components.css', ['yv-base'], '1.0');
  if (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page())) {
    wp_enqueue_style('yv-woo', $u . 'css/woocommerce.css', ['yv-components'], '1.0');
  }
  wp_enqueue_script('yv-main', $u . 'js/main.js', [], '1.0', ['strategy' => 'defer', 'in_footer' => true]);
}, 20);
add_filter('woocommerce_enqueue_styles', '__return_empty_array'); // sin estilos por defecto de WooCommerce
add_action('after_setup_theme', function () {
  add_theme_support('woocommerce');
  add_theme_support('wc-product-gallery-zoom');
  add_theme_support('wc-product-gallery-lightbox');
  add_theme_support('wc-product-gallery-slider');
});
```

Antes de copiar `assets/` al tema hijo:
- Borrar de `base.css` el bloque **MARCADORES DE MAQUETA** (`.ph`, `.claim`, `.dev-bar`, `.translation-note`).
- Borrar de `main.js` los bloques **Marcadores de maqueta**, **Contador del carrito (simulado)**, **Variaciones**, **Carrito (demo)** y **Validación de formularios (demo)**. En producción esa lógica la ponen WooCommerce (`add-to-cart-variation.js`, `cart-fragments.js`, validación del checkout) y el plugin de formularios. Se conservan: menú móvil, aparición al hacer scroll, selector de color de la home, cantidad +/-, pestañas, lightbox y filtros móviles.
- **No publicar** `gc-amelie-promised*.woff2` hasta comprar la licencia web de Glyphonic. Mientras tanto, `--yv-font-display` cae a `Playfair Display` / Georgia.

## 3. Plugins

| Función | Plugin recomendado | Nota |
| --- | --- | --- |
| Tienda | WooCommerce | Imprescindible |
| Traducción ES/EN | TranslatePress (versión de pago con SEO Pack) | Ver §7 |
| Swatches de color | Un plugin de "variation swatches" que admita **swatch de imagen** por término | Debe seguir rellenando el `<select name="attribute_pa_color">` estándar, como hace la maqueta |
| SEO (title, meta, OG, schema Organization/Breadcrumb) | Rank Math o Yoast SEO (uno solo) | WooCommerce ya genera el schema `Product` |
| Formularios (contacto, mayoristas) | Fluent Forms o Contact Form 7 | Replicar campos y clases de `contacto.html` |
| Pasarela de pago | **N/A** — pendiente de decisión (Stripe, PayPal o WooPayments) | Los campos de tarjeta los pinta el plugin |
| Impuesto sobre ventas | WooCommerce Tax u otro servicio automatizado | Confirmar obligaciones con el contable |
| Envíos | **N/A** — según transportista elegido | Zonas de envío pendientes |
| Caché y WebP | LiteSpeed Cache (el hosting es Hostinger) | Activar conversión a WebP y lazy load si no lo hace el tema |
| Copias y seguridad | El que ofrezca el hosting + un plugin de seguridad ligero | Actualizar las 14 actualizaciones pendientes antes de empezar |

No instalar Elementor ni maquetadores visuales: duplicarían el CSS y el peso de la web actual.

## 4. Configuración de WooCommerce

| Ajuste | Valor |
| --- | --- |
| Moneda | Dólar estadounidense (USD), símbolo a la izquierda, separador decimal `.` → `$135.00` |
| Vender a | Solo Estados Unidos (confirmar) |
| Unidad de dimensiones | Pulgadas (in) |
| Unidad de peso | **N/A** — gramos u onzas, pendiente |
| Impuestos | Activados; tasas según el contable |
| Páginas | Tienda `/tienda/`, Carrito `/carrito/`, Finalizar compra `/finalizar-compra/`, Mi cuenta `/mi-cuenta/` |
| Carrito y checkout | Usar los **shortcodes clásicos** `[woocommerce_cart]` y `[woocommerce_checkout]`, no los bloques. Los bloques generan otro HTML y el CSS de la maqueta no los cubre |
| Reseñas | Activadas, solo de compradores verificados |
| Cuentas | Permitir crear cuenta en "Mi cuenta" y en el checkout; contraseña por enlace de email |

## 5. Catálogo: atributos y variaciones

> **Actualizado en v3 (16/11/2026):** el catálogo vigente es Ponytail (`YVH-PNY`), Tape In (`YVH-ADH`) y Cortina armada (`YVH-CRT`), todos de 22", con 11 colores. Ver `docs/cambios-v3.md`. La tabla siguiente es la de v1 y queda solo como referencia.

**Atributo global** (Productos → Atributos):

| Nombre | Slug | Tipo (plugin swatches) | Términos (slug → nombre ES / EN) |
| --- | --- | --- | --- |
| Color | `color` → `pa_color` | Imagen | `2` Color 2 · `4` Color 4 · `4-22` Color 4/22 · `8-22` Color 8/22 · `18` Color 18 · `60` Color 60 · `balayage` Balayage · `cobre` Cobre / Copper |

La imagen de cada término es la foto de muestra del mechón (hoy provisional: `assets/img/swatches/*.webp`).

**Largo:** como solo hay 20", **no es variación**. Se añade como atributo global "Largo" = `20"`, visible en la ficha y **sin** "Usado para variaciones". Si en el futuro hay más largos, se activa como variación sin rehacer productos.

**Productos variables (3):**

| Producto | Categoría | SKU padre | Variaciones |
| --- | --- | --- | --- |
| Extensiones adhesivas / Tape-in Extensions | Extensiones › Adhesivas | `YVH-ADH` | 8 (una por color) |
| Extensiones I-Tip / I-Tip Extensions | Extensiones › I-Tip | `YVH-ITP` | 8 |
| Extensiones de cortina / Weft Extensions | Extensiones › Cortina | `YVH-CRT` | 8 |

Para cada variación:
- SKU `YVH-{técnica}-{código}-20`, por ejemplo `YVH-ADH-422-20`.
- Precio regular **$135.00** (provisional).
- Gestionar inventario por variación.
- Imagen propia de la variación (foto real del mechón en ese color; **pendiente**).
- Peso **N/A**.

**Etiquetas** para filtrar y para la guía: `negros`, `castanos`, `rubios`, `cobrizos`, `balayage`. Cada color va en su familia; la asignación exacta queda pendiente de confirmar.

**Filtros de la tienda:** widget "Filtrar productos por atributo" (Color) y filtro por categoría (Técnica). Con 3 productos los filtros tienen poco efecto; están diseñados para cuando crezca el catálogo.

## 6. Correspondencia HTML → WordPress

| Archivo maqueta (ES / EN) | En WordPress | Tipo |
| --- | --- | --- |
| `index.html` / `index.html` | Página "Inicio" como portada estática | Página + bloques Gutenberg (ver §8) |
| `tienda.html` / `shop.html` | `archive-product.php` → `woocommerce/content-product.php` | Plantilla WooCommerce |
| `producto-*.html` / `product-*.html` | `single-product.php` → `woocommerce/content-single-product.php` | Plantilla WooCommerce |
| `carrito.html` / `cart.html` | Página Carrito con `[woocommerce_cart]` → `cart/cart.php`, `cart/cart-empty.php` | Plantilla WooCommerce |
| `finalizar-compra.html` / `checkout.html` | Página con `[woocommerce_checkout]` → `checkout/form-checkout.php` | Plantilla WooCommerce |
| `mi-cuenta.html` / `my-account.html` | Página con `[woocommerce_my_account]` → `myaccount/form-login.php`, `myaccount/navigation.php` | Plantilla WooCommerce |
| `sobre-yesenia.html` / `about-yesenia.html` | Página + bloques | Gutenberg |
| `prensa.html` / `press.html` | Página + patrón de bloque "Tarjeta de prensa" | Gutenberg |
| `guia-colores-cuidados.html` / `color-care-guide.html` | Página + bloques | Gutenberg |
| `preguntas-frecuentes.html` / `faq.html` | Página + bloque "Detalles" (acordeón) + schema FAQ del plugin SEO | Gutenberg |
| `contacto.html` / `contact.html` | Página + formulario del plugin | Gutenberg + plugin |
| `privacidad.html`, `terminos.html`, `envios-devoluciones.html` | Páginas de texto | Gutenberg |
| `estados.html` / `states.html` | **No se publica**. Es la referencia de estados para QA | — |

Plantillas del tema hijo a sobrescribir en `yv-child/woocommerce/`:
- `content-product.php` (tarjeta: meta "20" · 8 colores" y mini-swatches).
- `single-product/add-to-cart/variable.php`, solo si el plugin de swatches no genera la estructura `.swatch` / `.swatch__img`. Si la genera, se adapta el CSS al plugin.
- `single-product/tabs/tabs.php`, para las pestañas "Cuidados" y "Envío y devoluciones" (se añaden con el filtro `woocommerce_product_tabs`, sin sobrescribir la plantilla).
- `cart/cart-empty.php`, solo para el texto.

Header, footer, barra superior, botón de WhatsApp y barra fija móvil van en el tema hijo con hooks de GeneratePress. No hacen falta plugins para esto.

## 7. Idiomas (TranslatePress)

- Idioma por defecto: español, con la opción **"usar subdirectorio para el idioma por defecto"** activada → `/es/…` y `/en/…`.
- Códigos hreflang: `es-US` y `en-US`, más `x-default` apuntando a `/es/` (TranslatePress lo genera; revisar en el HTML).
- Slugs traducidos (SEO Pack): usar los de la tabla de URLs del `index.html` de la maqueta (`/en/shop/`, `/en/product/tape-in-extensions/`…).
- Selector de idioma: sustituir el `.lang-switcher` de la maqueta por el shortcode o la función de TranslatePress, manteniendo el marcado y las clases.
- Traducir los términos del atributo Color (solo cambia "Cobre" → "Copper") y los textos de WooCommerce que no traiga el paquete de idioma.
- La traducción al inglés está **pendiente de revisión** por un nativo; en la maqueta la señala la franja amarilla superior.

Por qué TranslatePress y no WPML o Polylang: con un catálogo pequeño y una sola moneda, tener un único producto por idioma evita desincronizar stock y precios. La edición visual es más sencilla para un equipo no técnico. WPML sería preferible si se añaden varias monedas o un flujo de traducción externo.

## 8. Qué es plantilla, qué es bloque y qué es plugin

| Elemento | Implementación |
| --- | --- |
| Header, barra superior, selector de idioma, menú móvil, footer | Tema hijo (hooks) |
| Hero de la home | Bloque "Portada" o patrón de bloque propio con las clases `.hero` |
| "Como se vio en" | Patrón de bloque (lista de medios) |
| Colecciones destacadas | Bloque "Productos seleccionados" de WooCommerce **o** patrón con enlaces |
| Selector visual de colores (home) | Patrón de bloque + `main.js` (se conserva) |
| Diferenciales, galería, banda de mayoristas, CTA final | Patrones de bloque |
| Grid de la tienda, ficha, carrito, checkout, mi cuenta | Plantillas WooCommerce |
| Swatches en ficha y filtros | Plugin de swatches + CSS de la maqueta |
| Formularios | Plugin de formularios |
| Botón flotante de WhatsApp y barra fija móvil | Tema hijo (sin plugin) |
| Schema Organization, BreadcrumbList, FAQPage, OG | Plugin SEO |
| Schema Product | WooCommerce |

## 9. Lista de comprobación antes de publicar

- [ ] Sustituir todos los marcadores de `docs/marcadores.md`.
- [ ] Licencia web de GC Amelie Promised comprada.
- [ ] Fotos reales por color (mechón completo, unión, puesta y carta), mínimo 1.600 px en el lado largo, exportadas a WebP.
- [ ] Textos legales redactados por un abogado.
- [ ] Revisión nativa del inglés.
- [ ] Contraste AA comprobado de nuevo con las fotos reales (texto sobre imagen).
- [ ] Prueba de compra completa (pago, email, stock) en ES y EN.
- [ ] Redirecciones 301 de las URLs antiguas (`/shopp/`, `/about-us/`, `/product/brown-human-hair-wig/`) a las nuevas.
- [ ] Borrar la página `estados` y el bloque de marcadores del CSS y JS.
