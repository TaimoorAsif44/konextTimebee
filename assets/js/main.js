document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');

    function checkScroll() {
        if (window.scrollY > 10) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    // Check scroll position on page load
    checkScroll();

    // Check scroll position when the user scrolls
    window.addEventListener('scroll', checkScroll);

    // --- First slider (card-box-images, outside box-slider-main) ---
    const firstSlider = document.querySelector('.card-box-images');
    if (firstSlider) {
        const swiper = new Swiper(firstSlider, {
            loop: false,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true, // optional, makes fade smoother
            },
            speed: 1000,
        });
        // Only select .card-box that are siblings of this slider
        const firstSliderContainer = firstSlider.closest('.box-slider-main');
        if (firstSliderContainer) {
            const cardBoxes = firstSliderContainer.querySelectorAll('.card-box');

            cardBoxes.forEach((btn, index) => {
                function activateCard() {
                    cardBoxes.forEach(c => c.classList.remove('active'));
                    btn.classList.add('active');
                    swiper.slideTo(index);
                }

                btn.addEventListener('click', activateCard);
                btn.addEventListener('mouseenter', activateCard);
            });
        }
    }

    // --- Second slider
    const remoteSlider = document.querySelector('.remote-card-images');
    if (remoteSlider) {
        const swiper = new Swiper(remoteSlider, {
            loop: false,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true, // optional, makes fade smoother
            },
            speed: 1000,
        });
        // Only select .card-box that are siblings of this slider
        const remoteSliderContainer = remoteSlider.closest('.remote-slider-main');
        if (remoteSliderContainer) {
            const remoteCards = remoteSliderContainer.querySelectorAll('.remote-card');

            remoteCards.forEach((btn, index) => {
                function activateCard() {
                    remoteCards.forEach(c => c.classList.remove('active'));
                    btn.classList.add('active');
                    swiper.slideTo(index);
                }

                btn.addEventListener('click', activateCard);
                btn.addEventListener('mouseenter', activateCard);
            });
        }
    }

    const featuresSlider = document.querySelector('.features-slider');
    const universalArea = document.getElementById('universalArea');

    if (featuresSlider && universalArea) {
        const isDesktop = window.innerWidth > 768;

        const swiper = new Swiper(featuresSlider, {
            loop: true,
            autoplay: {
                delay: 4000,
            }, // Always start with autoplay off
            allowTouchMove: true,
            speed: 800,
            effect: 'creative',
            spaceBetween: 30,
            creativeEffect: {
                prev: {
                    shadow: false,
                    translate: ['-130%', 0, -500],
                },
                next: {
                    shadow: false,
                    translate: ['130%', 0, -500],
                },
            },
            navigation: {
                nextEl: '.features-next',
                prevEl: '.features-prev',
            },
        });

        if (isDesktop) {
            // Only observe if desktop
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            swiper.params.autoplay = {
                                delay: 4000,
                                disableOnInteraction: false,
                            };
                            swiper.autoplay.start();
                        } else {
                            swiper.autoplay.stop();
                        }
                    });
                },
                {
                    root: null,
                    threshold: 0.5,
                }
            );

            observer.observe(universalArea);

            // Pause on hover only on desktop
            featuresSlider.addEventListener('mouseenter', function () {
                swiper.autoplay.stop();
            });

            featuresSlider.addEventListener('mouseleave', function () {
                swiper.autoplay.start();
            });
        }
    }
});

(function () {
    const group = document.getElementById('accordion-group');
    if (!group) return;
    const toggles = group.querySelectorAll('.accordion-toggle');

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', function () {
            const content = toggle.parentElement.querySelector('.accordion-content');
            const arrow = toggle.querySelector('.accordion-arrow');
            const isOpen = !content.classList.contains('hidden');

            if (isOpen) {
                content.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            } else {
                content.classList.remove('hidden');
                arrow.classList.add('rotate-180');
            }
        });
    });
})();

const navItems = document.querySelectorAll('.tb-header .nav-list .nav-item');
const menuBg = document.querySelector('.menu-bg');

if (navItems.length && menuBg) {
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {
                const hasMegaMenu = item.querySelector('.tb-mega-menu');
                console.log('Mouse entered');
                if (hasMegaMenu) {
                    console.log('Mouse entered-1');
                    menuBg.classList.remove('hidden');
                } else {
                    menuBg.classList.add('hidden');
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) {
                menuBg.classList.add('hidden');
            }
        });
    });
}


//Modal JS

const modal = document.getElementById('videoModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const iframe = document.getElementById('youtubeIframe');
const modalBg = modal.querySelector('.modal-bg');

openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const videoUrl = openBtn.getAttribute('href');
    if (videoUrl && videoUrl.startsWith('https://')) {
        iframe.src = videoUrl;
    } else {
        iframe.src = 'https://www.youtube.com/embed/Fyu8EoOB4wQ?autoplay=1&rel=0'; // fallback
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Re-enable scrolling
    iframe.src = ''; // Stop the video
});

// Optional: Close modal if clicking outside iframe
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalBg) {
        closeBtn.click();
    }
});

