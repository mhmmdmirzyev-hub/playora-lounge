/* ============================================================
   PLAYORA LOUNGE & GAME CENTER — Sayt məlumat bazası
   Bütün menyu və tarif (set) məlumatları burada saxlanılır.
   Qiymət dəyişəndə / yeni məhsul əlavə edəndə YALNIZ bu faylı redaktə edin.
   ============================================================ */

/* ---------- MENYU KATEQORİYALARI ---------- */
const MENU_CATEGORIES = [
  { id: "fastfood",  name: "Fast Food",      icon: "ph-hamburger" },
  { id: "pizza",     name: "Pizza",          icon: "ph-pizza" },
  { id: "mezeler",   name: "Məzələr",        icon: "ph-bowl-food" },
  { id: "cerezler",  name: "Çərəzlər",       icon: "ph-basket" },
  { id: "soyuq-icki",name: "Soyuq İçkilər",  icon: "ph-flask" },
  { id: "pive",      name: "Pivə",           icon: "ph-beer-bottle" },
  { id: "isti-icki", name: "İsti İçkilər",   icon: "ph-coffee" },
  { id: "sirniyyat", name: "Şirniyyat",      icon: "ph-ice-cream" },
  { id: "qelyan",    name: "Qəlyan",         icon: "ph-cloud" }
];

