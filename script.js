
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

window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");

    if (!loadingScreen) return;

    loadingScreen.style.opacity = "0";
    loadingScreen.style.visibility = "hidden";

    setTimeout(function () {
        loadingScreen.remove();
    }, 600);
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


/* PURPLE CURSOR FOLLOW */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    document.addEventListener("mousemove", function (event) {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}

/* PURPLE SCROLL PROGRESS */

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    scrollProgress.style.width = progress + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

updateScrollProgress();

/* HERO TYPING ANIMATION */

const typingText = document.getElementById("typing-text");

if (typingText) {
    const phrases = [
        "Artificial Intelligence Student",
        "Future AI Engineer",
        "Web Developer in Progress"
    ];

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent = currentPhrase.substring(0, characterIndex);

        let delay = deleting ? 35 : 65;

        if (!deleting && characterIndex === currentPhrase.length) {
            deleting = true;
            delay = 1600;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 350;
        }

        setTimeout(typeEffect, delay);
    }

    setTimeout(typeEffect, 1800);
}

/* PROJECT CARD MOUSE GLOW */

document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

/* AI TERMINAL COMMANDS */

const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

if (terminalForm && terminalInput && terminalOutput) {
    terminalForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const command = terminalInput.value.trim().toLowerCase();

        if (!command) return;

        const commandLine = document.createElement("p");
        commandLine.innerHTML =
            '<span class="terminal-purple">roj@portfolio:~$</span> ' +
            command.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        terminalOutput.appendChild(commandLine);

        const response = document.createElement("p");

        switch (command) {
            case "help":
                response.textContent = "Commands: About, Skills, Projects, Contact, Clear";
                break;

            case "about":
                response.textContent =
                    "I'm Roj Wrya, an AI student interested in programming and technology.";
                break;

            case "skills":
                response.textContent = "Exploring C++, HTML, CSS, JavaScript, and Artificial Intelligence.";
                break;

            case "projects":
                response.textContent = "Check out the Projects section on this portfolio.";
                break;

            case "contact":
                response.textContent = "Scroll to the Contact section to connect with me.";
                break;

            case "clear":
                terminalOutput.innerHTML = "";
                terminalInput.value = "";
                terminalInput.focus();
                return;

            default:
                response.textContent =
                    "Command not found. Type 'help' to see available commands.";
        }

        terminalOutput.appendChild(response);
        terminalInput.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });
}


