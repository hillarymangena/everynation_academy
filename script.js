// slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    if (!slides || slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (dots[i]) dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 4000);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

// hamburger toggle
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu) menu.classList.toggle('active');
    });
}

// close mobile menu when clicking links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu) menu.classList.remove('active');
    });
});

// registration form handling (mailto fallback)
const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // honeypot
        const honeypot = document.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) return;

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const consent = document.getElementById('consent').checked;

        if (!firstName || !lastName || !email || !phone || !consent) {
            formMessage.textContent = 'Please complete all required fields and accept consent.';
            formMessage.style.color = '#c0392b';
            return;
        }

        const phonePattern = /^[\d\+\-\s\(\)]{7,}$/;
        if (!phonePattern.test(phone)) {
            formMessage.textContent = 'Please enter a valid phone number.';
            formMessage.style.color = '#c0392b';
            return;
        }

        const subject = `Registration enquiry from ${firstName} ${lastName}`;
        const bodyLines = [
            `Name: ${firstName} ${lastName}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Message: ${message || '[No message provided]'}`
        ];
        const mailBody = bodyLines.join('\n');
        const EMAIL_TO = 'emmanuelchipfuwa@gmail.com';

        const mailto = `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = mailto;

        formMessage.textContent = 'Your email client should open — please send the message from your mail program to complete registration.';
        formMessage.style.color = '#003087';
    });
}

// set footer year dynamically
const copyYearEl = document.getElementById('copyYear');
if (copyYearEl) copyYearEl.textContent = new Date().getFullYear();