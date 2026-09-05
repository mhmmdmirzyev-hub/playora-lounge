/* ============================================================
   PLAYORA LOUNGE & GAME CENTER — Render məntiqi, filtrlər və animasiyalar
   ============================================================ */
(function(){
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const waLink = (text) => `https://wa.me/994771006080?text=${encodeURIComponent(text)}`;

  /* ---------------- NAV ---------------- */
  const nav = document.getElementById("site-nav");
  const burger = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive:true });

  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a, button").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- THEME (dark/light) ---------------- */
  const THEME_KEY = "playora-theme";

  function applyTheme(theme){
    const themeColorMeta = document.getElementById("theme-color-meta");
    if(theme === "light"){
      document.documentElement.setAttribute("data-theme", "light");
      document.querySelectorAll(".theme-toggle-icon-el").forEach(icon => icon.className = "ph-bold ph-moon theme-toggle-icon-el");
      if(themeColorMeta) themeColorMeta.setAttribute("content", "#f7f8fb");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.querySelectorAll(".theme-toggle-icon-el").forEach(icon => icon.className = "ph-bold ph-sun theme-toggle-icon-el");
      if(themeColorMeta) themeColorMeta.setAttribute("content", "#0a0a12");
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  document.querySelectorAll(".theme-toggle-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  });

  /* ---------------- MENU / SETS "SEPARATE VIEW" MODAL ---------------- */
  let lastScrollY = 0;

  function openSectionModal(id){
    const section = document.getElementById(id);
    if(!section) return;
    document.querySelectorAll("section.section-modal").forEach(other => {
      if(other !== section) other.classList.remove("section-modal");
    });
    if(!document.querySelector("section.section-modal")) lastScrollY = window.scrollY;
    section.classList.add("section-modal");
    document.body.classList.add("modal-locked");
    section.scrollTop = 0;
    section.querySelectorAll(".reveal, .reveal-on-scroll").forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    if(id === "menu") updateMenuTabsNav();
  }

  function closeSectionModal(section){
    section.classList.remove("section-modal");
    document.body.classList.remove("modal-locked");
    window.scrollTo({ top: lastScrollY, behavior: "auto" });
  }

  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => openSectionModal(btn.dataset.openModal));
  });

  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => closeSectionModal(btn.closest("section")));
  });

  document.querySelectorAll("a[href^='#']").forEach(a => {
    if(a.hasAttribute("data-open-modal") || a.hasAttribute("data-close-modal")) return;
    a.addEventListener("click", () => {
      const openSection = document.querySelector("section.section-modal");
      if(openSection) closeSectionModal(openSection);
    });
  });

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- WHATSAPP LINKS ---------------- */
  document.querySelectorAll("[data-wa]").forEach(el => {
    const msg = el.getAttribute("data-wa") || "Salam! Rezervasiya etmək istəyirəm.";
    el.href = waLink(msg);
    el.target = "_blank";
    el.rel = "noopener";
  });

  /* ---------------- PHOTO LIGHTBOX (Atmosfer gallery) ---------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt, caption){
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightboxBackdrop.classList.add("open");
    lightbox.classList.add("open");
    document.body.classList.add("modal-locked");
  }

  function closeLightbox(){
    lightboxBackdrop.classList.remove("open");
    lightbox.classList.remove("open");
    if(!document.querySelector("section.section-modal")) document.body.classList.remove("modal-locked");
  }

  document.querySelectorAll(".interior-card").forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if(!img) return;
      const label = card.querySelector(".interior-card-label span");
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"), label ? label.textContent : "");
    });
  });

  const setSheetHeroEl = document.getElementById("set-sheet-hero");
  setSheetHeroEl.addEventListener("click", () => {
    if(!setSheetHeroEl.classList.contains("set-sheet-hero--photo")) return;
    const match = setSheetHeroEl.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if(!match) return;
    const title = document.getElementById("set-sheet-title")?.textContent || "";
    openLightbox(match[1], title, title);
  });

  lightboxBackdrop.addEventListener("click", closeLightbox);
  lightboxClose.addEventListener("click", closeLightbox);

  /* ---------------- MENU ---------------- */
  const menuTabs = document.getElementById("menu-tabs");
  const menuTabsPrev = document.getElementById("menu-tabs-prev");
  const menuTabsNext = document.getElementById("menu-tabs-next");
  const menuGrid = document.getElementById("menu-grid");
  const menuViewGridBtn = document.getElementById("menu-view-grid");
  const menuViewListBtn = document.getElementById("menu-view-list");
  let activeMenuCat = MENU_CATEGORIES[0].id;
  let menuView = "grid";

  function updateMenuTabsNav(){
    const maxScroll = menuTabs.scrollWidth - menuTabs.clientWidth;
    menuTabsPrev.disabled = menuTabs.scrollLeft <= 4;
    menuTabsNext.disabled = menuTabs.scrollLeft >= maxScroll - 4;
  }
  menuTabsPrev.addEventListener("click", () => {
    menuTabs.scrollBy({ left: -menuTabs.clientWidth * 0.7, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
  menuTabsNext.addEventListener("click", () => {
    menuTabs.scrollBy({ left: menuTabs.clientWidth * 0.7, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
  menuTabs.addEventListener("scroll", updateMenuTabsNav, { passive:true });
  window.addEventListener("resize", updateMenuTabsNav, { passive:true });

  function renderMenuTabs(){
    menuTabs.innerHTML = MENU_CATEGORIES.map(c => `
      <button type="button" data-cat="${c.id}"
        class="menu-tab-pill ${c.id===activeMenuCat?'active':''} tap-target shrink-0 px-4 py-2 rounded-full text-sm font-medium">
        ${c.name}
      </button>
    `).join("");

    menuTabs.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        activeMenuCat = btn.dataset.cat;
        renderMenuTabs();
        renderMenuGrid();
        menuTabs.querySelector(`[data-cat="${activeMenuCat}"]`)?.scrollIntoView({behavior: prefersReducedMotion ? "auto" : "smooth", inline:"center", block:"nearest"});
        document.getElementById("menu")?.scrollTo({ top:0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });

    updateMenuTabsNav();
  }

  function updateMenuViewToggle(){
    menuViewGridBtn.classList.toggle("active", menuView === "grid");
    menuViewListBtn.classList.toggle("active", menuView === "list");
  }

  let currentMenuItems = [];

  function renderMenuGrid(){
    const items = MENU_ITEMS.filter(i => i.cat === activeMenuCat);
    currentMenuItems = items;
    menuGrid.className = menuView === "grid"
      ? "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      : "flex flex-col gap-3";

    menuGrid.innerHTML = items.map((item, i) => {
      const photo = item.img
        ? `<img src="${item.img}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">`
        : `<div class="w-full h-full grid place-items-center menu-icon-circle"><i class="ph-duotone ${MENU_CATEGORIES.find(c=>c.id===item.cat).icon} text-2xl text-white"></i></div>`;

      if(menuView === "grid"){
        return `
          <div class="menu-card-grid reveal" data-item-i="${i}">
            <div class="menu-card-photo aspect-[4/3]">${photo}</div>
            <div class="p-3">
              <h4 class="font-semibold text-ink-900 text-sm leading-snug">${item.name}</h4>
              ${item.desc ? `<p class="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">${item.desc}</p>` : ""}
              <div class="flex items-center justify-between mt-3">
                <span class="menu-price font-bold text-sm">${item.price} ₼</span>
                <button type="button" aria-label="Ətraflı bax" class="menu-add-btn tap-target grid place-items-center w-8 h-8 rounded-full"><i class="ph-bold ph-plus"></i></button>
              </div>
            </div>
          </div>`;
      }
      return `
        <div class="menu-card-list reveal flex items-center gap-3 p-2.5" data-item-i="${i}">
          <div class="menu-card-photo w-20 h-20 shrink-0 rounded-xl">${photo}</div>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-semibold text-ink-900 text-sm leading-snug">${item.name}</h4>
              <span class="shrink-0 menu-price font-bold text-sm">${item.price} ₼</span>
            </div>
            ${item.desc ? `<p class="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">${item.desc}</p>` : ""}
          </div>
          <button type="button" aria-label="Ətraflı bax" class="menu-add-btn tap-target grid place-items-center w-8 h-8 rounded-full shrink-0"><i class="ph-bold ph-plus"></i></button>
        </div>`;
    }).join("");

    animateIn(menuGrid.querySelectorAll(".reveal"));
  }

  menuViewGridBtn.addEventListener("click", () => { menuView = "grid"; updateMenuViewToggle(); renderMenuGrid(); });
  menuViewListBtn.addEventListener("click", () => { menuView = "list"; updateMenuViewToggle(); renderMenuGrid(); });
  updateMenuViewToggle();

  menuGrid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-item-i]");
    if(!card) return;
    const item = currentMenuItems[Number(card.dataset.itemI)];
    if(!item) return;
    const addBtn = e.target.closest(".menu-add-btn");
    if(addBtn){
      addToCart(item, 1);
      addBtn.classList.add("added");
      setTimeout(() => addBtn.classList.remove("added"), 350);
      return;
    }
    openItemSheet(item);
  });

  /* ---------------- MENU ITEM DETAIL SHEET ---------------- */
  const itemSheet = document.getElementById("item-sheet");
  const itemSheetBackdrop = document.getElementById("item-sheet-backdrop");
  const itemSheetPhoto = document.getElementById("item-sheet-photo");
  const itemSheetName = document.getElementById("item-sheet-name");
  const itemSheetDesc = document.getElementById("item-sheet-desc");
  const itemSheetPrice = document.getElementById("item-sheet-price");
  const itemSheetQty = document.getElementById("item-sheet-qty");
  const itemSheetMinus = document.getElementById("item-sheet-minus");
  const itemSheetPlus = document.getElementById("item-sheet-plus");
  const itemSheetOrderBtn = document.getElementById("item-sheet-order-btn");
  let sheetQty = 1;
  let sheetItem = null;

  function updateSheetOrderLink(){
    if(!sheetItem) return;
    const msg = `Salam! ${sheetQty} ədəd ${sheetItem.name} (${sheetItem.price} AZN/ədəd) sifariş etmək istəyirəm.`;
    itemSheetOrderBtn.href = waLink(msg);
    itemSheetOrderBtn.target = "_blank";
    itemSheetOrderBtn.rel = "noopener";
  }

  function openItemSheet(item){
    sheetItem = item;
    sheetQty = 1;
    itemSheetQty.textContent = "1";
    itemSheetName.textContent = item.name;
    itemSheetDesc.textContent = item.desc || "";
    itemSheetDesc.style.display = item.desc ? "" : "none";
    itemSheetPrice.textContent = `${item.price} ₼`;
    if(item.img){
      itemSheetPhoto.style.backgroundImage = `url('${item.img}')`;
      itemSheetPhoto.innerHTML = "";
    } else {
      itemSheetPhoto.style.backgroundImage = "none";
      itemSheetPhoto.innerHTML = `<div class="w-full h-full grid place-items-center menu-icon-circle"><i class="ph-duotone ${MENU_CATEGORIES.find(c=>c.id===item.cat)?.icon || 'ph-fork-knife'} text-4xl text-white"></i></div>`;
    }
    updateSheetOrderLink();
    itemSheetBackdrop.classList.add("open");
    itemSheet.classList.add("open");
    document.body.classList.add("modal-locked");
  }

  function closeItemSheet(){
    itemSheetBackdrop.classList.remove("open");
    itemSheet.classList.remove("open");
    if(!document.querySelector("section.section-modal")) document.body.classList.remove("modal-locked");
  }

  itemSheetMinus.addEventListener("click", () => {
    if(sheetQty <= 1) return;
    sheetQty--; itemSheetQty.textContent = sheetQty; updateSheetOrderLink();
  });
  itemSheetPlus.addEventListener("click", () => {
    sheetQty++; itemSheetQty.textContent = sheetQty; updateSheetOrderLink();
  });
  itemSheetBackdrop.addEventListener("click", closeItemSheet);

  /* ---------------- CART ---------------- */
  const cart = {}; // key -> { item, qty }
  const cartBar = document.getElementById("cart-bar");
  const cartBarCount = document.getElementById("cart-bar-count");
  const cartBarTotal = document.getElementById("cart-bar-total");
  const cartSheet = document.getElementById("cart-sheet");
  const cartSheetBackdrop = document.getElementById("cart-sheet-backdrop");
  const cartSheetList = document.getElementById("cart-sheet-list");
  const cartSheetTotal = document.getElementById("cart-sheet-total");
  const cartSheetOrderBtn = document.getElementById("cart-sheet-order-btn");
  const cartSheetClose = document.getElementById("cart-sheet-close");

  function cartKey(item){ return item.cat + "__" + item.name; }
  function parsePrice(price){
    const n = parseFloat(String(price).split("/")[0].trim().replace(",", "."));
    return isNaN(n) ? 0 : n;
  }
  function cartTotals(){
    let count = 0, total = 0;
    Object.values(cart).forEach(({ item, qty }) => { count += qty; total += parsePrice(item.price) * qty; });
    return { count, total };
  }
  function addToCart(item, qty){
    const k = cartKey(item);
    if(cart[k]) cart[k].qty += qty; else cart[k] = { item, qty };
    updateCartBar();
    if(cartSheet.classList.contains("open")) renderCartSheet();
  }
  function setCartQty(key, qty){
    if(!cart[key]) return;
    if(qty <= 0) delete cart[key]; else cart[key].qty = qty;
    updateCartBar();
    renderCartSheet();
  }

  function updateCartBar(){
    const { count, total } = cartTotals();
    if(count <= 0){ cartBar.classList.add("hidden"); return; }
    cartBar.classList.remove("hidden");
    cartBarCount.textContent = count;
    cartBarTotal.textContent = `${total.toFixed(2)} ₼`;
  }

  function renderCartSheet(){
    const entries = Object.entries(cart);
    cartSheetList.innerHTML = entries.map(([key, { item, qty }]) => `
      <div class="border border-black/10 rounded-2xl p-3 flex items-center justify-between gap-3" data-cart-key="${key}">
        <div class="min-w-0">
          <h4 class="font-semibold text-ink-900 text-sm leading-snug">${item.name}</h4>
          <p class="text-xs text-slate-400 mt-0.5">x${qty}</p>
        </div>
        <div class="flex items-center gap-2 border border-black/10 rounded-full px-1.5 py-1 shrink-0">
          <button type="button" data-cart-minus aria-label="Azalt" class="tap-target grid place-items-center w-7 h-7 rounded-full border border-black/10 text-ink-900"><i class="ph-bold ph-minus text-xs"></i></button>
          <span class="w-5 text-center text-sm font-semibold text-ink-900">${qty}</span>
          <button type="button" data-cart-plus aria-label="Artır" class="tap-target grid place-items-center w-7 h-7 rounded-full border border-black/10 text-ink-900"><i class="ph-bold ph-plus text-xs"></i></button>
        </div>
        <span class="menu-price font-bold text-sm shrink-0 w-16 text-right">${(parsePrice(item.price) * qty).toFixed(2)} ₼</span>
      </div>
    `).join("");

    const { total } = cartTotals();
    cartSheetTotal.textContent = `${total.toFixed(2)} ₼`;

    const lines = entries.map(([, { item, qty }]) => `- ${item.name} x${qty} (${(parsePrice(item.price)*qty).toFixed(2)} AZN)`).join("\n");
    const msg = `Salam! Sifariş etmək istəyirəm:\n${lines}\nCəmi: ${total.toFixed(2)} AZN`;
    cartSheetOrderBtn.href = waLink(msg);
    cartSheetOrderBtn.target = "_blank";
    cartSheetOrderBtn.rel = "noopener";
  }

  function openCartSheet(){
    renderCartSheet();
    cartSheetBackdrop.classList.add("open");
    cartSheet.classList.add("open");
    document.body.classList.add("modal-locked");
  }
  function closeCartSheet(){
    cartSheetBackdrop.classList.remove("open");
    cartSheet.classList.remove("open");
    if(!document.querySelector("section.section-modal")) document.body.classList.remove("modal-locked");
  }

  cartBar.addEventListener("click", openCartSheet);
  cartSheetBackdrop.addEventListener("click", closeCartSheet);
  cartSheetClose.addEventListener("click", closeCartSheet);
  cartSheetList.addEventListener("click", (e) => {
    const row = e.target.closest("[data-cart-key]");
    if(!row) return;
    const key = row.dataset.cartKey;
    const current = cart[key]?.qty || 0;
    if(e.target.closest("[data-cart-plus]")) setCartQty(key, current + 1);
    else if(e.target.closest("[data-cart-minus]")) setCartQty(key, current - 1);
  });

  document.addEventListener("keydown", (e) => {
    if(e.key !== "Escape") return;
    if(lightbox.classList.contains("open")){ closeLightbox(); return; }
    if(cartSheet.classList.contains("open")){ closeCartSheet(); return; }
    if(itemSheet.classList.contains("open")){ closeItemSheet(); return; }
    if(setSheet.classList.contains("open")){ closeSetSheet(); return; }
    const openSection = document.querySelector("section.section-modal");
    if(openSection) closeSectionModal(openSection);
  });

  renderMenuTabs();
  renderMenuGrid();

  /* ---------------- SETS (SETLƏR) ---------------- */
  const setTabs = document.getElementById("set-tabs");
  const setGrid = document.getElementById("set-grid");
  let activeSetGroup = SET_GROUPS[0].id;

  function renderSetTabs(){
    setTabs.innerHTML = SET_GROUPS.map(g => `
      <button type="button" data-group="${g.id}"
        class="tab-pill ${g.id===activeSetGroup?'active':''} tap-target shrink-0 px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
        <i class="ph-bold ${g.icon}"></i> ${g.name}
      </button>
    `).join("");

    setTabs.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        activeSetGroup = btn.dataset.group;
        renderSetTabs();
        renderSetGrid();
        setTabs.querySelector(`[data-group="${activeSetGroup}"]`)?.scrollIntoView({behavior: prefersReducedMotion ? "auto" : "smooth", inline:"center", block:"nearest"});
        document.getElementById("sets")?.scrollTo({ top:0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });
  }

  let currentSets = [];

  function renderSetGrid(){
    const group = SET_GROUPS.find(g => g.id === activeSetGroup);
    currentSets = group.sets;
    setGrid.innerHTML = group.sets.map((s, i) => `
      <div class="set-card ${s.img ? "set-card--photo" : ""} reveal rounded-2xl p-5 flex flex-col h-full" data-set-i="${i}" ${s.img ? `style="background-image:url('${s.img}')"` : ""}>
        <div class="flex items-center gap-2.5 mb-3">
          <div class="set-icon-circle w-9 h-9 rounded-full grid place-items-center shrink-0"><i class="ph-bold ${group.icon} text-white text-sm"></i></div>
          <span class="set-card-n font-display text-lg text-violet-400 flex-1">SET ${s.n}</span>
          <span class="text-blue-300 font-bold text-lg">${s.price} ₼</span>
        </div>
        <p class="set-items-list text-base font-bold text-white leading-snug flex-1">${s.items}</p>
        <span class="set-more-hint text-xs font-semibold mt-1.5 inline-flex items-center gap-1">Ətraflı bax <i class="ph-bold ph-caret-right"></i></span>
        ${s.extra ? `<p class="mt-2 text-xs font-semibold text-blue-300/90 inline-flex items-center gap-1.5">${s.extra}</p>` : ""}
        <div class="flex items-center justify-end mt-4">
          <button type="button" aria-label="Səbətə əlavə et" class="set-add-btn menu-add-btn tap-target grid place-items-center w-11 h-11 rounded-full shrink-0"><i class="ph-bold ph-plus"></i></button>
        </div>
      </div>
    `).join("");
    animateIn(setGrid.querySelectorAll(".reveal"));
  }

  setGrid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-set-i]");
    if(!card) return;
    const s = currentSets[Number(card.dataset.setI)];
    if(!s) return;
    const group = SET_GROUPS.find(g => g.id === activeSetGroup);

    const addBtn = e.target.closest(".set-add-btn");
    if(addBtn){
      addToCart({ cat: "set-" + group.id, name: `${group.name} — Set ${s.n}`, price: s.price }, 1);
      addBtn.classList.add("added");
      setTimeout(() => addBtn.classList.remove("added"), 350);
      return;
    }
    openSetSheet(s, group);
  });

  /* ---------------- SET DETAIL SHEET ---------------- */
  const setSheet = document.getElementById("set-sheet");
  const setSheetBackdrop = document.getElementById("set-sheet-backdrop");
  const setSheetIcon = document.getElementById("set-sheet-icon");
  const setSheetTitle = document.getElementById("set-sheet-title");
  const setSheetGroup = document.getElementById("set-sheet-group");
  const setSheetItems = document.getElementById("set-sheet-items");
  const setSheetExtra = document.getElementById("set-sheet-extra");
  const setSheetHero = document.getElementById("set-sheet-hero");
  const setSheetPrice = document.getElementById("set-sheet-price");
  const setSheetQtyEl = document.getElementById("set-sheet-qty");
  const setSheetMinus = document.getElementById("set-sheet-minus");
  const setSheetPlus = document.getElementById("set-sheet-plus");
  const setSheetAddBtn = document.getElementById("set-sheet-add-btn");
  const setSheetOrderBtn = document.getElementById("set-sheet-order-btn");
  let setSheetQty = 1;
  let setSheetSet = null;
  let setSheetGroupObj = null;

  function updateSetSheetOrderLink(){
    if(!setSheetSet) return;
    const msg = `Salam! ${setSheetQty} ədəd Set ${setSheetSet.n} (${setSheetSet.price} AZN/ədəd) sifariş etmək istəyirəm.`;
    setSheetOrderBtn.href = waLink(msg);
    setSheetOrderBtn.target = "_blank";
    setSheetOrderBtn.rel = "noopener";
  }

  function openSetSheet(s, group){
    setSheetSet = s;
    setSheetGroupObj = group;
    setSheetQty = 1;
    setSheetQtyEl.textContent = "1";
    setSheetIcon.innerHTML = `<i class="ph-bold ${group.icon}"></i>`;
    setSheetHero.classList.toggle("set-sheet-hero--photo", !!s.img);
    setSheetHero.style.backgroundImage = s.img ? `url('${s.img}')` : "";
    setSheetTitle.textContent = `SET ${s.n}`;
    setSheetGroup.textContent = group.name;
    setSheetItems.innerHTML = s.items.split(",").map(part =>
      `<li><i class="ph-bold ph-check-circle"></i><span>${part.trim()}</span></li>`
    ).join("");
    setSheetExtra.innerHTML = s.extra || "";
    setSheetPrice.textContent = `${s.price} ₼`;
    updateSetSheetOrderLink();
    setSheetBackdrop.classList.add("open");
    setSheet.classList.add("open");
    document.body.classList.add("modal-locked");
  }

  function closeSetSheet(){
    setSheetBackdrop.classList.remove("open");
    setSheet.classList.remove("open");
    if(!document.querySelector("section.section-modal")) document.body.classList.remove("modal-locked");
  }

  setSheetMinus.addEventListener("click", () => {
    if(setSheetQty <= 1) return;
    setSheetQty--; setSheetQtyEl.textContent = setSheetQty; updateSetSheetOrderLink();
  });
  setSheetPlus.addEventListener("click", () => {
    setSheetQty++; setSheetQtyEl.textContent = setSheetQty; updateSetSheetOrderLink();
  });
  setSheetBackdrop.addEventListener("click", closeSetSheet);
  setSheetAddBtn.addEventListener("click", () => {
    if(!setSheetSet || !setSheetGroupObj) return;
    addToCart({ cat: "set-" + setSheetGroupObj.id, name: `${setSheetGroupObj.name} — Set ${setSheetSet.n}`, price: setSheetSet.price }, setSheetQty);
    setSheetAddBtn.classList.add("added");
    setTimeout(() => setSheetAddBtn.classList.remove("added"), 350);
  });

  renderSetTabs();
  renderSetGrid();

  /* ---------------- GSAP ANIMATIONS ---------------- */
  function animateIn(nodes){
    if(!nodes || !nodes.length) return;
    if(prefersReducedMotion || typeof gsap === "undefined"){
      nodes.forEach(n => { n.style.opacity = 1; n.style.transform = "none"; });
      return;
    }
    gsap.fromTo(nodes, { opacity:0, y:28 }, {
      opacity:1, y:0, duration:.6, ease:"power2.out",
      stagger:0.06,
      overwrite:true
    });
  }

  const gsapReady = typeof gsap !== "undefined";
  const scrollTriggerReady = gsapReady && typeof ScrollTrigger !== "undefined";

  if(!prefersReducedMotion && gsapReady){
    if(scrollTriggerReady){
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("section .reveal-on-scroll").forEach(el => {
        gsap.fromTo(el, { opacity:0, y:24 }, {
          opacity:1, y:0, duration:.7, ease:"power2.out",
          scrollTrigger:{ trigger:el, start:"top 85%" }
        });
      });

      ["menu-grid","set-grid"].forEach(id => {
        ScrollTrigger.create({
          trigger: "#"+id,
          start:"top 88%",
          once:true,
          onEnter: () => animateIn(document.querySelectorAll(`#${id} .reveal`))
        });
      });
    } else {
      document.querySelectorAll(".reveal, .reveal-on-scroll").forEach(el => {
        el.style.opacity = 1; el.style.transform = "none";
      });
    }
  } else {
    document.querySelectorAll(".reveal, .reveal-on-scroll, #hero-eyebrow, #hero-title, #hero-sub, #hero-features li, #hero-ctas")
      .forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
  }

  setTimeout(() => {
    document.querySelectorAll(".reveal, .reveal-on-scroll").forEach(el => {
      if(getComputedStyle(el).opacity === "0"){
        el.style.opacity = 1;
        el.style.transform = "none";
      }
    });
  }, 2500);

})();
