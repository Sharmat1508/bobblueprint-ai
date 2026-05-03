# BobBlueprint AI

BobBlueprint AI is a beginner-friendly AI project launch assistant built for the IBM Bob Dev Day Hackathon. It helps new developers turn rough project ideas into structured, GitHub-ready project blueprints using IBM watsonx.ai, IBM Cloudant, and IBM Bob.

## 🚀 What It Does

BobBlueprint takes a simple project idea and generates a complete launch kit, including:

- Project title and summary
- Problem statement
- Target users
- MVP feature list
- Beginner-friendly build roadmap
- Suggested folder structure
- IBM Bob prompt pack
- README starter
- 3-minute hackathon demo checklist

The goal is to help beginner developers move from “I have an idea” to “I know what to build next.”

## 🧠 Why I Built This

As a beginner builder, starting a project can feel overwhelming. Many students and early-career developers know what they want to build, but struggle with planning the MVP, organizing files, writing documentation, debugging, and preparing a demo.

BobBlueprint AI solves that by generating a clear project blueprint and IBM Bob prompts that developers can copy into IBM Bob to continue building faster.

## 🛠️ Tech Stack

- **React** — Frontend user interface
- **Vite** — Fast development setup
- **Express.js** — Backend API server
- **IBM watsonx.ai Runtime** — AI blueprint generation
- **IBM Cloudant** — Stores generated blueprint history
- **IBM Bob** — Used as an AI development partner inside VS Code

## 🌐 IBM Services Used

### IBM watsonx.ai Runtime

BobBlueprint uses IBM watsonx.ai Runtime to generate structured project blueprints from plain-English ideas.

### IBM Cloudant

Generated blueprints are saved to IBM Cloudant so users can keep a history of their project ideas and outputs.

### IBM Bob

IBM Bob was used inside VS Code to review the project structure, suggest improvements, support debugging, improve the UI, and prepare the project for the hackathon demo.

BobBlueprint also generates an IBM Bob Prompt Pack so beginner developers can continue building their project with Bob.

## ✨ Key Features

- Clean SaaS-style landing page
- Live AI demo powered by watsonx.ai
- Beginner-friendly project blueprint generation
- IBM Bob prompt pack generation
- Cloudant saved history
- Responsive UI
- Hackathon-ready demo flow

## 🧩 Project Architecture

```txt
User Idea
   ↓
React Frontend
   ↓
Express Backend API
   ↓
IBM watsonx.ai Runtime
   ↓
Generated Project Blueprint
   ↓
IBM Cloudant Saved History



bobblueprint-ai/
│
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── server.js
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
└── README.md


## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sharmat1508/bobblueprint-ai.git
cd bobblueprint-ai

2. Install dependencies
npm install

3. Create a .env file
Create a .env file in the project root.

IBM_API_KEY=your_ibm_cloud_api_key
IBM_PROJECT_ID=your_watsonx_project_id
IBM_WATSONX_URL=https://us-south.ml.cloud.ibm.com
IBM_MODEL_ID=ibm/granite-3-8b-instruct

CLOUDANT_URL=your_cloudant_url
CLOUDANT_APIKEY=your_cloudant_api_key
Important: Do not commit your .env file. It contains private credentials.

4. Run the backend server
npm run server
Backend runs on:
http://localhost:5050

5. Run the frontend
Open a second terminal and run:
npm run dev
Frontend runs on:
http://localhost:5173

API Endpoints
Generate Blueprint
POST /api/blueprint

Example request:

{
  "idea": "I want to build a job application tracker for students."
}

View Saved Blueprint History
GET /api/history
View Available watsonx.ai Models
GET /api/models


## 🎥 Demo Flow
Enter a beginner project idea.
Click Generate Blueprint.
BobBlueprint sends the idea to IBM watsonx.ai.
watsonx.ai generates a structured project blueprint.
The result is saved to IBM Cloudant.
The user receives an IBM Bob Prompt Pack to continue building.

## 🏆 Built For
IBM Bob Dev Day Hackathon

## 🙋‍♀️ Creator
Built by Tanya Sharma
Master’s in Business Analytics student passionate about AI, analytics, automation, and beginner-friendly developer tools.

## 🔐 Security Note
This project uses environment variables to protect private IBM API keys and Cloudant credentials. The .env file is ignored through .gitignore and should never be pushed to GitHub.

## 📌 Future Improvements
Add login and saved user accounts
Display blueprint history directly in the frontend
Add export to PDF or Markdown
Add copy buttons for IBM Bob prompts
Add voice input using IBM Speech to Text
Add text-to-speech demo using IBM Text to Speech
📄 License

## This project is for hackathon and learning purposes.


