// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (dots[i]) dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Registration form handling
const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple honeypot check
        if (document.querySelector('input[name="website"]').value) {
            // Bot detected — silently ignore or return
            return;
        }

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const consent = document.getElementById('consent').checked;

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !consent) {
            formMessage.textContent = 'Please complete all required fields and accept consent.';
            formMessage.style.color = '#c0392b';
            return;
        }

        // Optional basic phone validation (digits and symbols)
        const phonePattern = /^[\d\+\-\s\(\)]{7,}$/;
        if (!phonePattern.test(phone)) {
            formMessage.textContent = 'Please enter a valid phone number.';
            formMessage.style.color = '#c0392b';
            return;
        }

        // Prepare payload for mailto
        const subject = `Registration enquiry from ${firstName} ${lastName}`;
        const bodyLines = [
            `Name: ${firstName} ${lastName}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Message: ${message || '[No message provided]'}`
        ];
        const mailBody = bodyLines.join('\n');

        const EMAIL_TO = 'emmanuelchipfuwa@gmail.com';

        // Fallback: open user's email client with a prefilled message (mailto).
        const mailto = `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = mailto;

        formMessage.textContent = 'Your email client should open — please send the message from your mail program to complete registration. Alternatively, email emmanuelchipfuwa@gmail.com directly.';
        formMessage.style.color = '#003087';
    });
}

// Set footer year dynamically
const copyYearEl = document.getElementById('copyYear');
if (copyYearEl) {
    copyYearEl.textContent = new Date().getFullYear();
}