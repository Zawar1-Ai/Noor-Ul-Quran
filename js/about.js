(function () {
  const names = [
    ["الرحمن", "Ar-Rahman", "The Most Merciful"],
    ["الرحيم", "Ar-Raheem", "The Especially Merciful"],
    ["الملك", "Al-Malik", "The King"],
    ["القدوس", "Al-Quddus", "The Most Holy"],
    ["السلام", "As-Salam", "The Source of Peace"],
    ["المؤمن", "Al-Mu'min", "The Giver of Faith"],
    ["العزيز", "Al-Aziz", "The Almighty"],
    ["الجبار", "Al-Jabbar", "The Compeller"],
    ["الخالق", "Al-Khaliq", "The Creator"],
    ["الغفار", "Al-Ghaffar", "The Ever-Forgiving"],
    ["الرزاق", "Ar-Razzaq", "The Provider"],
    ["العليم", "Al-Alim", "The All-Knowing"],
    ["السميع", "As-Sami", "The All-Hearing"],
    ["البصير", "Al-Basir", "The All-Seeing"],
    ["الحكم", "Al-Hakam", "The Judge"],
    ["اللطيف", "Al-Latif", "The Subtle"],
    ["الخبير", "Al-Khabir", "The All-Aware"],
    ["الحليم", "Al-Halim", "The Forbearing"],
    ["العظيم", "Al-Azim", "The Magnificent"],
    ["الغفور", "Al-Ghafur", "The Much-Forgiving"],
    ["الشكور", "Ash-Shakur", "The Appreciative"],
    ["العلي", "Al-Ali", "The Most High"],
    ["الكبير", "Al-Kabir", "The Greatest"],
    ["الحفيظ", "Al-Hafiz", "The Preserver"],
    ["الكريم", "Al-Karim", "The Generous"],
    ["المجيب", "Al-Mujib", "The Responsive"],
    ["الحكيم", "Al-Hakim", "The Wise"],
    ["الودود", "Al-Wadud", "The Most Loving"],
    ["المجيد", "Al-Majid", "The Glorious"],
    ["الحق", "Al-Haqq", "The Truth"],
    ["الوكيل", "Al-Wakil", "The Trustee"],
    ["القوي", "Al-Qawiyy", "The Strong"],
    ["الولي", "Al-Wali", "The Protecting Friend"],
    ["الحميد", "Al-Hamid", "The Praiseworthy"],
    ["الحي", "Al-Hayy", "The Ever-Living"],
    ["القيوم", "Al-Qayyum", "The Self-Subsisting"],
    ["الواحد", "Al-Wahid", "The One"],
    ["الأحد", "Al-Ahad", "The Unique"],
    ["الصمد", "As-Samad", "The Eternal Refuge"],
    ["القادر", "Al-Qadir", "The Able"],
    ["الأول", "Al-Awwal", "The First"],
    ["الآخر", "Al-Akhir", "The Last"],
    ["الظاهر", "Az-Zahir", "The Manifest"],
    ["الباطن", "Al-Batin", "The Hidden"],
    ["البر", "Al-Barr", "The Source of Goodness"],
    ["التواب", "At-Tawwab", "The Accepter of Repentance"],
    ["العفو", "Al-Afuww", "The Pardoner"],
    ["الرؤوف", "Ar-Ra'uf", "The Kind"],
    ["مالك الملك", "Malik-ul-Mulk", "Owner of Sovereignty"],
    ["الغني", "Al-Ghaniyy", "The Self-Sufficient"],
    ["الهادي", "Al-Hadi", "The Guide"],
    ["النور", "An-Nur", "The Light"],
    ["الصبور", "As-Sabur", "The Patient"],
  ];

  const root = document.getElementById("names");
  if (!root) return;
  root.innerHTML = names
    .map(
      ([ar, en, meaning]) => `
      <div class="name-card">
        <div class="ar">${ar}</div>
        <strong>${en}</strong><br />
        <small>${meaning}</small>
      </div>
    `
    )
    .join("");
})();
