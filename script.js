// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
});

// Dynamic Tab Title
let originalTitle = document.title;
let switchTimeout;

window.addEventListener('blur', () => {
    switchTimeout = setTimeout(() => {
        document.title = "👋 Come back! ✨";
    }, 1000);
});

window.addEventListener('focus', () => {
    clearTimeout(switchTimeout);
    document.title = originalTitle;
});

// Back to Top Button Logic
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile Navbar Toggle Logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navbar-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Active Navbar Link on Scroll
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.navbar-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active-link');
        }
    });
});

// Cursor Types
const cursorSelect = document.getElementById('cursor-select');
let cursorType = cursorSelect.value;
let cursorColor = '#ffffff';

// Function to determine cursor color based on background
function getCursorColor(element) {
    const bgColor = getComputedStyle(element).backgroundColor;
    const rgb = bgColor.match(/\d+/g).map(Number);
    const isDark = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) < 186;
    return isDark ? '#ffffff' : '#13131D';
}

cursorSelect.addEventListener('change', (e) => {
    cursorType = e.target.value;
});

// Optimized Mousemove event
let lastMoveTime = 0;
const minInterval = 20;

document.addEventListener('mousemove', e => {
    const currentTime = Date.now();
    
    cursorColor = getCursorColor(e.target);
    document.documentElement.style.setProperty('--cursor-color', cursorColor);

    if (currentTime - lastMoveTime > minInterval) {
        lastMoveTime = currentTime;

        const div = document.createElement('div');
        div.classList.add('cursor-item', cursorType);
        div.style.left = e.clientX + 'px';
        div.style.top = e.clientY + 'px';

        document.body.appendChild(div);

        setTimeout(() => div.remove(), 800);
    }
});