const swiper = new Swiper('.tb-testimonial-slider', {
    slidesPerView: 1.2,
    spaceBetween: 10,
    slidesOffsetAfter: 17.5,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Mobile menu Function
document.addEventListener("DOMContentLoaded", function () {
    const navTrigger = document.querySelector(".tb-nav-trigger");
    const header = document.querySelector(".tb-header");
    const menuBg = document.querySelector(".menu-bg");
    const closeTrigger = document.querySelector(".tb-times");
    const backArrow = document.querySelector(".tb-back-arrow");
    const navItems = document.querySelectorAll(".nav-item");
    const navHeadText = document.querySelector(".mob-nav-head p");

    // Open main mobile menu
    if (window.innerWidth < 1024) {
        navTrigger.addEventListener("click", function () {
            header.classList.add("open-tb-menu");
            menuBg.classList.remove("hidden");

            // Reset header top
            navHeadText.textContent = "";
            navHeadText.style.display = "none";
            backArrow.style.display = "none";
        });
    }

    if (window.innerWidth < 1024) {
        // Close everything on close icon
        closeTrigger.addEventListener("click", function () {
            header.classList.remove("open-tb-menu", "open-tb-mega-menu");
            menuBg.classList.add("hidden");
            navHeadText.textContent = "";
            navHeadText.style.display = "none";
            backArrow.style.display = "none";

            document.querySelectorAll(".tb-mega-menu").forEach(menu => {
                menu.classList.remove("show-megamenu");
            });
        });
    }

    if (window.innerWidth < 1024) {
        // Handle nav-item click
        navItems.forEach(item => {
            item.addEventListener("click", function () {
                const megaMenu = item.querySelector(".tb-mega-menu");
                const link = item.querySelector(".nav-link");

                if (megaMenu) {
                    document.querySelectorAll(".tb-mega-menu").forEach(menu => {
                        menu.classList.remove("show-megamenu");
                    });

                    header.classList.add("open-tb-mega-menu");
                    megaMenu.classList.add("show-megamenu");

                    navHeadText.textContent = link.textContent.trim();
                    navHeadText.style.display = "block";
                    backArrow.style.display = "inline-block";
                }
            });
        });
    }

    if (window.innerWidth < 1024) {
        // Handle back arrow click
        backArrow.addEventListener("click", function () {
            header.classList.remove("open-tb-mega-menu");
            navHeadText.textContent = "";
            navHeadText.style.display = "none";
            backArrow.style.display = "none";

            document.querySelectorAll(".tb-mega-menu").forEach(menu => {
                menu.classList.remove("show-megamenu");
            });
        });
    }
});


// Feature Page JS

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".feature-work-card");
    const slides = document.querySelectorAll(".tb-feature-work-right-slide");
    let currentIndex = 0;
    let interval;
    let isCycling = false;

    function resetProgressBars() {
        document.querySelectorAll(".progress-bar").forEach(bar => {
            bar.style.transition = "none";
            bar.style.width = "0%";
            void bar.offsetWidth; // trigger reflow
            bar.style.transition = "width 8s linear";
        });
    }

    function activateCard(index) {
        // Update slide visibility
        slides.forEach(slide => slide.classList.remove("active"));
        if (slides[index]) slides[index].classList.add("active");

        // Update card active class
        cards.forEach(card => card.classList.remove("active"));
        if (cards[index]) cards[index].classList.add("active");

        // Progress bar animation
        resetProgressBars();
        const bar = cards[index].querySelector(".progress-bar");
        if (bar) {
            bar.style.width = "100%";
        }

        currentIndex = index;
    }

    function startAutoCycle() {
        if (isCycling) return;
        isCycling = true;
        activateCard(currentIndex);
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            activateCard(currentIndex);
        }, 8000);
    }

    function stopAutoCycle() {
        isCycling = false;
        clearInterval(interval);
        resetProgressBars();
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            stopAutoCycle();
            activateCard(index);
            currentIndex = index;
            startAutoCycle();
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoCycle();
            } else {
                stopAutoCycle();
            }
        });
    }, {
        threshold: 0.5
    });

    const section = document.querySelector(".tb-hover-timely-area");
    if (section) {
        observer.observe(section);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const currentSlug = window.location.pathname;

    // Utility to extract slug segment from href
    function getFeatureSlug(href) {
        const parts = href.split('features/');
        return parts.length > 1 ? parts[1].replace(/\/$/, '') : '';
    }

    // Check top-level feature buttons
    document.querySelectorAll('.tb-feature-buttons-list > .feature-button').forEach(button => {
        const href = button.getAttribute('href');
        const slugPart = getFeatureSlug(href);
        if (slugPart && currentSlug.includes(slugPart)) {
            button.classList.add('active-feat');
        }
    });

    // Check dropdown feature links
    document.querySelectorAll('.feature-button-dropdown-list a').forEach(dropLink => {
        const href = dropLink.getAttribute('href');
        const slugPart = getFeatureSlug(href);
        if (slugPart && currentSlug.includes(slugPart)) {
            dropLink.classList.add('active');
            const dropdownButton = document.querySelector('.feature-button-dropdown > .feature-button');
            if (dropdownButton) {
                dropdownButton.classList.add('active-feat');
            }
        }
    });
});

// Productivity Accordion JS
document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.feature-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const currentCard = this.closest('.productivity-point-card');
            currentCard.classList.toggle('open-feature');
        });
    });
});

// Feature Work Slider JS

document.addEventListener('DOMContentLoaded', function () {
    const featuresWork = document.querySelector('.tb-feature-work-area-mob');

    if (featuresWork) {
        try {
            const swiper = new Swiper(featuresWork, {
                loop: true,
                spaceBetween: 20,
                autoplay: {
                    delay: 8000,
                },
                allowTouchMove: true,
                speed: 800,
                pagination: {
                    el: '.feature-work-pagination',
                    clickable: true,
                },
            });
        } catch (error) {
            console.error('Failed to initialize Swiper:', error);
        }
    }
});