# Cambios v4 — 19 nov 2026 · Página por página (1/11: Inicio)

Base: `MAQUETA-v3` + `es/index.html` editado por Jeremy con editor visual. Los textos de Jeremy no se modifican.

## Página de inicio (es/index.html)
- Selector de colores reparado: el editor visual había borrado los 11 botones de color. Restaurados tal cual estaban; el comportamiento es el mismo (color → foto de modelo → enlaces a las fichas con ese color).
- «Elige el color de tus extensiones» pasa a ser el título (h2) de la sección, con el mismo estilo que «Resultados con nuestras extensiones».
- Eliminado un bloque vacío que el editor metió dentro del título principal (creaba una línea en blanco).
- Portada: separación título-botones de 28 px (antes la daba el párrafo eliminado), algo menos de alto en escritorio.
- Franja de prensa más compacta en móvil.
- Bloque Antes/Después reducido a 420 px de ancho para que no compita con la galería.
- Eliminada la nota interna «Fotos de la web anterior… Pedir originales».
- Pie: corregido HTML no válido (bloque dentro de párrafo); se mantiene el salto de línea.

## Cambios globales (34 páginas)
- Logo de cabecera: `assets/img/brand/yv-hair-brunette-pro.svg` (Yesenia Vargas Hair, Brunette Pro), medidas 1205×69, alt «Yesenia Vargas Hair».
- Pie: eliminada la columna «Tienda»; el pie pasa a 3 columnas. Texto de marca con salto de línea antes de «Sede en Estados Unidos…».
- Eliminados la barra de maqueta, el sistema de marcadores (estilos y JS) y la franja «Traducción pendiente» de las páginas en inglés.
- Eliminado «local N/A» / «suite N/A» de la dirección (pie, contacto y páginas legales).
- `index.html` de la raíz redirige a `es/index.html`; el antiguo índice de páginas queda en `docs/indice-paginas.html`.

## Pendiente de revisar en cada página
Sin la barra, los datos pendientes que seguían marcados en amarillo (precios provisionales, «N/A», «[confirmar …]») se ven ahora como texto normal. Se revisarán al trabajar cada página. La lista completa sigue en `docs/marcadores.md`.

## Corrección 19 nov 2026 · Selector de inicio
- Cada color muestra ahora la foto completa de su extensión (`assets/img/extensions/<color>-640.webp`, de la carpeta EXTENSIONES), igual que la miniatura (carpeta Colores). Antes, 7 colores (2, 4, 4/22, 8/22, 18 Mate, 60, Cobre) mostraban una foto de modelo de la galería.
- Recuadro de la foto en proporción 2:3 (la de las fotos de extensión), 380 px de ancho máximo: la extensión se ve entera, sin recortes ni bandas.

## Página 2/11: Tienda (es/tienda.html) · 19 nov 2026
- Se mantienen los cambios de texto de Jeremy (título «Tienda de Extensiones», descripción, nota de colores).
- Cada tarjeta muestra la foto completa de la extensión (proporción 2:3) en lugar del recuadro «Imagen por colocar».
- Los círculos de color de cada tarjeta son ahora botones (26 px en escritorio, 24 px en móvil): al pulsar uno cambia la foto de esa tarjeta a la extensión de ese color, y «Elegir color» y el enlace de la tarjeta abren la ficha con ese color ya marcado (`?color=`). Color 2 marcado por defecto, como en la portada.
- Filtro «Producto»: corregido el espacio que faltaba en «Adhesivas Tape-In».

## Globales de esta ronda
- Nombre del producto: «Adhesivas Tape-In» en todas las páginas en español y en el carrito (antes «Extensiones adhesivas Tape In»; las menciones sueltas «Tape In» pasan a «Tape-In»). Las páginas en inglés no cambian.
- Dirección nueva en las 34 páginas (menú móvil, pie, datos estructurados, contacto, legales, Sobre Yesenia, Envíos): Ximma Boutique & Collective Showroom, dentro de Miami International Mall, local 916 (EN: Store 916), cerca de Macy’s Men’s, 1455 NW 107th Ave, Doral, FL 33172. Enlaces a ximmashowroom.com y a la página del centro comercial en simon.com; «Cómo llegar» apunta a Miami International Mall.
- «ESTAS SON TUS EXTENSIONES» se deja sin tilde: es correcto (demostrativo «estas»; «estás» sería el verbo estar).