/* ---------- MENYU MƏHSULLARI ---------- */
const MENU_ITEMS = [
  // Fast Food
  { cat:"fastfood", name:"Şaurma", price:"5.00", desc:"+ Fri seçimi ilə 6.00 ₼" },
  { cat:"fastfood", name:"Dönər (Toyuq)", price:"5.00", desc:"+ Fri seçimi ilə 6.00 ₼" },
  { cat:"fastfood", name:"Dönər (Ət)", price:"7.00", desc:"+ Fri seçimi ilə 8.00 ₼" },
  { cat:"fastfood", name:"Burger (Toyuq)", price:"7.00", desc:"+ Fri seçimi ilə 8.00 ₼" },
  { cat:"fastfood", name:"Nuggets", price:"6.00", desc:"+ Fri seçimi ilə 7.00 ₼" },
  { cat:"fastfood", name:"Hot Dog", price:"5.00", desc:"+ Fri seçimi ilə 6.00 ₼" },
  { cat:"fastfood", name:"Tost", price:"5.00", desc:"+ Fri seçimi ilə 6.00 ₼" },
  { cat:"fastfood", name:"Toyuq Qanadları", price:"6.00" },
  { cat:"fastfood", name:"Soğan Halqaları", price:"4.00" },
  { cat:"fastfood", name:"Toyuq Halqaları", price:"5.00" },
  { cat:"fastfood", name:"Pendir Çubuqları", price:"5.00" },
  { cat:"fastfood", name:"Fri", price:"3.50" },

  // Pizza (orta / böyük)
  { cat:"pizza", name:"Margarita", price:"8 / 12", desc:"Orta 8.00 ₼ · Böyük 12.00 ₼" },
  { cat:"pizza", name:"Sosisli", price:"12 / 15", desc:"Orta 12.00 ₼ · Böyük 15.00 ₼" },
  { cat:"pizza", name:"Sucuklu", price:"14 / 18", desc:"Orta 14.00 ₼ · Böyük 18.00 ₼" },
  { cat:"pizza", name:"Toyuqlu", price:"13 / 17", desc:"Orta 13.00 ₼ · Böyük 17.00 ₼" },
  { cat:"pizza", name:"Qarışıq", price:"15 / 20", desc:"Orta 15.00 ₼ · Böyük 20.00 ₼" },

  // Məzələr
  { cat:"mezeler", name:"Saçaqlı Pendir", price:"4.00" },
  { cat:"mezeler", name:"Qızardılmış Pendir", price:"5.00" },
  { cat:"mezeler", name:"Pətənək", price:"5.00" },
  { cat:"mezeler", name:"Qızardılmış Düşbərə", price:"5.00" },
  { cat:"mezeler", name:"Qızardılmış Boğaz", price:"5.00" },
  { cat:"mezeler", name:"Sosis", price:"6.00" },
  { cat:"mezeler", name:"Çips", price:"3.00" },
  { cat:"mezeler", name:"Suxari", price:"3.00" },
  { cat:"mezeler", name:"Duzlu Çubuqlar", price:"3.00" },
  { cat:"mezeler", name:"Noxud", price:"3.00" },
  { cat:"mezeler", name:"Tum", price:"3.00" },
  { cat:"mezeler", name:"Popcorn", price:"2.00" },
  { cat:"mezeler", name:"Limon", price:"1.00" },

  // Çərəzlər
  { cat:"cerezler", name:"Qoz", price:"4 / 5", desc:"Sadə 4.00 ₼ · Qovrulmuş 5.00 ₼" },
  { cat:"cerezler", name:"Badam", price:"4 / 5", desc:"Sadə 4.00 ₼ · Qovrulmuş 5.00 ₼" },
  { cat:"cerezler", name:"Fındıq", price:"4 / 5", desc:"Sadə 4.00 ₼ · Qovrulmuş 5.00 ₼" },
  { cat:"cerezler", name:"Araxis", price:"4.00" },
  { cat:"cerezler", name:"Kişmiş", price:"3.50" },
  { cat:"cerezler", name:"Sincab", price:"3.00" },
  { cat:"cerezler", name:"Kubik Meyvə Qurusu", price:"3.00" },
  { cat:"cerezler", name:"Çərəz Seti", price:"15 / 17", desc:"Sadə 15.00 ₼ · Qovrulmuş 17.00 ₼" },

  // Soyuq içkilər
  { cat:"soyuq-icki", name:"Sirab 0.5", price:"1.00", desc:"Qazlı / Qazsız" },
  { cat:"soyuq-icki", name:"Sirab 1lt", price:"2.00", desc:"Qazlı / Qazsız" },
  { cat:"soyuq-icki", name:"Coca-Cola / Fanta / Sprite 0.3", price:"1.50" },
  { cat:"soyuq-icki", name:"Coca-Cola / Fanta / Sprite (banka)", price:"2.50" },
  { cat:"soyuq-icki", name:"Coca-Cola / Fanta / Sprite 1lt", price:"3.00" },
  { cat:"soyuq-icki", name:"Coca-Cola 2lt", price:"5.00" },
  { cat:"soyuq-icki", name:"Fuse Tea (banka)", price:"2.50" },
  { cat:"soyuq-icki", name:"Fuse Tea 1lt", price:"3.50" },
  { cat:"soyuq-icki", name:"Bizon / Hell", price:"2.00" },
  { cat:"soyuq-icki", name:"Red Bull", price:"5.00" },
  { cat:"soyuq-icki", name:"Cappy 1lt", price:"4.00" },
  { cat:"soyuq-icki", name:"Natura 1lt", price:"5.00" },
  { cat:"soyuq-icki", name:"Ayran", price:"1.00" },

  // Pivə
  { cat:"pive", name:"NZS", price:"2.00" },
  { cat:"pive", name:"Efes Draft", price:"5.00" },
  { cat:"pive", name:"Xırdalan 0.5", price:"4.00" },
  { cat:"pive", name:"Xırdalan 0%", price:"4.00" },

  // İsti içkilər
  { cat:"isti-icki", name:"Çay", price:"4.00" },
  { cat:"isti-icki", name:"Kofe", price:"2.00" },
  { cat:"isti-icki", name:"Kapuçino", price:"3.00" },

  // Şirniyyat
  { cat:"sirniyyat", name:"Alpen Gold", price:"5.00" },
  { cat:"sirniyyat", name:"Snickers", price:"3.00" },
  { cat:"sirniyyat", name:"Rulet", price:"3.00" },
  { cat:"sirniyyat", name:"Mürəbbə", price:"4.00" },
  { cat:"sirniyyat", name:"Türk Paxlavası", price:"5.00" },
  { cat:"sirniyyat", name:"Dondurma (100qr)", price:"3.00" },

  // Qəlyan
  { cat:"qelyan", name:"Saxsıda Qəlyan", price:"15.00" },
  { cat:"qelyan", name:"Qreypfrut Qəlyan", price:"20.00" },
  { cat:"qelyan", name:"Ananas Qəlyan", price:"25.00" },
  { cat:"qelyan", name:"Premium Tütün (Qırmızı)", price:"+5.00", desc:"Əlavə seçim" },
  { cat:"qelyan", name:"Premium Tütün (Qara)", price:"+10.00", desc:"Əlavə seçim" },
  { cat:"qelyan", name:"Bazuka", price:"+2.00", desc:"Əlavə seçim" },
  { cat:"qelyan", name:"Əlavələr (Süd, Meyvə suyu və s.)", price:"+5.00", desc:"Əlavə seçim" }
];

