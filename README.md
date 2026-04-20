# 🛡️ SafeCircle

> SafeCircle is an emergency assistance platform offering categorized help, quick-call functionality, real-time nearby support, authentication, and an emergency toolkit for rapid response and evidence capture.

---

## 🚨 Problem Statement

In emergency situations, people often face critical challenges:
- Difficulty accessing the right emergency contacts quickly
- Inability to find nearby help during urgent situations
- Lack of guidance on what actions to take immediately
- No quick way to record or share evidence (audio/video/location)
- No simple way to alert others instantly
- Panic caused by complex or slow interfaces

SafeCircle is designed to solve this by providing a **fast, structured, and action-oriented interface** that helps users respond instantly and effectively during emergencies.

---

## Demo

- Live App: 
- Demo Video: https://drive.google.com/file/d/1RqPlk5s9eQ1VreQbtzD78rtqVD3TSDjV/view?usp=sharing

---

## ✨ Features

### 🔐 Authentication System
- User login functionality
- Secure access to dashboard and features  

**Why?**  
Ensures controlled access and enables future personalization.

---

### 📂 Categorized Emergency Support
- Categories like Police, Medical, Fire, Disaster Response, etc.
- Card-based navigation UI  

**Why?**  
Reduces confusion and speeds up decision-making.

---

### 📞 Quick Call Functionality
- One-click emergency calling using `tel:` links
- Smart priority number selection  

**Why?**  
Saves crucial time during emergencies.

---

### 📋 Emergency Numbers List
- Multiple contact numbers per category  

**Why?**  
Provides fallback options.

---

### 📍 Find Nearby Help
- Google Maps integration for nearby services  

**Why?**  
Enables access to physical help instantly.

---

### 📘 Safety Guides
Includes structured guides for:
- Women’s Safety  
- Child Safety  
- Medical Emergency  
- Fire & Rescue  
- Police / Personal Security  
- Disaster Response  

**Why?**  
Provides step-by-step actions during emergencies.

---

## 🧰 Emergency Toolkit

### 📍 Live Location Sharing
- Get current location
- Share via WhatsApp  

**Why?**  
Helps quickly inform others of your exact location.

---

### 💬 WhatsApp Integration
- Direct sharing of location  

**Why?**  
Fastest way to reach contacts using a familiar platform.

---

### 🎤 Audio Recording
- Start / Stop / Delete  

**Why?**  
Capture real-time audio evidence.

---

### 📷 Photo Capture
- Use device camera instantly  

**Why?**  
Visual documentation of situations.

---

### 🎥 Video Recording
- Record and manage videos  

**Why?**  
Stronger form of evidence capture.

---

### 🚨 SOS Siren Feature
- Siren button in navbar
- Sound + visual alert  

**Why?**
- Attracts attention  
- Alerts nearby people  
- Acts as deterrent  

---

### 🔁 Error Handling
- Handles invalid routes safely  

---

### 🎯 Responsive UI
- Clean and minimal design using Tailwind  

---

## ⚛️ React Concepts & Features Used

- **Functional Components**  
  Used to build modular and reusable UI elements.

- **useState Hook**  
  Manages component state (recording status, location, UI states).

- **useEffect Hook**  
  Handles side effects like updating UI based on state changes.

- **useRef Hook**  
  Used for DOM interactions (media handling, scrolling, etc.).

- **React Router (useParams, Routes, Link)**  
  Handles navigation between pages and dynamic category routing.

- **Props & Component Reusability**  
  Passing data between components to keep code clean and modular.

- **Conditional Rendering**  
  Displays UI based on state (recording status, invalid category, etc.).

- **Event Handling**  
  Handles user interactions like button clicks, recording actions.

- **Derived UI Logic**  
  Determines what to show based on current state and data.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- React Router  
- Tailwind CSS  

---

### Integration
- Google Maps (URL-based)  
- WhatsApp sharing  
- Browser APIs:
  - Geolocation API  
  - MediaRecorder API  
  - getUserMedia  

---

### Tooling
- Vite  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/<your-username>/safecircle.git  
cd safecircle  

---

### 2. Install dependencies
npm install  

---

### 3. Run the development server
npm run dev  

---

### 4. Open in browser
http://localhost:5173  

---

## 📌 Future Improvements

- Real-time live tracking  
- Cloud storage for media  
- Push notifications for SOS  
- AI-based emergency suggestions  
- Contact-based alerts  
