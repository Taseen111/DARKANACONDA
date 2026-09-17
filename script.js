/* =========================================================
   DARKANACONDA
   MAIN HOMEPAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   SERVICE PRICE PANEL
   ========================================================= */

const quoteToggle = document.querySelector(".quote-toggle");
const servicePricePanel = document.querySelector("#service-price-panel");
const pricePanelClose = document.querySelector(".price-panel-close");

function closePricePanel() {
    if (!quoteToggle || !servicePricePanel) return;
    servicePricePanel.hidden = true;
    quoteToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("quote-panel-open");
}

if (quoteToggle && servicePricePanel) {
    quoteToggle.addEventListener("click", () => {
        const willOpen = servicePricePanel.hidden;
        servicePricePanel.hidden = !willOpen;
        quoteToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
        document.body.classList.toggle("quote-panel-open", willOpen);
        if (willOpen) {
            servicePricePanel.scrollTop = 0;
            window.setTimeout(() => pricePanelClose?.focus(), 0);
        }
    });
}

if (pricePanelClose) {
    pricePanelClose.addEventListener("click", closePricePanel);
}

// VERSION 16 — Quote panel Start a Project always returns to Services.
const quoteStartProject = document.querySelector(".quote-start-project");
if (quoteStartProject) {
    quoteStartProject.addEventListener("click", event => {
        event.preventDefault();
        closePricePanel();
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
            window.location.hash = "services";
            window.setTimeout(() => {
                servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 20);
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePricePanel();
});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


function closeMenu() {

    if (!menuToggle || !navLinks) {
        return;
    }

    navLinks.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    // If the pricing panel is open, close it first so the
                    // normal page navigation remains clickable and visible.
                    closePricePanel();
                    closeMenu();

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");

    const icon =
        item.querySelector(".faq-icon");


    if (!question || !answer) {
        return;
    }


    /* Make sure every FAQ starts closed */

    item.classList.remove("faq-open");

    question.setAttribute(
        "aria-expanded",
        "false"
    );

    answer.style.maxHeight = "0px";


    if (icon) {

        icon.style.transform =
            "rotate(0deg)";

        icon.style.background =
            "transparent";

        icon.style.color =
            "var(--green)";

    }


    question.addEventListener(
        "click",
        () => {

            const isOpen =
                item.classList.contains(
                    "faq-open"
                );


            /* -----------------------------------------
               CLOSE ALL FAQ ITEMS
               ----------------------------------------- */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove(
                    "faq-open"
                );


                const otherQuestion =
                    otherItem.querySelector(
                        ".faq-question"
                    );


                const otherAnswer =
                    otherItem.querySelector(
                        ".faq-answer"
                    );


                const otherIcon =
                    otherItem.querySelector(
                        ".faq-icon"
                    );


                if (otherQuestion) {

                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (otherAnswer) {

                    otherAnswer.style.maxHeight =
                        "0px";

                }


                if (otherIcon) {

                    otherIcon.style.transform =
                        "rotate(0deg)";

                    otherIcon.style.background =
                        "transparent";

                    otherIcon.style.color =
                        "var(--green)";

                }

            });


            /* -----------------------------------------
               IF IT WAS ALREADY OPEN, KEEP IT CLOSED
               ----------------------------------------- */

            if (isOpen) {

                return;

            }


            /* -----------------------------------------
               OPEN THE SELECTED FAQ
               ----------------------------------------- */

            item.classList.add(
                "faq-open"
            );


            question.setAttribute(
                "aria-expanded",
                "true"
            );


            answer.style.maxHeight =
                answer.scrollHeight + "px";


            if (icon) {

                icon.style.transform =
                    "rotate(45deg)";

                icon.style.background =
                    "var(--green)";

                icon.style.color =
                    "var(--black)";

            }

        }
    );

});


/* =========================================================
   FAQ RESIZE SUPPORT
   Keeps an open answer correctly sized when the
   laptop/browser window changes width.
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        faqItems.forEach(item => {

            if (
                !item.classList.contains(
                    "faq-open"
                )
            ) {
                return;
            }


            const answer =
                item.querySelector(
                    ".faq-answer"
                );


            if (answer) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    }
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .project-card, .pricing-card, .process-step, .feature, .faq-item"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal",
                            "active"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

        element.classList.add(
            "reveal",
            "active"
        );

    });

}


/* =========================================================
   HERO CURSOR GLOW
   ========================================================= */

const hero =
    document.querySelector(".hero");


if (hero) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            hero.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            hero.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }
    );

}


/* =========================================================
   CONTACT FORM — FORMSPREE
   ========================================================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const status = contactForm.querySelector(".form-status");
        const honeypot = contactForm.querySelector("#website");

        if (honeypot && honeypot.value.trim() !== "") {
            if (status) status.textContent = "Your enquiry could not be submitted.";
            return;
        }

        const name = contactForm.querySelector("#name");
        const business = contactForm.querySelector("#business");
        const email = contactForm.querySelector("#email");
        const message = contactForm.querySelector("#message");

        const fields = [
            [name, "Please enter your name."],
            [business, "Please enter your business name."],
            [email, "Please enter a valid email address."],
            [message, "Please tell us about your project."]
        ];

        for (const [field, errorText] of fields) {
            if (!field || !field.value.trim()) {
                if (status) status.textContent = errorText;
                field?.focus();
                return;
            }
        }

        if (name.value.trim().length > 100 || business.value.trim().length > 150 || message.value.trim().length > 3000) {
            if (status) status.textContent = "Please keep your enquiry within the indicated limits.";
            return;
        }

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "Send Project Enquiry";

        if (status) status.textContent = "";
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {
            const formData = new FormData(contactForm);

            const response = await fetch("https://formspree.io/f/xeaqbvza", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            contactForm.reset();

            if (status) {
                status.textContent = "Thank you. Your project enquiry has been sent successfully.";
            }

            if (submitButton) {
                submitButton.textContent = "Enquiry Sent ✓";
            }

            setTimeout(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
                if (status) status.textContent = "";
            }, 5000);

        } catch (error) {
            console.error("Form submission error:", error);

            if (status) {
                status.textContent = "We couldn't send the enquiry. Please try again or contact us directly.";
            }

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

/* =========================================================
   CURRENT YEAR
   ========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "start"
                });

            }
        );

    });


/* =========================================================
   NAVBAR SCROLL STATE
   ========================================================= */

const navbar =
    document.querySelector(
        ".navbar"
    );


if (navbar) {

    const updateNavbar =
        () => {

            if (
                window.scrollY > 30
            ) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();

}


/* =========================================================
   FINAL MESSAGE
   ========================================================= */

console.log(
    "DARKANACONDA main JavaScript loaded successfully."
);