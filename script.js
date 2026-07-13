/* ==========================================================
   Hellocation — Interactive JavaScript Features
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupTestimonials();
  setupUpcomingEvents();
  setupContactForm();
});

/* ---------------- NAVBAR ACTIVE STATE ---------------- */
function setupNavbar() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");
  
  navLinks.forEach(link => {
    // Get page name from link href
    const href = link.getAttribute("href");
    if (href && currentPath.includes(href) && href !== "#" && href !== "") {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

/* ---------------- TESTIMONIALS SLIDER ---------------- */
const testimonialsData = [
  {
    name: "Andi R. – Family Traveler",
    text: "Saya sangat terbantu dengan rekomendasi tempat wisata, kuliner, dan panduan perjalanannya. Cocok untuk pemula yang ingin liburan ke Korea.",
    image: "testi_user1.png"
  },
  {
    name: "Budi S. – GKS Scholarship Awardee",
    text: "Mentorship-nya luar biasa! Dari bimbingan motivation letter sampai mock interview dibantu secara detail hingga saya lolos beasiswa GKS ke Korea.",
    image: "hero_student.png" // Fallback to student image
  },
  {
    name: "Clara T. – Graduate Student",
    text: "Layanan Apostille di Hellocation cepat sekali dan terpercaya. Pengurusan dokumen legalisasi jadi jauh lebih mudah tanpa ribet.",
    image: "testi_user1.png"
  }
];

function setupTestimonials() {
  const testiImage = document.querySelector(".testi-image");
  const testiName = document.querySelector(".testi-text h4");
  const testiText = document.querySelector(".testi-text p");
  const prevBtn = document.querySelector(".testimonials .arrow-left");
  const nextBtn = document.querySelector(".testimonials .arrow-right");
  const dotsContainer = document.querySelector(".testimonials .dots");

  if (!testiImage || !testiName || !testiText) return;

  let currentIndex = 0;

  // Initialize dots
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    testimonialsData.forEach((_, idx) => {
      const dot = document.createElement("span");
      if (idx === currentIndex) dot.className = "active";
      dot.addEventListener("click", () => {
        currentIndex = idx;
        updateTestimonial();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateTestimonial() {
    const data = testimonialsData[currentIndex];
    
    // Add fade-out effect
    testiImage.style.opacity = 0;
    testiName.parentElement.style.opacity = 0;

    setTimeout(() => {
      testiImage.style.backgroundImage = `url('${data.image}')`;
      testiImage.style.backgroundSize = "cover";
      testiImage.style.backgroundPosition = "center";
      testiName.textContent = data.name;
      testiText.textContent = data.text;
      
      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll("span");
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.className = "active";
          } else {
            dot.className = "";
          }
        });
      }

      // Fade in
      testiImage.style.opacity = 1;
      testiName.parentElement.style.opacity = 1;
    }, 200);
  }

  // Initial call
  updateTestimonial();

  // Navigation handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
      updateTestimonial();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonialsData.length;
      updateTestimonial();
    });
  }

  // Auto transition every 6 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialsData.length;
    updateTestimonial();
  }, 6000);
}

/* ---------------- UPCOMING EVENTS CAROUSEL ---------------- */
function setupUpcomingEvents() {
  const carouselContainer = document.querySelector(".carousel .event-cards");
  const prevBtn = document.querySelector(".events .arrow-left");
  const nextBtn = document.querySelector(".events .arrow-right");

  if (!carouselContainer) return;

  const cards = Array.from(carouselContainer.children);
  if (cards.length < 2) return;

  let activeIndex = 1; // Middle card starts as active/featured

  function updateCarousel() {
    cards.forEach((card, idx) => {
      card.classList.remove("featured");
      // Add standard classes for sizing/animations
      if (idx === activeIndex) {
        card.classList.add("featured");
      }
    });

    // Scroll to the active card dynamically
    const containerWidth = carouselContainer.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = 25; // Matching the gap in CSS
    const scrollPosition = (activeIndex * (cardWidth + gap)) - (containerWidth / 2) + (cardWidth / 2);
    
    carouselContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateCarousel();
    });
  }

  // Initialize
  updateCarousel();
}

/* ---------------- CONTACT FORM ---------------- */
function setupContactForm() {
  const form = document.querySelector(".contact-card form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Simple validation check
    const firstName = form.querySelector('input[placeholder="First Name"]').value.trim();
    const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
    const message = form.querySelector('textarea[placeholder="Your Message"]').value.trim();

    if (!firstName || !lastName || !email || !message) {
      alert("Silakan isi semua bidang formulir.");
      return;
    }

    // Success styling state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Mengirim...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.7;

    setTimeout(() => {
      submitBtn.textContent = "Pesan Terkirim! ✓";
      submitBtn.style.backgroundColor = "#10b981"; // Emerald green success
      form.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = 1;
        submitBtn.style.backgroundColor = ""; // Reset to CSS default
      }, 3000);
    }, 1500);
  });
}
