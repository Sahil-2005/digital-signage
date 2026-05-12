<div align="center">

# 🖥️ Digital Signage System

### 🚀 AI-Powered Smart Advertising & Viewer Analytics Platform

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</p>

<p align="center">
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License"/></a>
  <a href="#contributing"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"/></a>
  <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square" alt="Maintained"/>
</p>

**A cutting-edge remote advertisement management and real-time viewer tracking system that empowers businesses to seamlessly manage ads across multiple locations from a single dashboard — powered by AI-based face detection for intelligent analytics.**

[📖 Documentation](#-getting-started) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [👨‍💻 Author](#-author)

---

</div>

## 🎯 What is Digital Signage?

Digital Signage is a **full-stack solution** designed for modern advertising needs. It combines:

> 🎬 **Centralized Ad Management** — Control all your digital displays from one place  
> 🧠 **AI-Powered Analytics** — Real-time face detection to count and track viewers  
> 📊 **Performance Insights** — Detailed dashboards to measure ad effectiveness  
> 🌐 **Multi-Location Support** — Scale seamlessly across multiple screens and locations

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎛️ Admin Dashboard
- ✅ **Secure user authentication** (Login/Register)
- ✅ **Upload & manage** video advertisements
- ✅ **Schedule ads** with start/end times
- ✅ **Assign ads** to specific locations

</td>
<td width="50%">

### 📺 Display System
- ✅ **Auto-sync** with central server
- ✅ **Seamless video playback** loop
- ✅ **Fullscreen** immersive experience
- ✅ **Automatic** video download & cleanup

</td>
</tr>
<tr>
<td width="50%">

### 🧠 AI & Computer Vision
- ✅ **Real-time face detection** (MTCNN)
- ✅ **Unique viewer counting** algorithm
- ✅ **Live camera feed** processing
- ✅ **OpenCV-powered** analysis engine

</td>
<td width="50%">

### 📊 Analytics & Reports
- ✅ **View count** per advertisement
- ✅ **Location-wise** performance data
- ✅ **Time-based** engagement analytics
- ✅ **Exportable** viewer statistics

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---:|:---|
| **🎨 Frontend** | HTML5, CSS3, EJS Templates, JavaScript |
| **⚙️ Backend** | Node.js, Express.js, Python, Flask |
| **🗄️ Database** | MongoDB, JSON Data Storage |
| **🤖 AI/ML** | OpenCV, MTCNN (Face Detection) |
| **🔐 Auth** | Express Sessions, Bcrypt |
| **📦 Other** | Multer, Axios, Moment.js, CORS |

</div>

---

## 🏗️ Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                        ADMIN DASHBOARD                          │
│                     (Client-Side Server)                        │
│              localhost:3000 • Node.js + Express                 │
├─────────────────────────────────────────────────────────────────┤
│  📝 Login/Register  │  📤 Upload Ads  │  📊 View Analytics      │
└──────────────┬──────────────────────────────────────────────────┘
               │ API Calls
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DISPLAY SERVER                             │
│                    (Server-Side Server)                         │
│              localhost:4000 • Node.js + Express                 │
├─────────────────────────────────────────────────────────────────┤
│  🎬 Video Streaming  │  📥 Auto-Sync  │  🗂️ File Management    │
└──────────────┬──────────────────────────────────────────────────┘
               │ Triggers
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FACE DETECTION ENGINE                        │
│                         Python + OpenCV                         │
├─────────────────────────────────────────────────────────────────┤
│  👁️ MTCNN Detection  │  🔢 Viewer Count  │  📈 Data Logging    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

The repository is organized into three distinct modules:

| Directory | Description | Key Components |
| :--- | :--- | :--- |
| 🖥️ `client-side/` | Admin Dashboard (Port 3000) | `server.js`, `views/`, `uploads/` |
| 📺 `server-side/` | Display Server & Analytics (Port 4000) | `server.js`, `countPeople.py` |
| 🎬 `videos/` | Centralized Media Storage | Uploaded `.mp4` ad files |

<br/>

### 🌳 Detailed Hierarchy

```text
📦 digital-signage
 ┣ 📂 client-side               # Admin Dashboard Server
 ┃ ┣ 📂 public                  # Assets & Views
 ┃ ┃ ┣ 📂 uploads               # Uploaded video files
 ┃ ┃ ┣ 📂 views                 # EJS Templates
 ┃ ┃ ┃ ┣ 📜 dashboard.ejs       # Admin Dashboard
 ┃ ┃ ┃ ┣ 📜 analysis.ejs        # Analytics views
 ┃ ┃ ┃ ┣ 📜 upload.ejs          # Upload ad views
 ┃ ┃ ┃ ┣ 📜 login.ejs           # Authentication
 ┃ ┃ ┃ ┗ 📜 register.ejs
 ┃ ┃ ┣ 📜 style.css             # Global styles
 ┃ ┃ ┣ 📜 logo.svg              # App Logo
 ┃ ┃ ┗ 📜 videoData.json        # Ad metadata storage
 ┃ ┣ 📜 server.js               # Express server (Port 3000)
 ┃ ┗ 📜 package.json            # Node dependencies
 ┣ 📂 server-side               # Display & Detection Server
 ┃ ┣ 📂 public                  # Display interface
 ┃ ┃ ┣ 📜 index.html            # Signage Viewer Display
 ┃ ┃ ┗ 📜 script.js             # Player & Sync logic
 ┃ ┣ 📂 videos                  # Local sync storage
 ┃ ┣ 📜 server.js               # Express server (Port 4000)
 ┃ ┣ 📜 countPeople.py          # MTCNN Face detection model
 ┃ ┣ 📜 start.py                # Auto-launcher script
 ┃ ┣ 📜 viewerData.json         # Real-time viewer count stats
 ┃ ┗ 📜 package.json            # Node dependencies
 ┗ 📂 videos                    # Main repository video storage
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Download |
|:---:|:---:|:---:|
| Node.js | v16+ | [nodejs.org](https://nodejs.org/) |
| Python | 3.8+ | [python.org](https://python.org/) |
| MongoDB | Latest | [mongodb.com](https://mongodb.com/) |

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahil-2005/digital-signage.git
cd digital-signage
```

---

### 2️⃣ Install Dependencies

<details>
<summary><b>📦 Client-Side (Admin Dashboard)</b></summary>

```bash
cd client-side
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `multer` - File uploads
- `ejs` - Template engine

</details>

<details>
<summary><b>📦 Server-Side (Display Server)</b></summary>

```bash
cd server-side
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `axios` - HTTP client
- `moment` - Date handling
- `cors` - Cross-origin requests

</details>

<details>
<summary><b>🐍 Python Dependencies</b></summary>

```bash
pip install opencv-python mtcnn tensorflow
```

**Packages installed:**
- `opencv-python` - Computer vision
- `mtcnn` - Face detection model
- `tensorflow` - ML backend

</details>

---

### 3️⃣ Run the Application

> **Important:** Make sure MongoDB is running before starting the servers!

**Step 1: Start MongoDB**
```bash
mongod
```

**Step 2: Start Admin Dashboard (Client-Side)**
```bash
cd client-side
node server.js
```
🌐 Dashboard available at: `http://localhost:3000`

**Step 3: Start Display Server (Server-Side)**
```bash
cd server-side
node server.js
```
📺 Display available at: `http://localhost:4000`

**Step 4: Start Face Detection (Optional)**
```bash
cd server-side
python countPeople.py
```

---

## 📊 How It Works

```mermaid
graph LR
    A[👤 Admin] -->|Upload Ad| B[📤 Dashboard]
    B -->|Store| C[(MongoDB)]
    B -->|Sync| D[📺 Display]
    D -->|Play| E[🎬 Video]
    E -->|Trigger| F[🧠 Face Detection]
    F -->|Count| G[📊 Analytics]
    G -->|View| A
```

| Step | Action | Description |
|:---:|:---:|:---|
| 1️⃣ | **Upload** | Admin uploads video ads via dashboard |
| 2️⃣ | **Store** | Metadata saved to MongoDB, files to uploads/ |
| 3️⃣ | **Sync** | Display servers fetch new ads automatically |
| 4️⃣ | **Play** | Videos play in loop on display screens |
| 5️⃣ | **Detect** | Camera detects faces watching the screen |
| 6️⃣ | **Analyze** | View counts aggregated per ad and location |

---

## 🔮 Future Roadmap

<div align="center">

| Status | Feature | Description |
|:---:|:---|:---|
| 🔄 | **Real-time Dashboard** | Live viewer count updates |
| 📱 | **Mobile App** | Admin app for iOS/Android |
| 📈 | **Advanced Analytics** | Chart.js/D3.js visualizations |
| 👥 | **Role-Based Access** | Admin, Manager, Viewer roles |
| 🎵 | **Playlist Scheduling** | Time-based ad rotation |
| ☁️ | **Cloud Deployment** | AWS/Azure hosting support |
| 🔔 | **Push Notifications** | Alerts for low engagement |

</div>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m '✨ Add some AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/Sahil-2005.png" width="120" height="120" style="border-radius: 50%; border: 4px solid #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt="Sahil Gawade"/>

### **Sahil Gawade**

*Crafting modern, intelligent, and scalable solutions.*

<br/>

[![Portfolio](https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=globe&logoColor=white)](https://sahil-gawade.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sahil-gawade-920a0a242/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sahil-2005)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/u/sahilgawade4321/)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gawadesahil.dev@gmail.com)

</div>

---

## 📜 License

<div align="center">

This project is licensed under the **MIT License**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Feel free to use, modify, and distribute this project!*

</div>

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

<img src="https://img.shields.io/github/stars/Sahil-2005/digital-signage?style=social" alt="GitHub Stars"/>

**Made with ❤️ by [Sahil Gawade](https://github.com/Sahil-2005)**

*📧 Have questions? Feel free to open an issue or reach out!*

</div>