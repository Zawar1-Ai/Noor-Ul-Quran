(function () {
  const hadiths = [
    {
      ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
      en: "Actions are judged by intentions.",
      source: "Sahih al-Bukhari",
    },
    {
      ar: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
      en: "The Muslim is the one from whose tongue and hand other Muslims are safe.",
      source: "Sahih al-Bukhari",
    },
    {
      ar: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      en: "None of you truly believes until he loves for his brother what he loves for himself.",
      source: "Sahih al-Bukhari",
    },
    {
      ar: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      en: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
      source: "Sahih al-Bukhari",
    },
    {
      ar: "الدِّينُ النَّصِيحَةُ",
      en: "The religion is sincere advice.",
      source: "Sahih Muslim",
    },
    {
      ar: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
      en: "Cleanliness is half of faith.",
      source: "Sahih Muslim",
    },
    {
      ar: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
      en: "The best of you are those who learn the Quran and teach it.",
      source: "Sahih al-Bukhari",
    },
    {
      ar: "ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
      en: "Show mercy to those on earth, and the One in the heaven will show mercy to you.",
      source: "Sunan al-Tirmidhi",
    },
    {
      ar: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
      en: "Charity does not decrease wealth.",
      source: "Sahih Muslim",
    },
    {
      ar: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
      en: "Your smile in the face of your brother is charity.",
      source: "Sunan al-Tirmidhi",
    },
  ];

  const featured = document.getElementById("hadith-featured");
  const list = document.getElementById("hadith-list");

  function card(h) {
    return `
      <p class="hadith-ar">${h.ar}</p>
      <p>“${h.en}”</p>
      <p class="ayah-ref">${h.source}</p>
    `;
  }

  function showRandom() {
    const h = hadiths[Math.floor(Math.random() * hadiths.length)];
    featured.innerHTML = `<h3>Reflect</h3>${card(h)}`;
  }

  list.innerHTML = hadiths.map((h) => `<article class="card">${card(h)}</article>`).join("");
  showRandom();
  document.getElementById("random-hadith").addEventListener("click", showRandom);
})();
