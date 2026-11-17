(() => {
  "use strict";
  const DATA = window.EROGARDEN_DATA || {products:[],serviceCategories:[],whatsappNumber:""};
  const PRODUCTS = DATA.products;
  const KEYS = {cart:"erogarden-cart",profile:"erogarden-profile"};
  const money = n => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);
  const byId = id => document.getElementById(id);
  const readObject = key => {
    try { const value = JSON.parse(localStorage.getItem(key) || "{}"); return value && typeof value === "object" && !Array.isArray(value) ? value : {}; }
    catch { return {}; }
  };
  const validIds = new Set(PRODUCTS.map(p => p.id));
  const cleanCart = value => Object.fromEntries(Object.entries(value).filter(([id,qty]) => validIds.has(id) && Number.isFinite(Number(qty)) && Number(qty) > 0).map(([id,qty]) => [id,Math.max(1,Math.min(99,Math.floor(Number(qty))))]));
  let cart = cleanCart(readObject(KEYS.cart));
  let profile = readObject(KEYS.profile);
  let toastTimer;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function toast(message) {
    const el = byId("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
  function saveCart() {
    try { localStorage.setItem(KEYS.cart,JSON.stringify(cart)); }
    catch { toast("Your browser could not save this cart. Check available storage."); }
    renderCartCount();
  }
  function quantityTotal() { return Object.values(cart).reduce((sum,q) => sum + q,0); }
  function cartProducts() { return PRODUCTS.filter(p => cart[p.id] > 0); }
  function renderCartCount() {
    document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = quantityTotal(); });
  }

  function animateCartFlight(button) {
    if (reducedMotion || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const image = button.closest(".product-card")?.querySelector(".product-media img");
    const target = document.querySelector(".cart-link");
    if (!image || !target || !image.complete) return;
    const from = image.getBoundingClientRect(), to = target.getBoundingClientRect();
    const clone = image.cloneNode();
    Object.assign(clone.style,{position:"fixed",left:from.left+"px",top:from.top+"px",width:from.width+"px",height:from.height+"px",objectFit:"cover",zIndex:"90",pointerEvents:"none",margin:"0"});
    document.body.append(clone);
    const dx = to.left + to.width/2 - (from.left + from.width/2);
    const dy = to.top + to.height/2 - (from.top + from.height/2);
    const animation = clone.animate([
      {transform:"translate3d(0,0,0) scale(1)",opacity:1},
      {transform:"translate3d("+dx+"px,"+dy+"px,0) scale(.12)",opacity:.35}
    ],{duration:460,easing:"cubic-bezier(.2,.75,.25,1)",fill:"forwards"});
    animation.onfinish = () => clone.remove();
  }

  function observeReveals(root=document) {
    if (!("IntersectionObserver" in window) || reducedMotion) return;
    const nodes = root.querySelectorAll(".reveal:not([data-reveal-bound])");
    nodes.forEach(node => { node.dataset.revealBound = "true"; revealObserver.observe(node); });
  }
  let revealObserver = null;
  if ("IntersectionObserver" in window && !reducedMotion) {
    document.body.classList.add("js-motion","motion-ready");
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:"0px 0px -32px 0px"});
  }

  function productCard(product) {
    const article = document.createElement("article");
    article.className = "product-card reveal";
    article.innerHTML = '<div class="product-media"><img loading="lazy" decoding="async" alt=""></div><div class="product-info"><p class="product-category"></p><h2 class="product-name"></h2><p class="product-price"></p><p class="product-description"></p><button class="add-to-cart" type="button">＋ Add to cart</button></div>';
    const img = article.querySelector("img");
    img.src = product.image; img.alt = product.name;
    img.addEventListener("error",() => { img.src = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80"; },{once:true});
    article.querySelector(".product-category").textContent = product.category;
    article.querySelector(".product-name").textContent = product.name;
    article.querySelector(".product-price").textContent = money(product.price);
    article.querySelector(".product-description").textContent = product.description;
    const button = article.querySelector("button");
    button.addEventListener("click",() => {
      animateCartFlight(button);
      cart[product.id] = Math.min(99,(cart[product.id] || 0) + 1);
      saveCart();
      button.classList.add("is-added"); button.textContent = "✓ Added";
      toast(product.name + " added to your cart");
      setTimeout(() => { if (button.isConnected) { button.classList.remove("is-added"); button.textContent = "＋ Add to cart"; } },900);
    });
    return article;
  }

  function renderProducts() {
    const grid = byId("productGrid"); if (!grid) return;
    const search = (byId("productSearch")?.value || "").trim().toLowerCase();
    const active = document.querySelector("[data-filter][aria-pressed=true]")?.dataset.filter || "All";
    const list = PRODUCTS.filter(p => (active === "All" || p.category === active) && [p.name,p.category,p.description].join(" ").toLowerCase().includes(search));
    grid.replaceChildren(...list.map(productCard));
    const count = byId("resultCount");
    if (count) count.textContent = list.length + " " + (list.length === 1 ? "item" : "items") + " in the collection";
    const empty = byId("noResults"); if (empty) empty.hidden = list.length !== 0;
    observeReveals(grid);
  }
  function renderFeatured() {
    const grid = byId("homeFeatured"); if (!grid) return;
    grid.replaceChildren(...PRODUCTS.slice(0,4).map(productCard));
    observeReveals(grid);
  }

  function checkoutUrl(items,subtotal) {
    const lines = items.map(p => p.name + " — " + cart[p.id] + " × " + money(p.price) + " = " + money(p.price * cart[p.id]));
    const details = [
      "Hello Erogarden Nigeria Limited, I would like to place an order:",
      "",
      ...lines,
      "",
      "Subtotal: " + money(subtotal),
      profile.name ? "Customer: " + profile.name : "",
      profile.phone ? "Phone: " + profile.phone : "",
      profile.address ? "Delivery area/address: " + profile.address : "",
      profile.notes ? "Notes: " + profile.notes : "",
      "",
      "Please confirm availability, delivery fee and payment instructions."
    ].filter(Boolean).join("\n");
    const number = String(DATA.whatsappNumber || "").replace(/\D/g,"");
    const base = number ? "https://wa.me/" + number : "https://wa.me/";
    return base + "?text=" + encodeURIComponent(details);
  }

  function renderCart() {
    const root = byId("cartLines"); if (!root) return;
    const items = cartProducts();
    const empty = byId("cartEmpty"); if (empty) empty.hidden = items.length !== 0;
    root.hidden = items.length === 0; root.replaceChildren();
    let subtotal = 0;
    items.forEach(product => {
      const qty = cart[product.id]; subtotal += product.price * qty;
      const row = document.createElement("article"); row.className = "cart-line";
      row.innerHTML = '<img alt="" loading="lazy" decoding="async"><div><h2></h2><p class="cart-line-price"></p><div class="quantity-controls"><button class="quantity-btn" type="button" data-step="-1" aria-label="Decrease quantity">−</button><span class="quantity-value" aria-live="polite"></span><button class="quantity-btn" type="button" data-step="1" aria-label="Increase quantity">＋</button><button class="remove-btn" type="button">Remove</button></div></div>';
      const img = row.querySelector("img"); img.src = product.image; img.alt = product.name;
      row.querySelector("h2").textContent = product.name;
      row.querySelector(".cart-line-price").textContent = money(product.price) + " each";
      row.querySelector(".quantity-value").textContent = qty;
      row.querySelectorAll("[data-step]").forEach(btn => btn.addEventListener("click",() => {
        cart[product.id] = Math.min(99,qty + Number(btn.dataset.step));
        if (cart[product.id] <= 0) delete cart[product.id];
        saveCart(); renderCart();
      }));
      row.querySelector(".remove-btn").addEventListener("click",() => { delete cart[product.id]; saveCart(); renderCart(); toast(product.name + " removed"); });
      root.append(row);
    });
    const count = byId("summaryCount"), sub = byId("summarySubtotal"), total = byId("summaryTotal"), checkout = byId("checkoutBtn");
    if (count) count.textContent = quantityTotal();
    if (sub) sub.textContent = money(subtotal);
    if (total) total.textContent = money(subtotal);
    if (checkout) {
      const enabled = items.length > 0;
      checkout.href = enabled ? checkoutUrl(items,subtotal) : "#";
      checkout.setAttribute("aria-disabled",String(!enabled));
      checkout.onclick = event => { if (!enabled) event.preventDefault(); };
    }
  }

  function initMarket() {
    const requested = new URLSearchParams(location.search).get("category");
    if (requested && ["Plants","Pots","Garden Care","Tools"].includes(requested)) {
      document.querySelectorAll("[data-filter]").forEach(btn => btn.setAttribute("aria-pressed",String(btn.dataset.filter === requested)));
    }
    document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click",() => {
      document.querySelectorAll("[data-filter]").forEach(item => item.setAttribute("aria-pressed",String(item === btn)));
      renderProducts();
    }));
    byId("productSearch")?.addEventListener("input",renderProducts);
    document.querySelector("[data-reset-filters]")?.addEventListener("click",() => {
      if (byId("productSearch")) byId("productSearch").value = "";
      document.querySelectorAll("[data-filter]").forEach(btn => btn.setAttribute("aria-pressed",String(btn.dataset.filter === "All")));
      renderProducts();
    });
    renderProducts();
  }

  function initProfile() {
    const form = byId("profileForm"); if (!form) return;
    ["name","phone","email","address","notes"].forEach(key => {
      const field = form.elements.namedItem(key); if (field) field.value = typeof profile[key] === "string" ? profile[key] : "";
    });
    form.addEventListener("submit",event => {
      event.preventDefault();
      const next = Object.fromEntries(new FormData(form).entries());
      try { localStorage.setItem(KEYS.profile,JSON.stringify(next)); profile = next; toast("Your details have been saved on this device"); }
      catch { toast("Could not save your details. Check available storage."); }
    });
    byId("clearProfile")?.addEventListener("click",() => {
      try { localStorage.removeItem(KEYS.profile); profile = {}; form.reset(); toast("Saved profile cleared"); }
      catch { toast("Could not clear the saved profile"); }
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("main > section").forEach(section => { if (!section.classList.contains("hero")) section.classList.add("reveal"); });
  observeReveals();
  renderCartCount(); renderFeatured(); initMarket(); renderCart(); initProfile();

  window.addEventListener("storage",event => {
    if (event.key === KEYS.cart) { cart = cleanCart(readObject(KEYS.cart)); renderCartCount(); renderCart(); }
    if (event.key === KEYS.profile) { profile = readObject(KEYS.profile); }
  });

  let deferredPrompt;
  const install = byId("installBtn");
  window.addEventListener("beforeinstallprompt",event => { event.preventDefault(); deferredPrompt = event; if (install) install.classList.add("visible"); });
  install?.addEventListener("click",async() => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; install.classList.remove("visible");
  });
  window.addEventListener("appinstalled",() => toast("Erogarden added to your home screen"));
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load",() => navigator.serviceWorker.register("/sw.js").catch(error => console.warn("Service worker registration failed:",error)));
  }
})();