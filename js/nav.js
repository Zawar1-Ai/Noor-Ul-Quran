(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const page = document.body.dataset.page;
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });

  const hijriEl = document.getElementById("hijri-date");
  if (hijriEl) {
    const today = new Date();
    const stamp = Math.floor(today.getTime() / 1000);
    fetch(`https://api.aladhan.com/v1/gToH/${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`)
      .then((r) => r.json())
      .then((data) => {
        const h = data.data.hijri;
        hijriEl.textContent = `${h.day} ${h.month.en} ${h.year} AH`;
      })
      .catch(() => {
        hijriEl.textContent = today.toLocaleDateString();
      });
    void stamp;
  }
})();
