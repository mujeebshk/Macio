// THEME TOGGLE

class ThemeManager {
  constructor() {
    this.button = document.getElementById("themeToggle");

    this.theme = localStorage.getItem("theme") || "light";

    this.init();
  }

  init() {
    this.applyTheme();

    this.button.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);

    this.button.innerHTML =
      this.theme === "dark"
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

    lucide.createIcons();
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", this.theme);

    this.applyTheme();
  }
}

// MOBILE MENU

class MobileMenu {
  constructor() {
    this.button = document.getElementById("menuToggle");

    this.menu = document.getElementById("navMenu");

    this.links = this.menu.querySelectorAll("a");

    this.init();
  }

  init() {
    this.button.addEventListener("click", () => {
      const isActive = this.menu.classList.toggle("active");
      this.updateIcon(isActive);
    });

    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        this.menu.classList.remove("active");
        this.updateIcon(false);
      });
    });
  }

  updateIcon(isActive) {
    this.button.innerHTML = isActive
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    lucide.createIcons();
  }
}

// REPLAYABLE SCROLL ANIMATIONS

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right",
    );

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    this.elements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// SCROLL PROGRESS BAR

class ScrollProgress {
  constructor() {
    this.progressBar = document.getElementById("progressBar");

    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (window.scrollY / totalHeight) * 100;

      this.progressBar.style.width = `${progress}%`;
    });
  }
}

// CONTACT FORM

class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");

    this.success = document.getElementById("successMessage");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const submitBtn = this.form.querySelector('button[type="submit"]');

    try {
      if (submitBtn) submitBtn.disabled = true;

      // Collect data into an object
      const formData = new FormData(this.form);
      const name = formData.get("name");
      const data = {
        name: name,
        email: formData.get("email"),
        message: formData.get("message"),
        _subject: `New Message from ${name} (Portfolio)`,
      };

      const response = await fetch("https://formspree.io/f/mlgaazdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      this.success.classList.add("show");
      this.form.reset();
      setTimeout(() => this.success.classList.remove("show"), 4000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }
}

// SMOOTH SCROLL

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }
}

// INITIALIZE APP

window.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();

  new MobileMenu();

  new ScrollAnimations();

  new ScrollProgress();

  new ContactForm();

  new SmoothScroll();

  lucide.createIcons();
});
