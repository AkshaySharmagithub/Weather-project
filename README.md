# 🌤️ AuraWeather — Modern Weather Information Dashboard

> A responsive, feature-packed Weather Information Dashboard built with **HTML5, Vanilla CSS3, and Modern JavaScript (ES6+)**. Powered by public, free weather APIs with zero API keys required.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Features Overview

### 📌 Required Assignment Features
- 🔍 **City Search:** Fast search for any city globally with real-time debounced autocomplete suggestions.
- 🌡️ **Temperature Display:** Real-time current temperature, "feels like" apparent temperature, and today's high/low range.
- ⛅ **Weather Condition:** Accurate weather descriptions mapped from international WMO standard codes.
- 💧 **Humidity Tracker:** Moisture percentage with animated progress fill and comfort index.
- 💨 **Wind Speed & Direction:** Real-time wind velocity with a 360° dynamic rotating compass arrow.
- 🎨 **Scalable Weather Icons:** Modern, vector-crisp inline SVG icons for day, night, rain, clouds, snow, and thunderstorms.
- ⏳ **Loading State:** Shimmering skeleton loader cards that preserve layout during network requests.
- ⚠️ **Error Handling:** Contextual error cards for invalid cities or network failures with one-click retry, plus toast alerts.
- 📱 **100% Responsive Design:** Optimized for mobile phones, tablets, and high-resolution desktop screens.

### 🎁 Bonus Features (All Implemented)
- 📅 **5-Day Weather Forecast:** Extended daily forecast cards showing future dates, conditions, min/max temps, and precipitation probability.
- ⏰ **24-Hour Hourly Forecast:** Smooth horizontal scrolling timeline showing hourly temperatures and weather icons for today.
- 📍 **Current Location Weather:** "My Location" button utilizing the Browser Geolocation API with reverse geocoding.
- 🌙 **Dark & Light Mode:** Toggleable theme with smooth CSS transition effects, automatically saved in `localStorage`.
- 🕒 **Recent Searches:** Quick-access clickable chips for recently searched cities with individual delete and clear-all actions.
- 🔄 **Unit Converter (°C / °F):** Instant switch between Metric (°C, km/h) and Imperial (°F, mph) without re-fetching API data.
- ✨ **Dynamic Ambient Backdrop:** Background gradient color subtly shifts to reflect current weather conditions (Sunny, Cloudy, Rainy, Snowy, Stormy).

---

## 🖥️ Project Structure

```
d:/ait internship/
├── index.html            # Semantic HTML5 markup
├── style.css             # Vanilla CSS design system, glassmorphism & themes
├── app.js                # State management, API calls, DOM & localStorage
├── README.md             # Project documentation & guide (this file)
├── WORKSPACE_SHEET.md    # Week-by-week task progress & evaluation sheet
└── PROJECT_REPORT.md     # Formal internship project submission report
```

---

## 🚀 Getting Started

No installations, build steps, or API keys are required. This is a pure vanilla frontend project that runs instantly in any modern web browser.

### Option 1: Open Directly in Browser
Simply double-click [`index.html`](file:///d:/ait%20internship/index.html) to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Run with a Local Server (Recommended)
If using VS Code:
1. Install the **Live Server** extension.
2. Right-click [`index.html`](file:///d:/ait%20internship/index.html) and select **"Open with Live Server"**.

Or using Python in terminal / PowerShell:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Or using Node.js:
```bash
npx serve .
```

---

## 🌐 Public APIs Used

1. **[Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)**
   - Translates city names into geographical latitude & longitude.
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json`
2. **[Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs)**
   - Returns real-time weather, 24-hour hourly outlook, and 5-day daily forecast.
   - Endpoint: `https://api.open-meteo.com/v1/forecast`
3. **[BigDataCloud Reverse Geocoding Client API](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api)**
   - Converts GPS coordinates to locality and city name for the "My Location" feature.
   - Endpoint: `https://api.bigdatacloud.net/data/reverse-geocode-client`

*All APIs used are 100% free, require no signup, and have no secret keys exposed in client-side code.*

---

## 🚢 Deployment Guide

This project can be deployed in less than 60 seconds to any free static host:

### Deploy to GitHub Pages:
1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete weather dashboard assignment"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your live site will be ready at `https://<your-username>.github.io/<repo-name>/`.

### Deploy to Netlify / Vercel:
Drag-and-drop this project folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop) or import from GitHub on [vercel.com](https://vercel.com).

---

## 📋 Internship Submission Deliverables

As required by the assignment guidelines:
- [x] **Complete Source Code:** Clean, modular, well-commented code.
- [x] **README.md:** Complete project overview and setup instructions.
- [x] **Workspace Sheet:** Detailed milestone tracker in [`WORKSPACE_SHEET.md`](file:///d:/ait%20internship/WORKSPACE_SHEET.md).
- [x] **Project Report:** Formal internship project report in [`PROJECT_REPORT.md`](file:///d:/ait%20internship/PROJECT_REPORT.md).
- [x] **Live Ready:** Ready for deployment on GitHub Pages or Netlify.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
