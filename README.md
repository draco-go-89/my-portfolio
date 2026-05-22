﻿# Dhrubo Basumatary — Portfolio

Simple README for the Portfolio project.

---

## What is this?

This is a personal **portfolio** website made with:

- **HTML**
- **CSS** (glassmorphism / modern light blue theme)
- **JavaScript** (small interactions: navbar, smooth scrolling, animations)
- **Bootstrap** (linked via CDN)

The main page is **`index.html`**.

---

## Pages

### 1) `index.html`
Main portfolio landing page.

Sections (anchors):
- Home (`#home`)
- About (`#about`)
- Projects (`#projects`)
- Skills (`#skills`)
- Contact (`#contact`) -> **Send Email Feedback**

### 2) `videos.html`
Videos folder page.

---

## Features (high level)

- Responsive layout
- Glassmorphism UI cards
- Navbar with mobile toggle
- Smooth scrolling for anchor links
- “Back to top” button
- Bird animation + click sound
- Skill bars animate when the Skills section appears
- Contact form opens an email draft via **mailto:**

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
│   └── Faah.mp3 / sgpwes.mp3
└── builds/
    └── *.apk
```

---

## Contact behavior

The **Contact** section form (in `index.html`) sends feedback to:

- **lubos8999@gmail.com**

On submit it opens the user’s default email client with a pre-filled **subject** and **body**.

---

## How to run locally

Option A: Double click
- Open `index.html` in your browser.

Option B: Local server (recommended)
- Python:

  ```bash
  python -m http.server 8000
  ```

  Then open: http://localhost:8000

---

## Important note

`builds/` contains APK files.

---

## Credits / License

UI theme is custom.
License: MIT (as claimed by the project; no formal header present in files). 