/* ---------- TARİFLƏR (SETLƏR) ---------- */
const SET_GROUPS = [
  {
    id: "ad-gunu",
    name: "Ad Günü Setləri",
    icon: "ph-cake",
    sets: [
      { n:1, items:"6 Fast Food, 6 Kartof Fri, 2 Nuggets, 2 Çips, 2 Popcorn, 2 Suxari, 2 Tum, 2L Coca-Cola, 2 Çaynik Çay, 2 Snickers, 3 saat kabinet", extra:"🎁 Meyvə tabağı hədiyyə", price:"59", img:"images/sets/ad-gunu-set-1.jpg" },
      { n:2, items:"8 Fast Food, 8 Kartof Fri, 2 Nuggets, 3 Çips, 3 Popcorn, 3 Tum, 3 Suxari, 3L Coca-Cola, 3 Çaynik Çay, 3 saat kabinet", extra:"🎁 Tort/Pizza hədiyyə", price:"79" },
      { n:3, items:"8 Fast Food, 8 Kartof Fri, 2 Nuggets, 3 Çips, 3 Popcorn, 3 Tum, 3 Suxari, 3L Coca-Cola, 3 Çaynik Çay, 2 Qreyfrut Qəlyan, 3 saat kabinet", extra:"🎁 Tort/Pizza hədiyyə", price:"99" },
      { n:4, items:"2 Böyük Pizza, 8 Fast Food, 8 Kartof Fri, 2 Nuggets, 3 Çips, 3 Popcorn, 3 Tum, 3 Suxari, 3L Coca-Cola, 3 Çaynik Çay, 3 saat kabinet", extra:"🎁 Tort hədiyyə", price:"99" },
      { n:5, items:"2 Böyük Pizza, 8 Fast Food, 8 Kartof Fri, 2 Nuggets, 3 Çips, 3 Popcorn, 3 Tum, 3 Suxari, 3L Coca-Cola, 3 Çaynik Çay, 2 Qreyfrut Qəlyan, 3 saat kabinet", extra:"🎁 Tort hədiyyə", price:"119" }
    ]
  },
  {
    id: "pive-set",
    name: "Pivə & Xüsusi Setlər",
    icon: "ph-beer-stein",
    sets: [
      { n:"Exclusive", items:"1 Böyük Pizza, 1L Coca-Cola, 1 Çaynik Çay, 1 Mürəbbə, Saxsı Qəlyan, 2 saat kabinet", extra:"", price:"34" },
      { n:"Ekonom Pivə", items:"6 Bakal Pivə, Saçaqlı Pendir, Qızardılmış Pendir, Pətənək, Noxud, Çips, Araxis, 2 saat kabinet", extra:"", price:"29" },
      { n:"Qəlyanlı Pivə", items:"8 Bakal Pivə, Saçaqlı Pendir, Qızardılmış Pendir, Qızardılmış Düşbərə, Boğaz, Noxud, Çips, Tum, Araxis, Saxsı Qəlyan, 2 saat kabinet", extra:"", price:"42" },
      { n:"Premium Pivə", items:"12 Bakal Pivə, Pendir Çubuqları, Soğan Halqaları, Sosis, Toyuq Qanadları, Saçaqlı Pendir, Qızardılmış Pendir, Qızardılmış Düşbərə, Boğaz, Pətənək, Noxud, Çips, 2 Tum, Araxis, 3 saat kabinet", extra:"", price:"65" }
    ]
  },
  {
    id: "fastfood-set",
    name: "Fast Food Setləri",
    icon: "ph-hamburger",
    sets: [
      { n:"Kiçik", items:"2 Fast Food, 2 Kartof Fri, 1L Coca-Cola, Çay, Snickers, 2 saat kabinet", extra:"👥 2 nəfər üçün", price:"21" },
      { n:"Orta", items:"3 Fast Food, 3 Kartof Fri, 1L Coca-Cola, Çay, Snickers, 2 saat kabinet", extra:"👥 3 nəfər üçün", price:"25" },
      { n:"Böyük", items:"4 Fast Food, 4 Kartof Fri, 1L Coca-Cola, Çay, Snickers, 2 saat kabinet", extra:"👥 4 nəfər üçün", price:"29" }
    ]
  },
  {
    id: "dost-set",
    name: "Dost Setləri",
    icon: "ph-users-three",
    sets: [
      { n:"A", items:"2 Fast Food, 2 Kartof Fri, 1L Coca-Cola, Saxsı Qəlyan, 2 saat kabinet", extra:"👥 2 nəfər üçün", price:"27" },
      { n:"B", items:"3 Fast Food, 3 Kartof Fri, 1L Coca-Cola, Saxsı Qəlyan, 2 saat kabinet", extra:"👥 3 nəfər üçün", price:"31" },
      { n:"C", items:"4 Fast Food, 4 Kartof Fri, 1L Coca-Cola, Saxsı Qəlyan, 2 saat kabinet", extra:"👥 4 nəfər üçün", price:"35" }
    ]
  },
  {
    id: "cay-set",
    name: "Çay Setləri",
    icon: "ph-coffee",
    sets: [
      { n:"Kiçik", items:"2 Çaynik Çay, Snickers, Saxsı Qəlyan, 2 saat kabinet", extra:"", price:"25" },
      { n:"Böyük", items:"Samovarda Çay, Qarışıq Çərəz, Alpen Gold, 2 Mürəbbə, Rulet, 2 saat kabinet", extra:"", price:"39" },
      { n:"Premium", items:"Samovarda Çay, Qarışıq Çərəz, Quru Meyvələr, Snickers, Alpen Gold, 2 Mürəbbə, Rulet, Saxsı Qəlyan, Premium Saxsı Qəlyan, 3 saat kabinet", extra:"", price:"59" }
    ]
  }
];
