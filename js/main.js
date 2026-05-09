(function () {
    "use strict";

    var navToggle = document.querySelector(".nav-toggle");
    var siteNav = document.querySelector(".site-nav");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
    var sections = navLinks
        .map(function (link) {
            var id = link.getAttribute("href");
            return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
        })
        .filter(Boolean);

    function closeNav() {
        if (!siteNav || !navToggle) {
            return;
        }

        siteNav.classList.remove("open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
    }

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", function () {
            var isOpen = siteNav.classList.toggle("open");
            document.body.classList.toggle("nav-open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.innerHTML = isOpen
                ? '<i class="fa fa-times" aria-hidden="true"></i>'
                : '<i class="fa fa-bars" aria-hidden="true"></i>';
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeNav);
        });
    }

    function setActiveNav() {
        var current = "";

        sections.forEach(function (section) {
            var top = section.getBoundingClientRect().top;
            if (top <= 120) {
                current = "#" + section.id;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === current);
        });
    }

    setActiveNav();
    window.addEventListener("scroll", setActiveNav, { passive: true });
    window.addEventListener("resize", function () {
        if (window.innerWidth > 820) {
            closeNav();
        }
        setActiveNav();
    });
})();
