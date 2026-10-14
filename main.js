/* ========================================================
   KM STOREFRONT ENGINE (JavaScript 2026)
   - قاعدة البيانات الأولية
   - بطاقات التمايل 3D Tilt Interaction
   - التوليد الديناميكي وتوجيه رسائل واتساب مع الروابط
   ======================================================== */

// رقم الواتساب الخاص بالمتجر لاستقبال الطلبات (قم بتغييره لرقمك مع الرمز الدولي)
const STORE_WHATSAPP_NUMBER = "966500000000";

// البيانات الافتراضية لعطور KM الفاخرة
const DEFAULT_PRODUCTS = [
  {
    id: "km-1",
    name: "KM Tiger Oud الملكي",
    category: "oud",
    price: "1,250",
    notes: "دهن عود كمبودي عتيق • جلد فاخر • برغندي نبيذي",
    desc: "عطر الجرأة والهيبة المستوحى من خطى النمر الواثقة، يمتزج فيه العود المعتق مع نفحات الجلود الدافئة لثبات يدوم 48 ساعة.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "km-2",
    name: "KM Burgundy Velvet",
    category: "amber",
    price: "980",
    notes: "ورد طائفي داكن • كشمش أحمر • كهرمان دافئ",
    desc: "تجسيد للأنوثة الطاغية والغموض الساحر، مزيج مخملي يغمر الحواس بلمسة من أندر أزهار الليل الكهرمانية.",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "km-3",
    name: "KM Amber Espresso",
    category: "amber",
    price: "1,100",
    notes: "قهوة برية سوداء • عنبر خام • حبوب التونكا",
    desc: "تناغم مدهش يجمع بين قسوة الإسبريسو البرازيلي وحرارة العنبر الكهرماني، حضور صارخ لا يمر دون لفت الانتباه.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "km-4",
    name: "KM Imperial Musk",
    category: "musk",
    price: "850",
    notes: "مسك الغزال الأبيض • فانيلا مدخنة • خشب الصندل",
    desc: "نقاء ونبل أسطوري، عطر هادئ يتسلل كالظل ليمنحك هالة من الفخامة النقية والهدوء المترف.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
  }
];

const DEFAULT_REVIEWS = [
  { name: "عبدالله بن فهد", rating: 5, text: "عطر Tiger Oud شيء غير طبيعي، الثبات فوق يومين والفوحان يلفت الأنظار حرفياً!" },
  { name: "سارة آل ثاني", rating: 5, text: "Burgundy Velvet قمة الأناقة والرقي، تشعر بالفخامة والتميز من أول رشة." },
  { name: "خالد المنصور", rating: 5, text: "التغليف فاخر جداً وسرعة الرد على الواتساب ممتازة. فخور بوجود علامة مثل KM." }
];

// تهيئة البيانات في التخزين المحلي (LocalStorage) إن لم تكن موجودة
function initializeData() {
  if (!localStorage.getItem("km_products")) {
    localStorage.setItem("km_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("km_reviews")) {
    localStorage.setItem("km_reviews", JSON.stringify(DEFAULT_REVIEWS));
  }
}

// تحميل وعرض المنتجات مع زر الواتساب المباشر
function renderProducts(filter = "all") {
  const container = document.getElementById("productsGrid");
  const products = JSON.parse(localStorage.getItem("km_products")) || DEFAULT_PRODUCTS;
  container.innerHTML = "";

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  filtered.forEach(p => {
    // إعداد نص رسالة الواتساب الجاهزة
    const currentUrl = window.location.href.split('#')[0];
    const message = `مرحباً دار KM للعطور الفاخرة،\nأود طلب العطر التالي:\n- الاسم: ${p.name}\n- السعر: ${p.price} ر.س\n- الرابط: ${currentUrl}#${p.id}\n\nيرجى تزويدي بتفاصيل الشحن والتوصيل.`;
    const whatsappLink = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const card = document.createElement("div");
    card.className = "product-card";
    card.id = p.id;
    card.innerHTML = `
      <div class="product-img-wrap">
        <span class="badge-category">${p.category.toUpperCase()}</span>
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-notes">${p.notes}</p>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${p.price} ر.س</span>
          <a href="${whatsappLink}" target="_blank" class="btn-whatsapp-order">
            <i class="fa-brands fa-whatsapp"></i> اطلب عبر واتساب
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// عرض تقييمات العملاء
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  const reviews = JSON.parse(localStorage.getItem("km_reviews")) || DEFAULT_REVIEWS;
  container.innerHTML = "";

  reviews.forEach(r => {
    const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-stars">${stars}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">— ${r.name}</div>
    `;
    container.appendChild(card);
  });
}

// تأثير ثلاثي الأبعاد 3D Tilt للزجاجة الرئيسية في الهيرو
function setup3DTilt() {
  const card = document.getElementById("heroBottle");
  if (!card) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 22;
    const rotY = (x / rect.width) * 22;
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });
}

// إعداد الفلاتر
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
}

// التشغيل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  initializeData();
  renderProducts();
  renderReviews();
  setup3DTilt();
  setupFilters();
});
// حفظ تعليق الزبون فوراً كمعلق (Pending) ليظهر في صفحة الأدمن admin.html
function handleCustomerReviewSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const perfume = document.getElementById("custPerfume").value;
  const rating = parseInt(document.getElementById("custRating").value);
  const comment = document.getElementById("custComment").value.trim();

  const newReview = {
    id: "r-" + Date.now(),
    name: name,
    perfume: perfume,
    rating: rating,
    text: comment,
    approved: false, // لا يظهر للعامة حتى توافق عليه من لوحة الأدمن
    pinned: false,
    reply: null,
    date: new Date().toISOString().split('T')[0]
  };

  let allRevs = JSON.parse(localStorage.getItem("km_reviews_full")) || [];
  allRevs.unshift(newReview);
  localStorage.setItem("km_reviews_full", JSON.stringify(allRevs));

  document.getElementById("royalReviewForm").reset();
  alert("شكراً لك! تم استلام تقييمك بنجاح، وسيظهر في المتجر بعد مراجعته من الإدارة.");
}