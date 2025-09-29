document.addEventListener("DOMContentLoaded", function () {
  // --- GSAP & SCROLLTRIGGER SETUP ---
  gsap.registerPlugin(ScrollTrigger);

  // --- NAVIGATION ---
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header");

  // Toggle mobile menu
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isExpanded = navLinks.classList.contains("active");
    navToggle.setAttribute("aria-expanded", isExpanded);
  });

  // Close mobile menu when a link is clicked
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - header.offsetHeight - 50) {
        current = section.getAttribute("id");
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // --- ANIMATIONS ---
  // Hero Section Animation
  gsap.from(".hero-text > *", {
    duration: 1,
    opacity: 0,
    y: 30,
    stagger: 0.2,
    ease: "power3.out",
  });
  gsap.from(".hero-contact-info", {
    duration: 1,
    opacity: 0,
    y: 20,
    delay: 0.8,
    ease: "power3.out",
  });

  // Generic scroll-triggered animations
  const revealElements = document.querySelectorAll(
    ".section-title, .about-grid, .timeline-item, .portfolio-card, .contact-item-large, .skill-item"
  );
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Skill bars animation
  const skillProgressBars = document.querySelectorAll(".skill-progress");
  skillProgressBars.forEach((bar) => {
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar.closest(".skills-grid"),
        start: "top 80%",
        toggleActions: "play none none none",
      },
      width: bar.style.width,
      duration: 1.5,
      ease: "power4.out",
    });
  });

  // Stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    gsap.to(counter, {
      scrollTrigger: {
        trigger: counter,
        start: "top 90%",
      },
      innerText: target,
      duration: 2,
      ease: "power1.inOut",
      snap: { innerText: 1 },
      onUpdate: function () {
        counter.innerText = Math.ceil(this.targets()[0].innerText);
      },
    });
  });

  // --- FOOTER & BACK TO TOP ---
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });
});
