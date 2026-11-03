const state = {
  currentUnit: localStorage.getItem('aura_weather_unit') || 'metric',
  currentTheme: localStorage.getItem('aura_weather_theme') || 'dark',
  recentSearches: JSON.parse(localStorage.getItem('aura_weather_recents') || '[]'),
  currentWeatherData: null,
  currentLocationName: '',
  currentCountryName: '',
  searchDebounceTimer: null
};

const elements = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  currentTime: document.getElementById('currentTime'),
  unitCelsius: document.getElementById('unitCelsius'),
  unitFahrenheit: document.getElementById('unitFahrenheit'),
  weatherBackdrop: document.getElementById('weatherBackdrop'),

  searchForm: document.getElementById('searchForm'),
  cityInput: document.getElementById('cityInput'),
  clearInputBtn: document.getElementById('clearInputBtn'),
  autocompleteList: document.getElementById('autocompleteList'),
  locationBtn: document.getElementById('locationBtn'),
  recentChips: document.getElementById('recentChips'),
  clearRecentBtn: document.getElementById('clearRecentBtn'),

  skeletonLoader: document.getElementById('skeletonLoader'),
  weatherView: document.getElementById('weatherView'),
  errorBanner: document.getElementById('errorBanner'),
  errorTitle: document.getElementById('errorTitle'),
  errorMessage: document.getElementById('errorMessage'),
  errorRetryBtn: document.getElementById('errorRetryBtn'),
  toastContainer: document.getElementById('toastContainer'),

  cityName: document.getElementById('cityName'),
  countryName: document.getElementById('countryName'),
  weatherDate: document.getElementById('weatherDate'),
  heroWeatherIcon: document.getElementById('heroWeatherIcon'),
  currentTemp: document.getElementById('currentTemp'),
  tempUnitLabel: document.getElementById('tempUnitLabel'),
  weatherCondition: document.getElementById('weatherCondition'),
  feelsLikeTemp: document.getElementById('feelsLikeTemp'),
  minTemp: document.getElementById('minTemp'),
  maxTemp: document.getElementById('maxTemp'),

  humidityVal: document.getElementById('humidityVal'),
  humidityProgress: document.getElementById('humidityProgress'),
  humidityStatus: document.getElementById('humidityStatus'),
  windVal: document.getElementById('windVal'),
  windUnitLabel: document.getElementById('windUnitLabel'),
  compassArrow: document.getElementById('compassArrow'),
  windDirectionText: document.getElementById('windDirectionText'),
  uvVal: document.getElementById('uvVal'),
  uvBadge: document.getElementById('uvBadge'),
  uvProgress: document.getElementById('uvProgress'),
  uvAdvice: document.getElementById('uvAdvice'),
  pressureVal: document.getElementById('pressureVal'),
  pressureStatus: document.getElementById('pressureStatus'),
  sunriseTime: document.getElementById('sunriseTime'),
  sunsetTime: document.getElementById('sunsetTime'),
  rainProbVal: document.getElementById('rainProbVal'),
  rainAmountText: document.getElementById('rainAmountText'),

  hourlySlider: document.getElementById('hourlySlider'),
  forecastCardsGrid: document.getElementById('forecastCardsGrid')
};

