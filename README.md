# 🌐 PeniVerse — A Full-Stack Blogging Platform

PeniVerse is a modern, full-featured blogging web application built using **React**, **Vite**, and **Appwrite**. It supports authentication, file uploads, post creation, editing, rich text content, and form validations — all handled with best practices and developer-friendly tooling.

---

## 🔧 Tech Stack

- ⚛️ **React** (UI)
- ⚡ **Vite** (Bundler)
- ☁️ **Appwrite** (Authentication, Database, File Storage)
- 🪝 **React Hook Form** (Form state and validation)
- 📝 **TinyMCE** (Rich Text Editor)
- 📦 **Redux** (Global state management)

---

## 🔁 Project Flow

1. Appwrite Configuration
2. Store & Redux Setup
3. UI Component Creation (focus on design system)
4. Form Integrations, Authentication, and CRUD
5. Page Routing and Protection

---

## 📁 Folder Structure

PeniVerse/
├── public/
│ └── favicon.ico
├── src/
│ ├── appwrite/ # Appwrite services (auth, db, storage)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components (Login, Home, Dashboard)
│ ├── store/ # Redux slices and store
│ ├── utils/ # Slug logic, validation helpers
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .env
├── .gitignore
├── package.json
└── vite.config.js


---

## 🌐 Environment Setup

Create a `.env` file in the root with your Appwrite credentials:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
