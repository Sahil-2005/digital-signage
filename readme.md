# 🖥️ Digital Signage System

**Digital Signage** is a remote ad management and view-tracking system that allows businesses to seamlessly manage and update advertisements across multiple locations — all from a central dashboard. It also tracks viewer interactions and provides insightful analytics on ad performance.

📍 **GitHub Repo**: [Sahil-2005/digital-signage](https://github.com/Sahil-2005/digital-signage)

---

## ✨ Features

📺 **Remote Ad Control** – Upload, update, and manage ads remotely across all connected screens  
👁️ **View Count Tracking** – AI-powered view detection system using OpenCV  
📊 **Ad Performance Analytics** – Dashboard to monitor views and viewer data per ad  
🔐 **User Authentication** – Secure login and registration system for admin access  
📂 **Multi-location Support** – Easily scale your ad network to multiple locations  
📁 **Video Upload & Management** – Upload and manage ad video files with ease  
🧠 **Face Detection (Python)** – Uses computer vision to detect and count viewers  

---

## 🛠️ Tech Stack

**Frontend:**  
- HTML, CSS, EJS templates  
- Vanilla JavaScript  

**Backend:**  
- Node.js + Express (Client-side server)  
- Python (Server-side face detection and analytics)  
- OpenCV for viewer count analysis  

**Data Handling:**  
- JSON files for storing ad metadata and viewer counts  

---

## 📂 Project Structure

sahil-2005-digital-signage/
├── client-side/
│ ├── package.json
│ ├── server.js # Express server for frontend
│ └── public/
│ ├── style.css
│ ├── videoData.json
│ └── views/
│ ├── analysis.ejs
│ ├── analysis2.ejs
│ ├── dashboard.ejs
│ ├── login.ejs
│ ├── register.ejs
│ ├── style.css
│ └── upload.ejs
└── server-side/
├── countPeople.py # Core face detection logic
├── package.json
├── server.js # Node.js server for backend
├── start.py # Launches face detection
├── test.py
├── test2.py
├── tryitout.py
├── videoDataSummary.json
├── viewerData.json # Stores viewer count per video
└── public/
├── index.html
└── script.js


---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahil-2005/digital-signage.git
cd digital-signage


2️⃣ Install Dependencies
Client Side (Frontend Server)
cd client-side
npm install

Server Side (Python + Node.js)

Install required Python packages:

pip install opencv-python flask


If using server.js on server-side as well:

cd ../server-side
npm install

3️⃣ Run the Application
Start the Python Face Detection Server
cd server-side
python start.py

Start the Frontend Server
cd ../client-side
node server.js


Your dashboard should now be live at 👉 http://localhost:3000

📈 Future Roadmap

🔹 Real-time viewer analytics
🔹 Add MongoDB or SQL for scalable storage
🔹 Mobile-friendly dashboard UI
🔹 Role-based access control
🔹 Multi-video playlist scheduling
🔹 Graph-based analytics with Chart.js or D3.js

🤝 Contributing

Contributions are welcome! 🎉

Fork the repo

Create a feature branch:

git checkout -b feature-name


Commit your changes:

git commit -m "Added feature"


Push to your branch:

git push origin feature-name


Open a Pull Request 🚀

👨‍💻 Author

Sahil Gawade

🌐 Portfolio: sahil-gawade.netlify.app

💼 LinkedIn: linkedin.com/in/sahil-gawade-920a0a242

📌 GitHub: Sahil-2005

📜 License

This project is licensed under the MIT License – feel free to use and modify it for your own projects.

⭐ Support

If you found this project helpful, please consider starring ⭐ the repository and sharing it! It helps a lot! 🚀