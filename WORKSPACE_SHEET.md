# Internship Mini Project – Workspace Sheet & Task Tracker

**Project Title:** Weather Information Dashboard (**AuraWeather**)  
**Intern Name:** `[Your Name]`  
**Intern ID / Roll No:** `[Your Intern ID / Roll No]`  
**Mentor Name:** `[Mentor Name]`  
**College / Institute:** `[Your College / Institute Name]`  
**Domain:** Frontend Development  
**Level:** Beginner  
**Duration:** 2 Weeks  
**Technologies:** HTML5, CSS3 (Vanilla), JavaScript (ES6+), Public Weather API (Open-Meteo & BigDataCloud)  
**Status:** **100% Completed**  

---

## 📅 Timeline & Task Breakdown

### 🗓️ Week 1 – UI Development & API Integration

| Task Item | Target Description | Status | Deliverables / Implementation Details |
| :--- | :--- | :---: | :--- |
| **1. Create Project Structure** | Set up clean, modular directory structure for HTML, CSS, JavaScript, and documentation. | ✅ Completed | Created `index.html`, `style.css`, `app.js`, `README.md`, `WORKSPACE_SHEET.md`, `PROJECT_REPORT.md`. |
| **2. Design Dashboard UI** | Modern glassmorphism UI with responsive card layouts, gradients, and typography. | ✅ Completed | Implemented in `style.css` using custom design tokens, glassmorphism (`backdrop-filter`), and Google Fonts (Outfit & Inter). |
| **3. Create City Search Interface** | Input field with instant clear button, search trigger, and auto-suggest dropdown. | ✅ Completed | Built accessible search bar with real-time debounced autocomplete querying Open-Meteo Geocoding API. |
| **4. Build Responsive Layout** | Adaptable grid & flexbox design for mobile (≤480px), tablet (≤768px/1024px), and desktop. | ✅ Completed | Mobile-first CSS media queries with fluid typography, responsive card grids, and touch-friendly controls. |
| **5. Revise JavaScript Fundamentals** | Variables, arrow functions, DOM querying, event listeners, and state management. | ✅ Completed | Implemented centralized `state` object and cached DOM references in `elements` dictionary in `app.js`. |
| **6. Learn & Understand Fetch API** | Asynchronous HTTP requests using `async/await`, JSON parsing, and HTTP status verification. | ✅ Completed | Utilized `fetch()` with `async/await`, error handling, and robust JSON schema parsing. |
| **7. Connect to Public Weather API** | Integrate free, reliable public weather endpoints without requiring paid/secret API keys. | ✅ Completed | Integrated Open-Meteo Geocoding API & Open-Meteo Forecast API (WMO compliant, 100% free, no key required). |
| **8. Fetch Weather Data by City** | Translate city query to geographical coordinates and retrieve comprehensive forecast. | ✅ Completed | Created `fetchWeatherByCity(cityName)` and `fetchWeatherByCoordinates(lat, lon, ...)`. |
| **9. Display Weather Details Dynamically** | Show live temperature, condition text, humidity, wind speed, and weather icon. | ✅ Completed | Real-time DOM updates for current temp, weather condition, humidity, wind, and custom animated SVG icons. |

---

### 🗓️ Week 2 – Features, Testing & Finalization