const weatherCodeMap = {
  0: { desc: 'Clear sky', icon: 'sun', type: 'sunny' },
  1: { desc: 'Mainly clear', icon: 'sun', type: 'sunny' },
  2: { desc: 'Partly cloudy', icon: 'cloud-sun', type: 'cloudy' },
  3: { desc: 'Overcast', icon: 'cloud', type: 'cloudy' },
  45: { desc: 'Foggy', icon: 'fog', type: 'cloudy' },
  48: { desc: 'Depositing rime fog', icon: 'fog', type: 'cloudy' },
  51: { desc: 'Light drizzle', icon: 'drizzle', type: 'rainy' },
  53: { desc: 'Moderate drizzle', icon: 'drizzle', type: 'rainy' },
  55: { desc: 'Dense drizzle', icon: 'drizzle', type: 'rainy' },
  56: { desc: 'Freezing drizzle', icon: 'snow', type: 'snowy' },
  57: { desc: 'Dense freezing drizzle', icon: 'snow', type: 'snowy' },
  61: { desc: 'Slight rain', icon: 'rain', type: 'rainy' },
  63: { desc: 'Moderate rain', icon: 'rain', type: 'rainy' },
  65: { desc: 'Heavy rain', icon: 'rain-heavy', type: 'rainy' },
  66: { desc: 'Light freezing rain', icon: 'snow', type: 'snowy' },
  67: { desc: 'Heavy freezing rain', icon: 'snow', type: 'snowy' },
  71: { desc: 'Slight snow fall', icon: 'snow', type: 'snowy' },
  73: { desc: 'Moderate snow fall', icon: 'snow', type: 'snowy' },
  75: { desc: 'Heavy snow fall', icon: 'snow', type: 'snowy' },
  77: { desc: 'Snow grains', icon: 'snow', type: 'snowy' },
  80: { desc: 'Slight rain showers', icon: 'rain', type: 'rainy' },
  81: { desc: 'Moderate rain showers', icon: 'rain', type: 'rainy' },
  82: { desc: 'Violent rain showers', icon: 'rain-heavy', type: 'rainy' },
  85: { desc: 'Slight snow showers', icon: 'snow', type: 'snowy' },
  86: { desc: 'Heavy snow showers', icon: 'snow', type: 'snowy' },
  95: { desc: 'Thunderstorm', icon: 'thunder', type: 'stormy' },
  96: { desc: 'Thunderstorm with slight hail', icon: 'thunder', type: 'stormy' },
  99: { desc: 'Thunderstorm with heavy hail', icon: 'thunder', type: 'stormy' }
};

