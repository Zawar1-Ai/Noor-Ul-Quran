(function () {
  const listEl = document.getElementById("surah-list");
  const statusEl = document.getElementById("quran-status");
  const searchEl = document.getElementById("surah-search");
  const reader = document.getElementById("reader");
  const ayahsEl = document.getElementById("ayahs");
  const titleEl = document.getElementById("reader-title");
  const metaEl = document.getElementById("reader-meta");
  const backBtn = document.getElementById("back-list");
  let surahs = [];

  function setStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.classList.toggle("error", Boolean(isError));
  }

  function renderList(items) {
    listEl.innerHTML = items
      .map(
        (s) => `
      <button class="surah-btn" type="button" data-number="${s.number}">
        <span class="surah-num">${s.number}</span>
        <span class="surah-meta">
          <strong>${s.englishName}</strong><br />
          <small>${s.revelationType} · ${s.numberOfAyahs} ayahs</small>
        </span>
        <span class="ar-name">${s.name}</span>
      </button>
    `
      )
      .join("");
  }

  function showList() {
    reader.classList.remove("visible");
    listEl.hidden = false;
    backBtn.hidden = true;
    searchEl.parentElement.style.display = "flex";
  }

  async function openSurah(number) {
    setStatus("Loading surah…");
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,en.sahih`
      );
      const json = await res.json();
      const ar = json.data[0];
      const en = json.data[1];
      titleEl.textContent = `${ar.englishName} — ${ar.name}`;
      metaEl.textContent = `${ar.englishNameTranslation} · ${ar.revelationType} · ${ar.numberOfAyahs} ayahs`;
      ayahsEl.innerHTML = ar.ayahs
        .map(
          (ayah, i) => `
        <div class="ayah-row">
          <div class="ayah-n">${ayah.numberInSurah}</div>
          <div class="ar">${ayah.text}</div>
          <div class="en">${en.ayahs[i].text}</div>
        </div>
      `
        )
        .join("");
      reader.classList.add("visible");
      listEl.hidden = true;
      backBtn.hidden = false;
      setStatus("");
      reader.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setStatus("Could not load this surah. Please try again.", true);
    }
  }

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".surah-btn");
    if (btn) openSurah(btn.dataset.number);
  });

  backBtn.addEventListener("click", showList);

  searchEl.addEventListener("input", () => {
    const q = searchEl.value.trim().toLowerCase();
    const filtered = surahs.filter(
      (s) =>
        String(s.number) === q ||
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(searchEl.value.trim())
    );
    renderList(filtered);
  });

  fetch("https://api.alquran.cloud/v1/surah")
    .then((r) => r.json())
    .then((json) => {
      surahs = json.data;
      renderList(surahs);
      setStatus(`${surahs.length} surahs`);
    })
    .catch(() => setStatus("Could not load the Quran list. Check your internet connection.", true));
})();