## Fichas de producto · corrección previa (19 nov 2026)
- La galería de las fichas ya no queda fija (sticky) al bajar: se superponía a las pestañas y a «Otros productos». Afecta a las 6 fichas (ES/EN) vía `woocommerce.css`.
- Decisión: las fotos de cortina en percha se usan como imagen de ejemplo en los 3 productos hasta tener fotos propias.

## Página 3/11: Fichas de producto (las 3) · 19 nov 2026
Cambios de Jeremy en el Ponytail, replicados en Adhesivas Tape-In y Cortina armada:
- Quitada la línea pequeña sobre el título (p. ej. «Cola de caballo · 22 pulgadas»).
- Pestaña Descripción: quitada la frase final «Elaboradas a mano en Ecuador por el equipo de Yesenia Vargas.».
- Pestaña Especificaciones: quitada la fila «Elaboración» y la nota «Datos de la ficha técnica del producto.».
- Pestaña de colocación/cuidados: el último párrafo (nota secundaria) pasa a 12 px (clase `tab-note`). En Ponytail es la nota térmica; en Tape-In, la de tiras y pares; en Cortina, la del peso de 100 g.
- El editor visual había incrustado las 33 miniaturas de color dentro del HTML (543 KB) y añadido un bloque de estilo propio: se descarta, el archivo vuelve a enlazar las imágenes (≈41 KB). La pestaña Especificaciones quedó guardada abierta: se restaura cerrada.
Diseño:
- Foto principal en proporción 2:3 (sin franjas laterales); columna de la galería limitada a 500 px en escritorio. Detalle del tono y huecos «por colocar» usan el mismo recuadro, así que la galería no cambia de alto al pasar de una vista a otra.
- Pestañas de las fichas: el recuadro blanco recupera su margen interior (30×32 px en escritorio, 24×20 en móvil); antes el texto y las tarjetas tocaban el borde. Todas las pestañas empiezan a la misma altura.
- Adhesivas Tape-In, «Diagrama de presentación»: la tarjeta «2 paquetes · 40 unidades · 100 gramos» se destaca con borde y la etiqueta «Recomendado por nosotros».
- Adhesivas Tape-In: nota «Recomendado: 2 paquetes (40 unidades · 100 g)» bajo el botón de compra, tras «Llevas: …». Corregido también el mensaje predefinido de WhatsApp de esa ficha («Adhesivas Tape-In»).
- Cortina armada, «Diagrama de distribución por capas»: esquema visual propio (SVG, vista de la cabeza por detrás) con las tres cortinas y sus vinchas tipo clip: Grande (5) arriba y más ancha, Mediana (4) en el centro, Pequeña (3) cerca de la nuca. Las tarjetas quedan como leyenda, con la misma letra G/M/P. Pie: «La ubicación final se ajusta a criterio profesional.» (frase ya presente en la ficha). Orden por confirmar con Yesenia.
- Cortina armada: el bloque «Función y colocación» pasa de la pestaña «Colocación y cuidados» a la pestaña Descripción, justo debajo del esquema por capas. La pestaña de colocación queda solo con «Cuidados y recomendaciones» (su nombre no cambia).

## Carrito vacío al entrar · 19 nov 2026
- El carrito de la maqueta se guarda en `sessionStorage` (antes `localStorage`): cada sesión del navegador empieza con el carrito vacío. Se borran los datos que la v3 dejó guardados.
- El contador del icono empieza en 0 (oculto) en las 34 páginas; antes arrancaba en 1.
- La página Carrito muestra «Tu carrito está vacío.» si no se ha añadido nada (antes enseñaba la fila de ejemplo).
- Finalizar compra con el carrito vacío redirige al Carrito («Tu carrito está vacío.»), como WooCommerce (ES y EN). Carrito y Finalizar compra aprobados por Jeremy sin más cambios.

