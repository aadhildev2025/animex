 // Navigation Menu Setup
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close Navigation Menu on Nav Link Click
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));


// Highlight Active Section in Menu on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}


window.addEventListener('scroll', scrollActive);

// Theme Toggle Functionality
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

document.addEventListener('DOMContentLoaded', function () {
    // Video Play in Viewport
    const video = document.getElementById('promo-video');
    let isPlaying = false;

    function handleVideoPlay() {
        const videoSection = document.getElementById('video');
        const videoSectionRect = videoSection.getBoundingClientRect();
        const isInViewport = (
            videoSectionRect.top >= 0 &&
            videoSectionRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );

        if (isInViewport && !isPlaying) {
            video.play();
            isPlaying = true;
        } else if (!isInViewport && isPlaying) {
            video.pause();
            isPlaying = false;
        }
    }

    function throttle(callback, limit) {
        let lastScrollTime = 0;
        return function () {
            const now = new Date().getTime();
            if (now - lastScrollTime >= limit) {
                callback();
                lastScrollTime = now;
            }
        };
    }

    const throttledHandleVideoPlay = throttle(handleVideoPlay, 100);

    window.addEventListener('scroll', throttledHandleVideoPlay);
    window.addEventListener('resize', throttledHandleVideoPlay);

    handleVideoPlay();
});
