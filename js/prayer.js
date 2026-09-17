(function () {
  const grid = document.getElementById("prayer-grid");
  const statusEl = document.getElementById("prayer-status");
  const cityInput = document.getElementById("city");
  const countryInput = document.getElementById("country");
  const names = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  function nextPrayer(timings) {
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();
    for (const name of names) {
      if (toMinutes(timings[name]) > current) return name;
    }
    return "Fajr";
  }

  function render(timings, place) {
    const upcoming = nextPrayer(timings);
    grid.innerHTML = names
      .map(
        (name) => `
      <div class="prayer-item ${name === upcoming ? "next" : ""}">
        <span>${name}${name === upcoming ? " · next" : ""}</span>
        <strong>${timings[name]}</strong>
      </div>
    `
      )
      .join("");
    statusEl.textContent = `${place} · ${timings.date || ""}`;
    statusEl.classList.remove("error");
  }

  async function loadByCity() {
    const city = cityInput.value.trim();
    const country = countryInput.value.trim();
    if (!city || !country) {
      statusEl.textContent = "Please enter a city and country.";
      statusEl.classList.add("error");
      return;
    }
    statusEl.textContent = "Loading prayer times…";
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=3`
      );
      const json = await res.json();
      const t = json.data.timings;
      t.date = json.data.date.readable;
      render(t, `${city}, ${country}`);
    } catch (err) {
      statusEl.textContent = "Could not load times. Check the city name and your connection.";
      statusEl.classList.add("error");
    }
  }

  async function loadByCoords(lat, lon) {
    statusEl.textContent = "Loading prayer times for your location…";
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=3`
      );
      const json = await res.json();
      const t = json.data.timings;
      t.date = json.data.date.readable;
      render(t, "Your location");
    } catch (err) {
      statusEl.textContent = "Could not load times for this location.";
      statusEl.classList.add("error");
    }
  }

  document.getElementById("load-city").addEventListener("click", loadByCity);
  document.getElementById("use-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
      statusEl.textContent = "Location is not supported in this browser.";
      statusEl.classList.add("error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => loadByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {
        statusEl.textContent = "Location permission was denied. Enter a city instead.";
        statusEl.classList.add("error");
      }
    );
  });

  loadByCity();
})();