## Página 4/11: Guía de colores y cuidados · 19 nov 2026
- Cambios de Jeremy: quitados la entradilla y los accesos rápidos de la cabecera, la frase bajo «Carta de colores», la nota interna de fotos provisionales y la línea de fuentes de los consejos.
- Carta de colores: cada tarjeta muestra la foto de cerca del cabello (`swatches/detalle/<color>-540.webp`, 4:5), para ver el color. Antes mezclaba fotos de modelo y de extensión.
- «Comprar» de cada color abre la Tienda con ese color ya marcado en las 3 tarjetas (`tienda.html?filter_color=<color>`).
- Carta de colores: eliminada la línea «Código» (repetía el nombre). «Tono» con una de las 5 familias de Jeremy, asignada por la foto y por la convención de códigos (X/22 = mezcla): Oscuros / Negros (1, 2), Castaños (4, 6), Rubios (18 Mate, 60), Cobrizos y Rojizos (Cobre), Mechados y Degradados (4/22, 6/22, 8/22, Ombré). Por validar con Yesenia. «Comprar» alineado al pie de cada tarjeta.
- Tienda: nuevo filtro «Tono» (Oscuros / Negros, Castaños, Rubios, Cobrizos y Rojizos, Mechados y Degradados), con la misma asignación que la Guía de colores. Como los 3 productos tienen todos los tonos, no oculta productos: deja en cada tarjeta solo los colores de los tonos marcados y cambia la foto al primero de ellos. Combinable con el filtro «Producto». En WooCommerce: atributo global «Tono» asignado a cada color.
- Guía, sección de consejos (cambios de Jeremy: fuera el antetítulo y la nota de Tape-In de 45 días; título «Consejos de»): el título se completa con el logotipo horizontal de Yesenia Vargas (`brand/logo-secundario-mocha-maroon.svg`, vectorial) en una segunda línea; el título se lee como «Consejos de Yesenia Vargas».

## Página 5/11: Sobre Yesenia · 19 nov 2026
- Cambios de Jeremy: fuera el título «Yesenia Vargas» y los antetítulos, la fuente de los datos y la banda «Hoy en Estados Unidos».
- Portada de la página: logotipo horizontal de Yesenia Vargas (versión clara) como título principal (h1, alt «Yesenia Vargas»), el párrafo y debajo 3 fotos del local de Urdesa (Ecuador) que se amplían al pulsarlas. Fotos convertidas a WebP: `photos/local-urdesa-{1,2,3}-{400,765}.webp`.
- «De una peluquería a una marca internacional»: las dos columnas empiezan a la misma altura (antes el texto quedaba 70 px más abajo que la cita).
- «Pelucas que devuelven la autoestima»: logotipo de Yesenia Vargas sobre el título.
- Pie: línea fina de separación cuando la última sección de la página es oscura.

## Revisión general ES · 19 nov 2026
Pruebas: 17 páginas × 3 anchos (1280, 768, 390 px) sin errores de JavaScript, sin recursos rotos (404), sin desbordes de página, sin ids duplicados ni enlaces/anclas rotos; 30 flujos probados (menú móvil, selector, filtros, ficha, carrito, checkout, FAQ, prensa, formularios, idioma, lightbox). Sincronizados los cambios de Jeremy en Carrito, Contacto y Prensa.
Correcciones (sin cambios de texto):
- Guía de colores: faltaba cerrar un `<div>` en la cabecera (quedó así al borrar la entradilla con el editor).
- Contacto: la banda «Condiciones para profesionales» reservaba media banda para una imagen que no existe; ahora ocupa todo el ancho.
- «Otros productos» (3 fichas) y tarjetas de Estados: foto de extensión en lugar del recuadro «Imagen por colocar», como en la Tienda.
- Fichas en móvil: degradado a la derecha de las pestañas para indicar que se pueden deslizar (desaparece al llegar al final); la pestaña pulsada se desplaza a la vista.
