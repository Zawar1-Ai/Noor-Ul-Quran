(function () {
  const $ = (id) => document.getElementById(id);
  const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const dk = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const load = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? f : v; } catch (e) { return f; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const today = () => dk(new Date());

  let done = load("noor_prayers", {});
  let quran = load("noor_quran", { goal: 10, days: {} });
  let tasbih = load("noor_tasbih", { count: 0, target: 33, total: 0 });
  let loc = load("noor_loc", { city: "Karachi", country: "Pakistan" });
  let times = null;

  async function loadTimes() {
    $("d-status").textContent = "Loading prayer times...";
    try {
      const url = "https://api.aladhan.com/v1/timingsByCity?city=" + encodeURIComponent(loc.city) +
        "&country=" + encodeURIComponent(loc.country) + "&method=3";
      const res = await fetch(url);
      if (!res.ok) throw new Error("bad response");
      const json = await res.json();
      const t = json.data.timings;
      times = PRAYERS.map((n) => ({ name: n, time: t[n].slice(0, 5) }));
      const h = json.data.date.hijri;
      $("s-hijri").textContent = h.day + " " + h.month.en + " " + h.year;
      $("s-greg").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
      $("d-status").textContent = "Showing times for " + loc.city + ", " + loc.country;
    } catch (e) {
      times = null;
      $("d-status").textContent = "Could not load prayer times. Check the city name or your connection.";
    }
    renderPrayers();
    tick();
  }

  function nextPrayer() {
    if (!times) return null;
    const now = new Date();
    for (const p of times) {
      const [h, m] = p.time.split(":").map(Number);
      const d = new Date(now); d.setHours(h, m, 0, 0);
      if (d > now) return { name: p.name, at: d };
    }
    const [h, m] = times[0].time.split(":").map(Number);
    const d = new Date(now); d.setDate(d.getDate() + 1); d.setHours(h, m, 0, 0);
    return { name: "Fajr", at: d };
  }

  function tick() {
    const n = nextPrayer();
    if (!n) { $("s-next").textContent = "-"; $("s-count").textContent = "-"; return; }
    const diff = Math.max(0, n.at - new Date());
    const hh = Math.floor(diff / 3600000), mm = Math.floor((diff % 3600000) / 60000), ss = Math.floor((diff % 60000) / 1000);
    $("s-next").textContent = n.name;
    $("s-count").textContent = "in " + hh + "h " + String(mm).padStart(2, "0") + "m " + String(ss).padStart(2, "0") + "s";
  }

  function renderPrayers() {
    const d = done[today()] || [false, false, false, false, false];
    const nxt = nextPrayer();
    $("d-prayers").innerHTML = PRAYERS.map((name, i) => {
      const t = times ? times[i].time : "--:--";
      return '<label class="prayer-line' + (nxt && nxt.name === name ? " next" : "") + '">' +
        '<input type="checkbox" data-i="' + i + '"' + (d[i] ? " checked" : "") + ' />' +
        '<span class="name">' + name + '</span><span class="time">' + t + "</span></label>";
    }).join("");
    $("d-prayers").querySelectorAll("input").forEach((box) => {
      box.onchange = () => {
        const arr = done[today()] || [false, false, false, false, false];
        arr[+box.dataset.i] = box.checked;
        done[today()] = arr; save("noor_prayers", done);
        renderStats(); renderBars();
      };
    });
    renderStats(); renderBars();
  }

  function renderBars() {
    let html = "";
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const c = (done[dk(d)] || []).filter(Boolean).length;
      html += '<div class="bar' + (i === 0 ? " today" : "") + '" title="' + c + ' of 5">' +
        '<i style="height:' + (c / 5) * 100 + '%"></i><span>' + d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3) + "</span></div>";
    }
    $("d-bars").innerHTML = html;
  }

  function renderQuran() {
    const n = quran.days[today()] || 0;
    $("q-goal").value = quran.goal;
    $("q-bar").style.width = Math.min(100, (n / quran.goal) * 100) + "%";
    $("s-ayahs").textContent = n;
    $("s-goal").textContent = "Goal: " + quran.goal + " ayahs";
  }
  document.querySelectorAll("[data-ayah]").forEach((b) => {
    b.onclick = () => {
      quran.days[today()] = Math.max(0, (quran.days[today()] || 0) + Number(b.dataset.ayah));
      save("noor_quran", quran); renderQuran();
    };
  });
  $("q-goal").onchange = () => {
    quran.goal = Math.max(1, parseInt($("q-goal").value, 10) || 10);
    save("noor_quran", quran); renderQuran();
  };

  function renderTasbih() {
    $("t-count").textContent = tasbih.count;
    $("t-target").value = String(tasbih.target);
    $("t-total").textContent = "Total dhikr counted: " + tasbih.total;
  }
  $("t-tap").onclick = () => {
    tasbih.count++; tasbih.total++;
    if (tasbih.count >= tasbih.target) { tasbih.count = 0; if (navigator.vibrate) navigator.vibrate(120); }
    save("noor_tasbih", tasbih); renderTasbih();
  };
  $("t-reset").onclick = () => { tasbih.count = 0; save("noor_tasbih", tasbih); renderTasbih(); };
  $("t-target").onchange = () => { tasbih.target = +$("t-target").value; tasbih.count = 0; save("noor_tasbih", tasbih); renderTasbih(); };

  function renderStats() {
    const c = (done[today()] || []).filter(Boolean).length;
    $("s-prayers").textContent = c + " / 5";
  }

  $("d-city").value = loc.city; $("d-country").value = loc.country;
  $("d-load").onclick = () => {
    loc = { city: $("d-city").value.trim() || "Karachi", country: $("d-country").value.trim() || "Pakistan" };
    save("noor_loc", loc); loadTimes();
  };

  renderQuran(); renderTasbih(); renderPrayers(); loadTimes();
  setInterval(tick, 1000);
})();