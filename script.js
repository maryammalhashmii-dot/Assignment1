/* =========================================================
   Solara JavaScript
   - Smooth scrolling
   - About button message
   - Features reveal
   - Sun moves to bottom-right after About
   - Contact form “fake submit” demo
   ========================================================= */

/* 1) Smooth scroll when clicking nav icons */
document.querySelectorAll(".icon-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = link.getAttribute("href");
    if (!target.startsWith("#")) return;

    e.preventDefault();
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
  });
});

/* 2) Sun positioning rules:
      - Starts on the A in the hero
      - After the About section, it “moves” to bottom-right corner
*/
const sun = document.getElementById("sun");
const aboutSection = document.getElementById("about");

function updateSunPosition() {
  if (!sun || !aboutSection) return;

  const scrollY = window.scrollY;
  const aboutTop = aboutSection.offsetTop;

  // Before About -> sun stays on the logo
  if (scrollY < aboutTop - 30) {
    sun.classList.remove("corner");
    return;
  }

  // After About -> sun stays in bottom-right
  sun.classList.add("corner");
}

window.addEventListener("load", updateSunPosition);
window.addEventListener("resize", updateSunPosition);
window.addEventListener("scroll", () => requestAnimationFrame(updateSunPosition));

/* 3) About button: show a friendly message */
const aboutBtn = document.getElementById("aboutBtn");
const aboutResponse = document.getElementById("aboutResponse");

const aboutMessages = [
  "Mood check ☀️ Today’s vibe: Peach + Coral energy.",
  "Your mat idea: soft gradient + tiny stars ✨",
  "Try this combo: warm colors + extra grip for balance!",
  "New idea: minimal look, but one bold corner accent 🔥"
];

if (aboutBtn && aboutResponse) {
  aboutBtn.addEventListener("click", () => {
    const pick = aboutMessages[Math.floor(Math.random() * aboutMessages.length)];
    aboutResponse.textContent = pick;
  });
}

/* 4) Features button: show/hide list + gallery */
const featuresBtn = document.getElementById("featuresBtn");
const featuresList = document.getElementById("featuresList");
const featuresNote = document.getElementById("featuresNote");
const featuresGallery = document.getElementById("featuresGallery");

if (featuresBtn && featuresList && featuresNote && featuresGallery) {
  featuresBtn.addEventListener("click", () => {
    const isHidden = featuresList.classList.contains("hidden");

    if (isHidden) {
      // Show everything
      featuresList.classList.remove("hidden");
      featuresNote.classList.remove("hidden");
      featuresGallery.classList.remove("hidden");

      featuresNote.textContent =
        "Solara tip ☀️: the best mat is the one that feels personal.";

      featuresBtn.textContent = "Hide features";
      featuresBtn.style.animation = "none"; // stop glowing after reveal
    } else {
      // Hide everything
      featuresList.classList.add("hidden");
      featuresNote.classList.add("hidden");
      featuresGallery.classList.add("hidden");

      featuresBtn.textContent = "Tap to reveal ✨";
      featuresBtn.style.animation = ""; // bring glow back
    }
  });
}

/* 5) Contact form (demo only: shows success message and resets) */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    // Super simple email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      formSuccess.textContent = "Please enter a valid email address.";
      formSuccess.style.color = "#ff6b6b";
      formSuccess.classList.remove("hidden");
      return;
    }

    formSuccess.textContent =
      `Thanks! We got your message ☀️ We’ll reply to: ${email}`;
    formSuccess.style.color = "#2e7d32";
    formSuccess.classList.remove("hidden");

    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.add("hidden");
    }, 5000);
  });
}