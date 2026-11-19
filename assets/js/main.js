/* ==========================================================================
   Yesenia Vargas Hair — main.js (maqueta)
   Vanilla JS, sin dependencias. En WordPress, la lógica de variaciones,
   carrito y checkout la aporta WooCommerce; aquí solo se simula para revisar
   estados visuales. Ver docs/guia-implementacion.md.
   ========================================================================== */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.remove('no-js');
  var lang = (root.lang || 'es').slice(0, 2);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var T = {
    es: {
      needVariation: 'Elige un color antes de añadir al carrito.',
      added: 'se ha añadido a tu carrito.', viewCart: 'Ver carrito',
      formErrors: 'Revisa los campos marcados:', required: 'Este campo es obligatorio.',
      email: 'Introduce un email válido.', sent: 'Esta es una versión de prueba: el mensaje no se ha enviado.',
      chosen: 'Elegido:', none: 'Ninguno', removed: 'Producto eliminado.',
      zoom: 'Ver a tamaño real', altExt: 'Extensión completa de 20 pulgadas en ', altTone: 'Detalle del tono ', phl: 'Imagen por colocar', lbrMeta: '20" · imagen original 1024 × 1536 px',
      menuOpen: 'Abrir menú', menuClose: 'Cerrar menú', markersOn: 'Marcadores: ON', markersOff: 'Marcadores: OFF',
      showFilters: 'Filtros', hideFilters: 'Ocultar filtros', results: function (n) { return n === 1 ? 'Mostrando 1 resultado' : 'Mostrando los ' + n + ' resultados'; }
    },
    en: {
      needVariation: 'Choose a color before adding to cart.',
      added: 'has been added to your cart.', viewCart: 'View cart',
      formErrors: 'Please check the highlighted fields:', required: 'This field is required.',
      email: 'Enter a valid email address.', sent: 'This is a preview version: your message has not been sent.',
      chosen: 'Selected:', none: 'None', removed: 'Item removed.',
      zoom: 'View actual size', altExt: 'Full 20-inch extension in ', altTone: 'Shade detail ', phl: 'Image to be added', lbrMeta: '20" · original image 1024 × 1536 px',
      menuOpen: 'Open menu', menuClose: 'Close menu', markersOn: 'Markers: ON', markersOff: 'Markers: OFF',
      showFilters: 'Filters', hideFilters: 'Hide filters', results: function (n) { return n === 1 ? 'Showing the single result' : 'Showing all ' + n + ' results'; }
    }
  }[lang] || {};

  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  /* v4: el carrito vive en sessionStorage: cada visita (sesión del navegador) empieza vacía.
     Se borran los datos antiguos que la v3 dejó en localStorage. */
  try { localStorage.removeItem('yv-cart'); localStorage.removeItem('yv-cart-items'); } catch (e) {}
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function money(n) { return '$' + n.toFixed(2); }

  /* --- Catálogo v3 (ficha técnica) -------------------------------------- */
  var PRICE = 135; // provisional, igual para todos
  var CAT = {
    es: {
      ponytail: { name: 'Ponytail', url: 'producto-ponytail.html', unit: ['pieza', 'piezas'], w: 100 },
      tapein: { name: 'Adhesivas Tape-In', url: 'producto-extensiones-adhesivas.html', unit: ['paquete', 'paquetes'], w: 50, pcs: 20, pcsw: 'unidades' },
      cortina: { name: 'Cortina armada', url: 'producto-cortina-armada.html', unit: ['set', 'sets'], w: 100, layers: 3, clips: 12, lw: 'capas' }
    },
    en: {
      ponytail: { name: 'Ponytail', url: 'product-ponytail.html', unit: ['piece', 'pieces'], w: 100 },
      tapein: { name: 'Tape-In Extensions', url: 'product-tape-in-extensions.html', unit: ['pack', 'packs'], w: 50, pcs: 20, pcsw: 'pieces' },
      cortina: { name: 'Clip-in Weft Set', url: 'product-clip-in-weft-set.html', unit: ['set', 'sets'], w: 100, layers: 3, clips: 12, lw: 'layers' }
    }
  }[lang] || {};
  var LBL = lang === 'es' ? { color: 'Color', len: 'Largo', pres: 'Presentación', remove: 'Eliminar ', qty: 'Cantidad', down: 'Reducir cantidad', up: 'Aumentar cantidad' }
                          : { color: 'Color', len: 'Length', pres: 'Pack', remove: 'Remove ', qty: 'Quantity', down: 'Decrease quantity', up: 'Increase quantity' };
  function pres(key, q) {
    var p = CAT[key]; if (!p) return '';
    var t = q + ' ' + (q === 1 ? p.unit[0] : p.unit[1]);
    if (p.pcs) t += ' · ' + (p.pcs * q) + ' ' + p.pcsw;
    if (p.layers) t += ' · ' + (p.layers * q) + ' ' + p.lw + ' · ' + (p.clips * q) + ' clips';
    return t + ' · ' + (p.w * q) + ' g';
  }
  function cartItems(v) {
    if (v === undefined) { try { var x = JSON.parse(store('yv-cart-items')); return Array.isArray(x) ? x : null; } catch (e) { return null; } }
    store('yv-cart-items', JSON.stringify(v));
  }
  function itemsCount(items) { return items.reduce(function (a, it) { return a + it.qty; }, 0); }

  /* --- Menú móvil ------------------------------------------------------- */
  var drawer = $('#nav-drawer'), openBtn = $('.menu-toggle'), lastFocus;
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open'); d.body.classList.remove('drawer-open');
    openBtn.setAttribute('aria-expanded', 'false'); if (lastFocus) lastFocus.focus();
  }
  if (drawer && openBtn) {
    openBtn.addEventListener('click', function () {
      lastFocus = d.activeElement; drawer.classList.add('is-open'); d.body.classList.add('drawer-open');
      openBtn.setAttribute('aria-expanded', 'true'); var f = $('.nav-drawer__close', drawer); if (f) f.focus();
    });
    $$('[data-close-drawer]', drawer).forEach(function (b) { b.addEventListener('click', closeDrawer); });
    d.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeDrawer();
      if (e.key === 'Tab') { // trampa de foco
        var f = $$('a,button', $('.nav-drawer__panel', drawer)); var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* --- Aparición al hacer scroll --------------------------------------- */
  var rev = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    rev.forEach(function (el) { io.observe(el); });
  } else rev.forEach(function (el) { el.classList.add('is-in'); });

  /* --- Contador del carrito (simulado) --------------------------------- */
  function cartCount(n) {
    $$('.cart-count').forEach(function (c) { c.textContent = n; c.setAttribute('data-count', n); });
  }
  var savedCount = parseInt(store('yv-cart') || '0', 10); cartCount(isNaN(savedCount) ? 0 : savedCount);

  /* --- Selector de colores de la home (v3: color + productos + foto) ---- */
  $$('[data-color-picker]').forEach(function (picker) {
    var btns = $$('[data-color]', picker), pv = $('[data-preview]', picker);
    var img = $('[data-pv-img]', pv), note = $('[data-pv-note]', pv), inl = $('[data-pv-name-inline]', picker);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var c = JSON.parse(b.getAttribute('data-color'));
        img.src = c.img; img.alt = c.alt; if (c.w) { img.width = c.w; img.height = c.h; }
        img.classList.toggle('is-product', c.fit === 'contain');
        $('[data-pv-name]', pv).textContent = c.name; if (inl) inl.textContent = c.name;
        if (note) { note.textContent = c.note || ''; note.hidden = !c.note; }
        $$('[data-pv-link]', picker).forEach(function (a) { a.href = a.getAttribute('data-base') + '?color=' + c.slug; });
      });
    });
  });

  /* --- Tarjetas de la tienda: color por tarjeta (v4) ------------------------ */
  $$('[data-card-colors]').forEach(function (card) {
    var btns = $$('[data-card-color]', card), img = $('[data-card-img]', card);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var c = JSON.parse(b.getAttribute('data-card-color'));
        if (img) { img.src = c.img; img.alt = c.alt; }
        $$('[data-card-link]', card).forEach(function (a) { a.href = a.getAttribute('data-base') + '?color=' + c.slug; });
      });
    });
    /* «Comprar» desde la Guía de colores: tienda.html?filter_color=<color> marca ese color en cada tarjeta */
    var fc = new URLSearchParams(location.search).get('filter_color');
    if (fc === '18') fc = '18-mate';
    if (fc) btns.forEach(function (b) { if (JSON.parse(b.getAttribute('data-card-color')).slug === fc) b.click(); });
  });

  /* --- Galería de producto: foto por color + tamaño real (v2) -------------- */
  function colorRadios() { return $$('input[name="yv_color"]'); }
  function stepColor(n) {
    var rs = colorRadios(); if (!rs.length) return;
    var i = rs.indexOf(rs.filter(function (x) { return x.checked; })[0]);
    var j = i < 0 ? 0 : (i + n + rs.length) % rs.length;
    rs[j].checked = true; rs[j].dispatchEvent(new Event('change', { bubbles: true }));
  }
  var LBR = (function () {
    var dlg = $('#lightbox-real'); if (!dlg || typeof dlg.showModal !== 'function') return null;
    var im = $('[data-lbr-img]', dlg), meta = $('[data-lbr-meta]', dlg), vp = $('[data-lbr-viewport]', dlg);
    function mode(m) {
      dlg.setAttribute('data-mode', m);
      $$('[data-lbr-mode]', dlg).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lbr-mode') === m); });
    }
    function render(r) {
      im.src = r.getAttribute('data-ext-full'); im.alt = T.altExt + r.getAttribute('data-label');
      meta.textContent = '— ' + r.getAttribute('data-label') + ' · ' + T.lbrMeta; vp.scrollTop = 0;
    }
    $$('[data-lbr-mode]', dlg).forEach(function (b) { b.addEventListener('click', function () { mode(b.getAttribute('data-lbr-mode')); }); });
    $$('[data-lbr-step]', dlg).forEach(function (b) { b.addEventListener('click', function () { stepColor(parseInt(b.getAttribute('data-lbr-step'), 10)); }); });
    $('[data-lbr-close]', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === vp) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); stepColor(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepColor(-1); }
    });
    return {
      open: function (r) { render(r); if (!dlg.open) { mode(window.innerWidth < 700 ? 'fit' : 'real'); dlg.showModal(); } },
      render: function (r) { if (dlg.open && r) render(r); }
    };
  })();
  var G = (function () {
    var g = $('[data-gallery]'); if (!g) return null;
    var empty = $('[data-gallery-empty]', g), open = $('[data-gallery-open]', g), img = $('[data-gallery-img]', g);
    var phLabel = $('[data-gallery-ph-label]', g), title = $('[data-gallery-label]', g), sw = $('[data-gallery-swatch]', g);
    var viewOut = $('[data-gallery-view]'), thumbs = $$('.flex-control-thumbs button', g);
    var cur = null, kind = 'ext';
    function show() {
      var photo = !!cur && (kind === 'ext' || kind === 'tone');
      empty.hidden = photo; open.hidden = !photo;
      if (photo) {
        var src = cur.getAttribute(kind === 'ext' ? 'data-ext' : 'data-tone'), label = cur.getAttribute('data-label');
        img.classList.add('is-loading');
        var pre = new Image();
        pre.onload = pre.onerror = function () { img.src = src; img.classList.remove('is-loading'); };
        pre.src = src;
        img.width = kind === 'ext' ? 640 : 540; img.height = kind === 'ext' ? 960 : 675;
        img.alt = (kind === 'ext' ? T.altExt : T.altTone) + label;
        open.classList.toggle('is-tone', kind === 'tone');
        open.setAttribute('aria-label', T.zoom + ' — ' + label);
      } else {
        var b = thumbs.filter(function (x) { return x.getAttribute('data-kind') === kind; })[0];
        phLabel.textContent = cur ? T.phl : phLabel.getAttribute('data-default');
        title.textContent = cur ? b.getAttribute('data-view') + ' · ' + cur.getAttribute('data-label') : title.getAttribute('data-default');
        if (sw) { sw.hidden = !cur; if (cur) sw.src = cur.getAttribute('data-swatch'); }
      }
    }
    function pick(b) {
      kind = b.getAttribute('data-kind');
      thumbs.forEach(function (x) { x.setAttribute('aria-current', x === b); });
      if (viewOut) viewOut.textContent = b.getAttribute('data-view');
      show();
    }
    thumbs.forEach(function (b) { b.addEventListener('click', function () { pick(b); }); });
    open.addEventListener('click', function () { if (cur && LBR) LBR.open(cur); });
    return {
      set: function (r) {
        cur = r || null;
        thumbs.forEach(function (b) {
          var k = b.getAttribute('data-kind'), ti = $('[data-thumb-img]', b), tp = $('[data-thumb-ph]', b);
          if (!ti) return;
          ti.hidden = !cur; tp.hidden = !!cur;
          if (cur) ti.src = cur.getAttribute(k === 'ext' ? 'data-ext' : 'data-swatch');
        });
        if (!cur) pick(thumbs[0]); else show();
        if (LBR) LBR.render(cur);
      }
    };
  })();

  /* --- Variaciones (ficha de producto) ---------------------------------- */
  $$('form.variations_form').forEach(function (form) {
    var radios = $$('input[name="yv_color"]', form), select = $('select[name="attribute_pa_color"]', form);
    var btn = $('.single_add_to_cart_button', form), msg = $('.variation-needed', form), out = $('[data-selected-value]', form);
    var reset = $('.reset_variations', form), sku = $('[data-sku]'), mbarName = $('[data-mbar-variation]');
    var galleryLabel = $('[data-gallery-label]'), gallerySwatch = $('[data-gallery-swatch]');
    function update() {
      var r = radios.filter(function (x) { return x.checked; })[0];
      if (!r) {
        select.value = ''; btn.classList.add('disabled', 'wc-variation-selection-needed'); btn.setAttribute('aria-disabled', 'true');
        out.textContent = T.none; if (reset) reset.hidden = true; if (sku) sku.textContent = sku.getAttribute('data-base') + '-…';
        if (galleryLabel) galleryLabel.textContent = galleryLabel.getAttribute('data-default');
        if (gallerySwatch) gallerySwatch.hidden = true;
        if (G) G.set(null);
        return;
      }
      select.value = r.value; btn.classList.remove('disabled', 'wc-variation-selection-needed'); btn.removeAttribute('aria-disabled');
      msg.classList.remove('is-visible'); out.textContent = r.getAttribute('data-label'); if (reset) reset.hidden = false;
      if (sku) sku.textContent = sku.getAttribute('data-base') + '-' + r.getAttribute('data-code') + '-' + (sku.getAttribute('data-len') || '22');
      if (mbarName) mbarName.textContent = r.getAttribute('data-label');
      if (G) G.set(r);
      else {
        if (galleryLabel) galleryLabel.textContent = r.getAttribute('data-label');
        if (gallerySwatch) { gallerySwatch.src = r.getAttribute('data-swatch'); gallerySwatch.hidden = false; }
      }
    }
    radios.forEach(function (r) { r.addEventListener('change', update); });
    var pkey = form.getAttribute('data-key'), packOut = $('[data-pack-calc]', form), qtyIn = $('.qty', form);
    function packCalc() { if (packOut && pkey) packOut.textContent = pres(pkey, Math.max(1, parseInt(qtyIn.value, 10) || 1)); }
    if (qtyIn) { qtyIn.addEventListener('change', packCalc); qtyIn.addEventListener('input', packCalc); }
    if (reset) reset.addEventListener('click', function (e) { e.preventDefault(); radios.forEach(function (r) { r.checked = false; }); update(); radios[0].focus(); });
    var pre = new URLSearchParams(location.search).get('color');
    if (pre === '18') pre = '18-mate'; // enlaces antiguos de la home y la guía
    if (pre) radios.forEach(function (r) { if (r.value === pre) r.checked = true; });
    update();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.classList.contains('disabled')) { msg.textContent = T.needVariation; msg.classList.add('is-visible'); radios[0].focus(); return; }
      var q = parseInt($('.qty', form).value, 10) || 1, n = (parseInt(store('yv-cart') || '0', 10) || 0) + q;
      var rsel = radios.filter(function (x) { return x.checked; })[0];
      if (pkey && rsel) {
        var items = cartItems() || [], same = items.filter(function (it) { return it.key === pkey && it.color === rsel.value; })[0];
        if (same) same.qty += q; else items.push({ key: pkey, color: rsel.value, label: rsel.getAttribute('data-label'), swatch: rsel.getAttribute('data-swatch'), qty: q });
        cartItems(items); n = itemsCount(items);
      }
      store('yv-cart', n); cartCount(n);
      var notice = $('.woocommerce-notices-wrapper');
      if (notice) {
        notice.innerHTML = '<div class="woocommerce-message" role="alert">“' + form.getAttribute('data-product') + ' — ' + out.textContent + '” ' + T.added +
          ' <a href="' + form.getAttribute('data-cart') + '" class="button wc-forward">' + T.viewCart + '</a></div>';
        notice.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
    // Barra fija móvil
    var mbar = $('.mbar');
    if (mbar && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { mbar.classList.toggle('is-visible', !es[0].isIntersecting && es[0].boundingClientRect.top < 0); }).observe(btn);
      var mbtn = $('[data-mbar-add]'); if (mbtn) mbtn.addEventListener('click', function () { btn.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); btn.focus(); });
    }
  });

  /* --- Cantidad +/- ------------------------------------------------------ */
  $$('.quantity').forEach(function (q) {
    var input = $('.qty', q);
    $$('.qty-btn', q).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = (parseInt(input.value, 10) || 1) + (b.getAttribute('data-step') === 'up' ? 1 : -1);
        input.value = Math.max(parseInt(input.min || '1', 10), Math.min(v, parseInt(input.max || '99', 10)));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  /* --- Galería de producto (miniaturas): ahora en el módulo G (v2) ------- */

  /* --- Pestañas ARIA ----------------------------------------------------- */
  $$('[role="tablist"]').forEach(function (tl) {
    var tabs = $$('[role="tab"]', tl);
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        x.parentNode.classList.toggle('active', on); d.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === 'Home') n = tabs[0]; if (k === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* v4 (revisión) · Pestañas desplazables en móvil: quita el degradado al llegar al final
     y lleva a la vista la pestaña activa */
  $$('.woocommerce-tabs ul.tabs').forEach(function (ul) {
    function edge() { ul.classList.toggle('is-end', ul.scrollLeft + ul.clientWidth >= ul.scrollWidth - 2); }
    ul.addEventListener('scroll', edge, { passive: true }); window.addEventListener('resize', edge); edge();
    ul.addEventListener('click', function (e) { var t = e.target.closest('a,button'); if (t && t.scrollIntoView) t.scrollIntoView({ block: 'nearest', inline: 'nearest' }); });
  });

  /* --- Lightbox (prensa, galería) ---------------------------------------- */
  var lb = $('#lightbox');
  if (lb && typeof lb.showModal === 'function') {
    $$('[data-lightbox]').forEach(function (b) {
      b.addEventListener('click', function () {
        $('img', lb).src = b.getAttribute('data-lightbox'); $('img', lb).alt = b.getAttribute('data-alt') || '';
        $('figcaption', lb).textContent = b.getAttribute('data-caption') || ''; lb.showModal();
      });
    });
    $('.lightbox__close', lb).addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () { $('img', lb).src = ''; });
  }

  /* --- Tienda: filtros (demo en cliente) --------------------------------- */
  var ft = $('.filters-toggle'), sb = $('.shop-sidebar');
  if (ft && sb) ft.addEventListener('click', function () {
    var open = sb.classList.toggle('is-open'); ft.setAttribute('aria-expanded', open); ft.querySelector('span').textContent = open ? T.hideFilters : T.showFilters;
  });
  /* v4 · Filtro por tono: en cada tarjeta deja solo los colores de los tonos marcados
     (los 3 productos tienen todos los tonos, así que no oculta productos). */
  var toneFilters = $$('[data-filter-tone]');
  if (toneFilters.length) toneFilters.forEach(function (c) {
    c.addEventListener('change', function () {
      var act = toneFilters.filter(function (x) { return x.checked; }).map(function (x) { return x.value; });
      $$('[data-card-colors]').forEach(function (card) {
        var btns = $$('[data-card-color]', card), vis = [];
        btns.forEach(function (b) { var ok = !act.length || act.indexOf(b.getAttribute('data-tone')) > -1; b.parentElement.hidden = !ok; if (ok) vis.push(b); });
        var cur = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0];
        if (vis.length && (!cur || vis.indexOf(cur) < 0)) vis[0].click();
      });
    });
  });
  var techFilters = $$('[data-filter-tech]');
  if (techFilters.length) {
    var items = $$('ul.products li.product'), count = $('.woocommerce-result-count');
    function applyFilters() {
      var active = techFilters.filter(function (c) { return c.checked; }).map(function (c) { return c.value; }), n = 0;
      items.forEach(function (li) { var show = !active.length || active.indexOf(li.getAttribute('data-tech')) > -1; li.hidden = !show; if (show) n++; });
      if (count) count.textContent = T.results(n);
    }
    techFilters.forEach(function (c) { c.addEventListener('change', applyFilters); });
  }

  /* --- Carrito (demo): líneas guardadas desde la ficha ------------------ */
  var cartForm = $('.woocommerce-cart-form');
  if (cartForm) {
    var stored = cartItems(), tbody = $('tbody', cartForm);
    function rowHtml(it, i) {
      var p = CAT[it.key] || {}, id = 'cart-qty-' + (i + 1);
      return '<tr class="woocommerce-cart-form__cart-item cart_item" data-key="' + it.key + '" data-color="' + it.color + '">' +
        '<td class="product-remove"><a href="#" class="remove" aria-label="' + LBL.remove + p.name + ' ' + it.label + '">×</a></td>' +
        '<td class="product-thumbnail"><img src="' + it.swatch + '" width="160" height="160" alt="" loading="lazy" decoding="async"></td>' +
        '<td class="product-name" data-title="' + (lang === 'es' ? 'Producto' : 'Product') + '"><a href="' + p.url + '?color=' + it.color + '">' + p.name + '</a>' +
        '<dl class="variation"><dt>' + LBL.color + ':</dt><dd>' + it.label + '</dd><dt>' + LBL.len + ':</dt><dd>22 in</dd><dt>' + LBL.pres + ':</dt><dd data-pres>' + pres(it.key, it.qty) + '</dd></dl></td>' +
        '<td class="product-price" data-title="' + (lang === 'es' ? 'Precio' : 'Price') + '"><span class="woocommerce-Price-amount amount "><bdi class="ph">' + money(PRICE) + '</bdi></span></td>' +
        '<td class="product-quantity" data-title="' + LBL.qty + '"><div class="quantity"><button type="button" class="qty-btn" data-step="down" aria-label="' + LBL.down + '">−</button>' +
        '<label class="screen-reader-text" for="' + id + '">' + LBL.qty + '</label><input type="number" id="' + id + '" class="input-text qty text" value="' + it.qty + '" min="1" max="99" inputmode="numeric">' +
        '<button type="button" class="qty-btn" data-step="up" aria-label="' + LBL.up + '">+</button></div></td>' +
        '<td class="product-subtotal" data-title="Subtotal"><span class="woocommerce-Price-amount amount"><bdi class="ph" data-subtotal>' + money(PRICE * it.qty) + '</bdi></span></td></tr>';
    }
    if (stored && stored.length) {
      $$('.cart_item', cartForm).forEach(function (r) { r.remove(); });
      $('.actions-row', cartForm).insertAdjacentHTML('beforebegin', stored.map(rowHtml).join(''));
      $$('.cart_item .quantity', cartForm).forEach(function (q) {
        var input = $('.qty', q);
        $$('.qty-btn', q).forEach(function (b) {
          b.addEventListener('click', function () {
            var v = (parseInt(input.value, 10) || 1) + (b.getAttribute('data-step') === 'up' ? 1 : -1);
            input.value = Math.max(1, Math.min(v, 99)); input.dispatchEvent(new Event('change', { bubbles: true }));
          });
        });
      });
    }
    function emptyState(onLoad) {
      $$('[data-cart-full]').forEach(function (x) { x.hidden = true; }); $('[data-cart-empty]').hidden = false;
      $('.woocommerce').classList.remove('has-items'); store('yv-cart', 0); cartCount(0);
      if (!onLoad) $('[data-cart-empty] .cart-empty').focus();
    }
    function recalc() {
      var total = 0, n = 0, items = [];
      $$('.cart_item', cartForm).forEach(function (row) {
        var q = parseInt($('.qty', row).value, 10) || 1, st = q * PRICE; total += st; n += q;
        $('[data-subtotal]', row).textContent = money(st);
        var pr = $('[data-pres]', row); if (pr) pr.textContent = pres(row.getAttribute('data-key'), q);
        if (row.getAttribute('data-color')) {
          var old = (stored || []).filter(function (it) { return it.key === row.getAttribute('data-key') && it.color === row.getAttribute('data-color'); })[0];
          if (old) { old.qty = q; items.push(old); }
        }
      });
      $$('[data-cart-subtotal],[data-cart-total]').forEach(function (el) { el.textContent = money(total); });
      if (stored) { stored = items; cartItems(items); }
      store('yv-cart', n); cartCount(n);
    }
    cartForm.addEventListener('change', recalc);
    cartForm.addEventListener('click', function (e) {
      var a = e.target.closest('.product-remove a'); if (!a) return;
      e.preventDefault(); a.closest('.cart_item').remove(); recalc();
      if (!$('.cart_item', cartForm)) emptyState();
    });
    if (!stored || !stored.length) emptyState(true); else recalc();
  }

  /* --- Checkout: resumen del pedido desde el carrito --------------------- */
  var orderBody = $('[data-order-items]');
  if (orderBody) {
    var oi = cartItems();
    /* v4: como WooCommerce, con el carrito vacío no se puede finalizar compra: se vuelve al carrito */
    if (!oi || !oi.length) { location.replace(lang === 'es' ? 'carrito.html' : 'cart.html'); return; }
    if (oi && oi.length) {
      var tot = 0;
      orderBody.innerHTML = oi.map(function (it) {
        var p = CAT[it.key] || {}, st = PRICE * it.qty; tot += st;
        return '<tr class="cart_item"><td class="product-name">' + p.name + ' — ' + it.label + ', 22 in<br><span class="small muted">' + pres(it.key, it.qty) +
          '</span> <strong class="product-quantity">× ' + it.qty + '</strong></td><td class="product-total"><span class="woocommerce-Price-amount amount "><bdi class="ph">' + money(st) + '</bdi></span></td></tr>';
      }).join('');
      var tbl = orderBody.closest('table');
      $$('.cart-subtotal bdi, .order-total bdi', tbl).forEach(function (b) { b.textContent = money(tot); });
    }
  }

  /* --- Checkout: enviar a otra dirección --------------------------------- */
  var ship = $('#ship-to-different-address-checkbox');
  if (ship) ship.addEventListener('change', function () { $('.shipping_address').hidden = !ship.checked; });

  /* --- Contacto: preselección mayoristas -------------------------------- */
  if (location.hash === '#mayoristas') { var s = $('#contact_type'); if (s) s.value = 'wholesale'; }

  /* --- Validación de formularios (demo de estados de error) --------------- */
  $$('form[data-validate]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [], box = $('.form-errors', form);
      $$('[required]', form).forEach(function (f) {
        if (f.closest('[hidden]')) return;
        var wrap = f.closest('.form-row, .field'), bad = false, m = T.required;
        if (f.type === 'checkbox') bad = !f.checked;
        else if (!f.value.trim()) bad = true;
        else if (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)) { bad = true; m = T.email; }
        if (wrap) {
          wrap.classList.toggle('woocommerce-invalid', bad); wrap.classList.toggle('is-invalid', bad);
          wrap.classList.toggle('woocommerce-validated', !bad && f.type !== 'checkbox');
          var fe = $('.field-error', wrap); if (fe) fe.textContent = m;
        }
        f.setAttribute('aria-invalid', bad);
        if (bad) { var l = form.querySelector('label[for="' + f.id + '"]'); errors.push({ id: f.id, label: l ? l.textContent.replace('*', '').trim() : f.name, msg: m }); }
      });
      if (!box) return;
      if (errors.length) {
        box.innerHTML = '<ul class="woocommerce-error" role="alert" tabindex="-1"><li><strong>' + T.formErrors + '</strong></li>' +
          errors.map(function (x) { return '<li><a href="#' + x.id + '">' + x.label + '</a>: ' + x.msg + '</li>'; }).join('') + '</ul>';
        box.firstChild.focus();
      } else {
        box.innerHTML = '<div class="woocommerce-message" role="status" tabindex="-1">' + T.sent + '</div>'; box.firstChild.focus();
      }
    });
  });
})();
