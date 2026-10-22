
function updateAge() {
    const birthDate = new Date(2005, 5, 19);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayHasNotPassed =
        today.getMonth() < birthDate.getMonth() ||
        (
            today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate()
        );

    if (birthdayHasNotPassed) {
        age--;
    }

    const ageElement = document.getElementById("age");

    if (ageElement) {
        ageElement.textContent = age + " y.o.";
    }
}

updateAge();

/* ===== SCROLL REVEAL ANIMATIONS ===== */
const revealElements = document.querySelectorAll(
    "#about, #skills, #hobbies, #projects, #contact"
);

revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
// Hero typing animation
const typingText = document.getElementById("typing-text");

if (typingText) {
    const phrases = [
        "Artificial Intelligence Student",
        "Future AI Developer",
        "Creative Problem Solver"
    ];

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (deleting) {
            characterIndex--;
            typingText.textContent = currentPhrase.substring(0, characterIndex);

            if (characterIndex <= 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500);
                return;
            }
        } else {
            const nextPhrase = phrases[phraseIndex];
            characterIndex++;
            typingText.textContent = nextPhrase.substring(0, characterIndex);

            if (characterIndex >= nextPhrase.length) {
                deleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 75);
    }

    setTimeout(typeEffect, 1800);
}

/* 3D Skill Card Interaction */
const skillCards = document.querySelectorAll(".skills-grid .skill-card");

skillCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = (0.5 - (y / rect.height)) * 8;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

// Back-to-Top Button
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* Loading Screen */
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";

            setTimeout(() => {
                loadingScreen.remove();
            }, 600);
        }, 800);
    }
});

// Active Navigation on Scroll
const navLinks = document.querySelectorAll("nav a[href^='#']");
const pageSections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let currentSection = "";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