| Task Item | Target Description | Status | Deliverables / Implementation Details |
| :--- | :--- | :---: | :--- |
| **1. Add Loading State** | Visual feedback when network requests are executing to improve perceived performance. | ✅ Completed | Shimmering skeleton loader cards (`#skeletonLoader`) that mirror dashboard layout during fetches. |
| **2. Implement Error Handling** | Graceful handling for invalid city names, network failures, and geolocation denials. | ✅ Completed | Interactive Error Banner (`#errorBanner`) with retry action, along with floating animated toast notifications. |
| **3. Improve UI/UX & Responsiveness** | Polish spacing, transitions, accessible contrast, hover states, and smooth scrolling. | ✅ Completed | Added micro-interactions (hover elevation, button ripples), compass needle rotation, and live clock. |
| **4. Bonus 1: 5-Day Weather Forecast** | Extended forecast showing daily min/max temperatures, conditions, and rain probabilities. | ✅ Completed | Daily forecast grid (`#forecastCardsGrid`) rendering next 5 days with WMO code mapping and rain percentage. |
| **5. Bonus 2: 24-Hour Hourly Slider** | Hourly weather progression for the upcoming 24 hours. | ✅ Completed | Scrollable hourly card slider (`#hourlySlider`) with dynamic day/night icons and hourly temperatures. |
| **6. Bonus 3: Current Location Weather** | Auto-detect user's GPS coordinates using Browser Geolocation API. | ✅ Completed | "My Location" button querying `navigator.geolocation` with BigDataCloud client reverse-geocoding fallback. |
| **7. Bonus 4: Dark / Light Mode** | Toggleable theme preference with smooth transitions and persistent storage. | ✅ Completed | CSS custom property theme tokens, sun/moon icon switcher, and `localStorage` persistence. |
| **8. Bonus 5: Recent Searches** | Save searched cities in browser storage with one-click re-search and individual removal. | ✅ Completed | Interactive chip bar (`#recentChips`) synced with `localStorage`, supporting up to 6 recent searches. |
| **9. Bonus 6: Unit Switcher (°C / °F)** | Toggle between Metric and Imperial units without refetching API data. | ✅ Completed | Instant unit converter formulas for Celsius ↔ Fahrenheit and km/h ↔ mph with UI animation. |
| **10. Testing & Bug Fixing** | Cross-browser compatibility, edge case validation (empty queries, special characters). | ✅ Completed | Tested with diverse global cities (London, Tokyo, Mumbai, New York) and handled offline/error scenarios. |
| **11. Documentation & Submission Prep** | Prepare README, comprehensive project report, workspace sheet, and deployment steps. | ✅ Completed | Generated `README.md`, `WORKSPACE_SHEET.md`, and `PROJECT_REPORT.md` ready for final grading. |

---

## 🎯 Requirements Compliance Checklist

### Required Features (Assignment Core)
- [x] **Search city:** Real-time city query with autocomplete & debounce.
- [x] **Display temperature:** Current temperature, feels like, min & max temperatures.
- [x] **Display weather condition:** Mapped WMO standard codes (e.g., Clear sky, Overcast, Rain showers).
- [x] **Display humidity:** Value percentage + visual progress bar + air moisture comfort status.
- [x] **Display wind speed:** Velocity in km/h or mph + rotating 360° compass arrow direction.
- [x] **Display weather icon:** Clean, scalable inline SVG weather icons with day/night variations.
- [x] **Loading state:** Full-page shimmering skeleton placeholder.
- [x] **Error handling:** Dedicated error card for non-existent cities + toast notification alerts.
- [x] **Responsive UI:** Seamless layout transition from 320px mobile to 4K ultra-wide monitors.

### Bonus Features (100% Implemented)
- [x] **5-day weather forecast:** Distinct daily forecast cards with min/max temp and rain chance.
- [x] **24-hour hourly forecast:** Horizontal scrollable forecast slider for today's weather trajectory.
- [x] **Current location weather:** One-click GPS geolocation detection with reverse geocoding.
- [x] **Dark / Light mode:** Smooth theme toggle saved in `localStorage`.
- [x] **Recent searches:** Clickable history chips with remove and clear-all actions.
- [x] **Unit switcher (°C / °F):** Instant switch between metric and imperial scales.
- [x] **Dynamic ambient backdrop:** Background gradient changes dynamically to match current weather (Sunny, Cloudy, Rainy, Snowy, Stormy).

---

## 📂 Project File Manifest

```
d:/ait internship/
├── index.html            # Main semantic HTML5 markup and UI structure
├── style.css             # Vanilla CSS design system, themes, and responsiveness
├── app.js                # Vanilla JS state, API integrations, DOM handlers, storage
├── README.md             # Complete project overview, setup guide, and features
├── WORKSPACE_SHEET.md    # Task tracking and weekly milestone sheet (this file)
└── PROJECT_REPORT.md     # Formal internship project submission report
```

---

## 💡 Key Technical Learnings & Skills Acquired

1. **Modern Vanilla JavaScript (ES6+):** Mastering `async/await`, Promise handling, destructuring, modules, and DOM manipulation without relying on third-party frameworks.
2. **REST API Consumption:** Practical understanding of endpoint query parameters, parsing JSON payloads, handling rate limits, and chaining geocoding with forecast requests.
3. **CSS Architecture & Design Systems:** Creating scalable CSS custom properties, implementing dark/light modes cleanly, crafting glassmorphism cards, and writing responsive media queries.
4. **State & Local Storage:** Persisting user preferences (theme, units, search history) across browser reloads using HTML5 Web Storage API (`localStorage`).
5. **Defensive Programming & UX:** Providing immediate feedback using skeletons, alerts, and toasts so users are never left guessing during network lag or invalid input.
