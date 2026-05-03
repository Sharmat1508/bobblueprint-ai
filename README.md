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
