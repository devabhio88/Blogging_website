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

## 🌐 Environment Setup

## 🛠 Getting Started

Follow these steps to set up the project on your local machine:

### 🔽 1. Clone the Repository

```bash
git clone https://github.com/devabhio88/Blogging_website.git
cd Blogging_website

npm install

VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

npm run dev
npm run build

