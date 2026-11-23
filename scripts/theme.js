(function () {
    const root = document.documentElement;

    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

    document.addEventListener("click", function (e) {
        if (!e.target.closest("#theme-toggle")) return;
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (err) {}
    });
})();