function getSvgIcon(iconName, isDay = 1) {
  if (iconName === 'sun' && !isDay) {
    iconName = 'moon';
  } else if (iconName === 'cloud-sun' && !isDay) {
    iconName = 'cloud-moon';
  }

  const icons = {
    'sun': `
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="14" fill="url(#sunGrad)"/>
        <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
          <line x1="32" y1="6" x2="32" y2="12"/>
          <line x1="32" y1="52" x2="32" y2="58"/>
          <line x1="6" y1="32" x2="12" y2="32"/>
          <line x1="52" y1="32" x2="58" y2="32"/>
          <line x1="13.6" y1="13.6" x2="17.8" y2="17.8"/>
          <line x1="46.2" y1="46.2" x2="50.4" y2="50.4"/>
          <line x1="13.6" y1="50.4" x2="17.8" y2="46.2"/>
          <line x1="46.2" y1="17.8" x2="50.4" y2="13.6"/>
        </g>
        <defs>
          <linearGradient id="sunGrad" x1="18" y1="18" x2="46" y2="46">
            <stop stop-color="#fbbf24"/>
            <stop offset="1" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
      </svg>`,
    'moon': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M42 46C29.85 46 20 36.15 20 24C20 17.5 22.8 11.66 27.24 7.64C16.88 9.38 9 18.36 9 29.24C9 42.36 19.64 53 32.76 53C41.28 53 48.72 48.52 52.88 41.84C49.6 44.48 45.96 46 42 46Z" fill="url(#moonGrad)"/>
        <defs>
          <linearGradient id="moonGrad" x1="10" y1="10" x2="50" y2="50">
            <stop stop-color="#93c5fd"/>
            <stop offset="1" stop-color="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>`,
    'cloud': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M46 44H20C14.48 44 10 39.52 10 34C10 28.84 13.92 24.56 19 24.08C20.68 16.08 27.76 10 36.24 10C46.36 10 54.64 17.8 55.32 27.84C57.96 29.6 59.6 32.6 59.6 36C59.6 40.4 56 44 51.6 44H46Z" fill="url(#cloudGrad)"/>
        <defs>
          <linearGradient id="cloudGrad" x1="10" y1="10" x2="60" y2="44">
            <stop stop-color="#cbd5e1"/>
            <stop offset="1" stop-color="#94a3b8"/>
          </linearGradient>
        </defs>
      </svg>`,
    'cloud-sun': `
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="24" cy="24" r="10" fill="#f59e0b"/>
        <path d="M48 46H24C19.58 46 16 42.42 16 38C16 33.88 19.14 30.46 23.2 30.06C24.54 23.66 30.2 18.8 37 18.8C45.1 18.8 51.72 25.04 52.26 33.08C54.36 34.48 55.68 36.88 55.68 39.6C55.68 43.14 52.8 46 49.28 46H48Z" fill="url(#cloudSunGrad)"/>
        <defs>
          <linearGradient id="cloudSunGrad" x1="16" y1="20" x2="56" y2="46">
            <stop stop-color="#f8fafc"/>
            <stop offset="1" stop-color="#cbd5e1"/>
          </linearGradient>
        </defs>
      </svg>`,
    'cloud-moon': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M30 14C23.37 14 18 19.37 18 26C18 28.5 18.77 30.82 20.08 32.74C19.39 32.68 18.7 32.65 18 32.65C13.58 32.65 10 36.23 10 40.65C10 45.07 13.58 48.65 18 48.65H44C47.87 48.65 51 45.52 51 41.65C51 38.32 48.67 35.54 45.56 34.83C45.16 27.65 39.23 22 32 22C31.32 22 30.65 22.05 30 22.15V14Z" fill="url(#cloudMoonGrad)"/>
        <defs>
          <linearGradient id="cloudMoonGrad" x1="10" y1="14" x2="51" y2="48">
            <stop stop-color="#94a3b8"/>
            <stop offset="1" stop-color="#64748b"/>
          </linearGradient>
        </defs>
      </svg>`,
    'drizzle': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M46 36H20C14.48 36 10 31.52 10 26C10 20.84 13.92 16.56 19 16.08C20.68 8.08 27.76 2 36.24 2C46.36 2 54.64 9.8 55.32 19.84C57.96 21.6 59.6 24.6 59.6 28C59.6 32.4 56 36 51.6 36H46Z" fill="#94a3b8"/>
        <line x1="22" y1="42" x2="18" y2="50" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="34" y1="42" x2="30" y2="50" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="46" y1="42" x2="42" y2="50" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    'rain': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M46 34H20C14.48 34 10 29.52 10 24C10 18.84 13.92 14.56 19 14.08C20.68 6.08 27.76 0 36.24 0C46.36 0 54.64 7.8 55.32 17.84C57.96 19.6 59.6 22.6 59.6 26C59.6 30.4 56 34 51.6 34H46Z" fill="#64748b"/>
        <line x1="24" y1="40" x2="18" y2="54" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
        <line x1="36" y1="40" x2="30" y2="54" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
        <line x1="48" y1="40" x2="42" y2="54" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    'rain-heavy': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M46 32H20C14.48 32 10 27.52 10 22C10 16.84 13.92 12.56 19 12.08C20.68 4.08 27.76 -2 36.24 -2C46.36 -2 54.64 5.8 55.32 15.84C57.96 17.6 59.6 20.6 59.6 24C59.6 28.4 56 32 51.6 32H46Z" fill="#475569"/>
        <line x1="20" y1="38" x2="14" y2="56" stroke="#0369a1" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="32" y1="38" x2="26" y2="56" stroke="#0369a1" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="44" y1="38" x2="38" y2="56" stroke="#0369a1" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="52" y1="38" x2="46" y2="56" stroke="#0369a1" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,
    'snow': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M46 34H20C14.48 34 10 29.52 10 24C10 18.84 13.92 14.56 19 14.08C20.68 6.08 27.76 0 36.24 0C46.36 0 54.64 7.8 55.32 17.84C57.96 19.6 59.6 22.6 59.6 26C59.6 30.4 56 34 51.6 34H46Z" fill="#94a3b8"/>
        <g stroke="#38bdf8" stroke-width="2" stroke-linecap="round">
          <circle cx="22" cy="46" r="2.5" fill="#bae6fd"/>
          <circle cx="34" cy="52" r="3" fill="#bae6fd"/>
          <circle cx="46" cy="46" r="2.5" fill="#bae6fd"/>
        </g>
      </svg>`,
    'thunder': `
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M46 32H20C14.48 32 10 27.52 10 22C10 16.84 13.92 12.56 19 12.08C20.68 4.08 27.76 -2 36.24 -2C46.36 -2 54.64 5.8 55.32 15.84C57.96 17.6 59.6 20.6 59.6 24C59.6 28.4 56 32 51.6 32H46Z" fill="#334155"/>
        <polygon points="34,32 24,46 32,46 28,60 42,42 34,42" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>`,
    'fog': `
      <svg viewBox="0 0 64 64" fill="none">
        <line x1="16" y1="24" x2="48" y2="24" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="10" y1="32" x2="54" y2="32" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="14" y1="40" x2="50" y2="40" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="20" y1="48" x2="44" y2="48" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`
  };

  return icons[iconName] || icons['sun'];
}

function startLiveClock() {
  const update = () => {
    const now = new Date();
    elements.currentTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  update();
  setInterval(update, 1000);
}

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  elements.themeToggleBtn.addEventListener('click', () => {
    state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    localStorage.setItem('aura_weather_theme', state.currentTheme);
    showToast(`Switched to ${state.currentTheme} mode`, 'info');
  });
}

function initUnits() {
  updateUnitButtons();

  elements.unitCelsius.addEventListener('click', () => {
    if (state.currentUnit !== 'metric') {
      state.currentUnit = 'metric';
      localStorage.setItem('aura_weather_unit', 'metric');
      updateUnitButtons();
      refreshDisplayWithUnit();
      showToast('Units switched to Celsius (°C)', 'info');
    }
  });

  elements.unitFahrenheit.addEventListener('click', () => {
    if (state.currentUnit !== 'imperial') {
      state.currentUnit = 'imperial';
      localStorage.setItem('aura_weather_unit', 'imperial');
      updateUnitButtons();
      refreshDisplayWithUnit();
      showToast('Units switched to Fahrenheit (°F)', 'info');
    }
  });
}

function updateUnitButtons() {
  if (state.currentUnit === 'metric') {
    elements.unitCelsius.classList.add('active');
    elements.unitFahrenheit.classList.remove('active');
    elements.tempUnitLabel.textContent = '°C';
    elements.windUnitLabel.textContent = 'km/h';
  } else {
    elements.unitFahrenheit.classList.add('active');
    elements.unitCelsius.classList.remove('active');
    elements.tempUnitLabel.textContent = '°F';
    elements.windUnitLabel.textContent = 'mph';
  }
}

function formatTemp(celsiusVal) {
  if (celsiusVal === undefined || celsiusVal === null) return '--';
  if (state.currentUnit === 'imperial') {
    const fahrenheit = (celsiusVal * 9 / 5) + 32;
    return Math.round(fahrenheit);
  }
  return Math.round(celsiusVal);
}

function formatWindSpeed(kmhVal) {
  if (kmhVal === undefined || kmhVal === null) return '--';
  if (state.currentUnit === 'imperial') {
    const mph = kmhVal * 0.621371;
    return Math.round(mph * 10) / 10;
  }
  return Math.round(kmhVal * 10) / 10;
}

function renderRecentSearches() {
  elements.recentChips.innerHTML = '';
  if (state.recentSearches.length === 0) {
    elements.recentChips.innerHTML = '<span class="metric-subtext">No recent searches</span>';
    return;
  }

  state.recentSearches.forEach(city => {
    const chip = document.createElement('div');
    chip.className = 'recent-chip';
    chip.innerHTML = `
      <span>${escapeHtml(city)}</span>
      <span class="chip-remove" title="Remove">&times;</span>
    `;

    chip.querySelector('span:first-child').addEventListener('click', () => {
      fetchWeatherByCity(city);
    });

    chip.querySelector('.chip-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      removeRecentSearch(city);
    });

    elements.recentChips.appendChild(chip);
  });
}

function saveRecentSearch(city) {
  if (!city) return;
  const normalized = city.trim();
  state.recentSearches = [normalized, ...state.recentSearches.filter(c => c.toLowerCase() !== normalized.toLowerCase())].slice(0, 6);
  localStorage.setItem('aura_weather_recents', JSON.stringify(state.recentSearches));
  renderRecentSearches();
}

function removeRecentSearch(city) {
  state.recentSearches = state.recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
  localStorage.setItem('aura_weather_recents', JSON.stringify(state.recentSearches));
  renderRecentSearches();
}

function initRecentSearches() {
  renderRecentSearches();
  elements.clearRecentBtn.addEventListener('click', () => {
    state.recentSearches = [];
    localStorage.removeItem('aura_weather_recents');
    renderRecentSearches();
    showToast('Search history cleared', 'info');
  });
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function setLoading(isLoading) {
  if (isLoading) {
    elements.skeletonLoader.classList.remove('hidden');
    elements.weatherView.classList.add('hidden');
    elements.errorBanner.classList.add('hidden');
  } else {
    elements.skeletonLoader.classList.add('hidden');
  }
}

function showError(title, message) {
  elements.skeletonLoader.classList.add('hidden');
  elements.weatherView.classList.add('hidden');
  elements.errorBanner.classList.remove('hidden');
  elements.errorTitle.textContent = title;
  elements.errorMessage.textContent = message;
}

function showWeatherView() {
  elements.skeletonLoader.classList.add('hidden');
  elements.errorBanner.classList.add('hidden');
  elements.weatherView.classList.remove('hidden');
}

function initAutocomplete() {
  elements.cityInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      elements.clearInputBtn.classList.remove('hidden');
    } else {
      elements.clearInputBtn.classList.add('hidden');
      elements.autocompleteList.classList.add('hidden');
      return;
    }

    clearTimeout(state.searchDebounceTimer);
    if (query.length < 2) {
      elements.autocompleteList.classList.add('hidden');
      return;
    }

    state.searchDebounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        if (!response.ok) return;
        const data = await response.json();
        renderAutocomplete(data.results || []);
      } catch (err) {
      }
    }, 300);
  });

  elements.clearInputBtn.addEventListener('click', () => {
    elements.cityInput.value = '';
    elements.clearInputBtn.classList.add('hidden');
    elements.autocompleteList.classList.add('hidden');
    elements.cityInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!elements.searchForm.contains(e.target)) {
      elements.autocompleteList.classList.add('hidden');
    }
  });

  elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = elements.cityInput.value.trim();
    if (city) {
      elements.autocompleteList.classList.add('hidden');
      fetchWeatherByCity(city);
    }
  });

  elements.errorRetryBtn.addEventListener('click', () => {
    const city = elements.cityInput.value.trim() || 'New Delhi';
    fetchWeatherByCity(city);
  });
}

function renderAutocomplete(results) {
  elements.autocompleteList.innerHTML = '';
  if (results.length === 0) {
    elements.autocompleteList.classList.add('hidden');
    return;
  }

  results.forEach(item => {
    const li = document.createElement('li');
    li.className = 'autocomplete-item';
    const region = [item.admin1, item.country].filter(Boolean).join(', ');
    li.innerHTML = `
      <span class="autocomplete-city">${escapeHtml(item.name)}</span>
      <span class="autocomplete-country">${escapeHtml(region)}</span>
    `;

    li.addEventListener('click', () => {
      elements.cityInput.value = `${item.name}${item.country ? ', ' + item.country : ''}`;
      elements.autocompleteList.classList.add('hidden');
      fetchWeatherByCoordinates(item.latitude, item.longitude, item.name, item.country || '');
    });

    elements.autocompleteList.appendChild(li);
  });

  elements.autocompleteList.classList.remove('hidden');
}

function initGeolocation() {
  elements.locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setLoading(true);
    showToast('Detecting your location...', 'info');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const geoData = await geoRes.json();
          const cityName = geoData.city || geoData.locality || geoData.principalSubdivision || 'Current Location';
          const countryName = geoData.countryName || '';

          await fetchWeatherByCoordinates(latitude, longitude, cityName, countryName);
          showToast(`Location detected: ${cityName}`, 'success');
        } catch (err) {
          await fetchWeatherByCoordinates(latitude, longitude, 'My Location', '');
        }
      },
      (error) => {
        setLoading(false);
        let msg = 'Unable to retrieve location';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please search your city manually.';
        }
        showToast(msg, 'error');
        showError('Location Access Denied', msg);
      },
      { timeout: 10000 }
    );
  });
}

async function fetchWeatherByCity(cityName) {
  setLoading(true);
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    if (!geoRes.ok) throw new Error('Network error reaching geocoding service');

    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      showError('City Not Found', `We couldn't find any weather information for "${cityName}". Please check the spelling and try again.`);
      showToast(`City "${cityName}" not found`, 'error');
      return;
    }

    const place = geoData.results[0];
    const resolvedCity = place.name;
    const resolvedCountry = [place.admin1, place.country].filter(Boolean).join(', ');

    await fetchWeatherByCoordinates(place.latitude, place.longitude, resolvedCity, resolvedCountry);
  } catch (err) {
    showError('Connection Error', 'Failed to fetch weather data. Please check your internet connection.');
    showToast('Failed to fetch weather data', 'error');
  }
}

async function fetchWeatherByCoordinates(lat, lon, cityName, countryName) {
  setLoading(true);
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,precipitation_sum&timezone=auto`;

    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error('Failed to retrieve forecast');

    const data = await res.json();
    state.currentWeatherData = data;
    state.currentLocationName = cityName;
    state.currentCountryName = countryName;

    saveRecentSearch(cityName);
    localStorage.setItem('aura_last_city', cityName);

    renderWeatherData();
    showWeatherView();
  } catch (err) {
    showError('Forecast Unavailable', 'Unable to retrieve forecast details for this location.');
  }
}

function renderWeatherData() {
  const data = state.currentWeatherData;
  if (!data || !data.current) return;

  const current = data.current;
  const daily = data.daily;
  const hourly = data.hourly;

  elements.cityName.textContent = state.currentLocationName || 'Unknown City';
  elements.countryName.textContent = state.currentCountryName || 'Global Weather';

  const today = new Date();
  elements.weatherDate.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const codeInfo = weatherCodeMap[current.weather_code] || { desc: 'Unknown', icon: 'sun', type: 'sunny' };
  elements.weatherCondition.textContent = codeInfo.desc;
  elements.heroWeatherIcon.innerHTML = getSvgIcon(codeInfo.icon, current.is_day);

  updateBackdropTheme(codeInfo.type, current.is_day);

  elements.currentTemp.textContent = formatTemp(current.temperature_2m);
  elements.feelsLikeTemp.textContent = `${formatTemp(current.apparent_temperature)}°`;

  if (daily && daily.temperature_2m_min && daily.temperature_2m_max) {
    elements.minTemp.textContent = `${formatTemp(daily.temperature_2m_min[0])}°`;
    elements.maxTemp.textContent = `${formatTemp(daily.temperature_2m_max[0])}°`;
  }

  const humidity = current.relative_humidity_2m;
  elements.humidityVal.textContent = `${humidity}%`;
  elements.humidityProgress.style.width = `${Math.min(humidity, 100)}%`;
  elements.humidityStatus.textContent = 
    humidity < 30 ? 'Dry air' :
    humidity <= 60 ? 'Comfortable & Pleasant' :
    humidity <= 80 ? 'Humid' : 'Very Humid & Muggy';

  elements.windVal.textContent = formatWindSpeed(current.wind_speed_10m);
  const windDeg = current.wind_direction_10m || 0;
  elements.compassArrow.style.transform = `rotate(${windDeg}deg)`;
  elements.windDirectionText.textContent = `${getWindDirectionCompass(windDeg)} (${windDeg}°)`;

  const uvMax = daily && daily.uv_index_max ? daily.uv_index_max[0] : 0;
  elements.uvVal.textContent = Math.round(uvMax * 10) / 10;
  updateUvBadge(uvMax);

  const pressure = Math.round(current.surface_pressure);
  elements.pressureVal.textContent = pressure;
  elements.pressureStatus.textContent = 
    pressure > 1020 ? 'High pressure (Calm weather)' :
    pressure < 1005 ? 'Low pressure (Storm potential)' :
    'Normal atmospheric pressure';

  if (daily && daily.sunrise && daily.sunset) {
    elements.sunriseTime.textContent = formatTimeOnly(daily.sunrise[0]);
    elements.sunsetTime.textContent = formatTimeOnly(daily.sunset[0]);
  }

  const rainProb = daily && daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;
  const rainSum = daily && daily.precipitation_sum ? daily.precipitation_sum[0] : 0;
  elements.rainProbVal.textContent = `${rainProb}%`;
  elements.rainAmountText.textContent = `Expected precipitation: ${rainSum} mm`;

  renderHourlyForecast(hourly);
  renderDailyForecast(daily);
}

function renderHourlyForecast(hourly) {
  elements.hourlySlider.innerHTML = '';
  if (!hourly || !hourly.time) return;

  const now = new Date();

  let count = 0;
  for (let i = 0; i < hourly.time.length && count < 24; i++) {
    const itemDate = new Date(hourly.time[i]);
    if (itemDate.getTime() < now.getTime() - (60 * 60 * 1000)) continue;

    count++;
    const isNow = count === 1;
    const hourLabel = isNow ? 'Now' : itemDate.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    const code = hourly.weather_code[i];
    const isDay = hourly.is_day ? hourly.is_day[i] : 1;
    const codeInfo = weatherCodeMap[code] || { desc: 'Clear', icon: 'sun' };

    const hourCard = document.createElement('div');
    hourCard.className = `hourly-item ${isNow ? 'now' : ''}`;
    hourCard.innerHTML = `
      <span class="hourly-time">${hourLabel}</span>
      <div class="hourly-icon">${getSvgIcon(codeInfo.icon, isDay)}</div>
      <span class="hourly-temp">${formatTemp(hourly.temperature_2m[i])}°</span>
    `;

    elements.hourlySlider.appendChild(hourCard);
  }
}

function renderDailyForecast(daily) {
  elements.forecastCardsGrid.innerHTML = '';
  if (!daily || !daily.time) return;

  const daysToShow = Math.min(5, daily.time.length);
  for (let i = 0; i < daysToShow; i++) {
    const dateObj = new Date(daily.time[i] + 'T00:00:00');
    const isToday = i === 0;
    const dayName = isToday ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dateFormatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const code = daily.weather_code[i];
    const codeInfo = weatherCodeMap[code] || { desc: 'Clear', icon: 'sun' };
    const maxTemp = daily.temperature_2m_max[i];
    const minTemp = daily.temperature_2m_min[i];
    const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0;

    const dayCard = document.createElement('div');
    dayCard.className = 'forecast-day-card';
    dayCard.innerHTML = `
      <span class="forecast-day-name">${dayName}</span>
      <span class="forecast-day-date">${dateFormatted}</span>
      <div class="forecast-day-icon">${getSvgIcon(codeInfo.icon, 1)}</div>
      <p class="forecast-day-condition">${codeInfo.desc}</p>
      ${rainProb > 0 ? `<div class="forecast-rain-prob">💧 ${rainProb}%</div>` : ''}
      <div class="forecast-day-temps">
        <span class="forecast-max-temp">${formatTemp(maxTemp)}°</span>
        <span class="forecast-min-temp">${formatTemp(minTemp)}°</span>
      </div>
    `;

    elements.forecastCardsGrid.appendChild(dayCard);
  }
}

function refreshDisplayWithUnit() {
  if (state.currentWeatherData) {
    renderWeatherData();
  }
}

function updateBackdropTheme(weatherType, isDay) {
  document.body.classList.remove('weather-sunny', 'weather-cloudy', 'weather-rainy', 'weather-snowy', 'weather-stormy');

  if (!isDay) {
    document.body.classList.add('weather-stormy');
    return;
  }

  switch (weatherType) {
    case 'sunny':
      document.body.classList.add('weather-sunny');
      break;
    case 'cloudy':
      document.body.classList.add('weather-cloudy');
      break;
    case 'rainy':
      document.body.classList.add('weather-rainy');
      break;
    case 'snowy':
      document.body.classList.add('weather-snowy');
      break;
    case 'stormy':
      document.body.classList.add('weather-stormy');
      break;
    default:
      document.body.classList.add('weather-sunny');
  }
}

function updateUvBadge(uv) {
  const badge = elements.uvBadge;
  const progress = elements.uvProgress;
  badge.className = 'badge';

  const uvPercent = Math.min((uv / 12) * 100, 100);
  progress.style.width = `${uvPercent}%`;

  if (uv <= 2) {
    badge.classList.add('low');
    badge.textContent = 'Low';
    elements.uvAdvice.textContent = 'Sun protection not needed';
  } else if (uv <= 5) {
    badge.classList.add('moderate');
    badge.textContent = 'Moderate';
    elements.uvAdvice.textContent = 'Wear sunscreen and sunglasses';
  } else if (uv <= 7) {
    badge.classList.add('high');
    badge.textContent = 'High';
    elements.uvAdvice.textContent = 'Protection required, seek shade';
  } else {
    badge.classList.add('extreme');
    badge.textContent = 'Very High';
    elements.uvAdvice.textContent = 'Avoid prolonged sun exposure';
  }
}

function getWindDirectionCompass(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % 16];
}

function formatTimeOnly(isoString) {
  if (!isoString) return '--:--';
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {
  startLiveClock();
  initTheme();
  initUnits();
  initRecentSearches();
  initAutocomplete();
  initGeolocation();

  const defaultCity = localStorage.getItem('aura_last_city') || 'New Delhi';
  fetchWeatherByCity(defaultCity);
});
