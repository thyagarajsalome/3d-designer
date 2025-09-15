// Basic helper - animate header entrance
gsap.from("header", {
  y: -40,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

// Hero entrance
gsap.from(".hero-content h1", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  delay: 0.2,
  ease: "power3.out",
});
gsap.from(".hero-content .subtitle", {
  y: 10,
  opacity: 0,
  duration: 0.8,
  delay: 0.35,
  ease: "power3.out",
});
gsap.from(".contact-item", {
  y: 8,
  opacity: 0,
  stagger: 0.08,
  duration: 0.6,
  delay: 0.5,
});
gsap.from(".cta-buttons .btn", {
  y: 10,
  opacity: 0,
  stagger: 0.08,
  duration: 0.6,
  delay: 0.7,
});

// Reveal on scroll for sections
const revealElements = document.querySelectorAll(
  ".section-title, .about-text, .stat-item, .skill-item, .timeline-item, .gallery-item, .contact-item-large, .languages"
);
function revealOnScroll() {
  const windowBottom = window.innerHeight;
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowBottom - 60) {
      if (!el.classList.contains("revealed")) {
        el.classList.add("revealed");
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });
      }
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Stat counters
const counters = document.querySelectorAll(".stat-number");
function runCounters() {
  counters.forEach((counter) => {
    if (counter.dataset.started) return;
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      counter.dataset.started = "true";
      const target = +counter.getAttribute("data-count");
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(16, duration / target);
      const timer = setInterval(() => {
        current += 1;
        counter.textContent = current;
        if (current >= target) clearInterval(timer);
      }, stepTime);
    }
  });
}
window.addEventListener("scroll", runCounters);
window.addEventListener("load", runCounters);

// Skill bar animation
const skillProgress = document.querySelectorAll(".skill-progress");
function animateSkillBars() {
  skillProgress.forEach((bar) => {
    if (bar.dataset.animated) return;
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      bar.dataset.animated = "true";
      const width = bar.getAttribute("data-width") || 0;
      bar.style.width = width + "%";
    }
  });
}
window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// Skills Chart (Chart.js)
const ctx = document.getElementById("skillsChart").getContext("2d");
const skillsChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: ["3ds Max", "V-Ray", "AutoCAD", "Photoshop", "Arch Viz", "Web Dev"],
    datasets: [
      {
        label: "Skill Level (%)",
        data: [95, 90, 88, 85, 92, 75],
        fill: true,
        backgroundColor: "rgba(255,215,0,0.12)",
        borderColor: "rgba(255,215,0,0.9)",
        pointBackgroundColor: "rgba(255,215,0,0.9)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { stepSize: 20, backdropColor: "rgba(0,0,0,0)" },
        grid: { color: "rgba(255,255,255,0.08)" },
        angleLines: { color: "rgba(255,255,255,0.06)" },
        pointLabels: { color: "white", font: { size: 12 } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  },
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    }
  });
});

// Footer year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Accessibility: focus outline for keyboard users
function handleFirstTab(e) {
  if (e.key === "Tab") {
    document.documentElement.classList.add("show-focus");
    window.removeEventListener("keydown", handleFirstTab);
  }
}
window.addEventListener("keydown", handleFirstTab);

// Trigger animations once on load
window.addEventListener("load", () => {
  // Small stagger reveal for gallery & timeline
  gsap.from(".gallery-item", {
    y: 30,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.2,
  });
  gsap.from(".timeline-item", {
    y: 20,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.2,
  });
  revealOnScroll();
  runCounters();
  animateSkillBars();
});
