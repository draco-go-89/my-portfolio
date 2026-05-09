# Dhrubo Basumatary — Portfolio

Simple, classic README for the Portfolio project.

---

## What is this?

This is a personal portfolio website made with:
- **HTML**
- **CSS** (glassmorphism / modern light blue theme)
- **JavaScript** (small interactions like navbar, scrolling, and effects)
- **Bootstrap** (linked, but most styling is custom)

The page is **index.html** and it showcases projects, skills, and contact.

---

## Pages

### 1) `index.html`
Main portfolio landing page.

Sections:
- Home (hero)
- About
- Projects
- Skills
- Contact

### 2) `videos.html`
Videos folder page (lists project videos from `assets/*.mp4`).

---

## Features (high level)

- Responsive layout
- Glassmorphism UI cards
- Navbar with mobile toggle
- Smooth scrolling for anchor links
- Loading screen on startup
- “Back to top” button
- Bird animation + click sound (`assets/Faah.mp3`)
- Skill bars animate when the Skills section appears

---

## Project structure

```
Portfolio/
├── index.html
├── videos.html
├── README.md
├── TODO.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── *.png / *.jpeg / *.jpg
│   ├── *.mp4
│   └── Faah.mp3
└── builds/
    └── *.apk
```

Note: `builds/` contains APK files (they are typically kept out of git by `.gitignore`).

---

## How to run locally

### Option A: Double click
- Open `index.html` in your browser.

### Option B: Use a simple local server (recommended)
From the project folder:

- Python:
  ```bash
  python -m http.server 8000
  ```
  Then open: http://localhost:8000

- Node (if you use a tool like live-server):
  ```bash
  npx live-server
  ```

---

## Projects shown on the site

`index.html` includes these items in the Projects section:

1. **To Do List App**
   - Task manager with an alarm system
   - Download: `builds/todolist.apk`

2. **Password Checker**
   - Password strength analyzer (Normal / Strong / Hard)

3. **Music Player V2**
   - Download: `builds/Lubo_v4.apk`

4. **Music Player App**
   - Password-protected music player

5. **Palette Generator**
   - Color palette generator website

6. **Alarm App**
   - Unique alarm app with math puzzles

7. **Videos Folder**
   - Opens `videos.html`

---

## Files that matter most

- **`index.html`**: layout + projects + section anchors
- **`videos.html`**: video cards (uses `assets/*.mp4`)
- **`css/style.css`**: styling and theme
- **`js/script.js`**: navbar toggle, smooth scrolling, loading screen, skill bar animation, back-to-top, bird animation, form submit demo

---

## Credits / License

- UI theme is custom.
- License: **MIT** (see `LICENSE` in repo if present).

---

## Quick links (from the site)

- Projects are linked from the Projects section on `index.html`.
- Videos page is `videos.html`.

