const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const statNumbers = document.querySelectorAll("[data-count]");
const contactForm = document.querySelector(".contact-form");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dots button");
const faqItems = document.querySelectorAll(".faq-item");
const videoOpen = document.querySelector(".video-open");
const videoModal = document.querySelector(".video-modal");
const videoClose = document.querySelector(".video-close");
const videoBackdrop = document.querySelector(".video-backdrop");

navToggle?.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

let activeSlide = 0;
let slideTimer;

const showSlide = (index) => {
  if (!heroSlides.length) {
    return;
  }

  activeSlide = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
};

const startSlider = () => {
  if (heroSlides.length < 2) {
    return;
  }

  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 4500);
};

heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startSlider();
  });
});

startSlider();

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1100;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = target >= 1000 ? `${(value / 1000).toFixed(1)}K+` : `${value}+`;

    if (progress < 1) {
      requestAnimationFrame(update);
      return;
    }

    element.textContent = target >= 1000 ? `${(target / 1000).toFixed(1)}K+` : `${target}+`;
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.animated) {
        return;
      }

      entry.target.dataset.animated = "true";
      animateCounter(entry.target);
    });
  },
  { threshold: 0.45 }
);

statNumbers.forEach((number) => observer.observe(number));

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faqItem) => faqItem.classList.remove("is-open"));
    item.classList.toggle("is-open", !isOpen);
  });
});

const openVideo = () => {
  videoModal?.classList.add("is-open");
  videoModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
};

const closeVideo = () => {
  videoModal?.classList.remove("is-open");
  videoModal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

videoOpen?.addEventListener("click", openVideo);
videoClose?.addEventListener("click", closeVideo);
videoBackdrop?.addEventListener("click", closeVideo);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideo();
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button");

  if (!button) {
    return;
  }

  const originalText = button.textContent;
  button.textContent = "Request Sent";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    contactForm.reset();
  }, 1800);
});
