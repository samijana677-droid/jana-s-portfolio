/**
 * Jana S Portfolio - Interactive Application Scripts
 */

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------------------------
     1. Mobile Menu Navigation & Focus
     -------------------------------------------------------------------------- */
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "auto";
      });
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "auto";
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Theme Switcher (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("portfolio-theme") || 
                       (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  document.documentElement.setAttribute("data-theme", currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  /* --------------------------------------------------------------------------
     3. Hero Typing Text Animation
     -------------------------------------------------------------------------- */
  const words = [
    "AI Solutions.",
    "Machine Learning Models.",
    "Data Science Pipelines.",
    "Computer Vision Apps.",
    "Intelligent Algorithms."
  ];
  let wordIndex = 0, charIndex = 0, deleting = false;
  const typingElement = document.getElementById("typing");

  function typeLoop() {
    if (!typingElement) return;
    const word = words[wordIndex];

    if (deleting) {
      typingElement.textContent = word.substring(0, charIndex--);
    } else {
      typingElement.textContent = word.substring(0, charIndex++);
    }

    let delay = deleting ? 40 : 80;

    if (!deleting && charIndex === word.length + 1) {
      deleting = true;
      delay = 1400; // Pause at end of word
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    setTimeout(typeLoop, delay);
  }
  typeLoop();

  /* --------------------------------------------------------------------------
     4. Reading Scroll Progress Bar & Back To Top & Scrollspy
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section.section");

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    // Back to top visibility
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }

    // Scrollspy active navigation highlighting
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------------------------------
     5. Scroll Reveal & Skill Bar Animation
     -------------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // Animate skill bar inside card if present
        const progressMeter = entry.target.querySelector(".bar i");
        if (progressMeter && progressMeter.dataset.progress) {
          progressMeter.style.width = progressMeter.dataset.progress;
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     6. Skill Category Filter Tabs
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      skillCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          setTimeout(() => card.style.opacity = "1", 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => card.style.display = "none", 250);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. Interactive Contact Form & Toast Notification
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const copyEmailBtn = document.getElementById("copyEmailBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("formName").value;
      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("samijana677@gmail.com").then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(() => {
        showToast("Email: samijana677@gmail.com");
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Dynamic 3D Tilt & Spotlight Effect for Profile Photo Card
     -------------------------------------------------------------------------- */
  const photoCard = document.getElementById("photoCard");
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (photoCard) {
    if (isFinePointer) {
      photoCard.addEventListener("mousemove", (e) => {
        const rect = photoCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -14;
        const rotateY = ((x - centerX) / centerX) * 14;

        photoCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
        photoCard.style.setProperty("--spotlight-x", `${(x / rect.width) * 100}%`);
        photoCard.style.setProperty("--spotlight-y", `${(y / rect.height) * 100}%`);
      });

      photoCard.addEventListener("mouseleave", () => {
        photoCard.style.transform = `rotate(2deg) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    }

    photoCard.addEventListener("click", () => {
      showToast("Jana S — B.Tech Artificial Intelligence & Data Science Student");
    });
  }

  // Set footer copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   8. Global Toast Alert Function
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* --------------------------------------------------------------------------
   9. Project Modal Data & Interactivity
   -------------------------------------------------------------------------- */
const projectData = {
  telemed: {
    title: "Telemedicine Access for Rural Healthcare",
    badge: "AI Healthcare System",
    image: "assets/project_telemed.jpg",
    description: "An AI-assisted symptom analysis platform designed to improve healthcare accessibility in remote rural areas with multilingual consultation capabilities and vital tracking.",
    features: [
      "AI Symptom Diagnostic Engine trained on medical triage datasets to estimate risk scores.",
      "Multilingual translation support (Tamil, Hindi, English) for localized patient consultations.",
      "Vitals monitoring integration dashboard for remote health worker usage.",
      "Low-bandwidth data optimization for reliable operation in rural networks."
    ],
    tech: ["Python", "Machine Learning", "NLP", "Flask", "Healthcare Datasets"]
  },
  signlang: {
    title: "AI-Powered Sign Language Interpreter",
    badge: "Computer Vision & Deep Learning",
    image: "assets/project_sign_lang.jpg",
    description: "A real-time computer vision system using hand landmark tracking and deep learning neural classifiers to translate Indian Sign Language (ISL) gestures into speech and text.",
    features: [
      "Real-time 21-keypoint 3D hand mesh tracking powered by OpenCV & MediaPipe.",
      "Neural network classification achieving >95% accuracy on alphabetic and gesture signs.",
      "Text-to-speech audio synthesis overlay for fluid dual-way communication.",
      "Interactive web camera interface with latency tracking (<25ms)."
    ],
    tech: ["OpenCV", "MediaPipe", "TensorFlow/PyTorch", "Python", "Web Audio API"]
  },
  traffic: {
    title: "Smart Traffic Prediction & Signal Control",
    badge: "Smart City ML Platform",
    image: "assets/project_traffic.jpg",
    description: "A data-driven traffic management concept that models junction congestion patterns, forecasts vehicle density, and suggests dynamic signal timings to minimize urban commute delays.",
    features: [
      "Time-series traffic volume forecasting using machine learning regression models.",
      "Dynamic traffic signal cycle optimization reducing junction delays by up to 15%.",
      "Futuristic 3D map visualization highlighting real-time congestion heatmaps.",
      "Emergency vehicle priority routing algorithm for ambulances and fire trucks."
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib/Seaborn", "Predictive Analytics"]
  }
};

function openProjectModal(key) {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const project = projectData[key];

  if (!modal || !modalBody || !project) return;

  const techBadges = project.tech.map(t => `<span>${t}</span>`).join(" ");
  const featureItems = project.features.map(f => `<li>${f}</li>`).join("");

  modalBody.innerHTML = `
    <span class="project-badge" style="position:static; display:inline-block; margin-bottom:12px;">${project.badge}</span>
    <h2>${project.title}</h2>
    <img src="${project.image}" alt="${project.title} preview" />
    <p>${project.description}</p>
    
    <h4 style="margin: 18px 0 10px; color: var(--text);">Key Innovations & Architecture:</h4>
    <ul>${featureItems}</ul>

    <h4 style="margin: 18px 0 10px; color: var(--text);">Technologies Used:</h4>
    <div class="tags" style="margin-bottom: 25px;">${techBadges}</div>

    <div class="modal-actions">
      <a class="btn primary" href="mailto:samijana677@gmail.com?subject=Inquiry regarding ${encodeURIComponent(project.title)}">Request Technical Demo</a>
      <button class="btn secondary" onclick="closeProjectModal()">Close</button>
    </div>
  `;

  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden"; // Prevent scrolling behind modal

  // Keyboard escape listener
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      document.removeEventListener("keydown", handleKeydown);
    }
  };
  document.addEventListener("keydown", handleKeydown);
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.setAttribute("hidden", "true");
  document.body.style.overflow = "auto";
}

document.addEventListener("click", (e) => {
  const modal = document.getElementById("projectModal");
  if (modal && e.target === modal) {
    closeProjectModal();
  }
});
