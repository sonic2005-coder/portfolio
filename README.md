# Ahmed Yasser - Personal Portfolio Website

A premium, interactive personal portfolio website designed for **Ahmed Yasser** focusing on **AI for Business**, **Machine Learning**, and **Computer Science**.

Built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (No external frameworks, No React, No Bootstrap).

---

## 🚀 Features & Highlights

- **Dark & Light Mode:**
  - **Dark Mode (Default):** Deep futuristic navy `#091540`, primary `#1B2CC1`, secondary `#201658`, and cyan neon `#00D4FF`.
  - **Light Mode:** `#F6F1F1` base, `#F7E2E2` tint, `#B9D4F1` accent, with deep navy text for optimal readability.
  - Persistent state saved in `localStorage`.
- **Single-Page Navigation:**
  - 9 structured sections in exact required sequence.
  - Sticky glassmorphic navbar with reading progress indicator.
  - Active ScrollSpy updating current section as you scroll.
  - Mobile hamburger drawer with smooth overlay animations.
- **Dynamic Interactions:**
  - Typewriter animation cycling through professional titles.
  - Scroll-triggered reveal animations via Intersection Observer.
  - Ambient cursor glow effect for desktop users.
  - Magnetic CTA button interactions.
  - Interactive Project Modal for "Sentinel Shield".
  - Client-side form validation with instant user feedback.
  - Floating "Back to Top" button.
- **100% Responsive & Accessible:**
  - Mobile-first architecture using CSS Grid, Flexbox, and `clamp()`.
  - Respects `prefers-reduced-motion` for accessibility.

---

## 📁 Project Structure

```
Portfolio/
│
├── index.html                  # Main semantic HTML5 markup (All 9 sections)
├── README.md                   # Documentation & customization guide
│
├── css/
│   └── style.css               # Complete stylesheet (variables, glassmorphism, animations)
│
├── js/
│   └── script.js               # Vanilla JS (theme toggle, typewriter, validation, modals)
│
└── assets/
    ├── images/
    │   ├── profile.jpg         # Profile photo placeholder (Ready to replace)
    │   └── sentinel-shield.png # Sentinel Shield project visual placeholder
    └── icons/                  # Standalone SVG icons (ai, shield, github, linkedin, etc.)
```

---

## 🧭 Sections Overview

1. **Home:** Dynamic typewriter titles, bio, CTA buttons, education & training highlights, glowing circular profile frame.
2. **About Me:** Focus on AI for Business, core interests, and an interactive SVG neural architecture diagram.
3. **Education:** Zagazig University, Faculty of Computers and Information (Bachelor's in CS, Grade: Very Good).
4. **Experience:** National Telecommunication Institute (NTI) - AI for Business Trainee with practical learning areas.
5. **Technical Skills:** Categorized into Programming (C++, Python), CS Fundamentals (7 areas), and Artificial Intelligence (3 areas).
6. **Featured Projects:** *Sentinel Shield – Financial Fraud Detection System* with image zoom, tags, GitHub link, and interactive architecture modal.
7. **What People Say:** 3 design placeholder testimonial cards with 5-star ratings and roles.
8. **What I Can Offer:** 6 realistic service cards covering C++, Data Structures, Graphics, Python, AI for Business, and ML.
9. **Get In Touch:** LinkedIn & GitHub links, email mailto placeholder, and a validated contact form.

---

## 🛠️ How to Customize

### 1. Adding Your Actual Profile Photo
Replace `assets/images/profile.jpg` with your own square photo (recommended 800x800px JPG or PNG). The circular glowing frame will automatically format and crop it.

### 2. Updating Project Screenshots
Replace `assets/images/sentinel-shield.png` with your actual project UI screenshot (recommended 1200x700px).

### 3. Updating Your Email Address
In `index.html`:
- Search for `contact-placeholder@ahmedyasser.dev`
- Replace with your personal or university email address.

### 4. Connecting the Contact Form to a Backend
The form validates client-side and provides a direct `mailto:` fallback. To receive emails directly into your inbox without a server, you can connect [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com) by adding your endpoint to the `<form>` action or JS handler.

---

## 💻 How to View Locally
Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).
No installation or build steps required!

