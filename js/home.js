(function () {
  const greg = document.getElementById("greg-date");
  if (greg) {
    greg.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const ayahs = [
    {
      ar: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
      en: "Allah is the Light of the heavens and the earth.",
      ref: "Surah An-Nur 24:35",
    },
    {
      ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      en: "Indeed, with hardship comes ease.",
      ref: "Surah Ash-Sharh 94:6",
    },
    {
      ar: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
      en: "And He is with you wherever you are.",
      ref: "Surah Al-Hadid 57:4",
    },
    {
      ar: "فَاذْكُرُونِي أَذْكُرْكُمْ",
      en: "So remember Me; I will remember you.",
      ref: "Surah Al-Baqarah 2:152",
    },
    {
      ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      en: "Unquestionably, by the remembrance of Allah hearts are assured.",
      ref: "Surah Ar-Ra'd 13:28",
    },
  ];

  const box = document.getElementById("daily-ayah");
  if (!box) return;
  const day = Math.floor(Date.now() / 86400000);
  const a = ayahs[day % ayahs.length];
  box.innerHTML = `
    <p class="ayah-ar">${a.ar}</p>
    <p class="ayah-en">“${a.en}”</p>
    <p class="ayah-ref">${a.ref}</p>
  `;
})();
